<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import type { Platform } from "./api/api_pb";
  import { friendlyPlatformName, platformIcon } from "./common/utils";
  import { OverlayTarget, OverlayType } from "./overlays/common";

  export let platform: Platform;
  export let name: string;
  export let id: string;
  export let setOverlay: (type: OverlayTarget) => void;

  let expanded = false;

  const operationStyle = [
    "mx-2 p-1 rounded-xl",
    "border-2 border-transparent",
    "hover:border-neutral-900 hover:cursor-pointer",
    "transition-all duration-100",
  ].join(" ");
</script>

<div
  class={`mx-2 px-5 py-2 rounded-xl ${expanded ? "shadow-xl" : ""}`}
  on:mouseenter={() => (expanded = true)}
  on:mouseleave={() => (expanded = false)}
>
  <div
    class={[
      `flex ${expanded ? "" : "flex-col"} items-center`,
      "hover:cursor-default",
    ].join(" ")}
  >
    <img src={platformIcon(platform)} alt={friendlyPlatformName(platform)} />
    <div class={`${expanded ? "pl-4" : "py-1"}`}>
      <p>{name}</p>
      {#if expanded}
        <p in:fade={{ duration: 100 }}>{id}</p>
      {/if}
    </div>
  </div>

  {#if expanded}
    <div class="flex justify-center py-1" in:fly={{ y: 10, duration: 150 }}>
      <img
        class={operationStyle}
        src="icons/file-transfer-line.svg"
        alt="Transfer File"
      />
      <img
        class={operationStyle}
        src="icons/message-2-line.svg"
        alt="View Messages"
        on:click={() =>
          setOverlay({
            peer: id,
            type: OverlayType.MESSAGES,
          })}
      />
    </div>
  {/if}
</div>
