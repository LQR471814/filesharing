<script lang="ts">
  import { fly } from "svelte/transition";
  import { Platform } from "./api/api_pb";

  import { friendlyPlatformName, platformIcon } from "./common/utils";

  export let platform: Platform = Platform.OTHER;
  export let name: string = "name";
  export let id: string = "id";

  let expanded = false;
</script>

<div
  class={[
    `flex ${expanded ? "" : "flex-col"} items-center p-5`,
    "hover:cursor-default",
  ].join(" ")}
  on:mouseenter={() => (expanded = true)}
  on:mouseleave={() => (expanded = false)}
>
  <img src={platformIcon(platform)} alt={friendlyPlatformName(platform)} />
  <div class={`${expanded ? "pl-4" : ""}`}>
    <p>{name}</p>
    {#if expanded}
      <p in:fly={{ y: 5, duration: 150 }}>{id}</p>
    {/if}
  </div>
</div>
