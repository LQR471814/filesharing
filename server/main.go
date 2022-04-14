package main

import (
	"filesharing/server/api"
	"log"
	"net"
	"net/http"

	"github.com/google/uuid"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/rs/cors"
	"google.golang.org/grpc"
)

func main() {
	service := NewServer()

	// fs := http.FileServer(http.Dir("build"))
	gRPCServer := grpc.NewServer()
	api.RegisterAPIServer(
		gRPCServer,
		service,
	)

	wrappedServer := grpcweb.WrapServer(gRPCServer)

	listener, err := net.Listen("tcp", "0.0.0.0:3000")
	if err != nil {
		log.Fatal(err)
	}

	server := http.Server{
		Handler: cors.AllowAll().Handler(RouteTraffic(
			map[string]http.HandlerFunc{
				"/upload": func(w http.ResponseWriter, r *http.Request) {
					p := r.URL.Query().Get("peer")
					id := uuid.New().String()

					if p == "" {
						w.Write([]byte("Missing peer query parameter"))
					}

					conn, err := upgrader.Upgrade(w, r, nil)
					if err != nil {
						panic(err)
					}

					service.Connections[id] = Connection{
						ToUploader:  make(chan WSMessage, 10),
						ToReceiving: make(chan WSMessage, 10),
					}

					defer close(service.Connections[id].ToReceiving)
					defer close(service.Connections[id].ToUploader)
					defer delete(service.Connections, id)

					go func() {
						for msg := range service.Connections[id].ToUploader {
							conn.WriteMessage(msg.Type, msg.Message)
						}
					}()

					service.Peers[p].OnConnection.Send(&api.Connection{
						Peer: p,
						Id:   id,
					})

					for {
						t, msg, err := conn.ReadMessage()
						if err != nil {
							break
						}
						service.Connections[id].ToReceiving <- WSMessage{
							Type:    t,
							Message: msg,
						}
					}
				},
				"/receive": func(w http.ResponseWriter, r *http.Request) {
					p := r.URL.Query().Get("peer")
					id := r.URL.Query().Get("id")

					if p == "" || id == "" {
						w.Write([]byte("Missing peer or id query parameter"))
					}

					conn, err := upgrader.Upgrade(w, r, nil)
					if err != nil {
						panic(err)
					}

					go func() {
						for msg := range service.Connections[id].ToReceiving {
							conn.WriteMessage(msg.Type, msg.Message)
						}
					}()

					for {
						t, msg, err := conn.ReadMessage()
						if err != nil {
							break
						}
						service.Connections[id].ToUploader <- WSMessage{
							Type:    t,
							Message: msg,
						}
					}
				},
			},
			wrappedServer,
		)),
		// SplitGRPCTraffic(
		// 	func(w http.ResponseWriter, r *http.Request) {
		// 		if strings.HasSuffix(r.RequestURI, ".js") {
		// 			w.Header().Set("Content-Type", "text/javascript")
		// 		}
		// 		fs.ServeHTTP(w, r)
		// 	},
		// 	wrappedServer,
		// ),
	}

	log.Println("listening on port 3000")

	server.Serve(listener)
}
