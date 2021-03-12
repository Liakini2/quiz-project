SELECT * FROM quiz_question
WHERE question_id = $1
ORDER BY question_id;