;

-- INSERT:
INSERT INTO
  OBSERVATORY (metadata, observatory_name, actions)
VALUES
  (`:metadata`, `:name`, `:actions`);

-- SELECT_BY_NAME:
SELECT
  *
FROM
  OBSERVATORY
WHERE
  observatory_name = `:name`;
