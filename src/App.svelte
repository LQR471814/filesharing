<script lang="ts">
  import { ServerFile, WritableStream, Receiver } from "websocket-ftp";
  import {
    api,
    APILocation,
    join,
    messages,
    MessagesState,
    name,
  } from "./store";
  import { Empty, Peer } from "./api/api_pb";
  import { downloadBlob } from "./common/utils";

  import User from "./User.svelte";
  import Overlay from "./overlays/Overlay.svelte";
  import { OverlayTarget, OverlayType } from "./overlays/common";
  import Uploader from "./Uploader.svelte";

  let overlayed: OverlayTarget | null = null;
  let peers: { [key: string]: Peer } = {};
  let uploadTarget: string | null;
  let disconnected = false;

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
            onRequest: (request) => {
              console.log("got requests", request);
              return new Promise((r) => r(true));
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
    (data) => {
      peers = {};
      messages.update((value) => {
        const newState: MessagesState = {};
        for (const p of data.getPeersList()) {
          newState[p.getId()] = value[p.getId()] ?? {
            messages: [],
            unread: 0,
          };
          peers[p.getId()] = p;
        }
        return newState;
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
  </div>
  {#if overlayed !== null}
    <Overlay target={overlayed} onClose={() => (overlayed = null)} />
  {/if}
</main>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
