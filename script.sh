#!/bin/bash

# Set your Docker Hub repository name
DOCKER_REPO="shresritik/todo"

# Fetch the latest commit hash
latest_commit_hash=$(git rev-parse --short HEAD)

# Pull the Docker image tagged with the latest commit hash
docker pull ${DOCKER_REPO}:2.${latest_commit_hash}
