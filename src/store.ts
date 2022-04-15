import { writable } from "svelte/store";
import type { ServerFile } from "websocket-ftp";
import { APIClient } from "./api/ApiServiceClientPb";
import { Peer } from "./api/api_pb";
import { getRandomNoun } from "./common/nouns";
import { getPlatform } from "./common/utils";
import type { DisplayMessage } from "./overlays/common"

export const APILocation = `${window.location.host}`
export const api = new APIClient(`http://${APILocation}`)

export const name = getRandomNoun();
export const platform = getPlatform();

export function join(
    onJoined: () => void,
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
        peers.update(() => {
            const newPeers: PeerState = {}
            messages.update((messages) => {
                const newMessages: MessagesState = {}
                requests.update((requests) => {
                    const newRequests: RequestState = {}
                    for (const p of data.getPeersList()) {
                        newPeers[p.getId()] = p;
                        newMessages[p.getId()] = messages[p.getId()] ?? {
                            messages: [],
                            unread: 0,
                        };
                        for (const [id, request] of Object.entries(requests)) {
                            if (request.peer === p.getId()) {
                                newRequests[id] = request
                            }
                        }
                    }
                    return newRequests
                })
                return newMessages;
            });
            return newPeers
        })
    })
    peerStream.on('error', () => {
        onDisconnected()
    })
}

export type Thread = {
    messages: DisplayMessage[]
    unread: number
}
export type MessagesState = {
    [key: string]: Thread
}
export const messages = writable<MessagesState>({})

export type PeerState = { [key: string]: Peer }
export const peers = writable<PeerState>({})

export type Request = {
    peer: string
    files: ServerFile[]
    resolver: (choice: boolean) => void
}
export type RequestState = { [key: string]: Request }
export const requests = writable<RequestState>({})
export const unreadRequests = writable<number>(0)
