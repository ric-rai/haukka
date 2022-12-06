;

-- INSERT:
INSERT INTO
  Observatory (metadata, name, actions)
VALUES
  (`:metadata`, `:name`, `:actions`);

-- SELECT_BY_NAME:
SELECT
  *
FROM
  Observatory
WHERE
  name = `:name`;
