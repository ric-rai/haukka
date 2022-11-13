;

-- INSERT:
INSERT INTO
  User_Account (metadata, user_identity, full_name, email)
VALUES
  (`:metadata`, `:id`, `:fullName`, `:emailAddress`);

-- SELECT_BY_EMAIL:
SELECT
  *
FROM
  User_Account
WHERE
  email = `:email`;
