import { _ } from './util.js';

export function executeTransmitter() {
  const sendBtn = _.$('.transmit__btn');
  _.on(sendBtn, 'click', sendMsgToEarth);
}

function sendMsgToEarth(e) {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  const inputMsg = _.$('.transmit__input');
  const msg = {
    message: inputMsg.value,
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

  inputMsg.value = '';
}
