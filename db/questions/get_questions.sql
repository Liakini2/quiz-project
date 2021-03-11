SELECT * FROM quiz_question
WHERE quiz_id = $1
ORDER BY question_id;
