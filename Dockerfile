FROM node:12-alpine as buildStep

# - include git in order to support installation of NPM dependencies from Git repos
RUN apk update --update-cache && apk add git

WORKDIR /var/app
COPY package*.json /var/app/

# Install dependencies and devDependencies, which are needed for the build process
# Note: `npm ci` does not work with npm modules installed with `npm install
# <local_folder>`, which we use for the shared-module
RUN npm install --no-audit

# copy build requirements
COPY browserslist *.config.js /var/app/
COPY locales /var/app/locales
COPY public /var/app/public
COPY src /var/app/src
RUN npm run -s build
# Remove devDependencies after the build has been ran to reduce image size
RUN NODE_ENV=production npm prune

FROM node:12-alpine as prod
COPY --from=buildStep /var/app /var/app
WORKDIR /var/app
EXPOSE 3000

# By default, Docker runs containers as root, which inside of the container can
# pose a security risk. We want to run the container as an unprivileged user
# wherever possible. The node image provides the "node" user for such purpose.
# https://github.com/nodejs/docker-node/blob/d4d52ac41b1f922242d3053665b00336a50a50b3/docs/BestPractices.md#non-root-user
USER node

# Start the app
CMD ["npm", "run", "start:prod"]
