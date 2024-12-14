### Update v1.1:

- Used **lower_snake_case** for table and field names; table names should be in plural form.
- Every table must have an `id` field as the **Primary Key** (do not use complex Primary Keys; converted existing complex Primary Keys into **UNIQUE** constraints).
- `store` is no longer a weak entity of `store`.
- Updated the length of fields with the `VARCHAR` data type.
- Updates `ON DELETE` behavior for some **Foreign Keys (FKs)**.
- Pay attention to the differences between the data types: **DATE**, **DATETIME**, and **TIMESTAMP**.
- In the `orders` table, `consignee_phone` and `consignee_address` should not be directly assigned values; instead, they must reference other tables as **FKs** to fetch the respective information.
- Do not use (drop) the `products_in_orders` table, as the table `products_in_boxes` (created from the ternary relationship between `products`, `boxes`, and `orders`) already provides the necessary information to identify which products are in a specific order. 
  - Example query: 
    ```sql
    SELECT product_id FROM products_in_boxes WHERE order_id = 123;
    ```
- The `.mwb` file has also been recreated, ensuring the correct identification of **OneToOne** and **OneToMany** relationships.