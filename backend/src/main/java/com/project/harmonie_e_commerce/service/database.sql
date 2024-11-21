DROP DATABASE IF EXISTS Harmonie;

CREATE DATABASE IF NOT EXISTS Harmonie;

USE Harmonie;

DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users (
	id              INT             AUTO_INCREMENT              PRIMARY KEY,
	citizen_id      VARCHAR(12)     UNIQUE                      NOT NULL,
	fname           VARCHAR(255)                                NOT NULL,
	lname           VARCHAR(255)                                NOT NULL,
	dob             DATE                                        NOT NULL,
	sex 	        ENUM('M', 'F', 'Other')                     NOT NULL,
	phone           VARCHAR(10)     UNIQUE                      NOT NULL,
	email           VARCHAR(255)    UNIQUE                      NOT NULL,
	creation_date   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP   NOT NULL,
	password		VARCHAR(20)         	                    NOT NULL
);


DROP TABLE IF EXISTS SocialAccounts;
CREATE TABLE IF NOT EXISTS SocialAccounts (
	id				INT             AUTO_INCREMENT              PRIMARY KEY,
	user_id         INT                                         NOT NULL,
	provider_id     VARCHAR(255)                                NOT NULL,
	provider        ENUM('Facebook', 'Google', 'Twitter')       NOT NULL,
	email           VARCHAR(255)                                NOT NULL,
	
	FOREIGN KEY (user_id) REFERENCES Users(id)
);


DROP TABLE IF EXISTS Tokens;
CREATE TABLE IF NOT EXISTS Tokens (
	id              INT             AUTO_INCREMENT              PRIMARY KEY,
	user_id         INT                                         NOT NULL,
	token           VARCHAR(255)                                NOT NULL,
	type 			ENUM('Access', 'Refresh')                   NOT NULL,
	revoked		 	BOOLEAN                                     NOT NULL,
	expiration_date TIMESTAMP                                   NOT NULL,
	expired 	    BOOLEAN                                     NOT NULL,
	
	FOREIGN KEY (user_id) REFERENCES Users(id)
);

DROP TABLE IF EXISTS BankAccounts;
CREATE TABLE IF NOT EXISTS BankAccounts (
	user_id		 	INT                                         NOT NULL,
	bank_name       VARCHAR(255)                                NOT NULL,
	account_number  VARCHAR(20)                                 NOT NULL,
	
	FOREIGN KEY (user_id) REFERENCES Users(id),
	PRIMARY KEY (user_id, bank_name, account_number)
);


DROP TABLE IF EXISTS Sellers;
CREATE TABLE IF NOT EXISTS Sellers ( -- Inheritance of Users
	id              INT             AUTO_INCREMENT              PRIMARY KEY,
    tax_id          VARCHAR(15)     UNIQUE                      NOT NULL,

	FOREIGN KEY (id) REFERENCES Users(id)
);


DROP TABLE IF EXISTS Stores;
CREATE TABLE IF NOT EXISTS Stores ( -- Weak entity of Sellers
	id              INT             AUTO_INCREMENT              NOT NULL,
	seller_id       INT             UNIQUE                      NOT NULL,
    name            VARCHAR(255)                                NOT NULL,
    address         VARCHAR(255)                                NOT NULL,
	creation_date   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP   NOT NULL,
	description     TEXT,

    FOREIGN KEY (seller_id) REFERENCES Sellers(id),
    PRIMARY KEY (id, seller_id)
);


DROP TABLE IF EXISTS Categories;
CREATE TABLE IF NOT EXISTS Categories (
	id              INT             AUTO_INCREMENT              PRIMARY KEY,
	name            VARCHAR(255)                                NOT NULL
);

DROP TABLE IF EXISTS Products;
CREATE TABLE IF NOT EXISTS Products (
	id              INT             AUTO_INCREMENT				PRIMARY KEY,
	seller_id       INT             	                        NOT NULL,
	store_id		INT                                         NOT NULL,
	name            VARCHAR(255)                                NOT NULL,
	brand           VARCHAR(255),
	price           DECIMAL(10,2)                               NOT NULL,
	quantity        INT                                         NOT NULL,
	description     TEXT,
	views           INT             DEFAULT 0					NOT NULL,
	buying_count    INT             DEFAULT 0					NOT NULL,
	rating_count    INT             DEFAULT 0,
    avg_rating      DECIMAL(5,2)    DEFAULT 0.0                 NOT NULL,
	category_id     INT 			DEFAULT NULL,


	FOREIGN KEY (seller_id, store_id) REFERENCES Stores(seller_id, id),
	FOREIGN KEY (category_id) REFERENCES Categories(id)
);



