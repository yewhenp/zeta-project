create table users(
	id serial primary key,
	userName varchar(30) not null,
	email varchar(50) not null unique,
	hashed_password integer not null,
);