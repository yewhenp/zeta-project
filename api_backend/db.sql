create table users(
	id serial primary key,
	username varchar(30) not null unique,
	email varchar(50) not null unique,
	hashed text not null
);

insert into users(username, email, hashed) values
('Vitya', 'vitya1@gmail.com', '1234'),
('Misha', 'misha1@gmail.com', '4321');

drop table if exists users;

select * from users;