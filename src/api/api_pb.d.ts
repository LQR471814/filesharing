import * as jspb from 'google-protobuf'



export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class Peer extends jspb.Message {
  getId(): string;
  setId(value: string): Peer;

  getName(): string;
  setName(value: string): Peer;

  getPlatform(): Platform;
  setPlatform(value: Platform): Peer;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Peer.AsObject;
  static toObject(includeInstance: boolean, msg: Peer): Peer.AsObject;
  static serializeBinaryToWriter(message: Peer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Peer;
  static deserializeBinaryFromReader(message: Peer, reader: jspb.BinaryReader): Peer;
}

export namespace Peer {
  export type AsObject = {
    id: string,
    name: string,
    platform: Platform,
  }
}

export class Message extends jspb.Message {
  getPeer(): string;
  setPeer(value: string): Message;

  getMessage(): string;
  setMessage(value: string): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    peer: string,
    message: string,
  }
}

export class Request extends jspb.Message {
  getId(): string;
  setId(value: string): Request;

  getPeer(): string;
  setPeer(value: string): Request;

  getName(): string;
  setName(value: string): Request;

  getType(): DataType;
  setType(value: DataType): Request;

  getSize(): number;
  setSize(value: number): Request;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Request.AsObject;
  static toObject(includeInstance: boolean, msg: Request): Request.AsObject;
  static serializeBinaryToWriter(message: Request, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Request;
  static deserializeBinaryFromReader(message: Request, reader: jspb.BinaryReader): Request;
}

export namespace Request {
  export type AsObject = {
    id: string,
    peer: string,
    name: string,
    type: DataType,
    size: number,
  }
}

export class PeerUpdate extends jspb.Message {
  getPeersList(): Array<Peer>;
  setPeersList(value: Array<Peer>): PeerUpdate;
  clearPeersList(): PeerUpdate;
  addPeers(value?: Peer, index?: number): Peer;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PeerUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: PeerUpdate): PeerUpdate.AsObject;
  static serializeBinaryToWriter(message: PeerUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PeerUpdate;
  static deserializeBinaryFromReader(message: PeerUpdate, reader: jspb.BinaryReader): PeerUpdate;
}

export namespace PeerUpdate {
  export type AsObject = {
    peersList: Array<Peer.AsObject>,
  }
}

export class RequestUpdate extends jspb.Message {
  getRequestsList(): Array<Request>;
  setRequestsList(value: Array<Request>): RequestUpdate;
  clearRequestsList(): RequestUpdate;
  addRequests(value?: Request, index?: number): Request;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: RequestUpdate): RequestUpdate.AsObject;
  static serializeBinaryToWriter(message: RequestUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestUpdate;
  static deserializeBinaryFromReader(message: RequestUpdate, reader: jspb.BinaryReader): RequestUpdate;
}

export namespace RequestUpdate {
  export type AsObject = {
    requestsList: Array<Request.AsObject>,
  }
}

export enum DataType { 
  UNKNOWN = 0,
  ARCHIVE = 1,
  DOCUMENT = 2,
  PDF = 3,
  AUDIO = 4,
  IMAGE = 5,
  VIDEO = 6,
}
export enum Platform { 
  DESKTOP = 0,
  MOBILE = 1,
  OTHER = 2,
}
