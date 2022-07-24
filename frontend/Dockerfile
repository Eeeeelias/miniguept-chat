#-- BUILD
FROM node:18-alpine AS build

USER node
WORKDIR /home/node

##-- Copy everything into the container
ADD --chown=node:node . .

##-- Build the app
RUN npm install
RUN npm run build


#-- DEPLOYMENT
FROM nginx:alpine

##-- Copy nginx config
WORKDIR /etc/nginx/
RUN rm -rf ./conf.d
RUN mkdir ./conf.d
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

##-- Copy app build into nginx
WORKDIR /usr/share/nginx/html
COPY --from=build /home/node/dist /usr/share/nginx/html
