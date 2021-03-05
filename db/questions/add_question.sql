INSERT INTO quiz_question
(quiz_id, question, question_image)
VALUES
($1, $2, $3)
RETURNING *;