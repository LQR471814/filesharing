import { writable } from "svelte/store";
import { APIClient } from "./api/ApiServiceClientPb";
import { Peer, PeerUpdate } from "./api/api_pb";
import { getRandomNoun } from "./common/nouns";
import { getPlatform } from "./common/utils";
import type { DisplayMessage } from "./overlays/common"

// const APILocation = `${window.location.host}/api`
export const APILocation = `192.168.1.178:3000`;
export const api = new APIClient(`http://${APILocation}`)

export const name = getRandomNoun();
export const platform = getPlatform();

export function join(
    onJoined: () => void,
    onUpdate: (data: PeerUpdate) => void
) {
    const peer = new Peer();
    peer.setName(name);
    peer.setPlatform(platform);

    let joined = false
    api.join(peer).on('data', (data) => {
        if (!joined) {
            joined = true
            onJoined()
        }
        onUpdate(data)
    })
}

export const messages = writable<{ [key: string]: DisplayMessage[] }>({})
