CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR (200) NOT NULL,
    store VARCHAR (100) NOT NULL,
    price NUMERIC (10, 2) NOT NULL,
    product_image VARCHAR (200),
    link VARCHAR (200)
);

CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    categoty_name VARCHAR (100) NOT NULL,
    category_image VARCHAR (200) NOT NULL
);

CREATE TABLE IF NOT EXISTS relations (
    relation_id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (product_id),
    FOREIGN KEY (category_id) REFERENCES categories (category_id)
);