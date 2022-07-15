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

##-- Copy app build into nginx
COPY --from=build /home/node/dist /usr/share/nginx/html
