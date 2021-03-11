UPDATE quiz_question
SET question = $2
WHERE question_id = $1
RETURNING *;