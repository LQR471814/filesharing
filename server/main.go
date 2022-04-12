package main

import (
	"filesharing/server/api"
	"log"
	"net"
	"net/http"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/rs/cors"
	"google.golang.org/grpc"
)

func main() {
	// fs := http.FileServer(http.Dir("build"))
	gRPCServer := grpc.NewServer()
	api.RegisterAPIServer(
		gRPCServer,
		NewServer(),
	)

	wrappedServer := grpcweb.WrapServer(gRPCServer)

	listener, err := net.Listen("tcp", "0.0.0.0:3000")
	if err != nil {
		log.Fatal(err)
	}

	server := http.Server{
		Handler: cors.AllowAll().Handler(wrappedServer),
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
