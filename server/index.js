const{
    client,
    createTables,
    createFavorite,
    createProduct,
    createUser,
    fetchFavorites,
    fetchUsers,
    fetchProducts,
    destroyFavorite
} = require('./db');
const express = require('express');
const app = express();
app.use(express.json());

// GET /api/users - returns array of users
app.get('/api/users', async(req, res, next)=> {
    try {
      res.send(await fetchUsers());
    }
    catch(ex){
      next(ex);
    }
  });
// GET /api/products - returns an array of products
app.get('/api/products', async(req, res, next)=> {
    try {
      res.send(await fetchProducts());
    }
    catch(ex){
      next(ex);
    }
  });
// GET /api/users/:id/favorites - returns an array of favorites for a user
app.get('/api/users/:id/favorites', async(req, res, next)=> {
    try {
      res.send(await fetchFavorites());
    }
    catch(ex){
      next(ex);
    }
  });
// POST /api/users/:id/favorites - payload: a product_id returns the created favorite with a status code of 201
app.post('/api/users/:id/favorites', async(req, res, next)=> {
    try {
      res.status(201).send(await createFavorite({ user_id: req.params.id, product_id: req.body.product_id}));
    }
    catch(ex){
      next(ex);
    }
  });
// DELETE /api/users/:userId/favorites/:id - deletes a favorite for a user, returns nothing with a status code of 204
app.delete('/api/users/:user_id/favorites/:id', async(req, res, next)=> {
    try {
      await destroyFavorite({user_id: req.params.user_id, id: req.params.id });
      res.sendStatus(204);
    }
    catch(ex){
      next(ex);
    }
  });
  app.use((err, req, res, next)=> {
    console.log(err);
    res.status(err.status || 500).send({ error: err.message ? err.message : err });
  });
  
  const init = async()=> {
    const port = process.env.PORT || 3000;
    await client.connect();
    console.log('connected to database');
  
    await createTables();
    console.log('tables created');
  
    const [max, nath, ethyl, mark, fotu, bary, ships, crac, fipy] = await Promise.all([
      createUser({ username: 'moe', password: 'm_pw'}),
      createUser({ username: 'nath', password: 'l_pw'}),
      createUser({ username: 'ethyl', password: 'e_pw'}),
      createUser({ username: 'mark', password: 'c_pw'}),
      createProduct({ name: 'fotu' }),
      createProduct({ name: 'bary' }),
      createProduct({ name: 'ships' }),
      createProduct({ name: 'crac' }),
      createProduct({ name: 'fipy' })
    ]);
  
    console.log(await fetchUsers());
    console.log(await fetchProducts());
  
    console.log(await fetchFavorites(max.id));
    const favorite = await createFavorite({ user_id: max.id, product_id: fotu.id });
    app.listen(port, ()=> console.log(`listening on port ${port}`));
    console.log('data seeded');

  //const port = process.env.PORT || 3000;;
  }

  
  init();