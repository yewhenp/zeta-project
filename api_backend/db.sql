create table users(
	id serial primary key,
	username varchar(30) not null unique,
	email varchar(50) not null unique,
	hashed text not null,
	user_rating integer default 0, 
	avatat_icon text default 'https://data.whicdn.com/images/341606254/original.jpg'
);

create table posts ( 
	id serial primary key, 
	title text not null, 
	content text not null, 
	votes integer default 0, 
	timeCreated date, 
	timeLasted date, 
	views integer default 0, 
	author_id integer,
	constraint author_id_FK
		foreign key (author_id) references users(id) on delete cascade
);

create table tags (
	id serial primary key,
	content text not null
);

create table post_tags (
	id serial primary key,
	post_id integer not null,
	tag_id integer not null,

	constraint post_FK
		foreign key (post_id) references posts(id) on delete cascade,
	constraint tag_FK
		foreign key (tag_id) references tags(id) on delete cascade
)

insert into users(username, email, hashed) values
('Vitya', 'vitya1@gmail.com', '1234'),
('Misha', 'misha1@gmail.com', '4321');

drop table if exists users;

select * from users;