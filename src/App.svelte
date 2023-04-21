<script lang="ts">
  import {
    peers,
    name,
    overlaid,
    disconnected,
    unreadRequests,
  } from "./common";
  import { twMerge } from "tailwind-merge";
  import { FileTransferLine, PlugLine } from "svelte-remixicon";

  import User from "./User.svelte";
  import Overlay from "./overlays/Overlay.svelte";
  import Uploader from "./Uploader.svelte";
  import Badge from "./Badge.svelte";

  let uploadTarget: string | null;
</script>

<Uploader id={uploadTarget} />

<main>
  <div class="flex justify-center items-center h-screen px-[10%]">
    {#if Object.values($peers).length === 0}
      <p class="text-center">
        there are no peers active on your local network.
      </p>
    {/if}
    {#each Object.values($peers) as p}
      <User
        name={p.name}
        platform={p.platform}
        id={p.id}
        setOverlay={(target) => ($overlaid = target)}
        onUpload={(id) => (uploadTarget = id)}
      />
    {/each}
  </div>
  <div class="w-screen fixed bottom-10">
    <p class="flex justify-center items-center">
      you are&nbsp;<b>{name}</b>
    </p>
  </div>
  {#if $disconnected}
    <div
      class={twMerge(
        "flex gap-1 fixed w-screen bottom-3 justify-center",
        "sm:pl-10 sm:bottom-10 sm:justify-start"
      )}
    >
      <PlugLine />
      <p>disconnected</p>
    </div>
  {/if}
  <div class="fixed right-10 bottom-10">
    <button
      on:click={() => {
        $unreadRequests = 0;
        $overlaid = {
          peer: "",
          type: "REQUESTS",
        };
      }}
    >
      <FileTransferLine
        class={twMerge(
          "transition-all p-1 border-2 border-transparent rounded-xl w-10 h-10",
          "hover:cursor-pointer hover:scale-110 hover:border-zinc-900"
        )}
      />
    </button>
    <Badge number={$unreadRequests} />
  </div>
  {#if $overlaid}
    <Overlay target={$overlaid} onClose={() => ($overlaid = undefined)} />
  {/if}
</main>
