FROM node:18-alpine
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build
RUN npm prune --omit=dev
npm run knex migrate:latest
npm run knex seed:run
EOF

ENTRYPOINT [ "/bin/sh", "entrypoint.sh" ]
