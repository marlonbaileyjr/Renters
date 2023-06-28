CREATE SEQUENCE owner_id_seq START WITH 100 INCREMENT BY 1; 

CREATE TABLE owners (
  owner_id NUMBER DEFAULT owner_id_seq.NEXTVAL PRIMARY KEY, 
  firstnm VARCHAR2(50),
  lastnm VARCHAR2(50),
  phonenum VARCHAR2(10) Unique,
  email VARCHAR2(100) Unique,
  CONSTRAINT chk_phonenum_length
    CHECK (LENGTH(phonenum) = 10)
);

CREATE SEQUENCE user_id_seq START WITH 100 INCREMENT BY 1; 

CREATE TABLE users (
  user_id NUMBER DEFAULT user_id_seq.NEXTVAL PRIMARY KEY, 
  username VARCHAR2(50) UNIQUE,
  email VARCHAR2(100) UNIQUE,
  password VARCHAR2(100),
  owner_id NUMBER, 
  ssn VARCHAR2(9) UNIQUE, 
  firstnm VARCHAR2(50),
  lastnm VARCHAR2(50),
  phonenum VARCHAR2(10),
  CONSTRAINT chk_ssn_length
    CHECK (LENGTH(ssn) = 9),
  CONSTRAINT chk_ssn_digits
    CHECK (regexp_like(ssn, '^\d{9}$')),
  CONSTRAINT fk_owner
    FOREIGN KEY (owner_id) REFERENCES owners(owner_id),
  CONSTRAINT chk_phonenum_length_users
    CHECK (LENGTH(phonenum) = 10)
);

CREATE SEQUENCE property_id_seq START WITH 100 INCREMENT BY 1; 
CREATE TABLE properties (
  property_id NUMBER DEFAULT property_id_seq.NEXTVAL PRIMARY KEY, 
  owner_id NUMBER,
  tenant_id NUMBER,
  property_type VARCHAR2(50),
  property_unitnum VARCHAR2(100),
  property_street VARCHAR2(100),
  property_city VARCHAR2(100),
  property_zip VARCHAR2(10),
  property_state VARCHAR2(100),
  CONSTRAINT fk_owner_prop
    FOREIGN KEY (owner_id) REFERENCES owners(owner_id),
  CONSTRAINT fk_tenant_prop
    FOREIGN KEY (tenant_id) REFERENCES users(user_id)
);

CREATE SEQUENCE transaction_id_seq START WITH 100 INCREMENT BY 1; 

CREATE TABLE transactions (
  transaction_id NUMBER DEFAULT transaction_id_seq.NEXTVAL PRIMARY KEY, 
  user_id NUMBER,
  property_id NUMBER,
  credit_card VARCHAR2(16),
  transaction_type VARCHAR2(50),
  transaction_amount NUMBER,
  transaction_date DATE,
  CONSTRAINT chk_credit_card_length
    CHECK (LENGTH(credit_card) = 16),
  CONSTRAINT chk_credit_card_digits
    CHECK (regexp_like(credit_card, '^\d{16}$')),
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_property
    FOREIGN KEY (property_id) REFERENCES properties(property_id)
);

CREATE SEQUENCE document_id_seq START WITH 100 INCREMENT BY 1;

CREATE TABLE documents (
  document_id NUMBER DEFAULT document_id_seq.NEXTVAL PRIMARY KEY, 
  user_id NUMBER,
  property_id NUMBER,
  document_type VARCHAR2(50),
  document_name VARCHAR2(100),
  document_date DATE,
  document BLOB,
  CONSTRAINT fk_user_doc
    FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_property_doc
    FOREIGN KEY (property_id) REFERENCES properties(property_id)
);

CREATE TABLE signup (
  unique_code VARCHAR2(10) PRIMARY KEY,
  first_name VARCHAR2(50),
  last_name VARCHAR2(50),
  email VARCHAR2(100),
  created_time TIMESTAMP,
  expiration_time TIMESTAMP
);

CREATE SEQUENCE signup_prop_id_seq START WITH 100 INCREMENT BY 1;

CREATE TABLE signup_prop (
  signup_prop_id NUMBER DEFAULT signup_prop_id_seq.NEXTVAL PRIMARY KEY,
  property_id VARCHAR2(10),
  unique_code VARCHAR2(10),
  FOREIGN KEY (unique_code) REFERENCES signup(unique_code)
);


-- Insert 5 records into the users table
INSERT INTO users (username, email, password, owner_id, ssn, firstnm, lastnm, phonenum)
VALUES ('user1', 'user1@example.com', 'password1', 100, '123456789', 'John', 'Doe', '1234567890');

INSERT INTO users (username, email, password, owner_id, ssn, firstnm, lastnm, phonenum)
VALUES ('user2', 'user2@example.com', 'password2', 100, '987654321', 'Jane', 'Smith', '9876543210');

INSERT INTO users (username, email, password, owner_id, ssn, firstnm, lastnm, phonenum)
VALUES ('user3', 'user3@example.com', 'password3', 100, '456789123', 'Mark', 'Johnson', '4567891230');

INSERT INTO users (username, email, password, owner_id, ssn, firstnm, lastnm, phonenum)
VALUES ('user4', 'user4@example.com', 'password4', 100, '789123456', 'Sarah', 'Brown', '7891234560');

INSERT INTO users (username, email, password, owner_id, ssn, firstnm, lastnm, phonenum)
VALUES ('user5', 'user5@example.com', 'password5', 100, '321987654', 'Michael', 'Lee', '3219876540');


-- Insert 5 records into the owners table
INSERT INTO owners (firstnm, lastnm, phonenum, email)
VALUES ('John', 'Doe', '1234567890', 'owner1@example.com');

INSERT INTO owners (firstnm, lastnm, phonenum, email)
VALUES ('Jane', 'Smith', '9876543210', 'owner2@example.com');

INSERT INTO owners (firstnm, lastnm, phonenum, email)
VALUES ('Mark', 'Johnson', '4567891230', 'owner3@example.com');

INSERT INTO owners (firstnm, lastnm, phonenum, email)
VALUES ('Sarah', 'Brown', '7891234560', 'owner4@example.com');

INSERT INTO owners (firstnm, lastnm, phonenum, email)
VALUES ('Michael', 'Lee', '3219876540', 'owner5@example.com');


-- Insert 5 records into the properties table
INSERT INTO properties (owner_id, property_type, property_unitnum, property_street, property_city, property_zip, property_state)
VALUES (100, 'Apartment', 'Unit 101', '123 Main St', 'New York', 'NY', 'USA');

INSERT INTO properties (owner_id, property_type, property_unitnum, property_street, property_city, property_zip, property_state)
VALUES (100, 'Condo', 'Unit 202', '456 Elm St', 'Los Angeles', 'CA', 'USA');

INSERT INTO properties (owner_id, property_type, property_unitnum, property_street, property_city, property_zip, property_state)
VALUES (100, 'House', '1234 Oak St', 'Apt 303', 'Chicago', 'IL', 'USA');

INSERT INTO properties (owner_id, property_type, property_unitnum, property_street, property_city, property_zip, property_state)
VALUES (100, 'Duplex', 'Unit A', '567 Pine St', 'Miami', 'FL', 'USA');

INSERT INTO properties (owner_id, property_type, property_unitnum, property_street, property_city, property_zip, property_state)
VALUES (100, 'Townhouse', 'Unit 404', '789 Maple St', 'Houston', 'TX', 'USA');
