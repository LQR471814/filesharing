<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import { onDestroy, onMount } from "svelte";
  import { fly } from "svelte/transition";

  import ArrowLeftLine from "svelte-remixicon/lib/icons/ArrowLeftLine.svelte";
  import { overlaid } from "../common";

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      $overlaid = undefined;
      document.removeEventListener("keydown", keydownHandler);
    }
  };

  onMount(() => document.addEventListener("keydown", keydownHandler));
  onDestroy(() => document.removeEventListener("keydown", keydownHandler));
</script>

<div
  class={twMerge(
    "flex absolute top-0 left-0 w-full h-full backdrop-blur-sm",
    "justify-center overflow-y-auto py-20 pb-40 sm:pb-20"
  )}
  transition:fly={{ y: 40, duration: 500 }}
>
  <slot name="inner" />
</div>

<button
  class="absolute top-8 left-8 hover:scale-110 transition-all ease-in"
  on:click={() => ($overlaid = undefined)}
  transition:fly={{ y: 20, duration: 500, delay: 200 }}
>
  <ArrowLeftLine class="w-16 h-16 fill-zinc-800" />
</button>

<slot name="outer" />
