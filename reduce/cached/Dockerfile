FROM ubuntu:14.04
ARG APT_PROXY_PORT=
COPY detect-apt-proxy.sh /root
RUN /root/detect-apt-proxy.sh ${APT_PROXY_PORT}