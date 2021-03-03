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

<<<<<<< HEAD
function strToHex(str) {
  return str.split('').map((str) => str.charCodeAt(0).toString(16));
}

=======
>>>>>>> c556e79 (계산하여 return하는 함수들은 모두 calculate.js로 이동함)
function getTextCoordinates(textDeg, { radius, width, height }) {
  const x = Math.cos(degToRadians(textDeg)) * radius * 0.8 + width / 2;
  const y = Math.sin(degToRadians(textDeg)) * radius * 0.8 + height / 2;
  return [x, y];
}

<<<<<<< HEAD
export { degToRadians, hexToDec, getArcDeg, strToHex, getTextCoordinates };
=======
export { degToRadians, hexToDec, getArcDeg, getTextCoordinates };
>>>>>>> c556e79 (계산하여 return하는 함수들은 모두 calculate.js로 이동함)
