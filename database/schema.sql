CREATE TABLE transaction_types (
    id SERIAL PRIMARY KEY,
    transaction_type VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE saving_goals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    goal_amount NUMERIC(12,2) NOT NULL,
    current_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
    due_date DATE
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    transaction_date DATE NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    transaction_type_id INT NOT NULL REFERENCES transaction_types(id),
    category_id INT NOT NULL REFERENCES categories(id)
);

CREATE TABLE savings_transfers (
    id SERIAL PRIMARY KEY,
    transaction_id INT NOT NULL REFERENCES transactions(id),
    savings_goal_id INT NOT NULL REFERENCES saving_goals(id)
);