<script lang="ts">
  import { api } from "./store";
  import { Empty, Peer } from "./api/api_pb";
  import { pick as getRandomNoun } from "./common/nouns";
  import { getPlatform } from "./common/utils";
  import User from "./User.svelte";

  const name = getRandomNoun();
  const platform = getPlatform();

  const peer = new Peer();

  peer.setName(name);
  peer.setPlatform(platform);

  let peers: Peer[] = [];

  const peerStream = api.join(peer);
  peerStream.on("data", (peerData) => {
    console.log(peerData.getPeersList());
    peers = peerData.getPeersList();
  });

  const messageStream = api.listenMessages(new Empty())
  messageStream.on("data", (message) => {
    console.log(message.getPeer(), message.getMessage())
  })

  window.onbeforeunload = () => {
    api.quit(new Empty(), null);
  };
</script>

<main>
  <div class="flex justify-center items-center h-screen">
    {#each peers as p}
      <User
        name={p.getName()}
        platform={p.getPlatform()}
        id={p.getId()}
      />
    {/each}
  </div>
  <p class="flex justify-center w-screen fixed bottom-10">
    you are {name}
  </p>
</main>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
