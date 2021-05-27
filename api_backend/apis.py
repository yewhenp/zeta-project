from flask_restful import Resource, reqparse
from flask import Response, request
from sqlalchemy import func
import datetime
from database import *


db_session = loadSession()


class UsersAPI(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str, help="user name of user required", required=False)
    parser.add_argument("hashed", type=str, help="hashed password of the user", required=False)
    parser.add_argument("email", type=str, help="Last name", required=False)

    def get(self, username):
        # GET BASE/user/username - get all information about user from db (for logging)
        q_res = db_session.query(Users).filter(Users.username == username).all()
        resp = Response('login_approve')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        if q_res:
            user = q_res[0]
            resp_data = {"response": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "hashed": user.hashed,
                "user_rating": user.user_rating,
                "avatat_icon": user.avatat_icon
            }}
            resp.data = str(resp_data).replace("'", "\"")
            resp.status = '200'
            return resp
        # if there is no user with provided username
        resp.status = '404'
        resp.data = '{"message": "There is no user with username: ' + username + '"}'
        return resp

    def put(self, username):
        # PUT BASE/user/username?hashed={}&email={} - add new user (for registration)
        args = self.parser.parse_args()
        q_res_username = db_session.query(Users).filter(Users.username == username).all()
        q_res_email = db_session.query(Users).filter(Users.email == args.email).all()

        resp = Response("register")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.status = '409'
        if q_res_username:
            resp.data = '{"message": "There already is user with username: ' + username + '"}'
            return resp
        if q_res_email:
            resp.data = '{"message": "There already is user with email: ' + args.email + '"}'
            return resp
        resp.status = '201'

        new_user = Users()
        new_user.username = username
        new_user.email = args.email
        new_user.hashed = args.hashed
        db_session.add(new_user)
        db_session.commit()

        return resp

    def options(self, username):
        resp = Response("allowed-methods")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
        resp.headers['Access-Control-Allow-Headers'] = 'content-type'
        resp.status = '204'
        return resp


