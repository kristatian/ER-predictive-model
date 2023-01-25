CREATE DATABASE IF NOT EXISTS erDB;
USE erDB;

CREATE TABLE user (
    user_id VARCHAR(36) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE prediction_history(
    request_id VARCHAR(36) NOT NULL UNIQUE,
    user_id VARCHAR(36) NOT NULL,
    input_vars JSON NOT NULL,
    prediction VARCHAR(255),
    date_time TIMESTAMP,
    PRIMARY KEY (request_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE what_if_scenario(
    scenario_id VARCHAR(36) NOT NULL UNIQUE,
    user_id VARCHAR(36) NOT NULL,
    scenario_name VARCHAR(255) NOT NULL,
    input_vars JSON NOT NULL,
    PRIMARY KEY (scenario_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

ALTER TABLE what_if_scenario
ADD scenario_name VARCHAR(255) NOT NULL;