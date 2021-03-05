DELETE FROM answers
WHERE question_id = $1;
SELECT * FROM answers;