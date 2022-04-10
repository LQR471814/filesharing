package main

import (
	"context"
	"filesharing/server/api"
	"log"

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

func (s *Server) waitUntilStopped(id string) {
	for {
		select {
		case <-s.Stop:
			break
		default:
			if _, ok := s.Peers[id]; !ok {
				return
			}
		}
	}
}

func (s *Server) getIP(ctx context.Context) string {
	client, ok := peer.FromContext(ctx)
	if !ok {
		log.Fatal("Failed to get address from Join context")
	}
	return client.Addr.String()
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
	s.Peers[ip].Accepted[in.Id] = in
	delete(s.Peers[ip].Pending, in.Id)
	s.AcceptanceChannels[in.Peer].Send(in)
	return &api.Empty{}, nil
}

func (s *Server) ListenRequests(_ *api.Empty, server api.API_ListenRequestsServer) error {
	ip := s.getIP(server.Context())
	s.RequestChannels[ip] = server
	s.waitUntilStopped(ip)
	return nil
}

func (s *Server) ListenAccepted(_ *api.Empty, server api.API_ListenAcceptedServer) error {
	ip := s.getIP(server.Context())
	s.AcceptanceChannels[ip] = server
	s.waitUntilStopped(ip)
	return nil
}

func (s *Server) Join(in *api.Peer, server api.API_JoinServer) error {
	log.Println("got join request")

	ip := s.getIP(server.Context())
	in.Id = ip
	s.Peers[ip] = PeerState{
		Peer:     in,
		Pending:  make(map[string]*api.Request),
		Accepted: make(map[string]*api.Request),
	}

	log.Println("1")

	peers := []*api.Peer{}
	for _, p := range s.Peers {
		peers = append(peers, p.Peer)
	}

	log.Println("2")

	s.PeerChannels = append(s.PeerChannels, server)
	for _, updater := range s.PeerChannels {
		updater.Send(&api.PeerUpdate{
			Peers: peers,
		})
	}

	log.Println("Peer joined", peers)

	s.waitUntilStopped(ip)
	return nil
}

func (s *Server) Quit(ctx context.Context, in *api.Empty) (*api.Empty, error) {
	peer, ok := peer.FromContext(ctx)
	if !ok {
		log.Fatal("Failed to get address from Join context")
	}
	delete(s.Peers, peer.Addr.String())
	log.Println("Peer quit", peer)
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
