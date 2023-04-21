import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import type { ServerStreamingCall } from "@protobuf-ts/runtime-rpc";
import { Peer } from "./api/api";
import { APIClient } from "./api/api.client";
import { derived, get, writable } from "svelte/store";
import { Receiver, type ServerFile } from "websocket-ftp";
import { getRandomNoun } from "./common/nouns";
import { downloadBlob, getPlatform } from "./common/utils";
import type { DisplayMessage, OverlayTarget } from "./overlays/common";
import { WorkerRequest, WorkerResponse } from "./worker";

// stream management code
const managementState: Record<symbol, boolean> = {};

export function manageStream<T extends object>(
  generate: () => ServerStreamingCall<any, T>,
  onMessage: (message: T) => void,
  key: symbol | undefined = undefined
): () => void {
  if (!key) {
    key = Symbol("managed-stream");
  }
  managementState[key] = true;

  const call = generate();
  call.responses.onMessage(onMessage);
  call.responses.onError((e) => {
    if (!e.message.includes("NetworkError")) {
      return;
    }
    connectionState.update(($connectionState) => {
      $connectionState.set(key!, false);
      return $connectionState;
    });
    setTimeout(() => {
      if (!managementState[key!]) {
        return;
      }
      console.info("reconnecting...");
      manageStream(generate, onMessage, key);
    }, 3000);
  });
  call.headers
    .then(() => {
      console.info("connected");
      connectionState.update(($connectionState) => {
        $connectionState.set(key!, true);
        return $connectionState;
      });
    })
    .catch((e) => {
      if (e.message.includes("NetworkError")) {
        return;
      }
      throw e;
    });

  return () => {
    delete managementState[key!];
  };
}

// constants
export const name = getRandomNoun();
export const platform = getPlatform();
export const HOST = import.meta.env.VITE_HOST ?? window.location.host;

export const api = new APIClient(
  new GrpcWebFetchTransport({
    baseUrl: `http://${HOST}`,
  })
);

// types
export type Thread = {
  messages: DisplayMessage[];
  unread: number;
};

export type Request = {
  peer: string;
  files: ServerFile[];
  resolver: (choice: boolean) => void;
};

// fetched state
export const messages = writable<Record<string, Thread>>({});
export const peers = writable<Record<string, Peer>>({});
export const requests = writable<Record<string, Request>>({});

// local state
export const overlaid = writable<OverlayTarget | undefined>();
export const unreadRequests = writable<number>(0);

export const connectionState = writable<Map<symbol, boolean>>(new Map());
export const disconnected = derived(connectionState, ($connectionState) => {
  for (const [, state] of $connectionState) {
    if (!state) {
      return true;
    }
  }
  return false;
});

// join peer and listen for peers
manageStream(
  () =>
    api.join({
      id: "",
      name: name,
      platform: platform,
    }),
  ({ peers: newPeers }) => {
    peers.update(($peers) => {
      for (const p of newPeers) {
        $peers[p.id] = p;
      }
      return $peers;
    });
    messages.update(($messages) => {
      for (const p of newPeers) {
        $messages[p.id] = {
          messages: [],
          unread: 0,
        };
      }
      return $messages;
    });
  }
);

// listen for messages from peers
manageStream(
  () => api.listenMessages({}),
  (message) => {
    console.info(message.peer, message.message);
    messages.update(($messages) => {
      if (!$messages[message.peer]) {
        $messages[message.peer] = {
          unread: 0,
          messages: [],
        };
      }
      $messages[message.peer].unread++;
      $messages[message.peer].messages.push({
        author: get(peers)[message.peer].name,
        message: message.message,
      });
      return $messages;
    });
  }
);

// listen for WS connections from peers
manageStream(
  () => api.listenConnections({}),
  (conn) => {
    const worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });

    worker.onmessage = ({ data }: MessageEvent<WorkerResponse>) => {
      switch (data.type) {
        case "request":
          unreadRequests.update(($unreadRequests) => $unreadRequests + 1);
          requests.update(($requests) => {
            $requests[conn.id] = {
              peer: conn.peer,
              files: data.files,
              resolver: (accept) =>
                worker.postMessage({
                  type: "resolve",
                  accept: accept,
                  id: data.id,
                } as WorkerRequest),
            };
            return $requests;
          });
          break;
        case "received":
          downloadBlob(new Blob([data.buffer]), data.file.Name);
      }
    };

    worker.postMessage({
      type: "connect",
      url: `ws://${HOST}/receive?&id=${conn.id}`,
    } as WorkerRequest);
  }
);
