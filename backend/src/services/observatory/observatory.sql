;

-- INSERT:
INSERT INTO
  Observatory (metadata, observatory_name, actions)
VALUES
  (`:metadata`, `:name`, `:actions`);

-- SELECT_BY_NAME:
SELECT
  *
FROM
  Observatory
WHERE
  observatory_name = `:name`;
