/**
 * @fileoverview gRPC-Web generated client stub for api
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as api_pb from './api_pb';


export class APIClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorSendMessage = new grpcWeb.MethodDescriptor(
    '/api.API/SendMessage',
    grpcWeb.MethodType.UNARY,
    api_pb.Message,
    api_pb.Empty,
    (request: api_pb.Message) => {
      return request.serializeBinary();
    },
    api_pb.Empty.deserializeBinary
  );

  sendMessage(
    request: api_pb.Message,
    metadata: grpcWeb.Metadata | null): Promise<api_pb.Empty>;

  sendMessage(
    request: api_pb.Message,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.Empty) => void): grpcWeb.ClientReadableStream<api_pb.Empty>;

  sendMessage(
    request: api_pb.Message,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: api_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.API/SendMessage',
        request,
        metadata || {},
        this.methodDescriptorSendMessage,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.API/SendMessage',
    request,
    metadata || {},
    this.methodDescriptorSendMessage);
  }

  methodDescriptorListenMessages = new grpcWeb.MethodDescriptor(
    '/api.API/ListenMessages',
    grpcWeb.MethodType.SERVER_STREAMING,
    api_pb.Empty,
    api_pb.Message,
    (request: api_pb.Empty) => {
      return request.serializeBinary();
    },
    api_pb.Message.deserializeBinary
  );

  listenMessages(
    request: api_pb.Empty,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<api_pb.Message> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/api.API/ListenMessages',
      request,
      metadata || {},
      this.methodDescriptorListenMessages);
  }

  methodDescriptorListenConnections = new grpcWeb.MethodDescriptor(
    '/api.API/ListenConnections',
    grpcWeb.MethodType.SERVER_STREAMING,
    api_pb.Empty,
    api_pb.Connection,
    (request: api_pb.Empty) => {
      return request.serializeBinary();
    },
    api_pb.Connection.deserializeBinary
  );

  listenConnections(
    request: api_pb.Empty,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<api_pb.Connection> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/api.API/ListenConnections',
      request,
      metadata || {},
      this.methodDescriptorListenConnections);
  }

  methodDescriptorJoin = new grpcWeb.MethodDescriptor(
    '/api.API/Join',
    grpcWeb.MethodType.SERVER_STREAMING,
    api_pb.Peer,
    api_pb.PeerUpdate,
    (request: api_pb.Peer) => {
      return request.serializeBinary();
    },
    api_pb.PeerUpdate.deserializeBinary
  );

  join(
    request: api_pb.Peer,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<api_pb.PeerUpdate> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/api.API/Join',
      request,
      metadata || {},
      this.methodDescriptorJoin);
  }

}

