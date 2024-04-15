const express = require('express')
const mysql = require('mysql2')
const cors = require('cors');
const app = express()
const port = 3001

app.use(express.json());
app.use(cors());

// connecting Database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "ecommerse",
});

app.post("/category", async (req, res) => {
  try {
    const { name } = req.body;
    const [{ insertId }] = await connection.promise().query(
      `INSERT INTO category (name) 
          VALUES (?)`,
      [name]
    );
    //console.log(insertId);
    res.status(202).json({
      message: "Category Created",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/category", async(req, res) => {
  try {
      const data = await connection.promise().query(
        `SELECT *  from category;`
      );
      res.status(202).json({
        users: data[0],
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
