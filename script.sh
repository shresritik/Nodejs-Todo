#!/bin/bash

# Set your Docker Hub repository name
DOCKER_REPO="shresritik/todo"

# Fetch the latest commit hash
latest_commit_hash=b09510d
# Ensure the .env file exists
ENV_FILE=".env"
if [ ! -f "$ENV_FILE" ]; then
  echo "Environment file ($ENV_FILE) not found!"
  exit 1
fi
# Check if PORT variable exists in .env file
if grep -qE '^PORT=.+' $ENV_FILE; then
    # PORT variable exists, read its value
    HOST_PORT=$(grep -E '^PORT=' $ENV_FILE | cut -d '=' -f 2)
    echo "HOST_PORT: $HOST_PORT"  
else
    # PORT variable does not exist
    echo "PORT variable not found in $ENV_FILE"
    exit 1
fi
# Pull the Docker image tagged with the latest commit hash
docker pull ${DOCKER_REPO}:5.${latest_commit_hash}
docker run -p ${HOST_PORT}:${HOST_PORT} --env-file=${ENV_FILE} ${DOCKER_REPO}:5.${latest_commit_hash}
