;

-- INSERT:
INSERT INTO
  Person (metadata, identity, name, email)
VALUES
  (`:metadata`, `:id`, `:fullName`, `:emailAddress`);

-- SELECT_BY_EMAIL:
SELECT
  *
FROM
  Person
WHERE
  email = `:email`;
