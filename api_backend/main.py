from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort
from apis import *


app = Flask(__name__)
api = Api(app)


# GET BASE/users/username?hashed=password - to try to login
# PUT BASE/users + data = {'username': 'usernae', 'email': 'email', 'hashed': 'hashed'} - try to register
api.add_resource(UsersAPI, "/users/<string:username>")
api.add_resource(PostAPI, "/posts/<int:num_id>")
api.add_resource(CommentAPI, "/comments/<int:comment_id>")


if __name__ == '__main__':
    app.run(debug=True)
