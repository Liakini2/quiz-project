INSERT INTO quiz_question
(quiz_id, question_image, question, answer_a, answer_b, answer_c, answer_d)
VALUES
($1, $2, $3, $4, $5, $6, $7);
SELECT * FROM quiz_question;