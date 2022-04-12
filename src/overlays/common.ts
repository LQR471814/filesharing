export enum OverlayType {
    MESSAGES,
    FILES
}

export type OverlayTarget = {
    peer: string
    type: OverlayType
}

export type DisplayMessage = {
    author: string
    message: string
}
