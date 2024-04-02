// client - a node pg client
const pg = require('pg');
//const uuid = require('uuid')
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_store_db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

  const createTables = async()=> {
    const SQL = `
      DROP TABLE IF EXISTS favorites;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
      CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
      CREATE TABLE products(
        id UUID PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
      );
      CREATE TABLE favorites(
        CREATE TABLE favorites(
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id) NOT NULL,
            product_id UUID REFERENCES products(id) NOT NULL,
            CONSTRAINT unique_user_id_and_product_id UNIQUE (user_id, product_id)
        
      );
    `;
    await client.query(SQL);
  };

// createProduct - creates a product in the database and returns the created record
const createProduct = async({ name })=> {
    const SQL = `
      INSERT INTO product(id, name) VALUES($1, $2) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), name]);
    return response.rows[0];
  }
// createUser - creates a user in the database and returns the created record. The password of the user should be hashed using bcrypt.
const createUser = async({ username, password })=> {
    const SQL = `
      INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING *
    `;
    const response = await client.query(SQL, [ uuid.v4(), username, await bcrypt.hash(password, 5)]);
    return response.rows[0];
  };
  
// fetchUsers - returns an array of users in the database
const fetchUsers = async()=> {
    const SQL = `
      SELECT id, username FROM users;
    `;
    const response = await client.query(SQL);
    return response.rows;
  };
  
// fetchProducts - returns an array of products in the database
const fetchProducts = async()=> {
    const SQL = `
      SELECT * FROM products;
    `;
    const response = await client.query(SQL);
    return response.rows;
  };
  
// fetchFavorites - returns an array favorites for a user
const fetchFavorites = async(user_id)=> {
    const SQL = `
      SELECT * FROM favorites where user_id = $1
    `;
    const response = await client.query(SQL, [user_id]);
    return response.rows;
  };
// createFavorite - creates a favorite in the database and returns the created record
const createFavorite = async({ user_id, product_id })=> {
    const SQL = `
      INSERT INTO favorites(id, user_id, product_id) VALUES($1, $2, $3) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), user_id, product_id]);
    return response.rows[0];
  };
// destroyFavorite - deletes a favorite in the database
const destroyFavorite = async({ user_id, id })=> {
    const SQL = `
      DELETE FROM favorites WHERE user_id=$1 AND id=$2
    `;
    await client.query(SQL, [user_id, id]);
  };
  

module.exports = {
    client,
    createTables,
    createFavorite,
    createProduct,
    createUser,
    fetchFavorites,
    fetchUsers,
    fetchProducts,
    destroyFavorite
}