function degToRadians(degrees) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}

function hexToDec(dec) {
  return dec.toString(16);
}

function getArcDeg({ degree, arcNum }) {
  return degree / arcNum;
}

function getTextCoordinates(textDeg, { radius, width, height }) {
  const x = Math.cos(degToRadians(textDeg)) * radius * 0.8 + width / 2;
  const y = Math.sin(degToRadians(textDeg)) * radius * 0.8 + height / 2;
  return [x, y];
}

export { degToRadians, hexToDec, getArcDeg, getTextCoordinates };
