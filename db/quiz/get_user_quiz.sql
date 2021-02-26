SELECT * FROM quiz q
JOIN users u
ON u.user_id = q.author_id
WHERE q.quiz_id = $1 AND q.author_id = $2;
