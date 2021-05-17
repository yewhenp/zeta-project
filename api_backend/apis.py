from flask_restful import Api, Resource, reqparse, abort
from flask import Response, make_response
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

        # resp = make_response("login_approve")
        resp = Response('login_approve')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        if q_res:
            user = q_res[0]
            args = self.parser.parse_args()
            if user.hashed == args.hashed:
                resp.status = '200'
            else:
                resp.status = '403'
            return resp
        else:
            resp.status = '404'
            resp.data = '{"message": "There is no user with username: ' + username + '"}'
            return resp
            # abort(404, message=f"There is no user with username: {username}")

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