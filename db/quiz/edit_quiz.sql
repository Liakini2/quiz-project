UPDATE quiz
SET(quiz_image, description, title) = ($3, $4, $5)
WHERE quiz_id = $1 AND author_id = $2;
SELECT * FROM quiz;
