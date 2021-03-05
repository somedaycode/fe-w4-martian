import { _ } from './util.js';
import { drawTransceiver } from './drawTransceiver.js';
import { executeTransmitter } from './transmitter.js';
import { executeReceiver } from './receiver.js';

const main = () => {
  drawTransceiver();
  executeTransmitter();
  executeReceiver();
};

main();
