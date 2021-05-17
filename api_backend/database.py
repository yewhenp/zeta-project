from sqlalchemy import create_engine, Table, MetaData
from sqlalchemy.orm import sessionmaker, mapper

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table


Base = declarative_base()


class Users:
    pass

    def __repr__(self):
        return f"Users(id={self.id}, userName={self.username}, " \
               f"email={self.email}, hashed_pass={self.hashed}"


table_names = {
    'users': Users,
}


def loadSession():
    engine = create_engine('postgresql://postgres::postgres@localhost:5432/ZETA_PROJECT')
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
