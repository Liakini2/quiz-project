INSERT INTO result
(quiz_id, user_id, result)
VALUES 
($1, $2, $3)
RETURNING *;