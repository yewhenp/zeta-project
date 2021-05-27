# Zeta project
Usage:
```bash
# install packages
yarn add package.json
# start backend server
python3 api_backend/main.py
# flask will start rest api server, and wil print you an api base address, 
# write it in the '.env' file
echo REACT_APP_BASE_URL=http://localhost:5000 > .env # usually http://localhost:5000
# start application
yarn start
```

Note: Make sure you have started PostgreSQL server, 
where you have database ZETA_PROJECT with table Users.
The needed columns of table users can be found in ```./api_backend/db.sql```