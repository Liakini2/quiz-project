SELECT * FROM answers
WHERE quiz_id = $1
ORDER BY answer_id;