var express = require("express");
var router = express.Router();

const mysql2 = require("mysql2");
const mysql = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_nodepos",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/product", (req, res) => {
  mysql.query("SELECT * FROM tb_product", (err, rs) => {
    if (err) {
      res.send(err);
    } else {
      res.render("product", { products: rs });
    }
  });
});

router.get("/productForm", (req, res) => {
  res.render("productForm", { data: {} });
});

router.post("/productForm", (req, res) => {
  var sql = "INSERT INTO tb_product SET ?";
  var data = req.body;

  mysql.query(sql, data, (err, rs) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("product");
    }
  });
});

router.get("/productEdit/:id", (req, res) => {
  var sql = "SELECT * FROM tb_product WHERE id = ?";
  var params = [req.params.id];

  mysql.query(sql, params, (err, rs) => {
    if (err) {
      res.send(err);
    } else {
      res.render("productForm", { data: rs[0] });
    }
  });
});

router.post("/productEdit/:id", (req, res) => {
  var sql =
    "UPDATE tb_product SET barcode = ?, name = ?, price = ?, cost = ? WHERE id = ?";
  var params = [
    req.body.barcode,
    req.body.name,
    req.body.price,
    req.body.cost,
    req.params.id,
  ];

  mysql.query(sql, params, (err, rs) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/product");
    }
  });
});

router.get("/productDelete/:id", (req, res) => {
  var sql = "DELETE FROM tb_product WHERE id = ?";
  var params = [req.params.id];

  mysql.query(sql, params, (err, rs) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/product");
    }
  });
});

module.exports = router;
