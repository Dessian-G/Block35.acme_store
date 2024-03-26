// client - a node pg client
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_store_db');
// createTables method - drops and creates the tables for your application
async function createTables(){

}
// createProduct - creates a product in the database and returns the created record
async function createProducts(){

}
// createUser - creates a user in the database and returns the created record. The password of the user should be hashed using bcrypt.
async function createUser(){

}
// fetchUsers - returns an array of users in the database
async function fetchUsers(){

}
// fetchProducts - returns an array of products in the database
async function fetchProducts(){

}
// fetchFavorites - returns an array favorites for a user
async function fetchFavorites(){

}
// createFavorite - creates a favorite in the database and returns the created record
async function createFavorite(){

}
// destroyFavorite - deletes a favorite in the database
async function destroyFavorite(){

}

module.exports = {
    client,
    createTables,
    createFavorite,
    createProducts,
    createUser,
    fetchFavorites,
    fetchUsers,
    fetchProducts,
    destroyFavorite
}