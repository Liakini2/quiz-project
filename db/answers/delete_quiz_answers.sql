DELETE FROM answers
WHERE quiz_id = $1;
SELECT * FROM answers;