import { _ } from './util.js';
import { drawTransceiver } from './drawTransceiver.js';
import { executeTransmitter } from './transmitter.js';

const main = () => {
  drawTransceiver();
  executeTransmitter();
};

function getFigure({ clientWidth, clientHeight }) {
  const figure = {
    degree: 360,
    radius: 200,
    width: clientWidth,
    height: clientHeight,
    arcNum: 16,
  };
  return figure;
}

function getDegreeOfArc({ degree, arcNum }) {
  return degree / arcNum;
}

function strokeFigure(
  ctx,
  arcDegree,
  { width, height, radius, arcNum, degree }
) {
  degree = 0;
  for (let i = 0; i < arcNum; i += 1) {
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.arc(
      width / 2,
      height / 2,
      radius,
      deggToRadians(degree),
      deggToRadians(arcDegree + degree),
      false
    );
    ctx.closePath();
    ctx.lineWidth = '2';
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#F67269';
    ctx.stroke();
    ctx.fill();
    insertText(ctx, width, height, radius, degree, arcDegree, i);
    degree += arcDegree;
  }
}

function deggToRadians(degrees) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}

function hexToDec(dec) {
  return dec.toString(16);
}

function insertText(ctx, width, height, radius, degree, arcDegree, num) {
  const hex = hexToDec(num);
  const halfDegree = arcDegree / 2;
  degree += halfDegree;
  const [x, y] = getTextCoordinates(degree, radius, width, height);
  ctx.font = '1rem serif';
  ctx.strokeText(hex, x, y);
}

function getTextCoordinates(degree, radius, w, h) {
  const x = Math.cos(deggToRadians(degree)) * radius * 0.8 + w / 2;
  const y = Math.sin(deggToRadians(degree)) * radius * 0.8 + h / 2;
  return [x, y];
}

drawTransceiver();
