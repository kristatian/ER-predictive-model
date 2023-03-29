CREATE DATABASE IF NOT EXISTS erDB;
USE erDB;

CREATE TABLE user (
    user_id VARCHAR(36) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE what_if_scenario(
    scenario_id VARCHAR(36) NOT NULL UNIQUE,
    user_id VARCHAR(36) NOT NULL,
    scenario_name VARCHAR(255) NOT NULL,
    input_vars JSON NOT NULL,
    archived boolean DEFAULT false,
    PRIMARY KEY (scenario_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE what_if_scenario_history(
    scenario_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    scenario_name VARCHAR(255) NOT NULL,
    input_vars JSON NOT NULL,
    version_number INTEGER,
    PRIMARY KEY (scenario_id, version_number),
    FOREIGN KEY (scenario_id) REFERENCES what_if_scenario(scenario_id)
);

CREATE TABLE prediction(
    request_id VARCHAR(36) NOT NULL UNIQUE,
    scenario_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    input_vars JSON NOT NULL,
    prediction VARCHAR(255),
    date_time TIMESTAMP,
    scenario_version_number INTEGER,
    scenario_id VARCHAR(150) NOT NULL,
    PRIMARY KEY (request_id),
    FOREIGN KEY (scenario_id) REFERENCES what_if_scenario(scenario_id)
);

DELIMITER $$
CREATE TRIGGER what_if_scenario_history_insert
    AFTER INSERT
    ON what_if_scenario FOR EACH ROW
BEGIN
    INSERT INTO what_if_scenario_history (scenario_id, user_id, input_vars, scenario_name, version_number)
    VALUES (new.scenario_id, new.user_id, new.input_vars, new.scenario_name, 1);
END$$

DELIMITER ;

DELIMITER $$
CREATE TRIGGER what_if_scenario_history_update
    AFTER UPDATE
    ON what_if_scenario FOR EACH ROW
BEGIN
    DECLARE x INTEGER;
    SET x = (SELECT MAX(version_number) FROM what_if_scenario_history WHERE scenario_id = new.scenario_id);
    INSERT INTO what_if_scenario_history (scenario_id, user_id, input_vars, scenario_name, version_number)
    VALUES (new.scenario_id, new.user_id, new.input_vars, new.scenario_name, x + 1);
END$$

DELIMITER ;