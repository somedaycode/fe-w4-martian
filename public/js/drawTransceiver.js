import { _ } from './util.js';
import {
  degToRadians,
  decToHex,
  getArcDeg,
  getTextCoordinates,
} from './calculate.js';

const canvas = _.$('.main__figure');
const ctx = canvas.getContext('2d');

function drawTransceiver() {
  if (canvas.getContext) {
    const figure = getFigure(canvas);
    figure.arcDegree = getArcDeg(figure);
    strokeFigure(figure);
  }
}

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

function strokeFigure(figure) {
  figure.degree = 0;
  for (let i = 0; i < figure.arcNum; i += 1) {
    ctx.beginPath();
    moveToCenter(figure);
    printFigureStyle();
    drawArc(figure);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    insertText(figure, i);
    figure.degree += figure.arcDegree;
  }
}

function printFigureStyle() {
  ctx.lineWidth = '2';
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#F67269';
}

function moveToCenter({ width, height }) {
  ctx.moveTo(width / 2, height / 2);
}

function drawArc(figure) {
  ctx.arc(
    figure.width / 2,
    figure.height / 2,
    figure.radius,
    degToRadians(figure.degree),
    degToRadians(figure.arcDegree + figure.degree),
    false
  );
}

function insertText(figure, currentNum) {
  const halfDegree = figure.arcDegree / 2;
  let textDeg = figure.degree;
  textDeg += halfDegree;
  ctx.font = '2rem serif';

  const [x, y] = getTextCoordinates(textDeg, figure);
  ctx.strokeText(decToHex(currentNum), x, y);
}

export { strokeFigure, drawTransceiver, getFigure, insertText, canvas, ctx };
