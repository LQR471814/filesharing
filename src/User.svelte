<script lang="ts">
  import { api } from "./store"
  import { fly, fade } from "svelte/transition"
  import { Message, Platform } from "./api/api_pb"

  import { friendlyPlatformName, platformIcon } from "./common/utils"

  export let platform: Platform = Platform.OTHER
  export let name: string = "name"
  export let id: string = "id"

  let expanded = false

  const operationStyle = [
    "mx-2 p-1 rounded-xl",
    "border-2 border-transparent",
    "hover:border-neutral-900 hover:cursor-pointer",
    "transition-all duration-100"
  ].join(' ')
</script>

<div
  class={`mx-2 px-5 py-2 rounded-xl ${expanded ? 'shadow-xl' : ''}`}
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
        src="icons/chat-1-line.svg"
        alt="Message"
        on:click={() => {
          const input = window.prompt("Message")
          if (!input) {
            return
          }
          const message = new Message()
          message.setPeer(id)
          message.setMessage(input)
          api.sendMessage(message, null)
        }}
      />
      <img class={operationStyle} src="icons/file-transfer-line.svg" alt="Message" />
    </div>
  {/if}
</div>
