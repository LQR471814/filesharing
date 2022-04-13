<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { Message, Platform } from "../api/api_pb";
  import { api, platform, messages as messageStore } from "../store";
  import type { DisplayMessage } from "./common";

  export let id: string;

  let messages: DisplayMessage[] = [];
  messageStore.subscribe((value) => (messages = value[id] ?? []));

  let messageInput: string = "";
  const send = () => {
    if (messageInput.length === 0) {
      return;
    }

    const message = new Message();
    message.setPeer(id);
    message.setMessage(messageInput);
    api.sendMessage(message, null);

    messageStore.update((value) => {
      return {
        ...value,
        [id]: [
          ...(value[id] ?? []),
          {
            author: "You",
            message: messageInput,
          },
        ],
      };
    });

    messageInput = "";
  };
</script>

{#if messages.length === 0}
  <h1 class="m-auto px-8 text-center font-bold text-4xl text-slate-800">
    No messages in history
  </h1>
{:else}
  <div class="w-4/5 sm:w-1/2 h-fit m-auto">
    {#each messages as msg}
      <div class="px-5 py-3">
        <p class="font-bold">{msg.author}</p>
        <p>{msg.message}</p>
      </div>
    {/each}
  </div>
{/if}
<div
  class={[
    "fixed bottom-[-50px] h-40 w-[calc(80%+30px)] sm:w-[calc(50%+30px)]",
    "gradient m-auto blur-md",
  ].join(" ")}
/>
<div class="fixed bottom-6 w-4/5 sm:w-1/2">
  <input
    class={[
      "w-full bg-slate-400 bg-opacity-70 p-3 rounded-xl backdrop-blur-sm",
      "font-bold text-slate-200 placeholder:text-slate-200",
      ...(platform === Platform.DESKTOP
        ? [
            "outline-none focus:outline-2 focus:outline-slate-600",
            "transition-all",
          ]
        : []),
    ].join(" ")}
    type="text"
    placeholder="Message"
    bind:value={messageInput}
    on:keydown={(e) => {
      if (e.code === "Enter") {
        send();
      }
    }}
    in:fly={{ y: 100, duration: 300 }}
  />
  {#if messageInput.length > 0}
    <div class="absolute top-0 right-0 h-full">
      <img
        class={[
          "p-3 h-full transition-all opacity-60",
          "hover:scale-110 hover:cursor-pointer",
        ].join(" ")}
        src="icons/send-plane-2-line.svg"
        alt="Send"
        in:fly={{ x: -10, duration: 200 }}
        out:fly={{ x: 10, duration: 200 }}
        on:click={() => send()}
      />
    </div>
  {/if}
</div>

<style>
  .gradient {
    background: linear-gradient(
      0deg,
      rgba(100, 116, 139, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
</style>
