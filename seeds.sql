
USE developerdb;

ALTER TABLE developers CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE developers CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE clients CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE clients CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO developes(name, experience, cost_to_hire, password)
VALUES("Fredrick", "current student", 800, 1234),
    ("Larry", "I've made a website before", 200, 1232),
    ("Lorietta", "One year experience in CSS and HTML", 400, 1232),
    ("Londre", "Graduate from UCLA", 900, 9000),
    ("Junior", "5 years as a Senior Full Stack Developper", 1000, 8929),
    ("Heather", "Worked for Google for three years", 400, 2902),
    ("Jerry", "UCSD bootcamp", 200, 0910),
    ("Josh", "Learned coding on my own", 100, 9201),
    ("Adrian", "Graduate of Computer Science from Yale", 1000, 8292),
    ("Gerald", "Graduate from MIT", 90, 1012);


INSERT INTO clients(name, phone_number, job_header, job_requested)
VALUES("Jacob", 6786786677, "Need an app made", "App needs to be able to help locate events"),
    ("Jorge", 6198282222, "Need a polished front end", "I need my website to look modern"),
    ("Lawrence", 9890982234, "Need a faster app", "My website is slow, I need to debug it."),
    ("Pooh", 9098763633, "Need a hang man game made", "The game needs to be two pages long so that it's more interactive"),
    ("Gertrude", 8987655446, "Need a polished backend", "I'd like to get my backend working more smoothly"),
    ("Barry", 8272627272, "Need a full website", "The website needs to be about dogs"),
    ("Jorgette", 7383739201, "Need an RPG game", "Make characters from scratch and battle them against each other"),
    ("Carl", 8012329876, "I need a simple game", "Get creative, impress me"),
    ("Hob", 9210238769, "Need a monopoly type game", "Need the game to be like monopoly, but doesn't have to be."),
    ("Kyle", 2794037282, "Need a website of books", "I'd like to get the website to read out loud the books and turn the page when it's done.");
    
USE developerdb;
SELECT * FROM developers;
SELECT * FROM clients;

