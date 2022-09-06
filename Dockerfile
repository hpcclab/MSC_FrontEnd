FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install react-scripts@5.0.0 -g --silent
RUN npm ci --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
ENV OC_API http://oc.oaas.10.131.36.40.nip.io/ 
ENV CDS_API http://cds.oaas.10.131.36.40.nip.io/
ENV TM_API http://tm.oaas.10.131.36.40.nip.io/
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD envsubst < /usr/share/nginx/html/config-template.js > /usr/share/nginx/html/config.js  \ 
    && nginx -g 'daemon off;'
#CMD ["nginx", "-g", "daemon off;"]



