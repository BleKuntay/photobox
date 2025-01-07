
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
<div align="center">
  <img src="https://github.com/user-attachments/assets/d8fce723-2a6c-4502-be4a-d9fecdb10d29" width="600" height="400"/> 
  <img src ="https://github.com/user-attachments/assets/dcb16412-a8df-46e9-b519-39916435c3c6" width="600" height="400"/>
  <img src ="https://github.com/user-attachments/assets/fba44425-77d7-4e9b-a99f-60cb7a1421ea" width="600" height="400"/>
</div>

<div align="center">
<a class="link" href="https://sigmaboy.cloud" target="_blank">Try it for yourself</a>
</div>
