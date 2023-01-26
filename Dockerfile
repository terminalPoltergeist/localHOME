# syntax=docker/dockerfile:1
FROM node:latest

RUN mkdir localhome
WORKDIR localhome
COPY . .
RUN npm install
RUN npm run build
EXPOSE 30000
CMD ["npm", "start"]

