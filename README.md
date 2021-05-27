# Zeta project
## Prerequirements
- python3
- yarn
- postgresql (and don't forget to start db server)

## Usage:
```bash
# install packages
yarn add package.json
# database and backend setup
cd ./api_backend
python3 initial_setup.py
cd ..
# start backend server
python3 main.py
# flask will start rest api server, and wil print you an api base address, 
# write it in the '.env' file
echo REACT_APP_BASE_URL=http://localhost:5000 > .env # usually http://localhost:5000
# start application
yarn start
```

Note: Make sure you have started PostgreSQL server on port 5432 (default postgres port)
