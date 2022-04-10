package main

import (
	"context"
	"filesharing/server/api"
	"log"
	"net"

	"google.golang.org/grpc/peer"
)

type PeerState struct {
	Peer     *api.Peer
	Pending  map[string]*api.Request
	Accepted map[string]*api.Request
}

type Server struct {
	api.UnimplementedAPIServer
	Stop               chan bool
	AcceptanceChannels map[string]api.API_ListenAcceptedServer
	RequestChannels    map[string]api.API_ListenRequestsServer
	PeerChannels       []api.API_JoinServer
	Peers              map[string]PeerState
}

func (s *Server) waitUntilStopped() {
	for {
		select {
		case <-s.Stop:
			break
		}
	}
}

func (s *Server) getIP(ctx context.Context) string {
	client, ok := peer.FromContext(ctx)
	if !ok {
		log.Fatal("Failed to get address from Join context")
	}
	ip, _, err := net.SplitHostPort(client.Addr.String())
	if err != nil {
		log.Fatal(err)
	}
	return ip
}

func (s *Server) updatePeers() {
	peers := []*api.Peer{}
	for _, p := range s.Peers {
		peers = append(peers, p.Peer)
	}

	for _, u := range s.PeerChannels {
		u.Send(&api.PeerUpdate{
			Peers: peers,
		})
	}
}

func (s *Server) SendRequest(ctx context.Context, in *api.Request) (*api.Empty, error) {
	s.Peers[in.Peer].Pending[in.Id] = in
	requests := []*api.Request{}
	for _, v := range s.Peers[in.Peer].Pending {
		requests = append(requests, v)
	}
	s.RequestChannels[in.Id].Send(&api.RequestUpdate{
		Requests: requests,
	})
	return &api.Empty{}, nil
}

func (s *Server) AcceptRequest(ctx context.Context, in *api.Request) (*api.Empty, error) {
	ip := s.getIP(ctx)
	s.AcceptanceChannels[in.Peer].Send(in)
	s.Peers[ip].Accepted[in.Id] = in
	delete(s.Peers[ip].Pending, in.Id)
	return &api.Empty{}, nil
}

func (s *Server) ListenRequests(_ *api.Empty, server api.API_ListenRequestsServer) error {
	ip := s.getIP(server.Context())
	s.RequestChannels[ip] = server
	s.waitUntilStopped()
	return nil
}

func (s *Server) ListenAccepted(_ *api.Empty, server api.API_ListenAcceptedServer) error {
	ip := s.getIP(server.Context())
	s.AcceptanceChannels[ip] = server
	s.waitUntilStopped()
	return nil
}

func (s *Server) Join(in *api.Peer, server api.API_JoinServer) error {
	ip := s.getIP(server.Context())
	if _, ok := s.Peers[ip]; ok {
		s.waitUntilStopped()
		return nil
	}

	in.Id = ip
	s.Peers[ip] = PeerState{
		Peer:     in,
		Pending:  make(map[string]*api.Request),
		Accepted: make(map[string]*api.Request),
	}

	s.updatePeers()
	log.Println("Peer joined", s.Peers)

	s.waitUntilStopped()
	return nil
}

func (s *Server) Quit(ctx context.Context, in *api.Empty) (*api.Empty, error) {
	ip := s.getIP(ctx)
	delete(s.Peers, ip)

	s.updatePeers()
	log.Println("Peer quit", s.Peers, ip)

	return &api.Empty{}, nil
}

func NewServer() *Server {
	return &Server{
		AcceptanceChannels: make(map[string]api.API_ListenAcceptedServer, 0),
		RequestChannels:    make(map[string]api.API_ListenRequestsServer, 0),
		PeerChannels:       make([]api.API_JoinServer, 0),
		Peers:              make(map[string]PeerState, 0),
		Stop:               make(chan bool),
	}
}
