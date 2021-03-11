UPDATE answers
SET answer = $2, result = $3
WHERE answer_id = $1
RETURNING *;