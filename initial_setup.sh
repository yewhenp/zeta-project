echo "Creating venv"
cd api_backend
if [ ! -d "venv" ] 
then
  python3 -m venv venv
  source venv/bin/activate
  pip3 install -r requirements.txt
fi
echo  "Creating database"
dropdb --if-exists -U postgres "ZETA_PROJECT"
dropdb --if-exists -U postgres zeta_project
psql -U postgres -c "CREATE DATABASE zeta_project"
psql -U postgres -d zeta_project -f db.sql
cd ..
