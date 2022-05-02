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

export class Connection extends jspb.Message {
  getId(): string;
  setId(value: string): Connection;

  getPeer(): string;
  setPeer(value: string): Connection;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Connection.AsObject;
  static toObject(includeInstance: boolean, msg: Connection): Connection.AsObject;
  static serializeBinaryToWriter(message: Connection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Connection;
  static deserializeBinaryFromReader(message: Connection, reader: jspb.BinaryReader): Connection;
}

export namespace Connection {
  export type AsObject = {
    id: string,
    peer: string,
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

export enum Platform { 
  DESKTOP = 0,
  MOBILE = 1,
  OTHER = 2,
}
