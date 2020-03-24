# "nginx" stage
ARG NGINX_VERSION=1.17

# "h2-proxy-cert" stage
FROM alpine:latest AS node-proxy-cert

RUN apk add --no-cache openssl

WORKDIR /certs

# Use this self-generated certificate only in dev, IT IS NOT SECURE!
RUN openssl genrsa -des3 -passout pass:NotSecure -out server.pass.key 2048
RUN openssl rsa -passin pass:NotSecure -in server.pass.key -out localhost.key
RUN rm server.pass.key
RUN openssl req -new -passout pass:NotSecure -key localhost.key -out localhost.csr \
	-subj '/C=SS/ST=SS/L=Gotham City/O=Node/CN=localhost'
RUN openssl x509 -req -sha256 -days 365 -in localhost.csr -signkey localhost.key -out localhost.crt

### "proxy" stage
FROM nginx:${NGINX_VERSION}-alpine

RUN mkdir -p /etc/nginx/ssl/
COPY --from=node-proxy-cert /certs/ /etc/nginx/ssl/
COPY --from=node-proxy-cert /certs/ /certs/
COPY ./default.conf /etc/nginx/conf.d/default.conf
