SELECT u.ID, u.UserName, p.UserName AS 'ParentUserName'
FROM USER AS u
LEFT JOIN USER AS p
ON u.Parent = p.ID
ORDER BY u.ID ASC;