INSERT INTO quiz_question
(quiz_id, question)
VALUES
($1, $2)
RETURNING *;