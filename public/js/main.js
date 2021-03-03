import { _ } from './util.js';
import { drawTransceiver } from './drawTransceiver.js';
import { executeTransmitter } from './transmitter.js';

const main = () => {
  drawTransceiver();
  executeTransmitter();
};

main();
