const express = require('express');
const fs = require('fs');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.html');
});

router.post('/receivedData', function (req, res, next) {
  console.log(req.body);
  const data = JSON.stringify(req.body);
  fs.writeFile(
    '../FE-W4-MARTIAN/public/data/receivedData.json',
    data,
    'utf8',
    (err) => {
      if (err) throw err;
    }
  );
  res.redirect('/');
});

module.exports = router;
