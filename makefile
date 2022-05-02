PROTO_PATH = $(abspath .)
SERVER_PATH = $(abspath ./server)
WEB_PATH = $(abspath ./src)

GO_RPC_ELEMENTS = api.pb.go api_grpc.pb.go
WEB_RPC_ELEMENTS = api_pb.d.ts api_pb.js ApiServiceClientPb.ts

ifeq ($(OS),Windows_NT)
	S = \\
	SERVER_BIN_NAME = server.exe
	COPY = xcopy /E/H
	MOVE = move
	RMDIR = rmdir /Q/S
else
	S = /
	SERVER_BIN_NAME = server
	COPY = cp -R
	MOVE = mv
	RMDIR = rm -r
endif

clean:
	$(RMDIR) dist

rpc:
	protoc \
		--proto_path=$(PROTO_PATH) \
		--go_out=$(SERVER_PATH)$(S)api \
		--go-grpc_out=$(SERVER_PATH)$(S)api \
		--go_opt=paths=source_relative \
		--go-grpc_opt=paths=source_relative \
		$(PROTO_PATH)$(S)api.proto
	protoc \
		--proto_path=$(PROTO_PATH) \
		--js_out=import_style=commonjs:$(WEB_PATH)$(S)api \
		--grpc-web_out=import_style=typescript,mode=grpcwebtext:$(WEB_PATH)$(S)api \
		$(PROTO_PATH)$(S)api.proto

dist: rpc
	npm run build
	cd server && \
		go build -o ..$(S)$(SERVER_BIN_NAME)

	mkdir dist
	$(RMDIR) dist
	mkdir dist

	$(MOVE) $(SERVER_BIN_NAME) dist$(S)$(SERVER_BIN_NAME)
	$(COPY) public dist$(S)public$(S)
