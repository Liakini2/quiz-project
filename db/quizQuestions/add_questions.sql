INSERT INTO quiz_question
(quiz_id, question_image, question, answers)
VALUES
($1, $2, $3, $4, $5, $6, $7);
SELECT * FROM quiz_question;