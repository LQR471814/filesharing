<script lang="ts">
  import { fly } from "svelte/transition";
  import {
    fileIcon,
    friendlyPlatformName,
    getFilesizeLabel,
    platformIcon,
  } from "../common/utils";
  import type { Platform } from "../api/api_pb";
  import { Request, requests } from "../store";

  export let name: string;
  export let platform: Platform;

  export let id: string;
  export let request: Request;

  let expanded = false;

  const choiceStyle = [
    "flex flex-1 justify-center items-center rounded-md",
    "border-2 border-opacity-0 border-slate-600 mx-2 mt-2",
    "transition-all",
    "hover:border-opacity-100",
    "hover:cursor-pointer hover:scale-x-110",
    "active:scale-x-100 active:translate-y-[2px]",
  ].join(" ");

  const choose = (choice: boolean) => {
    requests.update((value) => {
      const newValue = { ...value };
      delete newValue[id];
      return newValue;
    });
    request.resolver(choice);
  };
</script>

<div
  class="p-2 w-full"
  on:mouseenter={() => (expanded = true)}
  on:mouseleave={() => (expanded = false)}
>
  <div class="flex justify-between">
    <div class="flex">
      <p class="font-bold">{name}</p>
      <img
        class="mx-2"
        src={platformIcon(platform)}
        alt={friendlyPlatformName(platform)}
      />
    </div>
    <p class="text-slate-700 text-opacity-80 overflow-ellipsis">
      {request.files.length} files
    </p>
  </div>
  <p>{request.peer}</p>
  {#if expanded}
    <div class="pt-2" in:fly={{ y: 30, duration: 150 }}>
      {#each request.files as f}
        <div class="flex justify-between">
          <p class="overflow-ellipsis overflow-hidden whitespace-nowrap">
            <img class="inline mx-2" src={fileIcon(f.Type)} alt={f.Type} />
            {f.Name}
          </p>
          <p class="whitespace-nowrap">{getFilesizeLabel(f.Size)}</p>
        </div>
      {/each}
    </div>
    <div class="flex px-2">
      <div
        class={choiceStyle}
        in:fly={{ y: 30, duration: 300 }}
        on:click={() => choose(true)}
      >
        <img class="as-slate-600" src="icons/check-line.svg" alt="accept" />
      </div>
      <div
        class={choiceStyle}
        in:fly={{ y: 30, duration: 500 }}
        on:click={() => choose(false)}
      >
        <img class="as-slate-600" src="icons/close-line.svg" alt="deny" />
      </div>
    </div>
  {/if}
</div>