class PostAPI(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("from", type=int, help="from what post to search for", required=False)
    parser.add_argument("to", type=int, help="to what post to search for", required=False)

    parser.add_argument("many", type=bool, help="if true then get many posts, else get info about one post",
                        required=False)
    parser.add_argument("count", type=bool, help="if true then returns number of posts",
                        required=False)

    parser.add_argument("title", type=str, help="title", required=False)
    parser.add_argument("content", type=str, help="content", required=False)
    parser.add_argument("votes", type=str, help="votes", required=False)
    parser.add_argument("time_created", type=str, help="time_created", required=False)
    parser.add_argument("time_last_active", type=str, help="time_last_active", required=False)
    parser.add_argument("views", type=str, help="views", required=False)
    parser.add_argument("author_id", type=str, help="author_id", required=False)

    post_required_args = [
        "title", "content", "author_id"
    ]

    def get(self, num_id):
        # GET BASE/posts/post_id - get all information about the post (for post&main page)
        args = self.parser.parse_args()
        resp = Response('posts information')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.status = '200'

        # many - return all posts starting with "from" id, finishing with "to" id
        if args["many"] is not None:
            from_ = args["from"] if args["from"] is not None else 0
            to_ = args["to"] if args["to"] is not None else from_ + 10

            q_res = db_session.execute(f"""
select * from posts where id > {from_} AND id < {to_}
""")
            resp_data = {
                "response": []
            }
            for row in q_res:
                # info about the post
                entry = {
                    "id": row[0],
                    "title": row[1],
                    "content": row[2],
                    "votes": row[3],
                    "timeCreated": row[4].strftime("%m-%d-%Y"),
                    "timeLastActive": row[5].strftime("%m-%d-%Y"),
                    "views": row[6],
                }
                # info about author of post
                user = db_session.query(Users).filter(Users.id == row[7]).all()[0]
                entry["icon"] = user.avatat_icon
                entry["username"] = user.username
                entry["userrating"] = user.user_rating

                # retrieve info about tags namees
                q_res = db_session.query(PostsTags).filter(PostsTags.post_id == row[0]).all()
                tags_ids = [tag.tag_id for tag in q_res]
                tags = [tag.content for tag in
                        [db_session.query(Tags).filter(Tags.id == tag_id).all()[0] for tag_id in tags_ids]]
                entry["tags"] = []
                for idx, tag_id in enumerate(tags_ids):
                    entry["tags"].append({'id': tag_id, 'label': tags[idx]})

                # info about comments
                q_res = db_session.query(Comments).filter(Comments.post_id == row[0]).all()
                comments = [comment.id for comment in q_res]
                entry["comments"] = comments
                resp_data["response"].append(entry)
            resp.data = str(resp_data).replace("'", "\"")
            return resp
        # count - get number of all posts
        if args["count"] is not None:
            n = list(db_session.execute("select count(*) from posts"))[0][0]
            resp.data = '{"response": ' + str(n) + '}'
            return resp
        # else - info about one post
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
                [db_session.query(Tags).filter(Tags.id == tag_id).all()[0] for tag_id in tags_ids]]

        q_res = db_session.query(Comments).filter(Comments.post_id == num_id).all()
        comments = [comment.id for comment in q_res]

        resp_data = {"response": {
            "title": post.title,
            "content": post.content,
            "votes": post.votes,
            "timeCreated": post.time_created.strftime("%m-%d-%Y"),
            "timeLastActive": post.time_last_active.strftime("%m-%d-%Y"),
            "views": post.views,
            "tags": tags,
            "comments": comments
        }}
        user = db_session.query(Users).filter(Users.id == post.author_id).all()[0]
        resp_data['response']['author'] = {
            'avatarIcon': user.avatat_icon,
            'nickname': user.username,
            'userRating': user.user_rating
        }

        resp_data = str(resp_data).replace("'", "\"")
        resp.data = resp_data
        return resp

    def put(self, num_id):
        # PUT BASE/posts/post_id?column=val - update something about the post (for up/down votes)
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
        # POST BASE/posts/0?title={}&content={}?author_id={} - add new post
        resp = Response("create post")
        resp.headers['Access-Control-Allow-Origin'] = '*'

        args = self.parser.parse_args()
        not_none_args = {k: v for k, v in args.items() if v is not None}

        # set default time as now
        not_none_args["time_created"] = not_none_args["time_created"] \
            if "time_created" in not_none_args else datetime.date.today().strftime("%m-%d-%Y")
        not_none_args["time_last_active"] = not_none_args["time_last_active"] \
            if "time_last_active" in not_none_args else datetime.date.today().strftime("%m-%d-%Y")

        # if absent some required arguments
        for arg in self.post_required_args:
            if arg not in not_none_args:
                resp.status = '404'
                resp.data = '{"response": "' + str(arg) + ' column is required"}'
                return resp

        new_entry = Posts()
        post_id = db_session.query(func.max(Posts.id)).scalar() + 1
        new_entry.__dict__ |= not_none_args | {'id': post_id}
        try:
            db_session.add(new_entry)
            db_session.commit()
        except Exception:
            resp.status = '405'
            resp.data = '{"response": "error occured while commiting changes"}'
            return resp
        resp.status = '201'
        resp.data = '{"response": ' + str(post_id) + '}'
        return resp

    def options(self, num_id):
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
        # GET BASE/comments/comment_id - get info about the comment
        q_res = db_session.query(Comments).filter(Comments.id == comment_id).all()
        comment = q_res[0]

        resp = Response('Comment information')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp_data = {"response": {
            "id": comment.id,
            "post_id": comment.post_id,
            "content": comment.content,
            "votes": comment.votes,
        }}

        # retrieve info about quthor
        user = db_session.query(Users).filter(Users.id == comment.author_id).all()[0]
        resp_data['response']['author'] = {
            'avatarIcon': user.avatat_icon,
            'nickname': user.username,
            'userRating': user.user_rating
        }
        resp_data = str(resp_data).replace("'", "\"")
        resp.data = resp_data
        resp.status = '200'
        return resp

    def put(self, comment_id):
        # PUT BASE/comments/0?arg=val - add comment
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

    def options(self, comment_id):
        resp = Response("allowed-methods")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
        resp.headers['Access-Control-Allow-Headers'] = 'content-type'
        resp.status = '204'
        return resp


class TagAPI(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("tags", help="new tags", required=False)
    parser.add_argument("aa", help="new tags", required=False)

    def get(self, post_id):
        # GET BASE/tags/0 - get list of all available tags
        resp = Response("All tags response")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        q_res = db_session.query(Tags).all()
        resp_data = {
            "response": []
        }
        for tag in q_res:
            resp_data["response"].append({"id": tag.id, "label": tag.content})
        resp.data = str(resp_data).replace("'", "\"")
        resp.status = '200'
        return resp

    def post(self, post_id):
        # POST BASE/posts/post_id + atatch in body {'tags': [tag1_name, tag2_name...]} -
        # add tags for given post
        resp = Response("Add new post-tag conection")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        posted_data = request.get_json(force=True)
        for tagname in posted_data["tags"]:
            tag_id = db_session.query(Tags).filter(Tags.content == tagname).all()[0].id
            new_entry = PostsTags()
            new_entry.post_id = post_id
            new_entry.tag_id = tag_id
            try:
                db_session.add(new_entry)
                db_session.commit()
            except Exception:
                resp.status = '405'
                resp.data = '{"response": "error occured while commiting changes"}'
                return resp
        resp.status = '201'
        return resp

    def options(self, post_id):
        resp = Response("allowed-methods")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
        resp.headers['Access-Control-Allow-Headers'] = 'content-type'
        resp.status = '204'
        return resp
