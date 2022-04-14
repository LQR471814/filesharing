<script lang="ts">
  import { Transfer, ClientFile, BrowserFileStream } from "websocket-ftp";
  import { fly, fade } from "svelte/transition";
  import type { Platform } from "./api/api_pb";
  import { friendlyPlatformName, platformIcon } from "./common/utils";
  import { OverlayTarget, OverlayType } from "./overlays/common";
  import { APILocation } from "./store";

  export let platform: Platform;
  export let name: string;
  export let id: string;
  export let setOverlay: (type: OverlayTarget) => void;

  let keepOpen = false;
  let expanded = false;

  const operationStyle = [
    "mx-2 p-1 rounded-xl",
    "border-2 border-transparent",
    "hover:border-neutral-900 hover:cursor-pointer",
    "transition-all duration-100",
  ].join(" ");

  const upload = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    if (!e.currentTarget.files) {
      keepOpen = false;
      expanded = false;
      return;
    }

    const files: ClientFile[] = [];
    for (const f of e.currentTarget.files) {
      files.push({
        Name: f.name,
        Size: f.size,
        Type: f.type,
        data: new BrowserFileStream(f),
      });
    }

    console.log(files)

    keepOpen = false;
    expanded = false;
    e.currentTarget.value = "";

    const t = new Transfer(`ws://${APILocation}/upload?peer=${id}`, files, {
      onsuccess: () => console.log("file transfer success!"),
    });
  };
</script>

<div
  class={`mx-2 px-5 py-2 rounded-xl ${expanded ? "shadow-xl" : ""}`}
  on:mouseenter={() => (expanded = true)}
  on:mouseleave={() => {
    if (!keepOpen) {
      expanded = false;
    }
  }}
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
      <label for="file-input">
        <img
          class={operationStyle}
          src="icons/file-transfer-line.svg"
          alt="Transfer File"
        />
      </label>
      <input
        class="hidden"
        id="file-input"
        type="file"
        on:click={() => (keepOpen = true)}
        on:change={upload}
      />
      <img
        class={operationStyle}
        src="icons/message-2-line.svg"
        alt="View Messages"
        on:click={() => {
          setOverlay({
            peer: id,
            type: OverlayType.MESSAGES,
          });
        }}
      />
    </div>
  {/if}
</div>
