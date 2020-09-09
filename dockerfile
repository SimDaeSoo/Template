FROM node:lts

COPY    nextjs  /template/nextjs/
WORKDIR /template/nextjs/
RUN     yarn install && yarn build

COPY    strapi  /template/strapi/
WORKDIR /template/strapi/
RUN     yarn install && yarn build

WORKDIR /template/

RUN apt-get update && apt-get install -y supervisor && apt-get install -y nginx

COPY    ./deployment/etc/ /etc/
COPY    ./deployment/*.sh /template/
RUN     chmod +x /template/*.sh

CMD     ./setup_config.sh && ./run.sh