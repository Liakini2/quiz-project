DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS quiz;
DROP TABLE IF EXISTS quiz_question;
DROP TABLE IF EXISTS answers;

CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(5000) NOT NULL,
    profile_pic TEXT NOT NULL
);

CREATE TABLE quiz(
    author_id INTEGER, 
        FOREIGN KEY(author_id) REFERENES user(user_id),
    quiz_id SERIAL PRIMARY KEY,
    quiz_image TEXT,
    type VARCHAR(50),
    description VARCHAR(500),
    title VARCHAR(100),
    date_created TIMESTAMP
);

CREATE TABLE quiz_question(
    quiz_id INTEGER, 
        FOREIGN KEY(quiz_id) REFERENES quiz(quiz_id),
    question_id SERIAL PRIMARY KEY,
    question_image TEXT,
    question VARCHAR(200),
    answer_a VARCHAR(200),
    answer_b VARCHAR(200),
    answer_c VARCHAR(200),
    answer_d VARCHAR(200),
    result INTEGER
);

CREATE TABLE answers(
    answer_id SERIAL PRIMARY KEY,
    user_id INTEGER, 
        FOREIGN KEY(user_id) REFERENES user(user_id),
    question_id INTEGER,
        FOREIGN KEY(question_id) REFERENES quiz_question(question_id),
    answer VARCHAR(500)
);