# Base image pinned by digest (debian:stable-slim, Debian 13.7):
# To update: docker pull debian:stable-slim && docker inspect --format '{{index .RepoDigests 0}}' debian:stable-slim
FROM debian:stable-slim@sha256:13e0a2e78aa0554ad5ff66e4e260c6dbcdff807eb1f39d43b9fb0288aae88b04

LABEL "com.github.actions.name"="Zola Deploy to Pages"
LABEL "com.github.actions.description"="Build and deploy a Zola site to GitHub Pages"

# Set default locale for the environment
ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates wget git \
 && rm -rf /var/lib/apt/lists/*

ARG ZOLA_VERSION=0.23.6
ARG ZOLA_SHA256=8f5132b3522412d04e395e0b25f6d68613ad272a873e54a2b3ebf664873024a4
RUN wget -q -O /tmp/zola.tar.gz \
    "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz" \
 && echo "${ZOLA_SHA256}  /tmp/zola.tar.gz" | sha256sum -c - \
 && tar xzf /tmp/zola.tar.gz -C /usr/local/bin \
 && rm /tmp/zola.tar.gz

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
