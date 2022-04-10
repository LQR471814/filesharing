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
	SendRequest(ctx context.Context, in *Request, opts ...grpc.CallOption) (*Empty, error)
	AcceptRequest(ctx context.Context, in *Request, opts ...grpc.CallOption) (*Empty, error)
	ListenAccepted(ctx context.Context, in *Empty, opts ...grpc.CallOption) (API_ListenAcceptedClient, error)
	ListenRequests(ctx context.Context, in *Empty, opts ...grpc.CallOption) (API_ListenRequestsClient, error)
	Join(ctx context.Context, in *Peer, opts ...grpc.CallOption) (API_JoinClient, error)
	Quit(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*Empty, error)
}

type aPIClient struct {
	cc grpc.ClientConnInterface
}

func NewAPIClient(cc grpc.ClientConnInterface) APIClient {
	return &aPIClient{cc}
}

func (c *aPIClient) SendRequest(ctx context.Context, in *Request, opts ...grpc.CallOption) (*Empty, error) {
	out := new(Empty)
	err := c.cc.Invoke(ctx, "/api.API/SendRequest", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *aPIClient) AcceptRequest(ctx context.Context, in *Request, opts ...grpc.CallOption) (*Empty, error) {
	out := new(Empty)
	err := c.cc.Invoke(ctx, "/api.API/AcceptRequest", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *aPIClient) ListenAccepted(ctx context.Context, in *Empty, opts ...grpc.CallOption) (API_ListenAcceptedClient, error) {
	stream, err := c.cc.NewStream(ctx, &API_ServiceDesc.Streams[0], "/api.API/ListenAccepted", opts...)
	if err != nil {
		return nil, err
	}
	x := &aPIListenAcceptedClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type API_ListenAcceptedClient interface {
	Recv() (*Request, error)
	grpc.ClientStream
}

type aPIListenAcceptedClient struct {
	grpc.ClientStream
}

func (x *aPIListenAcceptedClient) Recv() (*Request, error) {
	m := new(Request)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

func (c *aPIClient) ListenRequests(ctx context.Context, in *Empty, opts ...grpc.CallOption) (API_ListenRequestsClient, error) {
	stream, err := c.cc.NewStream(ctx, &API_ServiceDesc.Streams[1], "/api.API/ListenRequests", opts...)
	if err != nil {
		return nil, err
	}
	x := &aPIListenRequestsClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type API_ListenRequestsClient interface {
	Recv() (*RequestUpdate, error)
	grpc.ClientStream
}

type aPIListenRequestsClient struct {
	grpc.ClientStream
}

func (x *aPIListenRequestsClient) Recv() (*RequestUpdate, error) {
	m := new(RequestUpdate)
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

func (c *aPIClient) Quit(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*Empty, error) {
	out := new(Empty)
	err := c.cc.Invoke(ctx, "/api.API/Quit", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// APIServer is the server API for API service.
// All implementations must embed UnimplementedAPIServer
// for forward compatibility
type APIServer interface {
	SendRequest(context.Context, *Request) (*Empty, error)
	AcceptRequest(context.Context, *Request) (*Empty, error)
	ListenAccepted(*Empty, API_ListenAcceptedServer) error
	ListenRequests(*Empty, API_ListenRequestsServer) error
	Join(*Peer, API_JoinServer) error
	Quit(context.Context, *Empty) (*Empty, error)
	mustEmbedUnimplementedAPIServer()
}

// UnimplementedAPIServer must be embedded to have forward compatible implementations.
type UnimplementedAPIServer struct {
}

func (UnimplementedAPIServer) SendRequest(context.Context, *Request) (*Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SendRequest not implemented")
}
func (UnimplementedAPIServer) AcceptRequest(context.Context, *Request) (*Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AcceptRequest not implemented")
}
func (UnimplementedAPIServer) ListenAccepted(*Empty, API_ListenAcceptedServer) error {
	return status.Errorf(codes.Unimplemented, "method ListenAccepted not implemented")
}
func (UnimplementedAPIServer) ListenRequests(*Empty, API_ListenRequestsServer) error {
	return status.Errorf(codes.Unimplemented, "method ListenRequests not implemented")
}
func (UnimplementedAPIServer) Join(*Peer, API_JoinServer) error {
	return status.Errorf(codes.Unimplemented, "method Join not implemented")
}
func (UnimplementedAPIServer) Quit(context.Context, *Empty) (*Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Quit not implemented")
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

func _API_SendRequest_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Request)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(APIServer).SendRequest(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api.API/SendRequest",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(APIServer).SendRequest(ctx, req.(*Request))
	}
	return interceptor(ctx, in, info, handler)
}

func _API_AcceptRequest_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Request)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(APIServer).AcceptRequest(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api.API/AcceptRequest",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(APIServer).AcceptRequest(ctx, req.(*Request))
	}
	return interceptor(ctx, in, info, handler)
}

func _API_ListenAccepted_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(Empty)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(APIServer).ListenAccepted(m, &aPIListenAcceptedServer{stream})
}

type API_ListenAcceptedServer interface {
	Send(*Request) error
	grpc.ServerStream
}

type aPIListenAcceptedServer struct {
	grpc.ServerStream
}

func (x *aPIListenAcceptedServer) Send(m *Request) error {
	return x.ServerStream.SendMsg(m)
}

func _API_ListenRequests_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(Empty)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(APIServer).ListenRequests(m, &aPIListenRequestsServer{stream})
}

type API_ListenRequestsServer interface {
	Send(*RequestUpdate) error
	grpc.ServerStream
}

type aPIListenRequestsServer struct {
	grpc.ServerStream
}

func (x *aPIListenRequestsServer) Send(m *RequestUpdate) error {
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

func _API_Quit_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(APIServer).Quit(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api.API/Quit",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(APIServer).Quit(ctx, req.(*Empty))
	}
	return interceptor(ctx, in, info, handler)
}

// API_ServiceDesc is the grpc.ServiceDesc for API service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var API_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "api.API",
	HandlerType: (*APIServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SendRequest",
			Handler:    _API_SendRequest_Handler,
		},
		{
			MethodName: "AcceptRequest",
			Handler:    _API_AcceptRequest_Handler,
		},
		{
			MethodName: "Quit",
			Handler:    _API_Quit_Handler,
		},
	},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "ListenAccepted",
			Handler:       _API_ListenAccepted_Handler,
			ServerStreams: true,
		},
		{
			StreamName:    "ListenRequests",
			Handler:       _API_ListenRequests_Handler,
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
