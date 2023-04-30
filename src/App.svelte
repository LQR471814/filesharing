<script lang="ts">
  import {
    peers,
    name,
    overlaid,
    disconnected,
    unreadRequests,
  } from "./common";
  import { twMerge } from "tailwind-merge";
  import FileTransferLine from "svelte-remixicon/lib/icons/FileTransferLine.svelte";
  import PlugLine from "svelte-remixicon/lib/icons/PlugLine.svelte";

  import Messages from "./overlays/Messages.svelte";
  import Requests from "./overlays/Requests.svelte";
  import User from "./User.svelte";
  import Overlay from "./overlays/Overlay.svelte";
  import Uploader from "./Uploader.svelte";
  import Badge from "./Badge.svelte";

  let uploadTarget: string | null;
</script>

<Uploader id={uploadTarget} />

<main>
  <div class="flex justify-center items-center w-full h-full px-[10%]">
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
  <div class="absolute bottom-0 w-full p-8">
    <div class="flex flex-col relative">
      <p class="m-auto pb-1">
        you are&nbsp;<b>{name}</b>
      </p>
      {#if $disconnected}
        <div class="flex gap-1 sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2 m-auto">
          <PlugLine />
          <p>disconnected</p>
        </div>
      {/if}
      <div class="absolute right-0 top-1/2 -translate-y-1/2">
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
    </div>
  </div>
  {#if $overlaid?.type === "MESSAGES"}
    <Messages id={$overlaid.peer} />
  {:else if $overlaid?.type === "REQUESTS"}
    <Requests />
  {/if}
</main>