DROP TABLE IF EXISTS ProductImages;
CREATE TABLE IF NOT EXISTS ProductImages (
    product_id      INT				                            NOT NULL,
    url	  	   	    VARCHAR(255)                                NOT NULL,
    
	FOREIGN KEY (product_id) REFERENCES Products(id),
    PRIMARY KEY (product_id, url)
);


DROP TABLE IF EXISTS Carts;
CREATE TABLE IF NOT EXISTS Carts (
	id              INT             AUTO_INCREMENT          	PRIMARY KEY,
	total_items     INT             DEFAULT 0               	NOT NULL
);


DROP TABLE IF EXISTS Buyers;
CREATE TABLE IF NOT EXISTS Buyers ( -- Inheritance of Users
    id              INT             AUTO_INCREMENT              PRIMARY KEY,
    cart_id         INT                                         NOT NULL,

    FOREIGN KEY (id) REFERENCES Users(id),
    FOREIGN KEY (cart_id) REFERENCES Carts(id)
);


DROP TABLE IF EXISTS DeliveryPhones;
CREATE TABLE IF NOT EXISTS DeliveryPhones (
	buyer_id		INT                                         NOT NULL,
	phone_number	VARCHAR(10)                                 NOT NULL,

	FOREIGN KEY (buyer_id) REFERENCES Buyers(id),
	PRIMARY KEY (buyer_id, phone_number)
);


DROP TABLE IF EXISTS DeliveryAddresses;
CREATE TABLE IF NOT EXISTS DeliveryAddresses (
    buyer_id        INT                                         NOT NULL,
	road_number     VARCHAR(20)                                 NOT NULL,
	ward			VARCHAR(50)                                 NOT NULL,
	district		VARCHAR(50)                                 NOT NULL,
	city			VARCHAR(50)                                 NOT NULL,

    FOREIGN KEY (buyer_id) REFERENCES Buyers(id),
    PRIMARY KEY (buyer_id, road_number, ward, district, city)
);


DROP TABLE IF EXISTS Reviews;
CREATE TABLE IF NOT EXISTS Reviews (
	buyer_id        INT             			              	NOT NULL,
	product_id      INT                                         NOT NULL,
	time 		  	TIMESTAMP       DEFAULT CURRENT_TIMESTAMP   NOT NULL,
	rating          INT             CHECK(rating BETWEEN 1 AND 5) NOT NULL, 
	text     		TEXT,
	date            TIMESTAMP       DEFAULT CURRENT_TIMESTAMP   NOT NULL,

	FOREIGN KEY (buyer_id) REFERENCES Buyers(id),
	FOREIGN KEY (product_id) REFERENCES Products(id),
	PRIMARY KEY (buyer_id, time),
	UNIQUE (buyer_id, product_id, time) -- for foreign key reference in ReviewImages
);


DROP TABLE IF EXISTS ReviewImages;
CREATE TABLE IF NOT EXISTS ReviewImages (
	buyer_id        INT                                         NOT NULL,
	product_id      INT                                         NOT NULL,
	time 		  	TIMESTAMP       DEFAULT CURRENT_TIMESTAMP   NOT NULL,
	url	  	   	    VARCHAR(255)                                NOT NULL,
	
	FOREIGN KEY (buyer_id, product_id, time) REFERENCES Reviews(buyer_id, product_id, time),
	PRIMARY KEY (buyer_id, time)
);



DROP TABLE IF EXISTS ProductsInCarts;
CREATE TABLE IF NOT EXISTS ProductsInCarts (
	cart_id         INT                                         NOT NULL,
    product_id      INT                                         NOT NULL,
	quantity        INT                                         NOT NULL,
	FOREIGN KEY (cart_id) REFERENCES Carts(id),
	FOREIGN KEY (product_id) REFERENCES Products(id),
    PRIMARY KEY (product_id, cart_id)
);


DROP TABLE IF EXISTS Discounts;
CREATE TABLE IF NOT EXISTS Discounts (
    id              INT             AUTO_INCREMENT              PRIMARY KEY,
	code            VARCHAR(50)                                 NOT NULL,
	quantity        INT                                         NOT NULL,
	release_date    DATE                                        NOT NULL,
	start_date      DATE                                        NOT NULL,
    expiration_date DATE                                        NOT NULL
);


DROP TABLE IF EXISTS StoreDiscounts;
CREATE TABLE IF NOT EXISTS StoreDiscounts (
	id			  INT             								PRIMARY KEY,
	amount        DECIMAL(10,2)                               	NOT NULL,
	seller_id     INT                                         	NOT NULL,
	store_id      INT                                         	NOT NULL,

	FOREIGN KEY (id) REFERENCES Discounts(id),
	FOREIGN KEY (seller_id, store_id) REFERENCES Stores(seller_id, id)
);


