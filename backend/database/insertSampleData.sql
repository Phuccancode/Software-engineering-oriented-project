
SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'users' AND TABLE_SCHEMA = 'Harmonie';


INSERT INTO users (fname, lname, dob, sex, phone, email, password) VALUES 
        ('Nguyễn', 'Một', '2000-01-01', 'M', '0111111111', 'nguyenmot@gmail.com', '123456');
INSERT INTO users (fname, lname, dob, sex, phone, email, password) VALUES 
        ('Nguyễn', 'Hai', '2000-01-01', 'F', '0222222222', 'nguyenhai@gmail.com', '123456');
INSERT INTO users (fname, lname, dob, sex, phone, email, password) VALUES 
        ('Nguyễn', 'Ba', '2000-01-01', 'M', '0333333333', 'nguyenba@gmail.com', '123456');
INSERT INTO users (fname, lname, dob, sex, phone, email, password) VALUES 
        ('Nguyễn', 'Bốn', '2000-01-01', 'M', '0444444444', 'nguyenbon@gmail.com', '123456');


SELECT * FROM users;

SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'stores' AND TABLE_SCHEMA = 'Harmonie';


INSERT INTO stores (id, name, address, tax_id, description) VALUES 
    (1, 'Store1', 'Q.9, TP.HCM', '111111111', 'Store1 description');
INSERT INTO stores (id, name, address, tax_id, description) VALUES 
    (2, 'Store2', 'Q.5, TP.HCM', '222222222', 'Store2 description');
INSERT INTO stores (id, name, address, tax_id, description) VALUES 
    (3, 'Store3', 'Q.1 TP.HCM', '333333333', 'Store3 description');

SELECT * FROM stores;

INSERT INTO categories (name) VALUES ('Electronics');
INSERT INTO categories (name) VALUES ('Foods');
INSERT INTO categories (name) VALUES ('Comestics');

SELECT * FROM categories;

DELETE FROM categories;

SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'products' AND TABLE_SCHEMA = 'Harmonie';


INSERT INTO products (store_id, name, brand, price, quantity, description, category_id) VALUES 
    (1, 'Kem chống nắng', 'Anessa', 200000, 200, 'Đây là kem chống nắng, để chống nắng', 8);
INSERT INTO products (store_id, name, brand, price, quantity, description, category_id) VALUES 
    (1, 'TV 50 inches', 'LG', 50000000, 100, 'TV siêu to siêu mỏng', 6);
INSERT INTO products (store_id, name, brand, price, quantity, description, category_id) VALUES 
    (2, 'Xúc xích Đức', 'Vissan', 32000, 999, 'Xúc xích ngon ngon', 7);
INSERT INTO products (store_id, name, brand, price, quantity, description, category_id) VALUES 
    (2, 'Sửa rửa mặt', 'CeraVe', 175000, 800, 'Rửa mặt cho sạch nè', 8);
INSERT INTO products (store_id, name, brand, price, quantity, description, category_id) VALUES 
    (3, 'Son môi', 'Dior', 6000000, 160, 'Bôi son cho xinh', 8);
INSERT INTO products (store_id, name, brand, price, quantity, description, category_id) VALUES 
    (3, 'Laptop 160Hz', 'Lenovo', 40000000, 60, NULL, 6);

SELECT * FROM products;


SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'delivery_informations' AND TABLE_SCHEMA = 'Harmonie';


INSERT INTO delivery_informations (user_id, consignee_name, phone_number, road_number, ward, district, city) VALUES 
    (1, 'Nguyễn Một Con', '0111111112', '1231 Tân Lập', 'Đông Hòa', 'Dĩ An', 'Bình Dương');
INSERT INTO delivery_informations (user_id, consignee_name, phone_number, road_number, ward, district, city) VALUES 
    (1, 'Nguyễn Một Mẹ', '0111111113', '1232 CMT8', 'ABC', 'Q.9', 'HCM');
