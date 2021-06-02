from flask_restful import Resource
from flask import Response, request
from apis.database import *


class VoteAPI(Resource):
    get_required_args = ['post_id', 'comments_id']
    post_required_args = ['user_id', 'post_id', 'comment_id', 'vote']

    def get(self, user_id):
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
        q_res_comments = db_session.execute("select * from votes where user_id=" + str(
            user_id) + " AND comment_id=ANY('{" + comments_ids_str + "}'::int[])")
        q_res_post = list(db_session.execute(
            "select * from votes where user_id=" + str(user_id) + " AND post_id=" + post_id_str))

        resp_data = {'response': {'post': 0, 'comments': [0 for _ in range(len(posted_data['comments_id']))]}}
        for row in q_res_comments:
            idx = posted_data['comments_id'].index(row.comment_id)
            resp_data['response']['comments'][idx] = 1 if row.vote else -1

        if len(q_res_post) > 0:
            resp_data['response']['post'] = 1 if q_res_post[0].vote else -1

        resp_data = str(resp_data).replace("'", "\"")
        resp.data = resp_data
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

        new_vote = Votes()
        new_vote.user_id = posted_data['user_id']
        new_vote.post_id = posted_data['post_id']
        new_vote.comment_id = posted_data['comment_id']
        new_vote.vote = True if posted_data['vote'] == 1 else False
        try:
            db_session.add(new_vote)
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
