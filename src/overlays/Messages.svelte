<script lang="ts">
  import { onMount } from "svelte";
  import { twMerge } from "tailwind-merge";

  import { fly } from "svelte/transition";
  import { api, platform, messages as messageStore } from "../common";
  import { derived } from "svelte/store";
  import { Platform } from "../api/api";

  import SendPlane2Line from "svelte-remixicon/lib/icons/SendPlane2Line.svelte";
  import Overlay from "./Overlay.svelte";

  export let id: string;

  const messages = derived(messageStore, ($messageStore) => {
    return $messageStore[id].messages;
  });

  let messageInput: string = "";

  const send = () => {
    if (messageInput.trim().length === 0) {
      return;
    }

    api.sendMessage({
      peer: id,
      message: messageInput,
    });

    messageStore.update(($messageStore) => {
      $messageStore[id].unread = 0;
      $messageStore[id].messages.push({
        author: "you",
        message: messageInput,
      });
      return $messageStore;
    });

    messageInput = "";
  };

  onMount(() => {
    messageStore.update((value) => {
      return {
        ...value,
        [id]: {
          unread: 0,
          messages: value[id].messages,
        },
      };
    });
  });
</script>

<Overlay>
  <svelte:fragment slot="inner">
    {#if $messages.length === 0}
      <h1 class="m-auto px-8 text-center font-bold text-4xl text-zinc-600">
        No messages in history
      </h1>
    {:else}
      <div class="w-4/5 sm:w-1/2 h-fit m-auto">
        {#each $messages as msg}
          <div class="px-5 py-3">
            <p class="font-bold">{msg.author}</p>
            <p>{msg.message}</p>
          </div>
        {/each}
      </div>
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="outer">
    <div
      class={twMerge(
        "m-auto absolute bottom-0 h-40 w-[calc(80%+30px)] sm:w-[calc(50%+30px)]",
        "gradient blur-md left-1/2 -translate-x-1/2"
      )}
      in:fly={{ y: 50, delay: 300 }}
      out:fly={{ y: 50 }}
    />
    <div
      class="absolute bottom-6 w-4/5 sm:w-1/2 left-1/2 -translate-x-1/2"
      in:fly={{ y: 50, delay: 200 }}
      out:fly={{ y: 50 }}
    >
      <input
        class={twMerge(
          "w-full bg-zinc-400 bg-opacity-70 p-3 pr-12 rounded-xl backdrop-blur-sm",
          "font-bold text-zinc-200 placeholder:text-zinc-200 border-2 border-zinc-400",
          platform === Platform.DESKTOP
            ? "outline-none focus:outline-2 focus:outline-zinc-600 transition-all"
            : undefined
        )}
        type="text"
        placeholder="Message"
        bind:value={messageInput}
        on:keydown={(e) => {
          if (e.code === "Enter") {
            send();
          }
        }}
      />
      {#if messageInput.length > 0}
        <button
          class="p-3 absolute top-0 right-0 h-full"
          in:fly={{ x: -10, duration: 200 }}
          out:fly={{ x: 10, duration: 200 }}
          on:click={() => send()}
        >
          <SendPlane2Line
            class={twMerge(
              "h-full transition-all opacity-60",
              "hover:scale-110 hover:cursor-pointer"
            )}
          />
        </button>
      {/if}
    </div>
  </svelte:fragment>
</Overlay>

<style lang="postcss">
  .gradient {
    background: linear-gradient(
      0deg,
      theme(colors.zinc.500) 0%,
      transparent 60%
    );
  }
</style>
