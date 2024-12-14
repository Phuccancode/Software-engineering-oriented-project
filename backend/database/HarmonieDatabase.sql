DROP DATABASE IF EXISTS Harmonie;

CREATE DATABASE IF NOT EXISTS Harmonie CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE Harmonie;


DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
	id              INT             AUTO_INCREMENT              PRIMARY KEY,
	full_name          VARCHAR(50)	                      NOT NULL,
	dob             DATE                                        ,
	sex 	        ENUM('M', 'F', 'Other')                     ,
	phone           VARCHAR(10)     UNIQUE                      ,
	email           VARCHAR(50)    	UNIQUE                      NOT NULL,
	creation_date   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP   NOT NULL,
	password 		VARCHAR(65) 								NOT NULL,
	code_verify        VARCHAR(6)									DEFAULT NULL,
    role			ENUM ('ADMIN','USER') 	default				'USER'
);


DROP TABLE IF EXISTS stores;
CREATE TABLE IF NOT EXISTS stores (
	id              INT                                         PRIMARY KEY,
    name            VARCHAR(20)  	                            NOT NULL,
    address         VARCHAR(100)                                NOT NULL,
	creation_date   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
	tax_id          VARCHAR(15)     UNIQUE                      NOT NULL,
	description     TEXT,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories (
	id              INT             AUTO_INCREMENT              PRIMARY KEY,
	name            VARCHAR(20)                                 NOT NULL
);
ALTER TABLE categories
	MODIFY COLUMN name VARCHAR(20) UNIQUE NOT NULL;


DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS products (
	id              INT             AUTO_INCREMENT				PRIMARY KEY,
	store_id		INT                                         NOT NULL,
	name            VARCHAR(20)                                 NOT NULL,
	brand           VARCHAR(20),
	price           DECIMAL(10,2)                               NOT NULL,
	quantity        INT                                         NOT NULL,
	description     TEXT,
	buying_count    INT             DEFAULT 0,
	rating_count    INT             DEFAULT 0,
    avg_rating      DECIMAL(5,2)    DEFAULT 0.0,
	category_id     INT 			DEFAULT NULL,
    num_image 		INT 			DEFAULT 0,
    status			ENUM ('enable','disable')	default 'enable',
    
	FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES categories(id)
);



DROP TABLE IF EXISTS product_images;
CREATE TABLE IF NOT EXISTS product_images (
	id				INT             AUTO_INCREMENT              PRIMARY KEY,
    product_id      INT				                            NOT NULL,
    url	  	   	    VARCHAR(255)                                NOT NULL,

	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    
	UNIQUE (product_id, url)
);


DROP TABLE IF EXISTS delivery_informations;
CREATE TABLE IF NOT EXISTS delivery_informations (
	id				INT             AUTO_INCREMENT              PRIMARY KEY,
    user_id         INT                                         NOT NULL,
    consignee_name  VARCHAR(50)                                 NOT NULL,
    phone_number	VARCHAR(10)                                 NOT NULL,
	road_number     VARCHAR(20)                                 NOT NULL,
	ward			VARCHAR(50)                                 NOT NULL,
	district		VARCHAR(50)                                 NOT NULL,
	city			VARCHAR(50)                                 NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS reviews;
CREATE TABLE IF NOT EXISTS reviews (
	id				INT             AUTO_INCREMENT              PRIMARY KEY, 
	user_id        INT             			              	NOT NULL,
	product_id      INT                                         NOT NULL,
	rating          INT              							NOT NULL,
	text     		TEXT,
	time 		  	TIMESTAMP       DEFAULT CURRENT_TIMESTAMP   NOT NULL,

	CHECK(rating BETWEEN 1 AND 5),

	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (product_id) REFERENCES products(id)
);


DROP TABLE IF EXISTS products_in_carts;
CREATE TABLE IF NOT EXISTS products_in_carts (
	id				INT             AUTO_INCREMENT              PRIMARY KEY,
	user_id         INT                                         NOT NULL,
    product_id      INT                                         NOT NULL,
	quantity        INT                                         NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE (product_id, user_id)
);


DROP TABLE IF EXISTS discounts;
CREATE TABLE IF NOT EXISTS discounts (
    id              INT             AUTO_INCREMENT              PRIMARY KEY,
	code            VARCHAR(50)                                 NOT NULL,
	quantity        INT                                         NOT NULL,
	release_date    TIMESTAMP       DEFAULT CURRENT_TIMESTAMP   NOT NULL,
	start_date      DATETIME                                    NOT NULL,
    expiration_date DATETIME                                    NOT NULL
);


DROP TABLE IF EXISTS store_discounts;
CREATE TABLE IF NOT EXISTS store_discounts (
	id			  INT             AUTO_INCREMENT	    		PRIMARY KEY,
    discount_id	  INT											NOT NULL,
	amount        DECIMAL(10,2)                               	NOT NULL,
	store_id      INT                                         	NOT NULL,

	FOREIGN KEY (discount_id) REFERENCES discounts(id) ON DELETE CASCADE,
	FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS system_discounts;
CREATE TABLE IF NOT EXISTS system_discounts (

	id			  INT             	AUTO_INCREMENT				PRIMARY KEY,

  discount_id	  INT 											NOT NULL,
	max_amount    DECIMAL(10,2)                               	NOT NULL,
	percentage    INT		                                	NOT NULL,
	min_bill_amt  DECIMAL(10,2)		DEFAULT 0                  	NOT NULL,

	CHECK (percentage BETWEEN 0 AND 100),

	FOREIGN KEY (discount_id) REFERENCES discounts(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS shipping_discounts;
CREATE TABLE IF NOT EXISTS shipping_discounts (

	id			  INT             		AUTO_INCREMENT						PRIMARY KEY,
    discount_id	  INT											NOT NULL,
	max_amount    DECIMAL(10,2)                               	NOT NULL,

	FOREIGN KEY (discount_id) REFERENCES discounts(id) ON DELETE CASCADE
);



DROP TABLE IF EXISTS orders;
CREATE TABLE IF NOT EXISTS orders (
	id               		INT             AUTO_INCREMENT              PRIMARY KEY,
	consignee_information_id  	INT                                 	NOT NULL,
	creation_date    		TIMESTAMP       DEFAULT CURRENT_TIMESTAMP	NOT NULL,
	total_price     	 	DECIMAL(10,2)                               NOT NULL,
	system_discount_id		INT             DEFAULT NULL,
	pay_method       		ENUM('Cash', 'Credit', 'Debit')             NOT NULL,
    status          		ENUM('Pending', 'Paid')     DEFAULT 'Pending',

	FOREIGN KEY (consignee_information_id) REFERENCES delivery_informations(id),
	FOREIGN KEY (system_discount_id) REFERENCES system_discounts(id)
);

DROP TABLE IF EXISTS boxes;
CREATE TABLE IF NOT EXISTS boxes ( -- each store in one order has a box of their products
	id               		INT             AUTO_INCREMENT              PRIMARY KEY,
	store_id				int				NOT NULL,
    order_id		INT                                         NOT NULL,
	store_discount_id 		INT             DEFAULT NULL,
	shipping_discount_id 	INT             DEFAULT NULL,
	shipper_name	 		VARCHAR(50)                                 NOT NULL,
	shipper_phone	 		VARCHAR(10)                                 NOT NULL,
	total_price      		DECIMAL(10,2)                               NOT NULL,
	fee_ship				DECIMAL(10,2)								NOT NULL,
	predicted_delivery_date DATE		DEFAULT NULL,
	caution          		TEXT,
	packing_date	 		TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
	status           		ENUM('Pending', 'Shipped', 'Delivered')     DEFAULT 'Pending',

	foreign key (store_id) references stores(id),
	FOREIGN KEY (store_discount_id) REFERENCES store_discounts(id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
	FOREIGN KEY (shipping_discount_id) REFERENCES shipping_discounts(id)
);


DROP TABLE IF EXISTS products_in_boxes;
CREATE TABLE IF NOT EXISTS products_in_boxes (
	id				INT             AUTO_INCREMENT              PRIMARY KEY,
	box_id          INT                                         NOT NULL,
	product_id      INT                                         NOT NULL,
	quantity        INT                                         NOT NULL,
	total_price     DECIMAL(10,2)                               NOT NULL, -- equal to quantity*price

	
	FOREIGN KEY (box_id) REFERENCES boxes(id) ON DELETE CASCADE,
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);



