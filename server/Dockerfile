FROM golang:1.20 AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main .

FROM alpine:latest  
WORKDIR /app
COPY --from=build /app/main .
COPY --from=build /app/data.json .
EXPOSE 8080
ENTRYPOINT ["./main"]
