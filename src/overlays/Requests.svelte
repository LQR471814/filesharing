<script lang="ts">
  import {
    requests as requestStore,
    peers as peerStore,
    PeerState,
    RequestState,
  } from "../store";
  import RequestEntry from "./RequestEntry.svelte";

  let peers: PeerState = {};
  peerStore.subscribe((value) => (peers = value));

  let requests: RequestState = {};
  requestStore.subscribe((value) => (requests = value));
</script>

<div class="flex w-full h-full p-8">
  {#if Object.entries(requests).length === 0}
    <h1
      class="m-auto w-full px-8 text-center font-bold text-4xl text-slate-600"
    >
      No pending file requests
    </h1>
  {:else}
    <div
      class="m-auto w-full sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 pb-20"
    >
      {#each Object.entries(requests) as [id, r]}
        <RequestEntry
          {id}
          platform={peers[r.peer].getPlatform()}
          name={peers[r.peer].getName()}
          request={r}
        />
      {/each}
    </div>
  {/if}
</div>
