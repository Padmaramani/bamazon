
-- Drops the programming_db if it already exists --
-- DROP DATABASE IF EXISTS bamazon;
-- Create a database called programming_db --
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows. --
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(10,2),
  stock_quantity INTEGER,
  PRIMARY KEY (id)
);

-- Creates new rows
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Harry Potter and the chamber of secrets", "books",25.45,10);


INSERT INTO  products (product_name,department_name,price,stock_quantity)
VALUES ("Rapberry pi", "electronics",34.50,25);

INSERT INTO  products (product_name,department_name,price,stock_quantity)
VALUES ("Tennis Shoes", "sports",99.50,5);

INSERT INTO  products (product_name,department_name,price,stock_quantity)
VALUES ("Kitchen sink", "Home",199.50,2);

INSERT INTO  products (product_name,department_name,price,stock_quantity)
VALUES ("Dining table", "Home",459.50,6);

INSERT INTO  products (product_name,department_name,price,stock_quantity)
VALUES ("Chocolate with tedd bear", "gift",10.50,10);

INSERT INTO  products (product_name,department_name,price,stock_quantity)
VALUES ("Flowers", "gift",21.30,8);

INSERT INTO  products (product_name,department_name,price,stock_quantity)
VALUES ("Book shelf", "home",242.60,2);

INSERT INTO  products (product_name,department_name,price,stock_quantity)
VALUES ("Tennis racquet", "sports",199.50,5);

INSERT INTO  products (product_name,department_name,price,stock_quantity)
VALUES ("Tennis Ball", "sports",2.95,50);

