<script lang="ts">
  import { api, join, messages, name } from "./store";
  import { Empty, Peer } from "./api/api_pb";
  import User from "./User.svelte";
  import Overlay from "./overlays/Overlay.svelte";
  import type { OverlayTarget } from "./overlays/common";

  let overlayed: OverlayTarget | null = null;

  let peers: { [key: string]: Peer } = {};

  const peerStream = join();
  peerStream.on("data", (peerData) => {
    console.log(peerData.getPeersList());
    for (const p of peerData.getPeersList()) {
      peers[p.getId()] = p
    }
  });

  const messageStream = api.listenMessages(new Empty());
  messageStream.on("data", (message) => {
    console.log(message.getPeer(), message.getMessage());
    messages.update((value) => {
      console.log(value, {
        ...value,
        [message.getPeer()]: [
          ...(value[message.getPeer()] ?? []),
          {
            author: peers[message.getPeer()].getName(),
            message: message.getMessage(),
          },
        ],
      });
      return {
        ...value,
        [message.getPeer()]: [
          ...(value[message.getPeer()] ?? []),
          {
            author: peers[message.getPeer()].getName(),
            message: message.getMessage(),
          },
        ],
      };
    });
  });

  window.onbeforeunload = () => {
    api.quit(new Empty(), null);
  };
</script>

<main>
  <div class={overlayed ? "blur-md" : ""}>
    <div class="flex justify-center items-center h-screen">
      {#each Object.values(peers) as p}
        <User
          name={p.getName()}
          platform={p.getPlatform()}
          id={p.getId()}
          setOverlay={(target) => {
            overlayed = target;
          }}
        />
      {/each}
    </div>
    <p class="flex justify-center w-screen fixed bottom-10">
      you are {name}
    </p>
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
