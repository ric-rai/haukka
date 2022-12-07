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

-- Ensures the observatory's observation types are valid.
-- If type name occurs more than once, the additional occurrences are ignored.
CREATE OR REPLACE TRIGGER validate_observatory_observation_types 
    BEFORE INSERT OR UPDATE ON Observatory FOR EACH ROW
DECLARE
    type_name VARCHAR(100);
    observation_types VARCHAR(1000) := '[';
BEGIN
    FOR obs_type IN (SELECT ot.type_name FROM JSON_TABLE(:NEW.observation_types, '$[*]' 
      COLUMNS(type_name VARCHAR(100) PATH '$' ERROR ON ERROR)) as ot)
    LOOP
        SELECT name INTO type_name FROM observation_type WHERE name = obs_type.type_name;
        IF NOT observation_types LIKE '%"'||type_name||'"%' THEN
            observation_types := observation_types||'"'||type_name||'"'; 
        END IF;
    END LOOP;
    observation_types := REPLACE(observation_types, '""', '","') || ']';
    :NEW.observation_types := observation_types;
END;

-- If location occurs more than once, the additional occurrences are ignored. 
CREATE OR REPLACE TRIGGER ignore_duplicate_observatory_locations
    BEFORE INSERT OR UPDATE ON Observatory FOR EACH ROW
DECLARE
    locations VARCHAR(1000) := '[';
BEGIN
    FOR locs IN (SELECT l.loc FROM JSON_TABLE(:NEW.locations, '$[*]' 
      COLUMNS(loc VARCHAR(100) PATH '$' ERROR ON ERROR)) as l)
    LOOP
        IF NOT locations LIKE '%"'||locs.loc||'"%' THEN
            locations := locations||'"'||locs.loc||'"'; 
        END IF;
    END LOOP;
    locations := REPLACE(locations, '""', '","') || ']';
    :NEW.locations := locations;
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
    id DATE GENERATED ALWAYS AS (
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

CREATE OR REPLACE TRIGGER create_day_metadata
    BEFORE INSERT ON Day FOR EACH ROW
BEGIN :NEW.metadata := create_metadata(); END;

CREATE OR REPLACE TRIGGER update_day_metadata 
    BEFORE UPDATE ON Day FOR EACH ROW
BEGIN :NEW.metadata := update_metadata(:OLD.metadata); END;

CREATE OR REPLACE TRIGGER validate_day_data
    BEFORE INSERT OR UPDATE ON Day FOR EACH ROW
DECLARE
    to_integer INTEGER;
    to_varchar VARCHAR(100);
    catch_prop_count INTEGER := 0;
    period_prop_count INTEGER;
    obs_prop_count INTEGER;
    obj JSON_OBJECT_T;
    obj_keys JSON_KEY_LIST;
    locations VARCHAR(1000); 
    obs_types VARCHAR(1000);
BEGIN
    SELECT locations INTO locations FROM Observatory 
        WHERE name = JSON_VALUE(:NEW.data, '$.observatory' 
            RETURNING VARCHAR(1000) ERROR ON ERROR); 
    SELECT observation_types INTO obs_types FROM Observatory 
        WHERE name = JSON_VALUE(:NEW.data, '$.observatory' 
            RETURNING VARCHAR(1000) ERROR ON ERROR); 
    FOR data IN (SELECT d.catch FROM JSON_TABLE(:NEW.data, '$.catches[*]' 
        COLUMNS(catch VARCHAR FORMAT JSON PATH '$' ERROR ON ERROR)) as d)
    LOOP
        to_varchar := JSON_VALUE(data.catch, '$.type' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.catch, '$.openedAt' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.catch, '$.closedAt' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.catch, '$.amount' ERROR ON ERROR);
        to_varchar := JSON_VALUE(data.catch, '$.location' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.catch, '$.netLength' ERROR ON ERROR);
        to_varchar := JSON_VALUE(data.catch, '$.netCode' ERROR ON ERROR);
        obj := JSON_OBJECT_T(data.catch);
        obj_keys := obj.get_keys;
        IF obj_keys.count != 7 THEN
            raise_application_error(-20001,'Too many properties on a catch!');
        END IF;
    END LOOP;
    FOR data IN (SELECT d.period FROM JSON_TABLE(:NEW.data, '$.periods[*]' 
        COLUMNS(period VARCHAR FORMAT JSON PATH '$' ERROR ON ERROR)) as d)
    LOOP
        to_varchar := JSON_VALUE(data.period, '$.type' ERROR ON ERROR);
        IF NOT obs_types LIKE '%"'||to_varchar||'"%' THEN
            raise_application_error(-20001,'Observation type not found on an observatory!'); 
        END IF;
        to_varchar := JSON_VALUE(data.period, '$.location' ERROR ON ERROR);
        IF NOT locations LIKE '%"'||to_varchar||'"%' THEN
            raise_application_error(-20001,'Location not found on an observatory!'); 
        END IF;
        to_integer := JSON_VALUE(data.period, '$.startTime' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.period, '$.endTime' ERROR ON ERROR);
        obj := JSON_OBJECT_T(data.period);
        obj_keys := obj.get_keys;
        IF obj_keys.count != 5 THEN
            raise_application_error(-20001,'Too many properties on a period!');
        END IF;
    END LOOP;
    FOR data IN (SELECT d.obs FROM JSON_TABLE(:NEW.data, '$.periods[*].observations[*]' 
        COLUMNS(obs VARCHAR FORMAT JSON PATH '$' ERROR ON ERROR)) as d)
    LOOP
        to_varchar := JSON_VALUE(data.obs, '$.species' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.adultUnknownCount' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.adultFemaleCount' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.adultMaleCount' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.juvenileUnknownCount' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.juvenileFemaleCount' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.juvenileMaleCount' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.subAdultUnknownCount' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.subAdultFemaleCount' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.subAdultMaleCount' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.unknownUnknownCount' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.unknownFemaleCount' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.unknownMaleCount' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.totalCount' ERROR ON ERROR);
        to_varchar := JSON_VALUE(data.obs, '$.direction' ERROR ON ERROR);
        to_integer := JSON_VALUE(data.obs, '$.bypassSide' ERROR ON ERROR);
        to_varchar := JSON_VALUE(data.obs, '$.notes' ERROR ON ERROR);
        obj := JSON_OBJECT_T(data.obs);
        obj_keys := obj.get_keys;
        IF obj_keys.count != 17 THEN
            raise_application_error(-20001,'Too many properties on an observation!');
        END IF;
    END LOOP;
END;
