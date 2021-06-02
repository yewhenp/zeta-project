from flask import Flask
from flask_restful import Api
from apis import *


app = Flask(__name__)
api = Api(app)


api.add_resource(UsersAPI, "/users/<string:username>")
api.add_resource(PostAPI, "/posts/<int:num_id>")
api.add_resource(CommentAPI, "/comments/<int:comment_id>")
api.add_resource(TagAPI, "/tags/<int:post_id>")


if __name__ == '__main__':
    app.run(debug=True)
