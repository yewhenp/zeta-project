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
	time_created date, 
	time_last_active date, 
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
);

create table comments (
	id serial primary key,
	post_id integer not null,
	author_id integer not null,
	content text,
	votes integer
);

create table votes (
    id serial primary key,
    post_id integer,
    comment_id integer,
    user_id integer not null,
    vote bool not null
);

insert into users(username, email, hashed) values
('Pasha', 'pasha@gmail.com', 'sha1$7a4e8ecc$1$339f4c437a6b860194a0d86ac880d84d8526f53b'), -- password 123
('Misha', 'misha@gmail.com', 'sha1$600321a0$1$c59b9981b60b68fece266141aeddcf656ae82758'), -- password 321
('Anton_Antonov', 'Anton_Antonov@gmail.com', 'sha1$600321a0$1$c59b9981b60b68fece266141aeddcf656ae82758'), -- password 321
('Serhiy_Serhiiv', 'Serhiy_Serhiiv@gmail.com', 'sha1$600321a0$1$c59b9981b60b68fece266141aeddcf656ae82758'), -- password 321
('Makar_Makarov', 'Makar_Makarov@gmail.com', 'sha1$600321a0$1$c59b9981b60b68fece266141aeddcf656ae82758'); -- password 321

insert into comments(post_id, author_id, content, votes) values 
(1, 2, 'Paracetamol is metabolized in the liver.

In the setting of acute overdose, liver conjugation (Phase 2 reaction) is overloaded leading to paracetamol being metabolized by an alternative pathway.

This alternative pathway leads to a toxic- metabolite: NAPQI (N-acetyl-p-benzoquinone imine).

This is usually inactivated by glutathione.

If the paracetamol overdose is severe, glutathione is depleted leading to accumulation of NAPQI and subsquent necrosis of liver and kidney tissue.

Acetaminophen is another name for paracetamol.

Glucoronyl is an example of a chemical group added onto a drug during conjugation.

N-acetyl cysteine is used to treat paracetamol overdose to replenish glutathione levels.', 10),
(1, 3, 'Paracetamol is metabolized in the liver.

In the setting of acute overdose, liver conjugation (Phase 2 reaction) is overloaded leading to paracetamol being metabolized by an alternative pathway.

This alternative pathway leads to a toxic- metabolite: NAPQI (N-acetyl-p-benzoquinone imine).

This is usually inactivated by glutathione.

If the paracetamol overdose is severe, glutathione is depleted leading to accumulation of NAPQI and subsquent necrosis of liver and kidney tissue.

Acetaminophen is another name for paracetamol.

Glucoronyl is an example of a chemical group added onto a drug during conjugation.

N-acetyl cysteine is used to treat paracetamol overdose to replenish glutathione levels.', 15);

insert into posts(title, content, votes, time_created, time_last_active, views, author_id) values ('What is a NullPointerExceptio
 n, and how do I fix it?', 'Explanation
 
 Paracetamol is metabolized in the liver.
 
 In the setting of acute overdose, liver conjugation (Phase 2 reaction) is overloaded leading to paracetamol being metabolized by an alt
 ernative pathway.
 
 This alternative pathway leads to a toxic- metabolite: NAPQI (N-acetyl-p-benzoquinone imine).
 
 This is usually inactivated by glutathione.
 
 If the paracetamol overdose is severe, glutathione is depleted leading to accumulation of NAPQI and subsquent necrosis of liver and kid
 ney tissue.
 
 Acetaminophen is another name for paracetamol.
 
 Glucoronyl is an example of a chemical group added onto a drug during conjugation.
 
 N-acetyl cysteine is used to treat paracetamol overdose to replenish glutathione levels.', 10, 'October 20, 2008', 'April 25, 2021', 3300000, 1);

insert into tags(content) values ('Angular'),('jQuery'),('Polymer'),('React'), ('Vue.js'),('StepanJS The Best Framework Ever');

insert into post_tags(post_id, tag_id) values (1, 2), (1, 4), (1, 5);

insert into votes(post_id, comment_id, user_id, vote) values
    (null, 1, 1, true),
    (1, null, 1, true);
