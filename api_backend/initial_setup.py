import subprocess
import os
import sys


if __name__ == '__main__':
    if not os.path.exists("venv"):
        # create venv
        print("Creating python venv")
        try:
            subprocess.run(f"python3 -m venv venv; source venv/bin/activate", shell=True)
        except Exception:
            print("Are you sure you have installed python3?")
            sys.exit(1)

    # install requirements
    print("Installing requirements")
    try:
        subprocess.run(f"pip3 install -r requirements.txt", shell=True)
    except Exception as err:
        print("Error while installing python packages: ")
        print(err)
        sys.exit(1)

    # create database
    print("Creating database")
    try:
        subprocess.run(f'dropdb --if-exists -U postgres "ZETA_PROJECT"', shell=True)
        subprocess.run(f'dropdb --if-exists -U postgres zeta_project', shell=True)
        subprocess.run(f'psql -U postgres -c "CREATE DATABASE zeta_project"', shell=True)
    except Exception as err:
        print("Do you have postgres installed??? If yes, then maybe postgres server is not running...")
        print(err)
        sys.exit(1)

    # create tables and fill data
    print("Filling database")
    try:
            subprocess.run(f'psql -U postgres -d zeta_project -f db.sql ', shell=True)
    except Exception as err:
        print("Error while filling database...")
        print(err)
        sys.exit(1)
