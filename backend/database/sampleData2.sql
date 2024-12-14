USE Harmonie;

INSERT INTO users (full_name, dob, sex, phone, email, password)
VALUES
    ('John', 'Doe', '1990-05-15', 'M', '1234567890', 'john.doe@example.com', 'password123'),
    ('Alice', 'Smith', '1985-08-25', 'M', '0987654321', 'alice.smith@example.com', 'password456'),
    ('Robert', 'Johnson', '1992-03-10', 'M', '1112223333', 'robert.johnson@example.com', 'password789');
INSERT INTO stores (id, name, address, tax_id, description)
VALUES
    (1, 'Tech World', '123 Tech Street', 'TX123456', 'Electronics and gadgets store'),
    (2, 'Fashion Hub', '456 Style Avenue', 'TX654321', 'Clothing and accessories store'),
    (3, 'Grocery Mart', '789 Fresh Lane', 'TX789123', 'Supermarket for everyday needs');
INSERT INTO categories (name)
VALUES
    ('Electronics'),
    ('Clothing'),
    ('Groceries'),
    ('Books'),
    ('Toys');
INSERT INTO products (store_id, name, brand, price, quantity, description, buying_count, rating_count, avg_rating, category_id, status)
VALUES
    (1, 'Smartphone', 'TechBrand', 299.99, 50, 'Latest smartphone with advanced features', 120, 30, 4.5, 1, 'enable'),
    (2, 'Jeans', 'FashionLine', 49.99, 200, 'Comfortable and stylish jeans', 80, 20, 4.2, 2, 'enable'),
    (3, 'Organic Milk', 'FarmFresh', 2.99, 500, 'Fresh organic milk from local farms', 150, 50, 4.8, 3, 'enable'),
    (1, 'Laptop', 'TechBrand', 899.99, 30, 'High-performance laptop for work and gaming', 70, 25, 4.6, 1, 'enable'),
    (3, 'Bread', 'Baker\'s Choice', 1.99, 300, 'Soft and freshly baked bread', 200, 40, 4.9, 3, 'enable');
INSERT INTO product_images (product_id, url)
VALUES
(1, 'https://example.com/images/product1-1.jpg'),
(1, 'https://example.com/images/product1-2.jpg'),
(2, 'https://example.com/images/product2-1.jpg'),
(3, 'https://example.com/images/product3-1.jpg'),
(3, 'https://example.com/images/product3-2.jpg'),
(3, 'https://example.com/images/product3-3.jpg'),
(4, 'https://example.com/images/product4-1.jpg'),
(5, 'https://example.com/images/product5-1.jpg');
INSERT INTO reviews (user_id, product_id, rating, text, time)
VALUES
(1, 1, 5, 'Sản phẩm rất tuyệt vời, chất lượng tốt!', '2024-12-01 10:00:00'),
(2, 1, 4, 'Giao hàng nhanh, nhưng đóng gói chưa kỹ.', '2024-12-02 11:30:00'),
(3, 2, 3, 'Sản phẩm ổn, giá hơi cao so với chất lượng.', '2024-12-03 09:15:00'),
(2, 3, 5, 'Rất hài lòng, sẽ ủng hộ lần sau.', '2024-12-04 14:45:00'),
(2, 2, 2, 'Sản phẩm không giống như mô tả.', '2024-12-05 16:20:00');

INSERT INTO discounts (code, quantity, release_date, start_date, expiration_date)
VALUES
('TECH10', 100, CURRENT_TIMESTAMP, '2024-12-10 00:00:00', '2024-12-31 23:59:59'),
('FASHION20', 50, CURRENT_TIMESTAMP, '2024-12-05 00:00:00', '2024-12-25 23:59:59'),
('GROCERY5', 200, CURRENT_TIMESTAMP, '2024-12-01 00:00:00', '2024-12-20 23:59:59');

INSERT INTO store_discounts (discount_id, amount, store_id)
VALUES
(1, 10.00, 1), -- Giảm giá 10 cho Tech World
(2, 20.00, 2), -- Giảm giá 20 cho Fashion Hub
(3, 5.00, 3);  -- Giảm giá 5 cho Grocery Mart

INSERT INTO system_discounts (discount_id, max_amount, percentage, min_bill_amt)
VALUES
(1, 50.00, 10, 100.00), -- Giảm giá tối đa 50 với 10% khi hoá đơn tối thiểu 100
(2, 100.00, 20, 200.00), -- Giảm giá tối đa 100 với 20% khi hoá đơn tối thiểu 200
(3, 25.00, 5, 50.00);    -- Giảm giá tối đa 25 với 5% khi hoá đơn tối thiểu 50

INSERT INTO shipping_discounts (discount_id, max_amount)
VALUES
(1, 15.00), -- Giảm giá phí vận chuyển tối đa 15 cho TECH10
(2, 30.00), -- Giảm giá phí vận chuyển tối đa 30 cho FASHION20
(3, 10.00); -- Giảm giá phí vận chuyển tối đa 10 cho GROCERY5

INSERT INTO delivery_informations (user_id, consignee_name, phone_number, road_number, ward, district, city)
VALUES
(1, 'John Doe', '1234567890', '123 Tech Road', 'Tech Ward', 'Tech District', 'Tech City'),
(2, 'Alice Smith', '0987654321', '456 Fashion Road', 'Style Ward', 'Style District', 'Style City'),
(3, 'Robert Johnson', '1112223333', '789 Grocery Lane', 'Fresh Ward', 'Fresh District', 'Fresh City');

INSERT INTO products_in_carts (user_id, product_id, quantity)
VALUES
(1, 1, 2), -- John Doe mua 2 chiếc Smartphone
(1, 4, 1), -- John Doe mua 1 chiếc Laptop
(2, 2, 3), -- Alice Smith mua 3 chiếc quần Jeans
(3, 3, 5); -- Robert Johnson mua 5 hộp sữa Organic Milk

INSERT INTO orders (consignee_information_id, total_price, system_discount_id, pay_method)
VALUES
(1, 1500.00, 1, 'Cash'), -- Đơn hàng của John Doe, áp dụng giảm giá hệ thống
(2, 250.00, 2, 'Credit');  -- Đơn hàng của Alice Smith, áp dụng giảm giá hệ thống

INSERT INTO boxes (store_id, order_id, store_discount_id, shipping_discount_id, shipper_name, shipper_phone, total_price, fee_ship, predicted_delivery_date, caution, status)
VALUES
(1, 1, 1, 1, 'Shipper A', '1234567890', 1000.00, 50.00, '2024-12-15', 'Handle with care', 'Pending'),
(2, 2, 2, 2, 'Shipper B', '0987654321', 200.00, 20.00, '2024-12-12', 'Fragile', 'Shipped');

INSERT INTO products_in_boxes (box_id, product_id, quantity, total_price)
VALUES
(1, 1, 2, 599.98), -- 2 chiếc Smartphone trong hộp của Tech World
(1, 4, 1, 899.99), -- 1 chiếc Laptop trong hộp của Tech World
(2, 2, 3, 149.97); -- 3 chiếc quần Jeans trong hộp của Fashion Hub
