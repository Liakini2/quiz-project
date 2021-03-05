SELECT * FROM quiz_question
WHERE quiz_id = $1;

-- SELECT * FROM quiz_question q
-- JOIN answers a
-- ON q.question_id = a.question_id
-- WHERE q.quiz_id = $1 AND q.question_id = $2;