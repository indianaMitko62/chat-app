-- DROP DATABASE IF EXISTS chat;
-- CREATE DATABASE chat;
USE chat;

-- create table Users
-- (
-- 	id int not null primary key auto_increment,
-- 	name varchar(200) NOT NULL
-- );

-- drop table Message;

-- create table Message
-- (
-- 	id int not null primary key auto_increment,
--	     message varchar(200) NOT NULL,
--     sender int,
--     FOREIGN KEY (sender) references Users(id)
-- );

-- insert into Users (name) values ("Indiana");
-- insert into Users (name) values ("Mitko");

-- insert into Message (message, sender) values ("alo da from Indiana", 1);
-- insert into Message (message, sender) values ("alo da from Mitko", 2);

SELECT * from Users;

-- delete from Message where id = 28;

-- Mitaka golqm
-- SELECT Message.message, sender.name AS sender_name FROM Message
-- JOIN Users AS sender ON sender.id = Message.sender;

select message, Users.name, Message.id, Users.id from Message
left join Users on Users.id = Message.sender;

