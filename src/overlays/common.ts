export type OverlayType = "MESSAGES" | "REQUESTS"

export type OverlayTarget = {
  peer: string;
  type: OverlayType;
};

export type DisplayMessage = {
  author: string;
  message: string;
};
