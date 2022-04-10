package main

import (
	"net/http"
	"strings"

	"github.com/gorilla/websocket"
)

func SplitGRPCTraffic(fallback http.HandlerFunc, grpcHandler http.Handler) http.HandlerFunc {
	return http.HandlerFunc(
		func(w http.ResponseWriter, r *http.Request) {
			if strings.Contains(r.Header.Get("Content-Type"), "application/grpc") ||
				websocket.IsWebSocketUpgrade(r) {
				grpcHandler.ServeHTTP(w, r)
				return
			}

			fallback(w, r)
		},
	)
}
