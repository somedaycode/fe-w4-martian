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
    setTimeout(() => rotateArrow(str, i), delay * (i + 1));
  });
}

function rotateArrow(str) {
  if (str === ',') return console.log('다음 단어를 기다리고 있습니다.');
  const arrow = _.$('.arrow');
  // 더 가까운 쪽으로 가기 위해 currentDeg 값을 구해준다. - 아직 미구현
  const currentDeg = arrow.style.transform.match(/\d{0,3}\.\d{0,2}/g);
  const oneArcDeg = 22.5;
  const defalutDeg = oneArcDeg / 2;
  const decNumber = hexToDec(str);
  const movingDeg = defalutDeg + oneArcDeg * decNumber;
  arrow.style.transform = `rotate(${movingDeg}deg)`;

  const figure = getFigure(canvas);
  blinkText(decNumber, oneArcDeg, figure);
}

function blinkText(decNumber, oneArcDeg, figure) {
  paintPointedStr(decNumber, oneArcDeg, figure);
  initTransceiver(figure);
}

function paintPointedStr(decNumber, oneArcDeg, figure) {
  figure.degree = oneArcDeg * decNumber;
  figure.arcDegree = oneArcDeg;
  ctx.beginPath();
  ctx.moveTo(figure.width / 2, figure.height / 2);
  ctx.lineWidth = '2';
  ctx.strokeStyle = '#f39c12';
  insertText(figure, decNumber);
}

function initTransceiver(figure) {
  setTimeout(() => {
    strokeFigure(figure);
  }, 1500);
}
