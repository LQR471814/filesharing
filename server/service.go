package main

import (
	"context"
	"errors"
	"filesharing/server/api"
	"log"
	"net"

	"google.golang.org/grpc/peer"
)

type PeerState struct {
	Peer         *api.Peer
	OnPeer       api.API_JoinServer
	OnMessage    api.API_ListenMessagesServer
	OnConnection api.API_ListenConnectionsServer
}

type WSMessage struct {
	Type    int
	Message []byte
}

type Connection struct {
	ToUploader  chan WSMessage
	ToReceiving chan WSMessage
}

type Server struct {
	api.UnimplementedAPIServer
	Stop        chan bool
	Peers       map[string]*PeerState
	Connections map[string]Connection
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

func (s *Server) peerList(exclude string) []*api.Peer {
	peers := []*api.Peer{}
	for _, p := range s.Peers {
		if p.Peer.Id != exclude {
			peers = append(peers, p.Peer)
		}
	}
	return peers
}

func (s *Server) updatePeers() {
	for _, u := range s.Peers {
		u.OnPeer.Send(&api.PeerUpdate{
			Peers: s.peerList(u.Peer.Id),
		})
	}
}

func (s *Server) SendMessage(ctx context.Context, in *api.Message) (*api.Empty, error) {
	ip := s.getIP(ctx)
	handler := s.Peers[in.Peer].OnMessage
	if handler != nil {
		handler.Send(&api.Message{
			Peer:    ip,
			Message: in.Message,
		})
		log.Println("Sent", in.Message, "to", ip)
	} else {
		log.Println("handler nil")
	}
	return &api.Empty{}, nil
}

func (s *Server) ListenMessages(_ *api.Empty, server api.API_ListenMessagesServer) error {
	ip := s.getIP(server.Context())
	peer, ok := s.Peers[ip]
	if ok {
		peer.OnMessage = server
		s.waitUntilStopped()
		return nil
	}
	return errors.New("Join must be called before trying to listen to messages")
}

func (s *Server) Join(in *api.Peer, server api.API_JoinServer) error {
	ip := s.getIP(server.Context())
	_, overwriting := s.Peers[ip]

	in.Id = ip
	s.Peers[ip] = &PeerState{
		Peer:   in,
		OnPeer: server,
	}

	if overwriting {
		server.Send(&api.PeerUpdate{
			Peers: s.peerList(ip),
		})
		log.Println("Peer overwrote", in)
	} else {
		s.updatePeers()
		log.Println("Peer joined", in)
	}

	s.waitUntilStopped()
	return nil
}

func (s *Server) Quit(ctx context.Context, in *api.Empty) (*api.Empty, error) {
	ip := s.getIP(ctx)
	delete(s.Peers, ip)

	s.updatePeers()
	log.Println("Peer quit", in)

	return &api.Empty{}, nil
}

func NewServer() *Server {
	return &Server{
		Peers:       make(map[string]*PeerState, 0),
		Stop:        make(chan bool),
		Connections: make(map[string]Connection),
	}
}
