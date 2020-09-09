#!/bin/bash
SCRIPT_MESSAGE='\033[1;33m'  # 1;33 is Yellow
ALERT_MESSAGE='\033[1;31m'   # 1;31 is Light Red
COMMAND_ECHO='\033[1;32m'    # 1;32 is Light Green
NC='\033[0m' # No Color

####
# get current image_name
if [ -f .image_name ]; then
    IMAGE_NAME=`cat .image_name`
else
    echo "${ALERT_MESSAGE}There is not \'.image_name\' file.${NC}"
    exit 1
fi

DOCKER_IMAGE_NAME="${DOCKER_IDENTIFIER}/${IMAGE_NAME}"

if [ -n "$CIRCLE_TAG" ]; then
    TAG_NAME="release-${CIRCLE_TAG}"
else
    TAG_NAME="build-$(git rev-parse --short HEAD)"
fi

echo "TAG_NAME is : ${TAG_NAME}"
echo "DOCKER_IMAGE is ${DOCKER_IMAGE_NAME}"

docker login -u ${DOCKER_IDENTIFIER} -p ${DOCKER_PASSWORD}
echo "docker login -u ${DOCKER_IDENTIFIER} -p ${DOCKER_PASSWORD}"

docker build -t ${DOCKER_IMAGE_NAME}:${TAG_NAME} .
echo "docker build -t ${DOCKER_IMAGE_NAME}:${TAG_NAME} ."

docker tag ${DOCKER_IMAGE_NAME}:${TAG_NAME} ${DOCKER_IMAGE_NAME}:latest
echo "docker tag ${DOCKER_IMAGE_NAME}:${TAG_NAME} ${DOCKER_IMAGE_NAME}:latest"

docker push ${DOCKER_IMAGE_NAME}:latest
echo "docker push ${DOCKER_IMAGE_NAME}:latest"

docker push ${DOCKER_IMAGE_NAME}:${TAG_NAME}
echo "docker push ${DOCKER_IMAGE_NAME}:${TAG_NAME}"
