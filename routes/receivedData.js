const express = require('express');
<<<<<<< HEAD
const fs = require('fs');
=======
>>>>>>> 553c597 (지구로 보내는 메시지를 라우터를 통해 응답받고 json 형태로 데이터 폴더에 생성)
const router = express.Router();
const path = require('path');

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/data/receivedData.json'));
});

<<<<<<< HEAD
router.post('/', function (req, res, next) {
  const data = JSON.stringify(req.body);
  fs.writeFile(
    '../FE-W4-MARTIAN/public/data/receivedData.json',
    data,
    'utf8',
    (err) => {
      if (err) alert('에러입니다: receovedData.js 파일 참조');
    }
  );

  res.send('정상적으로 메시지를 보냈습니다.');
});

=======
>>>>>>> 553c597 (지구로 보내는 메시지를 라우터를 통해 응답받고 json 형태로 데이터 폴더에 생성)
module.exports = router;
