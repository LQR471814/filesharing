// @generated by protobuf-ts 2.8.3 with parameter long_type_string,optimize_code_size
// @generated from protobuf file "api.proto" (package "api", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { API } from "./api";
import type { PeerUpdate } from "./api";
import type { Peer } from "./api";
import type { Connection } from "./api";
import type { ServerStreamingCall } from "@protobuf-ts/runtime-rpc";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { Empty } from "./api";
import type { Message } from "./api";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service api.API
 */
export interface IAPIClient {
    /**
     * @generated from protobuf rpc: SendMessage(api.Message) returns (api.Empty);
     */
    sendMessage(input: Message, options?: RpcOptions): UnaryCall<Message, Empty>;
    /**
     * @generated from protobuf rpc: ListenMessages(api.Empty) returns (stream api.Message);
     */
    listenMessages(input: Empty, options?: RpcOptions): ServerStreamingCall<Empty, Message>;
    /**
     * @generated from protobuf rpc: ListenConnections(api.Empty) returns (stream api.Connection);
     */
    listenConnections(input: Empty, options?: RpcOptions): ServerStreamingCall<Empty, Connection>;
    /**
     * @generated from protobuf rpc: Join(api.Peer) returns (stream api.PeerUpdate);
     */
    join(input: Peer, options?: RpcOptions): ServerStreamingCall<Peer, PeerUpdate>;
}
/**
 * @generated from protobuf service api.API
 */
export class APIClient implements IAPIClient, ServiceInfo {
    typeName = API.typeName;
    methods = API.methods;
    options = API.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: SendMessage(api.Message) returns (api.Empty);
     */
    sendMessage(input: Message, options?: RpcOptions): UnaryCall<Message, Empty> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<Message, Empty>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ListenMessages(api.Empty) returns (stream api.Message);
     */
    listenMessages(input: Empty, options?: RpcOptions): ServerStreamingCall<Empty, Message> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, Message>("serverStreaming", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ListenConnections(api.Empty) returns (stream api.Connection);
     */
    listenConnections(input: Empty, options?: RpcOptions): ServerStreamingCall<Empty, Connection> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, Connection>("serverStreaming", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: Join(api.Peer) returns (stream api.PeerUpdate);
     */
    join(input: Peer, options?: RpcOptions): ServerStreamingCall<Peer, PeerUpdate> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<Peer, PeerUpdate>("serverStreaming", this._transport, method, opt, input);
    }
}