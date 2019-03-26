# Stage 1 - Making environment variables available
# This stage is required as React only will listen to env variables at build time so we pass them in through nginx
# see: https://www.manifold.co/blog/building-a-production-grade-container-for-your-static-javascript-application-b2b2eff83fbd

FROM bash:5 as environment-vars

ENV API_URL 'http://localhost:3664'

# This is a hack around the envsubst nginx config. Because we have `$uri` set up,
# it would replace this as well. Now we just reset it to its original value.
ENV uri \$uri

COPY .env.production .
COPY nginx.conf.sample .
COPY script.sh .

# Install envsubst
RUN apk add gettext libintl
RUN ["/usr/local/bin/bash", "script.sh"]


# Stage 2 - Building react app
FROM node:10-alpine as react-build

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
COPY --from=environment-vars .env.production .

ARG REACT_APP_GITHUB_URL='https://github.com/recipe-repo/recipe-repo'
RUN npm run build


# Stage 3 - the production environment
FROM nginx:alpine

COPY --from=environment-vars default.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80

CMD nginx -g "daemon off;"