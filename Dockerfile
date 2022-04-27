FROM node:17-alpine3.14 as build
WORKDIR /app

COPY ./package.json ./
COPY ./tsconfig.json ./ 
COPY create-env-file.sh ./create-env-file.sh


RUN npm install

ARG REACT_APP_API_URL

RUN sh create-env-file.sh REACT_APP_API_URL=$REACT_APP_API_URL

# If you want to debug the .env file, uncomment the following line
CMD ["cat", ".env"]

COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
