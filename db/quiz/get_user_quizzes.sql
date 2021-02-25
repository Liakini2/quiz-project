SELECT * FROM quiz q
JOIN user u
ON u.user_id = q.author_id
WHERE q.author_id = $1;
