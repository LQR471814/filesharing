<script lang="ts">
  import { requests, peers } from "../common";
  import Overlay from "./Overlay.svelte";
  import RequestEntry from "./RequestEntry.svelte";
</script>

<Overlay>
  <div class="flex w-full h-full p-8" slot="inner">
    {#if Object.entries($requests).length === 0}
      <h1
        class="m-auto w-full px-8 text-center font-bold text-4xl text-zinc-700"
      >
        No pending file requests
      </h1>
    {:else}
      <div
        class="m-auto w-full sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 pb-20"
      >
        {#each Object.entries($requests) as [id, r]}
          <RequestEntry
            {id}
            platform={$peers[r.peer].platform}
            name={$peers[r.peer].name}
            request={r}
          />
        {/each}
      </div>
    {/if}
  </div>
</Overlay>
