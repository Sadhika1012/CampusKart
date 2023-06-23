const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.use(express.json());



router.get('/', async (req, res) => {
  try{
    await Product.find({}).then(data=>{
        res.send({status:"ok",data:data})
    })
  } catch(error){
    res.status(500).send({status:"error",data:error});
  }
});

module.exports = router;
