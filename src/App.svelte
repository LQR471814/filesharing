<script lang="ts">
  import { APIClient } from "./api/ApiServiceClientPb";
  import { Empty, Peer } from "./api/api_pb";
  import { getPlatform } from "./common/utils";

  // const APILocation = `${window.location.origin}/api`
  const APILocation = `http://localhost:3000/api`;
  const api = new APIClient(APILocation);
  const peer = new Peer();

  peer.setName("fisherman");
  peer.setPlatform(getPlatform());

  const peerStream = api.join(peer);
  peerStream.on("data", (peers) => {
    console.log(peers)
  })

  window.onbeforeunload = () => {
    api.quit(new Empty(), null)
  }
</script>

<main />

<style>
</style>
