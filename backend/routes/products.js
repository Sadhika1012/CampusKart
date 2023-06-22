const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.use(express.json());

router.post("/", async (req, res) => {
  const { name,description, price, flag, base64, } = req.body;

  try {
    await Product.create({
      name,
      description,
      price,
      flag,
      image: base64,
      
    });

    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error", data: error });
  }
});

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
