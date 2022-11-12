;

-- INSERT:
INSERT INTO
  OBSERVATORY (meta_data, observatory_name, actions)
VALUES
  (`:meta_data`, `:name`, `:actions`);

-- SELECT_BY_NAME:
SELECT
  *
FROM
  OBSERVATORY
WHERE
  observatory_name = `:name`;