DROP TABLE IF EXISTS SystemDiscounts;
CREATE TABLE IF NOT EXISTS SystemDiscounts (
	id			  INT             								PRIMARY KEY,
	max_amount    DECIMAL(10,2)                               	NOT NULL,
	percentage    DECIMAL(5,2)                                	NOT NULL,
	min_bill_amt  DECIMAL(10,2)		DEFAULT 0                  	NOT NULL,

	FOREIGN KEY (id) REFERENCES Discounts(id)
);


DROP TABLE IF EXISTS ShippingDiscounts;
CREATE TABLE IF NOT EXISTS ShippingDiscounts (
	id			  INT             								PRIMARY KEY,
	max_amount    DECIMAL(10,2)                               	NOT NULL,

	FOREIGN KEY (id) REFERENCES Discounts(id)
);


DROP TABLE IF EXISTS ShippingPartners;
CREATE TABLE IF NOT EXISTS ShippingPartners (
	id              INT             AUTO_INCREMENT              PRIMARY KEY,
	name            VARCHAR(255)                                NOT NULL,
	join_date       TIMESTAMP       DEFAULT CURRENT_TIMESTAMP   NOT NULL
);


DROP TABLE IF EXISTS DiscountForShippingPartners;
CREATE TABLE IF NOT EXISTS DiscountForShippingPartners (
	discount_id              INT             AUTO_INCREMENT              PRIMARY KEY,
	spartner_id     INT                                         NOT NULL,

	FOREIGN KEY (discount_id) REFERENCES ShippingDiscounts(id),
	FOREIGN KEY (spartner_id) REFERENCES ShippingPartners(id)
);



DROP TABLE IF EXISTS Orders;
CREATE TABLE IF NOT EXISTS Orders (
	id               INT             AUTO_INCREMENT              PRIMARY KEY,
	buyer_id         INT                                         NOT NULL,
	consignee_name   VARCHAR(255)                                NOT NULL,
	consignee_phone  VARCHAR(10)                                 NOT NULL,
	consignee_address VARCHAR(255)                               NOT NULL,
	creation_date    TIMESTAMP       DEFAULT CURRENT_TIMESTAMP   NOT NULL,
	total_price      DECIMAL(10,2)                               NOT NULL,
	sysdiscount_id   INT                                         DEFAULT NULL,
	pay_method       ENUM('Cash', 'Credit', 'Debit')             NOT NULL,


	FOREIGN KEY (buyer_id) REFERENCES Buyers(id),
	FOREIGN KEY (sysdiscount_id) REFERENCES SystemDiscounts(id)
);


DROP TABLE IF EXISTS ProductsInOrders;
CREATE TABLE IF NOT EXISTS ProductsInOrders (
	order_id        INT                                         NOT NULL,
	product_id      INT                                         NOT NULL,
	quantity        INT                                         NOT NULL,
	pay_price       DECIMAL(10,2)                               NOT NULL,

	FOREIGN KEY (order_id) REFERENCES Orders(id),
	FOREIGN KEY (product_id) REFERENCES Products(id),
	PRIMARY KEY (order_id, product_id)
);


DROP TABLE IF EXISTS Boxes;
CREATE TABLE IF NOT EXISTS Boxes ( -- each store in order has a box of their products
	id               INT             AUTO_INCREMENT              PRIMARY KEY,
	total_price      DECIMAL(10,2)                               NOT NULL,
	packing_date	 TIMESTAMP       DEFAULT CURRENT_TIMESTAMP   NOT NULL,
	caution          TEXT,
	Status           ENUM('Pending', 'Shipped', 'Delivered')     DEFAULT 'Pending',
	storeDiscount_id INT                                         DEFAULT NULL,
	shippingDiscount_id INT                                      DEFAULT NULL,
	shippingPartner_id INT                                       NOT NULL,
	shipper_name	 VARCHAR(255)                                NOT NULL,
	shipper_phone	 VARCHAR(10)                                 NOT NULL,
	predicted_delivery_date TIMESTAMP                            NOT NULL,

	FOREIGN KEY (storeDiscount_id) REFERENCES StoreDiscounts(id),
	FOREIGN KEY (shippingDiscount_id) REFERENCES ShippingDiscounts(id),
	FOREIGN KEY (shippingPartner_id) REFERENCES ShippingPartners(id)
);


DROP TABLE IF EXISTS ProductsInBoxes;
CREATE TABLE IF NOT EXISTS ProductsInBoxes (
	order_id		INT                                         NOT NULL,
	box_id          INT                                         NOT NULL,
	product_id      INT                                         NOT NULL,
	quantity        INT                                         NOT NULL,
	total_price     DECIMAL(10,2)                               NOT NULL,

	FOREIGN KEY (order_id) REFERENCES Orders(id),
	FOREIGN KEY (box_id) REFERENCES Boxes(id),
	FOREIGN KEY (product_id) REFERENCES Products(id),
	PRIMARY KEY (order_id, product_id)
);