INSERT INTO delivery_informations (user_id, consignee_name, phone_number, road_number, ward, district, city) VALUES 
    (4, 'Nguyễn Bốn Con', '0444444441', '1241 3T2', 'Đức Hòa', 'Bình Tân', 'HCM');
INSERT INTO delivery_informations (user_id, consignee_name, phone_number, road_number, ward, district, city) VALUES 
    (4, 'Nguyễn Bốn Cha', '0444444442', '1242 3T3', 'Đức Hòa', 'Bình Tân', 'HCM');


SELECT * FROM delivery_informations;


SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'discounts' AND TABLE_SCHEMA = 'Harmonie';

INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('system1', 50, '2021-01-01', '2021-12-31');
INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('system2', 100, '2021-05-05', '2021-06-05');
INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('system3', 200, '2021-07-07', '2021-08-07');

INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('store11', 30, '2021-09-09', '2021-10-09');
INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('store12', 240, '2021-09-09', '2021-10-09');
INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('store13', 30, '2021-09-09', '2021-10-09');

INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('store21', 150, '2021-09-09', '2021-10-09');
INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('store22', 300, '2021-09-09', '2021-10-09');
INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('store23', 400, '2021-09-09', '2021-10-09');

INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('store31', 220, '2021-09-09', '2021-10-09');
INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('store32', 110, '2021-09-09', '2021-10-09');
INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('store33', 690, '2021-09-09', '2021-10-09');

INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('shipping1', 100, '2021-09-09', '2021-10-09');
INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('shipping2', 200, '2021-09-09', '2021-10-09');
INSERT INTO discounts (code, quantity, start_date, expiration_date) VALUES 
    ('shipping3', 300, '2021-09-09', '2021-10-09');

SELECT * FROM discounts;


INSERT INTO system_discounts(discount_id, max_amount, percentage, min_bill_amt) VALUES
    (1, 50000, 10, 500000);
INSERT INTO system_discounts(discount_id, max_amount, percentage, min_bill_amt) VALUES
    (2, 100000, 20, 1000000);
INSERT INTO system_discounts(discount_id, max_amount, percentage, min_bill_amt) VALUES
    (3, 20000, 5, 200000);

UPDATE discounts
SET expiration_date = '2025-12-31'

SELECT *
FROM discounts D, system_discounts SD
WHERE D.id = SD.discount_id;




SELECT * FROM stores;
SELECT * FROM discounts;

INSERT INTO store_discounts(discount_id, amount, store_id) VALUES
    (4, 10000, 1);
INSERT INTO store_discounts(discount_id, amount, store_id) VALUES
    (5, 5000, 1);
INSERT INTO store_discounts(discount_id, amount, store_id) VALUES
    (6, 20000, 1);

INSERT INTO store_discounts(discount_id, amount, store_id) VALUES
    (7, 15000, 2);
INSERT INTO store_discounts(discount_id, amount, store_id) VALUES
    (8, 10000, 2);
INSERT INTO store_discounts(discount_id, amount, store_id) VALUES
    (9, 5000, 2);

INSERT INTO store_discounts(discount_id, amount, store_id) VALUES
    (10, 5000, 3);
INSERT INTO store_discounts(discount_id, amount, store_id) VALUES
    (11, 15000, 3);
INSERT INTO store_discounts(discount_id, amount, store_id) VALUES
    (12, 10000, 3);


SELECT *
FROM discounts D, store_discounts SD
WHERE D.id = SD.discount_id;
GROUP BY SD.store_id;

UPDATE discounts
SET expiration_date = '2025-12-31'
WHERE id = 6  OR id = 7;


INSERT INTO shipping_discounts(discount_id, max_amount) VALUES
    (13, 50000);
INSERT INTO shipping_discounts(discount_id, max_amount) VALUES
    (14, 100000);
INSERT INTO shipping_discounts(discount_id, max_amount) VALUES
    (15, 150000);


SELECT *
FROM discounts D, shipping_discounts SD
WHERE D.id = SD.discount_id;