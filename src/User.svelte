<script lang="ts">
  import { fly } from "svelte/transition";
  import type { Platform } from "./api/api";
  import { messages } from "./common";
  import Badge from "./Badge.svelte";
  import type { OverlayTarget } from "./overlays/common";
  import { twMerge } from "tailwind-merge";
  import FileTransferLine from "svelte-remixicon/lib/icons/FileTransferLine.svelte"
  import Message2Line from "svelte-remixicon/lib/icons/Message2Line.svelte"

  import { platformMeta } from "./common/utils";
  import { Motion, AnimateSharedLayout } from "svelte-motion";

  export let platform: Platform;
  export let name: string;
  export let id: string;
  export let onUpload: (id: string) => void;
  export let setOverlay: (type: OverlayTarget) => void;

  let expanded = false;

  let unread = 0;
  messages.subscribe((value) => (unread = value[id]?.unread ?? 0));

  const operationStyle = twMerge(
    "p-1 rounded-xl border-2 border-transparent",
    "hover:border-zinc-900 hover:cursor-pointer",
    "transition-all"
  );
</script>

<AnimateSharedLayout>
  <Motion let:motion={containerMotion} layout>
    <Motion let:motion={iconMotion} layout>
      <Motion let:motion={nameMotion} layout>
        <button
          class={twMerge(
            "px-5 py-2 rounded-xl bg-white",
            expanded ? "shadow-xl" : "shadow-md"
          )}
          on:click={() => (expanded = !expanded)}
          use:containerMotion
        >
          <div class="relative">
            <div
              class={twMerge(
                "flex items-center",
                expanded ? undefined : "flex-col"
              )}
            >
              <div use:iconMotion>
                <svelte:component this={platformMeta[platform].icon} />
              </div>
              <div class={expanded ? "pl-4" : "py-1"}>
                <p class="text-left" use:nameMotion>{name}</p>
                {#if expanded}
                  <p in:fly={{ x: -20, duration: 400 }}>{id}</p>
                {/if}
              </div>
            </div>

            {#if expanded}
              <div class="flex gap-2 justify-center py-1">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label
                  class={operationStyle}
                  for="file-input"
                  on:click={(e) => {
                    e.stopPropagation();
                    onUpload(id);
                  }}
                  in:fly={{ y: 5, duration: 400 }}
                >
                  <FileTransferLine />
                </label>
                <button
                  class={operationStyle}
                  on:click={(e) => {
                    e.stopPropagation();
                    setOverlay({
                      peer: id,
                      type: "MESSAGES",
                    });
                  }}
                  in:fly={{ y: 5, duration: 400, delay: 50 }}
                >
                  <Message2Line />
                </button>
              </div>
            {/if}
            <Badge number={unread} />
          </div>
        </button>
      </Motion>
    </Motion>
  </Motion>
</AnimateSharedLayout>
