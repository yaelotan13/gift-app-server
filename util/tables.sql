CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR (200) NOT NULL,
    store VARCHAR (100) NOT NULL,
    price NUMERIC (10, 2) NOT NULL,
    product_image VARCHAR (200),
    link VARCHAR (200)
);

CREATE TABLE IF NOT EXISTS main_categories (
    main_category_id SERIAL PRIMARY KEY,
    main_category_name VARCHAR (100) NOT NULL,
    main_category_image VARCHAR (200) NOT NULL
);

CREATE TABLE IF NOT EXISTS sub_categories (
    sub_category_id SERIAL PRIMARY KEY,
    main_category_id INTEGER NOT NULL,
    sub_category_name VARCHAR (100) NOT NULL,
    sub_category_image VARCHAR (200),
    FOREIGN KEY (main_category_id) REFERENCES main_categories (main_category_id)
);

CREATE TABLE IF NOT EXISTS relations (
    relation_id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    main_category_id INTEGER,
    sub_category_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES products (product_id),
    FOREIGN KEY (main_category_id) REFERENCES main_categories (main_category_id),
    FOREIGN KEY (sub_category_id) REFERENCES sub_categories (sub_category_id)
);