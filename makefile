PROTO_PATH = $(abspath .)
SERVER_PATH = $(abspath ./server)
WEB_PATH = $(abspath ./src)

GO_RPC_ELEMENTS = api.pb.go api_grpc.pb.go
WEB_RPC_ELEMENTS = api_pb.d.ts api_pb.js ApiServiceClientPb.ts

rpc:
	protoc \
		--proto_path=$(PROTO_PATH) \
		--go_out=$(SERVER_PATH)/api \
		--go-grpc_out=$(SERVER_PATH)/api \
		--go_opt=paths=source_relative \
		--go-grpc_opt=paths=source_relative \
		$(PROTO_PATH)/api.proto
	protoc \
		--proto_path=$(PROTO_PATH) \
		--js_out=import_style=commonjs:$(WEB_PATH)/api \
		--grpc-web_out=import_style=typescript,mode=grpcwebtext:$(WEB_PATH)/api \
		$(PROTO_PATH)/api.proto
