from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort
from apis import *


app = Flask(__name__)
api = Api(app)


# GET BASE/users/username?hashed=password - to try to login
# PUT BASE/users + data = {'username': 'usernae', 'email': 'email', 'hashed': 'hashed'} - try to register
api.add_resource(UsersAPI, "/users/<string:username>")

if __name__ == '__main__':
    app.run(debug=True)
