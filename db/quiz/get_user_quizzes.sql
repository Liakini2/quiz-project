SELECT * FROM quiz q
JOIN users u
ON u.user_id = q.author_id
WHERE q.author_id = $1
ORDER BY quiz_id ASC;
