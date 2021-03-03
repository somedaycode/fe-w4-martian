import { _ } from './util.js';
import { strToHex } from './calculate.js';

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
  const msg = {
    message: encodedInput.value,
  };

  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
      const statusMsg = _.$('.transmit__status');
      statusMsg.textContent = xhr.responseText;
    } else {
      statusMsg.textContent = xhr.responseText;
    }
  };
  xhr.open('POST', '/receivedData');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(msg));

<<<<<<< HEAD
  initInputValue(inputMsg, encodedInput);
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
=======
  inputMsg.value = '';
>>>>>>> aa74038 (메시지의 응답 상태에 따른 dom 조작)
}
