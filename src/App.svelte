<script lang="ts">
  import { ServerFile, WritableStream, Receiver } from "websocket-ftp";
  import {
    peers as peerStore,
    api,
    APILocation,
    join,
    messages,
    name,
    requests,
  } from "./store";
  import { Empty, Peer } from "./api/api_pb";
  import { downloadBlob } from "./common/utils";

  import User from "./User.svelte";
  import Overlay from "./overlays/Overlay.svelte";
  import { OverlayTarget, OverlayType } from "./overlays/common";
  import Uploader from "./Uploader.svelte";
  import Badge from "./Badge.svelte";

  let overlayed: OverlayTarget | undefined;

  let peers: { [key: string]: Peer } = {};
  peerStore.subscribe((value) => (peers = value));

  let uploadTarget: string | null;
  let disconnected = false;

  let unreadRequests: number = 0;

  join(
    () => {
      const messageStream = api.listenMessages(new Empty());
      messageStream.on("data", (message) => {
        console.log(message.getPeer(), message.getMessage());
        messages.update((value) => {
          return {
            ...value,
            [message.getPeer()]: {
              unread:
                (value[message.getPeer()]?.unread ?? 0) +
                (overlayed?.type !== OverlayType.MESSAGES ? 1 : 0),
              messages: [
                ...(value[message.getPeer()]?.messages ?? []),
                {
                  author: peers[message.getPeer()].getName(),
                  message: message.getMessage(),
                },
              ],
            },
          };
        });
      });

      const connectionStream = api.listenConnections(new Empty());
      connectionStream.on("data", (conn) => {
        const data: { file: ServerFile; stream: WritableStream }[] = [];
        const r = new Receiver(
          new WebSocket(`ws://${APILocation}/receive?&id=${conn.getId()}`),
          {
            onRequest: (files) => {
              unreadRequests++;
              return new Promise((resolver) => {
                console.log("got requests", files);
                requests.update((value) => {
                  return {
                    ...value,
                    [conn.getId()]: {
                      peer: conn.getPeer(),
                      files: files,
                      resolver: resolver,
                    },
                  };
                });
              });
            },
            onReceive: (file, stream) => {
              stream.onFinish((buffer) => {
                downloadBlob(new Blob([buffer]), file.Name);
              });
            },
            onTransfersComplete: () => {
              console.log("transfers complete", data);
            },
          }
        );
      });
    },
    () => (disconnected = true)
  );
</script>

<Uploader id={uploadTarget} />

<main>
  <div class={overlayed ? "blur-md" : ""}>
    <div class="flex justify-center items-center h-screen px-[10%]">
      {#if Object.values(peers).length === 0}
        <p class="text-center">
          There are no peers active on your local network
        </p>
      {/if}
      {#each Object.values(peers) as p}
        <User
          name={p.getName()}
          platform={p.getPlatform()}
          id={p.getId()}
          setOverlay={(target) => (overlayed = target)}
          onUpload={(id) => (uploadTarget = id)}
        />
      {/each}
    </div>
    <div class="w-screen fixed bottom-10">
      <p class="flex justify-center items-center">you are {name}</p>
    </div>
    {#if disconnected}
      <div
        class={[
          "flex fixed w-screen bottom-3 justify-center",
          "sm:pl-10 sm:bottom-10 sm:justify-start",
        ].join(" ")}
      >
        <img src="icons/plug-line.svg" alt="disconnected-plug" />
        <p>disconnected</p>
      </div>
    {/if}
    <div class="fixed right-10 bottom-10">
      <img
        class={[
          "transition-all p-1 border-2 border-transparent rounded-xl",
          "hover:cursor-pointer hover:scale-110 hover:border-neutral-900",
        ].join(" ")}
        src="icons/file-transfer-line.svg"
        alt="pending-requests"
        on:click={() => {
          unreadRequests = 0;
          overlayed = {
            peer: "",
            type: OverlayType.REQUESTS,
          };
        }}
      />
      <Badge number={unreadRequests} />
    </div>
  </div>
  {#if overlayed}
    <Overlay target={overlayed} onClose={() => (overlayed = undefined)} />
  {/if}
</main>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  /* beautiful hack to change the hue of a black image */
  :global(.as-slate-600) {
    filter: invert(31%) sepia(15%) saturate(753%) hue-rotate(176deg)
      brightness(99%) contrast(92%);
  }
</style>
