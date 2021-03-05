INSERT INTO answers
(question_id, quiz_id, answer)
VALUES
($1, $2, $3);
SELECT * FROM answers
WHERE question_id = $1;