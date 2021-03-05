SELECT * FROM quiz q
JOIN quiz_question qq
ON q.quiz_id = qq.quiz_id
JOIN answers a
ON q.quiz_id = a.quiz_id
WHERE q.quiz_id = $1;
