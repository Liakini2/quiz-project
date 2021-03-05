UPDATE answers
SET (answer) = ($2)
WHERE answer_id = $1;
SELECT * FROM answers;