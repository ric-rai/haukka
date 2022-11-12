CREATE TYPE METADATA AS OBJECT (
  date_created DATE,
  date_modified DATE,
  is_deleted NUMBER (1, 0)
) NOT FINAL;

CREATE TABLE
  User_Account (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    metadata METADATA NOT NULL,
    user_identity VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    observatory INT,
    CONSTRAINT email_is_unique UNIQUE (email)
  );

CREATE TABLE
  Observatory (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    metadata METADATA NOT NULL,
    observatory_name VARCHAR(100) NOT NULL,
    actions VARCHAR(500) NOT NULL,
    CONSTRAINT observatory_name_is_unique UNIQUE (observatory_name)
  );

CREATE TABLE
  Observation_Type (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    metadata METADATA NOT NULL,
    observation_type_name VARCHAR(100) NOT NULL,
    observatory REFERENCES Observatory NOT NULL
  );

CREATE TABLE
  Observation_Location (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    metadata METADATA NOT NULL,
    location_name VARCHAR(100) NOT NULL,
    observatory REFERENCES Observatory NOT NULL
  );

CREATE TABLE
  Observatory_Day (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    metadata METADATA NOT NULL,
    observatory_day DATE NOT NULL,
    note VARCHAR(1000),
    observers VARCHAR(200) NOT NULL,
    selected_actions VARCHAR(500) NOT NULL,
    observatory REFERENCES Observatory NOT NULL
  );

CREATE TABLE
  Observation_Catch (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    metadata METADATA NOT NULL,
    catch_type VARCHAR(100) NOT NULL,
    catch_location VARCHAR(100) NOT NULL,
    net_code VARCHAR(100),
    amount INT NOT NULL,
    catch_length INT NOT NULL,
    opened_at VARCHAR(100) NOT NULL,
    closed_at VARCHAR(100) NOT NULL,
    day_row_number INT NOT NULL,
    observatory_day REFERENCES Observatory_Day NOT NULL
  );

CREATE TABLE
  Observation_Period (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    metadata METADATA NOT NULL,
    start_time DATE NOT NULL,
    end_time DATE NOT NULL,
    observation_type REFERENCES Observation_Type NOT NULL,
    observation_location REFERENCES Observation_Location NOT NULL,
    observatory_day REFERENCES Observatory_Day NOT NULL
  );

CREATE TABLE
  Shorthand (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    metadata METADATA NOT NULL,
    shorthand_block VARCHAR(4000) NOT NULL,
    observation_period REFERENCES Observation_Period NOT NULL
  );

CREATE TABLE
  Observation (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    metadata METADATA NOT NULL,
    species VARCHAR(100) NOT NULL,
    adult_unknown_count INT NOT NULL,
    adult_female_count INT NOT NULL,
    adult_male_count INT NOT NULL,
    juvenile_unknown_count INT NOT NULL,
    juvenile_female_count INT NOT NULL,
    juvenile_male_count INT NOT NULL,
    subadult_unknown_count INT NOT NULL,
    subadult_female_count INT NOT NULL,
    subadult_male_count INT NOT NULL,
    unknown_unknown_count INT NOT NULL,
    unknown_female_count INT NOT NULL,
    unknown_male_count INT NOT NULL,
    total_count INT NOT NULL,
    direction VARCHAR(100),
    bypass_side VARCHAR(100),
    notes VARCHAR(1000),
    observation_period REFERENCES Observation_Period NOT NULL,
    shorthand REFERENCES Shorthand,
    user_account REFERENCES User_Account NOT NULL
  );
