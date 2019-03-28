
USE developerdb;

ALTER TABLE developers CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE developers CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE clients CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE clients CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO developers(name, experience, cost_to_hire, password)
VALUES("Fredrick", "Current student in Web Development", 300, 1234),
    ("Larry", "I've made a few websites already", 200, 1232),
    ("Lorietta", "One year experience in CSS and HTML", 400, 1232),
    ("Londre", "Graduated from UCLA as a Programmer", 700, 9000),
    ("Junior", "5 years as a Senior Full Stack Developer", 1000, 8929),
    ("Heather", "Worked for Google for three years", 600, 2902),
    ("Jerry", "UCSD Coding Bootcamp Student", 200, 1910),
    ("Josh", "Learned coding on my own", 100, 9201),
    ("Adrian", "Graduate of Computer Science from Yale", 800, 8292),
    ("Gerald", "Graduate from MIT", 900, 1012);


INSERT INTO clients(name, phone_number, job_header, job_requested)
VALUES("Jacob", "678-678-6677", "Need an app made", "App needs to be able to help locate events"),
    ("Jorge", "619-828-2222", "Need a polished front end", "I need my website to look modern"),
    ("Lawrence", "989-098-2234", "Need a faster app", "My website is slow, I need to debug it."),
    ("Pooh", "909-876-3633", "Need a hangman game made", "The game needs to be two pages long so that it's more interactive"),
    ("Gertrude", "898-765-5446", "Need a polished backend functionality for an existing site.", "I'd like to get my backend working more smoothly"),
    ("Barry", "827-262-7272", "Need a full website for my personal use", "The website needs to be about dogs"),
    ("Jorgette", "738-373-9201", "Need an RPG game", "Make characters from scratch and battle them against each other"),
    ("Carl", "801-232-9876", "I need a simple game", "Get creative, impress me"),
    ("Hob", "921-023-8769", "Need a monopoly type game", "Need the game to be like monopoly, but doesn't have to be."),
    ("Kyle", "279-403-7282", "Need a website of books", "I'd like to get the website to read out loud the books and turn the page when it's done.");
    
USE developerdb;
SELECT * FROM developers;
SELECT * FROM clients;