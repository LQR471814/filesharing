<script lang="ts">
  import { APIClient } from "./api/ApiServiceClientPb"
  import { Empty, Peer } from "./api/api_pb"
  import { pick as getRandomNoun } from "./common/nouns"
  import { getPlatform } from "./common/utils"
  import User from "./User.svelte"

  const APILocation = `http://192.168.1.178:3000`
  const name = getRandomNoun()
  const platform = getPlatform()

  // const APILocation = `${window.location.origin}/api`
  const api = new APIClient(APILocation)
  const peer = new Peer()

  peer.setName(name)
  peer.setPlatform(platform)

  let peers: Peer[] = []

  const peerStream = api.join(peer)
  peerStream.on("data", (peerData) => {
    console.log(peerData.getPeersList())
    peers = peerData.getPeersList()
  })

  window.onbeforeunload = () => {
    api.quit(new Empty(), null)
  }
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
    You are {name}
  </p>
</main>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
