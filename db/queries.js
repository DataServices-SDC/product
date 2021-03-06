const token= require('../token.js');
const {Pool} = require('pg');
const sdc = new Pool({
  host: '3.144.22.99',
  user: "postgres",
  database: "sdc",
  password: token.password,
  port: 5432
});

const queries = {};

queries.getProducts = (req) => {
  var limit=5;
  if(req.query.count){
    limit=req.query.count;
  }
  const response = sdc.query(`select * from products limit ${limit}`);
  return response;
};

queries.getProductByID = (req) => {
  const productID=req.params.product_id;
  const response = sdc.query(`select * from products left outer join features on products.id = features.product_id where products.id = '${productID}'`);
  return response;
};

queries.getStyles = (req) => {
  const productID=req.params.product_id;
  const response=sdc.query(`select * from styles left outer join photos on styles.id = photos.styleId
  left outer join skus on styles.id = skus.styleId
  where styles.product_id='${productID}'`);
  return response;
};

queries.getRelated = (req) => {
  const productID=req.params.product_id;
  const response=sdc.query(`select * from related_products where related_products.current_product_id='${productID}'`);
  return response;
};

module.exports = queries;
