import { _ } from './util.js';
import { hexToStr } from './calculate.js';
import {
  moveTransceiverArrow,
  getBtns,
  getInputs,
} from './operateTransceiver.js';

function fetchDataFromMars(e) {
  e.preventDefault();
  fetch('http://localhost:3000/receivedData') //
    .then((res) => res.json())
    .then((encodedMsg) => overLookEncodedMsg(encodedMsg));
}

function overLookEncodedMsg({ message }) {
  if (!message) return alert('지구로부터 수신된 메시지가 없습니다.');
  moveTransceiverArrow(message);
}

function checkMsgFromEarth() {
  const { translateBtn, checkMsgBtn } = getBtns();
  _.on(translateBtn, 'click', printMsg);
  _.on(checkMsgBtn, 'click', fetchDataFromMars);
}

function printMsg(e) {
  e.preventDefault();
  const screen = _.$('.main__screen > span');
  const { encodedInput } = getInputs();
  const encodedStrs = encodedInput.value.split(',');
  screen.textContent = decodeMsgs(encodedStrs);
}

function decodeMsgs(encodedStrs) {
  return encodedStrs.reduce((prev, str) => {
    return (prev += hexToStr(str));
  }, '');
}

function executeReceiver() {
  checkMsgFromEarth();
}

export { executeReceiver };
