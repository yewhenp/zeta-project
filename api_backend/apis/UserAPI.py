from flask_restful import Resource, reqparse
from flask import Response
from apis.database import *


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
