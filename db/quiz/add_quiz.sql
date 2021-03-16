INSERT INTO quiz
(author_id, quiz_image, description, title)
VALUES
($1, $2, $3, $4)
RETURNING *;