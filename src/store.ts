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
    onUpdate: (data: PeerUpdate) => void,
    onDisconnected: () => void,
) {
    const peer = new Peer();
    peer.setName(name);
    peer.setPlatform(platform);

    let joined = false
    const peerStream = api.join(peer)
    peerStream.on('data', (data) => {
        if (!joined) {
            joined = true
            onJoined()
        }
        onUpdate(data)
    })
    peerStream.on('error', () => {
        onDisconnected()
    })
}

export type MessagesState = {
    [key: string]: Thread
}

export type Thread = {
    messages: DisplayMessage[]
    unread: number
}

export const messages = writable<MessagesState>({})
