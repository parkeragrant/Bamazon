DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

ALTER TABLE products ADD product_sales INT NOT NULL;

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs INT NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Windex', 'Household Goods', 4.99, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Bug Spray', 'Outdoor', 5.69, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Coding 101', 'Books', 39.99, 274);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Black Stools', 'Home Decor', 299.49, 27);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Craftsmen Tool Box', 'Outdoor', 499.99, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Soccer Ball', 'Sporting Goods', 21.59, 421);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Mens T-shirt', 'Mens Appareal', 9.99, 221);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Womens Shoes', 'Womens Appareal', 13.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Holes', 'Books', 7.99, 682);

-- join should bring in the dept sales from products into the department db
-- I need to bring in product_sales dept_id and department name
-- 


SELECT department_name
FROM products
JOIN departments
ON products.department_name=departments.department_name;


INSERT INTO departments (department_name, over_head_costs)
VALUES ('Household Goods', 5000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Outdoor', 1000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Books', 2000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Home Decor', 700);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Sporting Goods', 600);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Mens Appareal', 2000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Womens Appareal', 1300);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Food', 1700);

SELECT 

select * from products as p
inner join departments as d on p.item_department = d.department_name;

