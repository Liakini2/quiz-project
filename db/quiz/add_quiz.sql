INSERT INTO quiz
(author_id, quiz_image, type, description, title)
VALUES
($1, $2, $3, $4, $5);
SELECT * FROM quiz;