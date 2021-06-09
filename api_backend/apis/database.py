from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker, mapper

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table


Base = declarative_base()


class Users:
    pass

    def __repr__(self):
        return f"Users(id={self.id}, userName={self.username}, " \
               f"email={self.email}, hashed_pass={self.hashed})"


class Posts:
    pass

    def __repr__(self):
        return f"Post(id={self.id}, title={self.title}, content={self.content}, " \
               f"votes={self.votes}, time_created={self.time_created}, " \
               f"time_last_active={self.time_last_active}, views={self.views}, " \
               f"author_id={self.author_id})"


class PostsTags:
    pass

    def __repr__(self):
        return f"PostsTags(id={self.id}, post_id={self.post_id}, tag_id={self.tag_id})"


class Comments:
    pass

    def __repr__(self):
        return f"Comments(id={self.id}, post_id={self.post_id}, " \
               f"author_id={self.author_id}, content={self.content}, " \
               f"votes={self.votes})"


class Tags:
    pass

    def __repr__(self):
        return f"Tags(id={self.id}, content={self.content})"


class Votes:
    pass

    def __repr__(self):
        return f"Votes(id={self.id}, post_id={self.post_id}, comment_id={self.comment_id}, " \
               f"user_id={self.user_id}, vote={self.vote})"


table_names = {
    'users': Users,
    'posts': Posts,
    'post_tags': PostsTags,
    'comments': Comments,
    'tags': Tags,
    'votes': Votes
}


def loadSession():
    engine = create_engine('postgresql://postgres::postgres@localhost:5432/zeta_project')
    metadata = MetaData(engine)

    for table_name in table_names:
        mapper(table_names[table_name], Table(table_name, metadata, autoload=True))

    Session = sessionmaker(bind=engine)
    session = Session()
    return session


db_session = loadSession()
