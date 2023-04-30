<script lang="ts">
  import { fly } from "svelte/transition";
  import { fileIcon, getFilesizeLabel, platformMeta } from "../common/utils";
  import type { Platform } from "../api/api";
  import { type Request, requests } from "../common";
  import { twMerge } from "tailwind-merge";

  import CheckLine from "svelte-remixicon/lib/icons/CheckLine.svelte"
  import CloseLine from "svelte-remixicon/lib/icons/CloseLine.svelte"

  export let name: string;
  export let platform: Platform;

  export let id: string;
  export let request: Request;

  let expanded = false;

  const choiceStyle = twMerge(
    "flex flex-1 justify-center items-center rounded-md",
    "border-2 border-opacity-0 border-zinc-600 mx-2 mt-2",
    "transition-all",
    "hover:border-opacity-100",
    "hover:cursor-pointer hover:scale-x-110",
    "active:scale-x-100 active:tranzinc-y-[2px]"
  );

  const choose = (choice: boolean) => {
    requests.update((value) => {
      const newValue = { ...value };
      delete newValue[id];
      return newValue;
    });
    request.resolver(choice);
  };
</script>

<button class="p-2 w-full" on:click={() => (expanded = !expanded)}>
  <div class="flex justify-between">
    <div class="flex">
      <p class="font-bold">{name}</p>
      <svelte:component this={platformMeta[platform].icon} class="mx-2" />
    </div>
    <p class="text-zinc-700 text-opacity-80 overflow-ellipsis">
      {request.files.length} files
    </p>
  </div>
  <p class="text-left">{request.peer}</p>
  {#if expanded}
    <div class="pt-2" in:fly={{ y: 30, duration: 150 }}>
      {#each request.files as f}
        <div class="flex justify-between gap-3">
          <svelte:component this={fileIcon(f.Type)} />
          <p class="overflow-ellipsis overflow-hidden whitespace-nowrap flex-1">
            {f.Name}
          </p>
          <p class="whitespace-nowrap">{getFilesizeLabel(f.Size)}</p>
        </div>
      {/each}
    </div>
  {/if}
  <div class="flex px-2">
    <button
      class={choiceStyle}
      in:fly={{ y: 30, duration: 300 }}
      on:click={() => choose(true)}
    >
      <CheckLine />
    </button>
    <button
      class={choiceStyle}
      in:fly={{ y: 30, duration: 500 }}
      on:click={() => choose(false)}
    >
      <CloseLine />
    </button>
  </div>
</button>
