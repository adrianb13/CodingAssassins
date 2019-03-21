DROP DATABASE IF EXISTS developerdb;
CREATE DATABASE developerdb;

USE developerdb;

CREATE TABLE developer (
	id int(11) AUTO_INCREMENT NOT NULL,
    name varchar(50) NOT NULL,
    experience varchar(200) NOT NULL,
    cost_to_hire int(11) NOT NULL,
    hired BOOLEAN DEFAULT FALSE NOT NULL,
    hired_by varchar(50),
    password int(4),
    PRIMARY KEY (id)
);

CREATE TABLE client (
	in int(11) AUTO_INCREMENT NOT NULL,
    username varchar(50) NOT NULL,
    phone_number int(11) NOT NULL,
    job_requested_header varchar(50) NOT NULL,
    job_requested varchar(200) NOT NULL,
    job_completed BOOLEAN DEFAULT FALSE NOT NULL,
    PRIMARY KEY (id)
)

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;