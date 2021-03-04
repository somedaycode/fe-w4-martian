import { _ } from './util.js';
import { hexToDec, strToHex } from './calculate.js';
import {
  canvas,
  ctx,
  getFigure,
  insertText,
  strokeFigure,
} from './drawTransceiver.js';

export function executeTransmitter() {
  onInputMessages();
  onClickTransmitBtn();
}

function onClickTransmitBtn() {
  const sendBtn = _.$('.transmit__btn');
  _.on(sendBtn, 'click', sendMsgToEarth);
}

function sendMsgToEarth(e) {
  e.preventDefault();
  const inputMsg = _.$('.transmit__input');
  const encodedInput = _.$('.receive__input');
  const xhr = new XMLHttpRequest();
  const enCodedData = {
    message: encodedInput.value,
  };
  moveTransceiverArrow(encodedInput.value);

  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      const statusMsg = _.$('.transmit__status');
      statusMsg.textContent = xhr.responseText;
    } else {
      alert('에러입니다.');
    }
  };
  xhr.open('POST', '/receivedData');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(enCodedData));

  // initInputValue(inputMsg, encodedInput);
}

function onInputMessages() {
  const transmitInput = _.$('.transmit__input');
  _.on(transmitInput, 'input', enCodeText);
}

function enCodeText({ target }) {
  const encodedInput = _.$('.receive__input');
  encodedInput.value = strToHex(target.value);
}

// 회전판 동작이 마무리 되면 사용한다. 현재 주석처리 해놓았다.
function initInputValue(...inputs) {
  return inputs.forEach((input) => (input.value = ''));
}

function moveTransceiverArrow([...enCodedStrs]) {
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
  paintPointedStr(decNumber, oneArcDeg);
}

function paintPointedStr(decNumber, oneArcDeg) {
  const figure = getFigure(canvas);
  figure.degree = oneArcDeg * decNumber;
  figure.arcDegree = oneArcDeg;
  ctx.beginPath();
  ctx.moveTo(figure.width / 2, figure.height / 2);
  ctx.lineWidth = '2';
  ctx.strokeStyle = '#f39c12';
  insertText(figure, decNumber);
  initTransceiver(figure);
}

function initTransceiver(figure) {
  setTimeout(() => {
    strokeFigure(figure);
  }, 1500);
}
