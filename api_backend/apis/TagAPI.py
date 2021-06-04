from flask_restful import Resource, reqparse
from flask import Response, request
from apis.database import *
import json


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
        resp.data = json.dumps(resp_data)
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
