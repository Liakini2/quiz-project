DROP TABLE IF EXISTS result;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS quiz_question;
DROP TABLE IF EXISTS quiz;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(5000) NOT NULL,
    profile_pic TEXT
);

CREATE TABLE quiz (
    author_id INTEGER REFERENCES users(user_id),
    quiz_id SERIAL PRIMARY KEY,
    quiz_image TEXT,
    type VARCHAR(50),
    description VARCHAR(500),
    title VARCHAR(100)
);

CREATE TABLE quiz_question (
    quiz_id INTEGER REFERENCES quiz(quiz_id),
    question_id SERIAL PRIMARY KEY,
    question VARCHAR(250)
);

CREATE TABLE answers (
    question_id INTEGER REFERENCES quiz_question(question_id),
    answer_id SERIAL PRIMARY KEY,
    quiz_id INTEGER,
    answer VARCHAR(250),
    result BOOLEAN
);

CREATE TABLE result (
    user_id INTEGER REFERENCES users(user_id),
    quiz_id INTEGER REFERENCES quiz(quiz_id),
    result_id SERIAL PRIMARY KEY,
    result VARCHAR(500)
);

ALTER TABLE answers
ALTER COLUMN result
SET DEFAULT false;

SELECT * FROM users;
SELECT * FROM quiz;
SELECT * FROM quiz_question;
SELECT * FROM answers;