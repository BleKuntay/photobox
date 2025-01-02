
# Photobox 

an website to store photo  

## Run Locally

Requirement

```bash
node version 22
npm 
postgre 
```

In postgre 
```bash
create database photobox
```

How to run 

```bash
git clone https://github.com/BleKuntay/photobox.git
cd backend
npm install
npm run start:prod
cd ..
cp -rf frontend /var/www/frontend
```


Optional (you can use pm2 to run the backend in the background)
```bash
pm2 start dist/main.js --name my-backend
pm2 save
pm2 startup

```

## Showcase
https://sigmaboy.cloud

