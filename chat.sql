CREATE DATABASE IF NOT EXISTS chat;
USE chat;

create table if not exists Users
(
    id int not null primary key auto_increment,
    name varchar(200) NOT NULL UNIQUE
);

create table if not exists Message
(
    id int not null primary key auto_increment,
    message varchar(200) NOT NULL,
    sender int,
    sent_at datetime,
    FOREIGN KEY (sender) references Users(id)
);