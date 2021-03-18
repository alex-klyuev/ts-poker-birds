FROM node:15
WORKDIR /src/app
COPY . /src/app
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "docker"]