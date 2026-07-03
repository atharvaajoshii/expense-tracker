CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    accounts (
        account_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        account_name VARCHAR(100) NOT NULL,
        account_type VARCHAR(30) NOT NULL,
        balance DECIMAL(12, 2) NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

CREATE TABLE
    transactions (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        account_id INT NOT NULL,
        title VARCHAR(100) NOT NULL,
        category VARCHAR(50),
        payment_method VARCHAR(20),
        amount DECIMAL(10, 2) NOT NULL,
        transaction_type VARCHAR(10) NOT NULL CHECK (transaction_type IN ('credit', 'debit')),
        transaction_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        notes TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (account_id) REFERENCES accounts (account_id) ON DELETE CASCADE
    );

CREATE TABLE
    transfers (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        from_account_id INT NOT NULL,
        to_account_id INT NOT NULL,
        CHECK (from_account_id <> to_account_id),
        amount DECIMAL(10, 2) NOT NULL,
        transfer_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        notes TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (from_account_id) REFERENCES accounts (account_id) ON DELETE CASCADE,
        FOREIGN KEY (to_account_id) REFERENCES accounts (account_id) ON DELETE CASCADE
    );