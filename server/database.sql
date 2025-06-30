CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY, -- serial funciton automatically increments primary key so that it is unique
    description VARCHAR (255)
);

-- dont have to create database and table like this, you can technically just do it straight in the command line, but this is more visually pleasing and kinda keeps a record