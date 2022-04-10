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

  methodDescriptorSendRequest = new grpcWeb.MethodDescriptor(
    '/api.API/SendRequest',
    grpcWeb.MethodType.UNARY,
    api_pb.Request,
    api_pb.Empty,
    (request: api_pb.Request) => {
      return request.serializeBinary();
    },
    api_pb.Empty.deserializeBinary
  );

  sendRequest(
    request: api_pb.Request,
    metadata: grpcWeb.Metadata | null): Promise<api_pb.Empty>;

  sendRequest(
    request: api_pb.Request,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.Empty) => void): grpcWeb.ClientReadableStream<api_pb.Empty>;

  sendRequest(
    request: api_pb.Request,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: api_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.API/SendRequest',
        request,
        metadata || {},
        this.methodDescriptorSendRequest,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.API/SendRequest',
    request,
    metadata || {},
    this.methodDescriptorSendRequest);
  }

  methodDescriptorAcceptRequest = new grpcWeb.MethodDescriptor(
    '/api.API/AcceptRequest',
    grpcWeb.MethodType.UNARY,
    api_pb.Request,
    api_pb.Empty,
    (request: api_pb.Request) => {
      return request.serializeBinary();
    },
    api_pb.Empty.deserializeBinary
  );

  acceptRequest(
    request: api_pb.Request,
    metadata: grpcWeb.Metadata | null): Promise<api_pb.Empty>;

  acceptRequest(
    request: api_pb.Request,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.Empty) => void): grpcWeb.ClientReadableStream<api_pb.Empty>;

  acceptRequest(
    request: api_pb.Request,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: api_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.API/AcceptRequest',
        request,
        metadata || {},
        this.methodDescriptorAcceptRequest,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.API/AcceptRequest',
    request,
    metadata || {},
    this.methodDescriptorAcceptRequest);
  }

  methodDescriptorListenAccepted = new grpcWeb.MethodDescriptor(
    '/api.API/ListenAccepted',
    grpcWeb.MethodType.SERVER_STREAMING,
    api_pb.Empty,
    api_pb.Request,
    (request: api_pb.Empty) => {
      return request.serializeBinary();
    },
    api_pb.Request.deserializeBinary
  );

  listenAccepted(
    request: api_pb.Empty,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<api_pb.Request> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/api.API/ListenAccepted',
      request,
      metadata || {},
      this.methodDescriptorListenAccepted);
  }

  methodDescriptorListenRequests = new grpcWeb.MethodDescriptor(
    '/api.API/ListenRequests',
    grpcWeb.MethodType.SERVER_STREAMING,
    api_pb.Empty,
    api_pb.RequestUpdate,
    (request: api_pb.Empty) => {
      return request.serializeBinary();
    },
    api_pb.RequestUpdate.deserializeBinary
  );

  listenRequests(
    request: api_pb.Empty,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<api_pb.RequestUpdate> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/api.API/ListenRequests',
      request,
      metadata || {},
      this.methodDescriptorListenRequests);
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

  methodDescriptorQuit = new grpcWeb.MethodDescriptor(
    '/api.API/Quit',
    grpcWeb.MethodType.UNARY,
    api_pb.Empty,
    api_pb.Empty,
    (request: api_pb.Empty) => {
      return request.serializeBinary();
    },
    api_pb.Empty.deserializeBinary
  );

  quit(
    request: api_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<api_pb.Empty>;

  quit(
    request: api_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.Empty) => void): grpcWeb.ClientReadableStream<api_pb.Empty>;

  quit(
    request: api_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: api_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.API/Quit',
        request,
        metadata || {},
        this.methodDescriptorQuit,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.API/Quit',
    request,
    metadata || {},
    this.methodDescriptorQuit);
  }

}

