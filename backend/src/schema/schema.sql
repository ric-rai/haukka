CREATE OR REPLACE FUNCTION create_metadata RETURN VARCHAR
IS metadata VARCHAR(100);
BEGIN
    metadata := JSON_OBJECT(
            'created' VALUE CURRENT_DATE,
            'modified' VALUE CURRENT_DATE,
            'isDeleted' VALUE '0');
    RETURN metadata;
END;

CREATE OR REPLACE FUNCTION update_metadata(prev IN VARCHAR) RETURN VARCHAR
IS metadata VARCHAR(100);
BEGIN
    metadata := JSON_OBJECT(
            'created' VALUE JSON_VALUE(prev, '$.created'),
            'modified' VALUE CURRENT_DATE,
            'isDeleted' VALUE JSON_VALUE(prev, '$.isDeleted') );
    RETURN metadata;
END;

CREATE TABLE
  Observation_Type (
    name VARCHAR(100) PRIMARY KEY,
    metadata VARCHAR(100) NOT NULL,
    CONSTRAINT observation_type_metadata_is_json CHECK (metadata IS JSON)
  )

CREATE OR REPLACE TRIGGER create_observation_type_metadata
    BEFORE INSERT ON Observation_Type FOR EACH ROW
BEGIN :NEW.metadata := create_metadata(); END;

CREATE OR REPLACE TRIGGER update_observation_type_metadata 
    BEFORE UPDATE ON Observation_Type FOR EACH ROW
BEGIN :NEW.metadata := update_metadata(:OLD.metadata); END;

CREATE TABLE
  Observatory (
    name VARCHAR(100) PRIMARY KEY,
    metadata VARCHAR(100) NOT NULL,
    actions VARCHAR(1000) NOT NULL,
    locations VARCHAR(1000) NOT NULL,
    observation_types VARCHAR(1000) NOT NULL,
    CONSTRAINT observatory_metadata_is_json CHECK (metadata IS JSON),
    CONSTRAINT observatory_actions_is_json CHECK (actions IS JSON),
    CONSTRAINT observatory_locations_is_json CHECK (locations IS JSON),
    CONSTRAINT observatory_observation_types_is_json CHECK (observation_types IS JSON)
  )

CREATE OR REPLACE TRIGGER create_observatory_metadata
    BEFORE INSERT ON Observatory FOR EACH ROW
BEGIN :NEW.metadata := create_metadata(); END;

CREATE OR REPLACE TRIGGER update_observatory_metadata 
    BEFORE UPDATE ON Observatory FOR EACH ROW
BEGIN :NEW.metadata := update_metadata(:OLD.metadata); END;

CREATE OR REPLACE TRIGGER validate_observatory_observation_types 
    BEFORE INSERT ON OBSERVATORY FOR EACH ROW
DECLARE
    type_list VARCHAR(100);
    type_name VARCHAR(100);
BEGIN
    FOR obs_type IN (
      SELECT ot.type_name FROM 
        JSON_TABLE(:NEW.observation_types, '$[*]' 
          COLUMNS(type_name VARCHAR(100) PATH '$' ERROR ON ERROR)
        ) as ot
    )
    LOOP
        SELECT name INTO type_name FROM observation_type WHERE name = obs_type.type_name;
    END LOOP;
END;

CREATE TABLE
  Person (
    id NUMBER PRIMARY KEY,
    metadata VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    observatory VARCHAR(100) REFERENCES Observatory (name),
    CONSTRAINT person_metadata_is_json CHECK (metadata IS JSON)
  )

CREATE OR REPLACE TRIGGER create_person_metadata
    BEFORE INSERT ON Person FOR EACH ROW
BEGIN :NEW.metadata := create_metadata(); END;

CREATE OR REPLACE TRIGGER update_person_metadata 
    BEFORE UPDATE ON Person FOR EACH ROW
BEGIN :NEW.metadata := update_metadata(:OLD.metadata); END;

CREATE TABLE
  Day (
    date_date DATE GENERATED ALWAYS AS (
      JSON_VALUE (data, '$.date' RETURNING DATE ERROR ON ERROR)
    ) PRIMARY KEY,
    metadata VARCHAR(100) NOT NULL,
    data BLOB NOT NULL,
    observatory VARCHAR(100) GENERATED ALWAYS AS (  
      JSON_VALUE (data, '$.observatory' RETURNING VARCHAR(100) ERROR ON ERROR)
    ) REFERENCES Observatory (name),
    CONSTRAINT day_metadata_is_json CHECK (metadata IS JSON),
    CONSTRAINT day_data_is_json CHECK (data IS JSON)
  )
