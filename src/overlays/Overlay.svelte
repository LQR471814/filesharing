<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { OverlayTarget, OverlayType } from "./common";

  import Messages from "./Messages.svelte";
  import Requests from "./Requests.svelte";

  export let target: OverlayTarget;
  export let onClose: () => void;

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      onClose()
      document.removeEventListener("keydown", keydownHandler)
    }
  }

  onMount(() => document.addEventListener("keydown", keydownHandler))
  onDestroy(() => document.removeEventListener("keydown", keydownHandler))
</script>

<div
  class={[
    "flex fixed top-0 left-0 w-screen h-screen",
    "justify-center overflow-y-auto py-20 pb-40 sm:pb-20",
  ].join(" ")}
  transition:fade={{ duration: 150 }}
>
  {#if target?.type === OverlayType.MESSAGES}
    <Messages id={target.peer} />
  {:else if target?.type === OverlayType.REQUESTS}
    <Requests />
  {/if}
  <img
    class={[
      "fixed top-6 left-6 w-12 h-12",
      "hover:cursor-pointer hover:scale-125 transition-all",
    ].join(" ")}
    src="icons/arrow-left-line.svg"
    alt="Close"
    in:fly={{ x: -20, duration: 150 }}
    on:click={onClose}
  />
</div>
