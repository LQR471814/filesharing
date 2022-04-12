import { writable } from "svelte/store";
import { APIClient } from "./api/ApiServiceClientPb";
import { Peer } from "./api/api_pb";
import { getRandomNoun } from "./common/nouns";
import { getPlatform } from "./common/utils";
import type { DisplayMessage } from "./overlays/common"

// const APILocation = `${window.location.origin}/api`
export const APILocation = `http://192.168.1.173:3000`;
export const api = new APIClient(APILocation)

export const name = getRandomNoun();
export const platform = getPlatform();

export function join() {
    const peer = new Peer();
    peer.setName(name);
    peer.setPlatform(platform);
    return api.join(peer)
}

export const messages = writable<{ [key: string]: DisplayMessage[] }>({})
