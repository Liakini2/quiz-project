UPDATE quiz_question
SET (question, question_image) = ($3, $4)
WHERE question_id = $1 AND quiz_id = $2;
SELECT * FROM quiz_question;