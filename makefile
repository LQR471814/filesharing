NPM = pnpm
NPX = $(NPM) exec
PROTO = $(wildcard proto/*.proto)

export CGO_ENABLED = 0

ifeq ($(OS),Windows_NT)
	EXT = .exe
endif

# building

default: server-bin dist
	$(NPM) run build
	rm -rf dist/*
	cp server/server$(EXT) dist/server$(EXT)
	cp -r build dist/public

dist:
	mkdir dist

server-bin:
	cd server && go build -o server$(EXT)

# development

server/api:
	mkdir server/api

src/api:
	mkdir src/api

protobuf: server/api src/api
	protoc -I=proto --go_out=server/ --go-grpc_out=server/ $(PROTO)
	$(NPX) protoc --ts_out src/api \
		--ts_opt long_type_string \
		--ts_opt optimize_code_size \
		--proto_path proto \
		$(PROTO)
