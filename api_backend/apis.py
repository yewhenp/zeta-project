from flask_restful import Api, Resource, reqparse, abort
from flask import Response, make_response
from sqlalchemy import func
from database import *


db_session = loadSession()


class UsersAPI(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str, help="user name of user required", required=False)
    parser.add_argument("hashed", type=str, help="hashed password of the user", required=False)
    parser.add_argument("email", type=str, help="Last name", required=False)

    # for login
    def get(self, username):
        q_res = db_session.query(Users).filter(Users.username == username).all()

        resp = Response('login_approve')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        if q_res:
            # args = self.parser.parse_args()
            # if args[login]
            user = q_res[0]
            resp_data = {"response": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "hashed": user.hashed,
                "user_rating": user.user_rating,
                "avatat_icon": user.avatat_icon
            }}
            resp_data = str(resp_data).replace("'", "\"")
            resp.data = resp_data
            resp.status = '200'
            return resp
        else:
            resp.status = '404'
            resp.data = '{"message": "There is no user with username: ' + username + '"}'
            return resp

    # for registering
    def put(self, username):
        args = self.parser.parse_args()
        q_res_username = db_session.query(Users).filter(Users.username == username).all()
        q_res_email = db_session.query(Users).filter(Users.email == args.email).all()

        resp = Response("register")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        if q_res_username:
            resp.status = '409'
            resp.data = '{"message": "There already is user with username: ' + username + '"}'
            return resp
        elif q_res_email:
            resp.status = '409'
            resp.data = '{"message": "There already is user with email: ' + args.email + '"}'
            return resp
        else:
            new_user = Users()
            new_user.username = username
            new_user.email = args.email
            new_user.hashed = args.hashed
            print(new_user)
            db_session.add(new_user)
            db_session.commit()

            resp.status = '201'
            return resp

    def options(self, username):
        resp = Response("allowed-methods")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
        resp.headers['Access-Control-Allow-Headers'] = 'content-type'
        # resp.allow = ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT']
        resp.status = '204'
        return resp


class PostAPI(Resource):
    parser = reqparse.RequestParser()
    # parser.add_argument("from", type=int, help="from what post to search for", required=False)
    parser.add_argument("many", type=bool, help="if true then get many posts, else get info about one post",
                        required=False)

    # parser.add_argument("id", type=str, help="id", required=False)
    parser.add_argument("title", type=str, help="title", required=False)
    parser.add_argument("content", type=str, help="content", required=False)
    parser.add_argument("votes", type=str, help="votes", required=False)
    parser.add_argument("time_created", type=str, help="time_created", required=False)
    parser.add_argument("time_last_active", type=str, help="time_last_active", required=False)
    parser.add_argument("views", type=str, help="views", required=False)
    parser.add_argument("author_id", type=str, help="author_id", required=False)

    def get(self, num_id):
        args = self.parser.parse_args()
        if args["many"] is None:
            resp = Response('post information')
            resp.headers['Access-Control-Allow-Origin'] = '*'
            try:
                q_res = db_session.query(Posts).filter(Posts.id == num_id).all()
                post = q_res[0]
            except Exception:
                resp.status = '404'
                resp.data = '{"response": "There is no id ' + str(num_id) + '"'
                return resp
            q_res = db_session.query(PostsTags).filter(PostsTags.post_id == num_id).all()
            tags_ids = [tag.tag_id for tag in q_res]
            tags = [tag.content for tag in
                    [db_session.query(Tags).filter(Tags.id == tag_id).all()[0] for tag_id in tags_ids]
                    ]

            q_res = db_session.query(Comments).filter(Comments.post_id == num_id).all()
            comments = [comment.id for comment in q_res]


            resp_data = {"response": {
                "title": post.title,
                "content": post.content,
                "votes": post.votes,
                "timeCreated": post.time_created,
                "timeLastActive": post.time_last_active,
                "views": post.views,
                "tags": tags,
                "comments": comments
            }}
            resp_data = str(resp_data).replace("'", "\"")
            resp.data = resp_data
            resp.status = '200'
            return resp

    def put(self, num_id):
        args = self.parser.parse_args()
        resp = Response("Update post info")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        not_none_args = {k: v for k, v in args.items() if v is not None}
        post = db_session.query(Posts).filter(Posts.id == num_id).all()[0]
        for key, value in not_none_args.items():
            setattr(post, key, value)

        db_session.commit()
        resp.status = '200'
        return resp

    def post(self, num_id):
        args = self.parser.parse_args()
        not_none_args = {k: v for k, v in args.items() if v is not None}
        new_entry = Posts()
        post_id = db_session.query(func.max(new_entry.id)).scalar() + 1
        new_entry.__dict__ |= not_none_args | {'id': post_id}

        print(new_entry)

    def options(self, username):
        resp = Response("allowed-methods")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
        resp.headers['Access-Control-Allow-Headers'] = 'content-type'
        resp.status = '204'
        return resp


class CommentAPI(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("title", type=str, help="title", required=False)
    parser.add_argument("content", type=str, help="content", required=False)
    parser.add_argument("votes", type=str, help="votes", required=False)
    parser.add_argument("time_created", type=str, help="time_created", required=False)
    parser.add_argument("time_last_active", type=str, help="time_last_active", required=False)
    parser.add_argument("views", type=str, help="views", required=False)
    parser.add_argument("author_id", type=str, help="author_id", required=False)

    def get(self, comment_id):
        q_res = db_session.query(Comments).filter(Comments.id == comment_id).all()
        comment = q_res[0]

        resp = Response('comment information')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp_data = {"response": {
            "id": comment.id,
            "post_id": comment.post_id,
            "author_id": comment.author_id,
            "content": comment.content,
            "votes": comment.votes,
        }}
        resp_data = str(resp_data).replace("'", "\"")
        resp.data = resp_data
        resp.status = '200'
        return resp

    def put(self, comment_id):
        args = self.parser.parse_args()
        resp = Response("update comment info")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        not_none_args = {k: v for k, v in args.items() if v is not None}
        comment = db_session.query(Comments).filter(Comments.id == comment_id).all()[0]
        for key, value in not_none_args.items():
            setattr(comment, key, value)

        db_session.commit()
        resp.status = '200'
        return resp

    def options(self, username):
        resp = Response("allowed-methods")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
        resp.headers['Access-Control-Allow-Headers'] = 'content-type'
        resp.status = '204'
        return resp
