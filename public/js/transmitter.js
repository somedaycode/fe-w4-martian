import { _ } from './util.js';
import { hexToDec, strToHex } from './calculate.js';

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

function initInputValue(...inputs) {
  return inputs.forEach((input) => (input.value = ''));
}

function moveTransceiverArrow([...enCodedStrs]) {
  const delay = 2000;
  enCodedStrs.forEach((str, i) => {
    setTimeout(() => pointToStr(str), delay * i);
  });
}

function pointToStr(str) {
  if (str === ',') return console.log('다음 단어를 기다리고 있습니다.');
  const arrow = _.$('.arrow');
  const defalutDeg = 101.25;
  const oneArcDeg = 22.5;
  const movingDeg = defalutDeg + oneArcDeg * hexToDec(str);
  arrow.style.transform = `rotate(${movingDeg}deg)`;
}
