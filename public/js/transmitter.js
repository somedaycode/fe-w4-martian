import { _ } from './util.js';
import { strToHex } from './calculate.js';
import { moveTransceiverArrow } from './operateTransceiver.js';

// operateTranceiver.js의 함수를 통해 화살표가 움직이게 됩니다.

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
}

function onInputMessages() {
  const transmitInput = _.$('.transmit__input');
  _.on(transmitInput, 'input', enCodeText);
}

function enCodeText({ target }) {
  const encodedInput = _.$('.receive__input');
  encodedInput.value = strToHex(target.value);
}
