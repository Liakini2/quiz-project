INSERT INTO user
(username, email, password, profile_pic)
VALUES 
($1, $2, $3, $4)
RETURNING *;