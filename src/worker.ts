import { Receiver, ServerFile } from "websocket-ftp";
import { v4 } from "uuid";

export type WorkerRequest =
  | {
      type: "connect";
      url: string;
    }
  | {
      type: "resolve";
      id: string;
      accept: boolean;
    };

export type WorkerResponse =
  | {
      type: "request";
      id: string;
      files: ServerFile[];
    }
  | {
      type: "received";
      file: ServerFile;
      buffer: Uint8Array;
    };

const requestResolvers: Record<string, (value: boolean) => void> = {};

onmessage = ({ data }: MessageEvent<WorkerRequest>) => {
  switch (data.type) {
    case "connect":
      new Receiver(new WebSocket(data.url), {
        onRequest: (files) => {
          return new Promise((resolver) => {
            const id = v4();
            postMessage({
              type: "request",
              id,
              files,
            } as WorkerResponse);
            requestResolvers[id] = resolver;
          });
        },
        onReceive: (file, stream) => {
          stream.onFinish((buffer) => {
            console.info("received file", file);
            postMessage({
              type: "received",
              file,
              buffer,
            } as WorkerResponse);
          });
        },
        onTransfersComplete: () => {
          console.info("transfers complete");
        },
      });
      break;
    case "resolve":
      requestResolvers[data.id](data.accept);
  }
};
