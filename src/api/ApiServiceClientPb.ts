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


export class ServerClient {
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

  methodInfoSendRequest = new grpcWeb.AbstractClientBase.MethodInfo(
    api_pb.Response,
    (request: api_pb.Request) => {
      return request.serializeBinary();
    },
    api_pb.Response.deserializeBinary
  );

  sendRequest(
    request: api_pb.Request,
    metadata: grpcWeb.Metadata | null): Promise<api_pb.Response>;

  sendRequest(
    request: api_pb.Request,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: api_pb.Response) => void): grpcWeb.ClientReadableStream<api_pb.Response>;

  sendRequest(
    request: api_pb.Request,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: api_pb.Response) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.Server/SendRequest',
        request,
        metadata || {},
        this.methodInfoSendRequest,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.Server/SendRequest',
    request,
    metadata || {},
    this.methodInfoSendRequest);
  }

  methodInfoAcceptRequest = new grpcWeb.AbstractClientBase.MethodInfo(
    api_pb.Response,
    (request: api_pb.Request) => {
      return request.serializeBinary();
    },
    api_pb.Response.deserializeBinary
  );

  acceptRequest(
    request: api_pb.Request,
    metadata: grpcWeb.Metadata | null): Promise<api_pb.Response>;

  acceptRequest(
    request: api_pb.Request,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: api_pb.Response) => void): grpcWeb.ClientReadableStream<api_pb.Response>;

  acceptRequest(
    request: api_pb.Request,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: api_pb.Response) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.Server/AcceptRequest',
        request,
        metadata || {},
        this.methodInfoAcceptRequest,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.Server/AcceptRequest',
    request,
    metadata || {},
    this.methodInfoAcceptRequest);
  }

  methodInfoListenRequests = new grpcWeb.AbstractClientBase.MethodInfo(
    api_pb.Request,
    (request: api_pb.Empty) => {
      return request.serializeBinary();
    },
    api_pb.Request.deserializeBinary
  );

  listenRequests(
    request: api_pb.Empty,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/api.Server/ListenRequests',
      request,
      metadata || {},
      this.methodInfoListenRequests);
  }

  methodInfoListenPeers = new grpcWeb.AbstractClientBase.MethodInfo(
    api_pb.PeerUpdate,
    (request: api_pb.Empty) => {
      return request.serializeBinary();
    },
    api_pb.PeerUpdate.deserializeBinary
  );

  listenPeers(
    request: api_pb.Empty,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/api.Server/ListenPeers',
      request,
      metadata || {},
      this.methodInfoListenPeers);
  }

  methodInfoQuit = new grpcWeb.AbstractClientBase.MethodInfo(
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
    callback: (err: grpcWeb.Error,
               response: api_pb.Empty) => void): grpcWeb.ClientReadableStream<api_pb.Empty>;

  quit(
    request: api_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: api_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/api.Server/Quit',
        request,
        metadata || {},
        this.methodInfoQuit,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/api.Server/Quit',
    request,
    metadata || {},
    this.methodInfoQuit);
  }

}

