package main

import (
	"filesharing/server/api"
	"flag"
	"log"
	"net"
	"net/http"
	"strconv"
	"strings"

	"github.com/google/uuid"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/rs/cors"
	"google.golang.org/grpc"
)

func main() {
	address := flag.String("addr", "0.0.0.0", "The address to host on")
	port := flag.Int("port", 8080, "The port to listen on")

	flag.Parse()

	service := NewServer()

	fs := http.FileServer(http.Dir("public"))
	gRPCServer := grpc.NewServer()
	api.RegisterAPIServer(
		gRPCServer,
		service,
	)

	wrappedServer := grpcweb.WrapServer(gRPCServer)

	listener, err := net.Listen("tcp", *address+":"+strconv.Itoa(*port))
	if err != nil {
		log.Fatal(err)
	}

	server := http.Server{
		Handler: cors.AllowAll().Handler(RouteTraffic(
			map[string]http.HandlerFunc{
				"/upload": func(w http.ResponseWriter, r *http.Request) {
					p := r.URL.Query().Get("peer")
					if p == "" {
						w.Write([]byte("Missing peer query parameter"))
					}

					id := uuid.New().String()
					conn, err := upgrader.Upgrade(w, r, nil)
					if err != nil {
						panic(err)
					}

					log.Println("connection", id, "to", p)

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

					sender, _, err := net.SplitHostPort(r.RemoteAddr)
					if err != nil {
						panic(err)
					}

					service.Peers[p].OnConnection.Send(&api.Connection{
						Peer: sender,
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
					id := r.URL.Query().Get("id")

					if id == "" {
						w.Write([]byte("Missing id query parameter"))
					}

					conn, err := upgrader.Upgrade(w, r, nil)
					if err != nil {
						panic(err)
					}

					log.Println("receive", id)

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
			SplitGRPCTraffic(
				func(w http.ResponseWriter, r *http.Request) {
					if strings.HasSuffix(r.RequestURI, ".js") {
						w.Header().Set("Content-Type", "text/javascript")
					}
					fs.ServeHTTP(w, r)
				},
				wrappedServer,
			),
		)),
	}

	log.Printf("listening on port %v\n", *port)

	server.Serve(listener)
}
