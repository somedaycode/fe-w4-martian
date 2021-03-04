import { _ } from './util.js';
import { hexToDec } from './calculate.js';
import {
  canvas,
  ctx,
  getFigure,
  insertText,
  strokeFigure,
} from './drawTransceiver.js';

export function moveTransceiverArrow([...enCodedStrs]) {
  const delay = 3000;
  enCodedStrs.forEach((str, i) => {
    setTimeout(() => pointAndBlink(str), delay * (i + 1));
  });
}

function pointAndBlink(str) {
  const screen = _.$('.main__screen > span');
  if (str === ',') {
    screen.textContent = '다음 문자를 기다리고 있습니다.';
    return;
  }
  // 더 가까운 쪽으로 가기 위해 currentDeg 값을 구해준다. - 아직 미구현
  //   const currentDeg = arrow.me.style.transform.match(/\d{0,3}\.\d{0,2}/g);
  screen.textContent = '문자 출력중';

  const arrow = {
    me: _.$('.arrow'),
    arcDeg: 22.5,
    defalutDeg: 11.25,
    pointedNum: hexToDec(str),
  };
  const movingDeg = getMovingDeg(arrow);
  rotateArrow(arrow.me, movingDeg);

  let count = 0;
  const blink = setInterval(() => {
    blinkText(arrow);
    count += 1;
    if (count === 2) clearInterval(blink);
  }, 1000);
}

function getMovingDeg({ defalutDeg, arcDeg, pointedNum }) {
  return defalutDeg + arcDeg * pointedNum;
}

function rotateArrow(arrow, movingDeg) {
  arrow.style.transform = `rotate(${movingDeg}deg)`;
}

function blinkText(arrow) {
  const figure = getFigure(canvas);
  paintPointedStr(arrow, figure);
  initTransceiver(figure);
}

function paintPointedStr({ pointedNum, arcDeg }, figure) {
  figure.degree = arcDeg * pointedNum;
  figure.arcDegree = arcDeg;
  ctx.beginPath();
  ctx.moveTo(figure.width / 2, figure.height / 2);
  ctx.lineWidth = '2';
  ctx.strokeStyle = '#f39c12';
  insertText(figure, pointedNum);
}

function initTransceiver(figure) {
  setTimeout(() => {
    strokeFigure(figure);
  }, 500);
}
