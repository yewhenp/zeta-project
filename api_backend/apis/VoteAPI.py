from flask_restful import Resource
from flask import Response, request
from apis.database import *
import json


class VoteAPI(Resource):
    get_required_args = ['post_id', 'comments_id']
    post_required_args = ['user_id', 'post_id', 'comment_id', 'vote']

    def put(self, user_id):
        # GET BASE/votes/user_id  + attach {"post_id": id, comments_id: [id1, id2, ...]}
        # - get all posts/comments, where user upvoted/downvoted

        resp = Response('Comment information')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        posted_data = request.get_json(force=True)
        for arg in self.get_required_args:
            if arg not in posted_data:
                resp.status = '400'
                resp.data = '{"response": "missing required argument: ' + arg + '"}'
                return resp

        comments_ids_str = str(posted_data['comments_id']).replace("[", "").replace("]", "")
        post_id_str = str(posted_data['post_id'])
        resp_data = {'response': {'post_id': {posted_data['post_id']: 0},
                                  'comments': {comment_id: 0 for comment_id in (posted_data['comments_id'])}}}

        if len(posted_data['comments_id']) > 0:
            print("select * from votes where user_id=" + str(
                user_id) + " AND comment_id=ANY('{" + comments_ids_str + "}'::int[])")
            q_res_comments = db_session.execute("select * from votes where user_id=" + str(
                user_id) + " AND comment_id=ANY('{" + comments_ids_str + "}'::int[])")
            for row in q_res_comments:
                print(row)
                resp_data['response']['comments'][row.comment_id] = 1 if row.vote else -1
        if posted_data['post_id'] is not None:
            q_res_post = list(db_session.execute(
                "select * from votes where user_id=" + str(user_id) + " AND post_id=" + post_id_str))
            if len(q_res_post) > 0:
                resp_data['response']['post_id'][posted_data['post_id']] = 1 if q_res_post[0].vote else -1

        resp.data = json.dumps(resp_data)
        resp.status = '200'
        return resp

    def post(self, user_id):
        # POST BASE/votes/user_id + attach in body {'user_id': user_id, 'post_id': post_id, 'comment_id': comment_id,
        # 'vote': vote}
        resp = Response("Add new vote")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        posted_data = request.get_json(force=True)
        for arg in self.post_required_args:
            if arg not in posted_data:
                resp.status = '400'
                resp.data = '{"response": "missing required argument: ' + arg + '"}'
                return resp
        if posted_data["vote"] == 0:
            if posted_data["post_id"] is None:
                q_res = db_session.query(Votes).filter(Votes.user_id == posted_data["user_id"]).\
                    filter(Votes.comment_id == posted_data["comment_id"]).all()
            else:
                q_res = db_session.query(Votes).filter(Votes.user_id == posted_data["user_id"]).\
                    filter(Votes.post_id == posted_data["post_id"]).all()
            try:
                for row in q_res:
                    # firstly change rating of the post creator
                    if posted_data["post_id"]:
                        q_res_post = db_session.query(Posts).filter(Posts.id == posted_data["post_id"]).all()[0]
                        q_res_user = db_session.query(Users).filter(Users.id == q_res_post.author_id).all()[0]
                    else:
                        q_res_comment = db_session.query(Comments).filter(Comments.id == posted_data["comment_id"]).all()[0]
                        q_res_user = db_session.query(Users).filter(Users.id == q_res_comment.author_id).all()[0]

                    if row.vote:
                        q_res_user.user_rating = q_res_user.user_rating - 1
                    else:
                        q_res_user.user_rating = q_res_user.user_rating + 1
                    print(q_res_user.user_rating)

                    # delete vote
                    db_session.delete(row)
                    db_session.commit()
            except Exception as err:
                print(err)
                resp.status = '405'
                resp.data = '{"response": "error occured while commiting changes"}'
                return resp
        else:
            new_vote = Votes()
            new_vote.user_id = posted_data['user_id']
            new_vote.post_id = posted_data['post_id']
            new_vote.comment_id = posted_data['comment_id']
            new_vote.vote = True if posted_data['vote'] == 1 else False
            try:
                db_session.add(new_vote)

                if posted_data["post_id"]:
                    q_res_post = db_session.query(Posts).filter(Posts.id == posted_data["post_id"]).all()[0]
                    q_res_user = db_session.query(Users).filter(Users.id == q_res_post.author_id).all()[0]
                else:
                    q_res_comment = db_session.query(Comments).filter(Comments.id == posted_data["comment_id"]).all()[0]
                    q_res_user = db_session.query(Users).filter(Users.id == q_res_comment.author_id).all()[0]

                if new_vote.vote:
                    q_res_user.user_rating = q_res_user.user_rating + 1
                else:
                    q_res_user.user_rating = q_res_user.user_rating - 1

                db_session.commit()
            except Exception as err:
                print(err)
                resp.status = '405'
                resp.data = '{"response": "error occured while commiting changes"}'
                return resp
        resp.status = '201'
        return resp

    def options(self, user_id):
        resp = Response("allowed-methods")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
        resp.headers['Access-Control-Allow-Headers'] = 'content-type'
        resp.status = '204'
        return resp
