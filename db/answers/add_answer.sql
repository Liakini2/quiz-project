INSERT INTO answers
(question_id, quiz_id, answer, result)
VALUES
($1, $2, $3, $4);
SELECT * FROM answers
WHERE question_id = $1;