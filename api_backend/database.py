from sqlalchemy import create_engine, Table, MetaData
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


table_names = {
    'users': Users,
    'posts': Posts,
    'post_tags': PostsTags,
    'comments': Comments,
    'tags': Tags
}


def loadSession():
    engine = create_engine('postgresql://postgres::postgres@localhost:5432/zeta_project')
    metadata = MetaData(engine)

    for table_name in table_names:
        mapper(table_names[table_name], Table(table_name, metadata, autoload=True))

    Session = sessionmaker(bind=engine)
    session = Session()
    return session


if __name__ == '__main__':
    session = loadSession()
    res = session.query(Users).filter(Users.id == 2).all()
    print(res)
