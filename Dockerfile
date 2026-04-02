FROM node:22-slim

# Install common dev tools the agent might need
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    wget \
    jq \
    ripgrep \
    fd-find \
    tree \
    less \
    vim-tiny \
    openssh-client \
    ca-certificates \
    build-essential \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Symlink fdfind -> fd (Debian names it differently)
RUN ln -sf /usr/bin/fdfind /usr/bin/fd

# Install pi-coding-agent
RUN npm install -g @mariozechner/pi-coding-agent

# Reuse the existing 'node' user (UID/GID 1000) from the base image
# Pre-create the .pi/agent directory so pi doesn't fail on first run
# RUN mkdir -p /home/node/.pi/agent && chown -R node:node /home/node/.pi

USER node
WORKDIR /home/node

ENTRYPOINT ["pi"]
