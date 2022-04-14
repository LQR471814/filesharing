// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package api

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// APIClient is the client API for API service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type APIClient interface {
	SendMessage(ctx context.Context, in *Message, opts ...grpc.CallOption) (*Empty, error)
	ListenMessages(ctx context.Context, in *Empty, opts ...grpc.CallOption) (API_ListenMessagesClient, error)
	ListenConnections(ctx context.Context, in *Empty, opts ...grpc.CallOption) (API_ListenConnectionsClient, error)
	Join(ctx context.Context, in *Peer, opts ...grpc.CallOption) (API_JoinClient, error)
}

type aPIClient struct {
	cc grpc.ClientConnInterface
}

func NewAPIClient(cc grpc.ClientConnInterface) APIClient {
	return &aPIClient{cc}
}

func (c *aPIClient) SendMessage(ctx context.Context, in *Message, opts ...grpc.CallOption) (*Empty, error) {
	out := new(Empty)
	err := c.cc.Invoke(ctx, "/api.API/SendMessage", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *aPIClient) ListenMessages(ctx context.Context, in *Empty, opts ...grpc.CallOption) (API_ListenMessagesClient, error) {
	stream, err := c.cc.NewStream(ctx, &API_ServiceDesc.Streams[0], "/api.API/ListenMessages", opts...)
	if err != nil {
		return nil, err
	}
	x := &aPIListenMessagesClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type API_ListenMessagesClient interface {
	Recv() (*Message, error)
	grpc.ClientStream
}

type aPIListenMessagesClient struct {
	grpc.ClientStream
}

func (x *aPIListenMessagesClient) Recv() (*Message, error) {
	m := new(Message)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

func (c *aPIClient) ListenConnections(ctx context.Context, in *Empty, opts ...grpc.CallOption) (API_ListenConnectionsClient, error) {
	stream, err := c.cc.NewStream(ctx, &API_ServiceDesc.Streams[1], "/api.API/ListenConnections", opts...)
	if err != nil {
		return nil, err
	}
	x := &aPIListenConnectionsClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type API_ListenConnectionsClient interface {
	Recv() (*Connection, error)
	grpc.ClientStream
}

type aPIListenConnectionsClient struct {
	grpc.ClientStream
}

func (x *aPIListenConnectionsClient) Recv() (*Connection, error) {
	m := new(Connection)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

func (c *aPIClient) Join(ctx context.Context, in *Peer, opts ...grpc.CallOption) (API_JoinClient, error) {
	stream, err := c.cc.NewStream(ctx, &API_ServiceDesc.Streams[2], "/api.API/Join", opts...)
	if err != nil {
		return nil, err
	}
	x := &aPIJoinClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type API_JoinClient interface {
	Recv() (*PeerUpdate, error)
	grpc.ClientStream
}

type aPIJoinClient struct {
	grpc.ClientStream
}

func (x *aPIJoinClient) Recv() (*PeerUpdate, error) {
	m := new(PeerUpdate)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// APIServer is the server API for API service.
// All implementations must embed UnimplementedAPIServer
// for forward compatibility
type APIServer interface {
	SendMessage(context.Context, *Message) (*Empty, error)
	ListenMessages(*Empty, API_ListenMessagesServer) error
	ListenConnections(*Empty, API_ListenConnectionsServer) error
	Join(*Peer, API_JoinServer) error
	mustEmbedUnimplementedAPIServer()
}

// UnimplementedAPIServer must be embedded to have forward compatible implementations.
type UnimplementedAPIServer struct {
}

func (UnimplementedAPIServer) SendMessage(context.Context, *Message) (*Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SendMessage not implemented")
}
func (UnimplementedAPIServer) ListenMessages(*Empty, API_ListenMessagesServer) error {
	return status.Errorf(codes.Unimplemented, "method ListenMessages not implemented")
}
func (UnimplementedAPIServer) ListenConnections(*Empty, API_ListenConnectionsServer) error {
	return status.Errorf(codes.Unimplemented, "method ListenConnections not implemented")
}
func (UnimplementedAPIServer) Join(*Peer, API_JoinServer) error {
	return status.Errorf(codes.Unimplemented, "method Join not implemented")
}
func (UnimplementedAPIServer) mustEmbedUnimplementedAPIServer() {}

// UnsafeAPIServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to APIServer will
// result in compilation errors.
type UnsafeAPIServer interface {
	mustEmbedUnimplementedAPIServer()
}

func RegisterAPIServer(s grpc.ServiceRegistrar, srv APIServer) {
	s.RegisterService(&API_ServiceDesc, srv)
}

func _API_SendMessage_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Message)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(APIServer).SendMessage(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api.API/SendMessage",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(APIServer).SendMessage(ctx, req.(*Message))
	}
	return interceptor(ctx, in, info, handler)
}

func _API_ListenMessages_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(Empty)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(APIServer).ListenMessages(m, &aPIListenMessagesServer{stream})
}

type API_ListenMessagesServer interface {
	Send(*Message) error
	grpc.ServerStream
}

type aPIListenMessagesServer struct {
	grpc.ServerStream
}

func (x *aPIListenMessagesServer) Send(m *Message) error {
	return x.ServerStream.SendMsg(m)
}

func _API_ListenConnections_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(Empty)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(APIServer).ListenConnections(m, &aPIListenConnectionsServer{stream})
}

type API_ListenConnectionsServer interface {
	Send(*Connection) error
	grpc.ServerStream
}

type aPIListenConnectionsServer struct {
	grpc.ServerStream
}

func (x *aPIListenConnectionsServer) Send(m *Connection) error {
	return x.ServerStream.SendMsg(m)
}

func _API_Join_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(Peer)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(APIServer).Join(m, &aPIJoinServer{stream})
}

type API_JoinServer interface {
	Send(*PeerUpdate) error
	grpc.ServerStream
}

type aPIJoinServer struct {
	grpc.ServerStream
}

func (x *aPIJoinServer) Send(m *PeerUpdate) error {
	return x.ServerStream.SendMsg(m)
}

// API_ServiceDesc is the grpc.ServiceDesc for API service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var API_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "api.API",
	HandlerType: (*APIServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SendMessage",
			Handler:    _API_SendMessage_Handler,
		},
	},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "ListenMessages",
			Handler:       _API_ListenMessages_Handler,
			ServerStreams: true,
		},
		{
			StreamName:    "ListenConnections",
			Handler:       _API_ListenConnections_Handler,
			ServerStreams: true,
		},
		{
			StreamName:    "Join",
			Handler:       _API_Join_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "api.proto",
}
