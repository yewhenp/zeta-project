from flask_restful import Resource, reqparse
from flask import Response, request
from apis.database import *


class CommentAPI(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("title", type=str, help="title", required=False)
    parser.add_argument("content", type=str, help="content", required=False)
    parser.add_argument("votes", type=str, help="votes", required=False)
    parser.add_argument("time_created", type=str, help="time_created", required=False)
    parser.add_argument("time_last_active", type=str, help="time_last_active", required=False)
    parser.add_argument("views", type=str, help="views", required=False)
    parser.add_argument("author_id", type=str, help="author_id", required=False)
    required_args_post = ["author_id", "post_id", "content"]

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
        # PUT BASE/comments/0?arg=val - update info
        args = self.parser.parse_args()
        resp = Response("Update comment info")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        not_none_args = {k: v for k, v in args.items() if v is not None}
        comment = db_session.query(Comments).filter(Comments.id == comment_id).all()[0]
        for key, value in not_none_args.items():
            setattr(comment, key, value)

        db_session.commit()
        resp.status = '200'
        return resp

    def post(self, comment_id):
        # POST BASE/comments/0 + attach in body {'author_id': author_id, 'post_id': post_id,  'content': content}
        resp = Response("Add new comment")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        posted_data = request.get_json(force=True)
        for arg in self.required_args_post:
            if arg not in posted_data:
                resp.status = '400'
                resp.data = '{"response": "missing required argument: ' + arg + '"}'
                return resp

        new_comment = Comments()
        new_comment.author_id = posted_data['author_id']
        new_comment.post_id = posted_data['post_id']
        new_comment.content = posted_data['content']
        new_comment.votes = 0
        try:
            db_session.add(new_comment)
            db_session.commit()
        except Exception:
            resp.status = '405'
            resp.data = '{"response": "error occured while commiting changes"}'
            return resp
        resp.status = '201'
        return resp

    def options(self, comment_id):
        resp = Response("allowed-methods")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
        resp.headers['Access-Control-Allow-Headers'] = 'content-type'
        resp.status = '204'
        return resp
