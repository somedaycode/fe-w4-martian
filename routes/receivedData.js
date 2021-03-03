const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/data/receivedData.json'));
});

router.post('/', function (req, res, next) {
<<<<<<< HEAD
=======
  res.send('정상적으로 메시지를 보냈습니다.');
>>>>>>> d758776 (메시지를 json 파일 형태로 바꾸고 data 폴더에 저장하는 라우터 기능 추가)
  const data = JSON.stringify(req.body);
  fs.writeFile(
    '../FE-W4-MARTIAN/public/data/receivedData.json',
    data,
    'utf8',
    (err) => {
      if (err) alert('에러입니다: receovedData.js 파일 참조');
    }
  );
<<<<<<< HEAD

  res.send('정상적으로 메시지를 보냈습니다.');
=======
>>>>>>> d758776 (메시지를 json 파일 형태로 바꾸고 data 폴더에 저장하는 라우터 기능 추가)
});

module.exports = router;
