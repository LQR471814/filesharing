<script lang="ts">
  import type { OverlayTarget } from "./common";
  import { twMerge } from "tailwind-merge";
  import { onDestroy, onMount } from "svelte";
  import { fly } from "svelte/transition";

  import Messages from "./Messages.svelte";
  import Requests from "./Requests.svelte";
  import { ArrowLeftLine } from "svelte-remixicon";

  export let target: OverlayTarget;
  export let onClose: () => void;

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      onClose();
      document.removeEventListener("keydown", keydownHandler);
    }
  };

  onMount(() => document.addEventListener("keydown", keydownHandler));
  onDestroy(() => document.removeEventListener("keydown", keydownHandler));
</script>

<div
  class={twMerge(
    "flex fixed top-0 left-0 w-screen h-screen backdrop-blur-sm",
    "justify-center overflow-y-auto py-20 pb-40 sm:pb-20"
  )}
  transition:fly={{ y: 40, duration: 500 }}
>
  {#if target?.type === "MESSAGES"}
    <Messages id={target.peer} />
  {:else if target?.type === "REQUESTS"}
    <Requests />
  {/if}
  <button
    class="fixed top-8 left-8 hover:scale-110 transition-all ease-in"
    on:click={onClose}
    transition:fly={{ y: 20, duration: 500, delay: 200 }}
  >
    <ArrowLeftLine class="w-16 h-16 fill-zinc-800" />
  </button>
</div>
