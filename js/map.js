var x, roughness, size, max, map;

function generate() {
  x = 8;
  roughness = 0.5;
  size = Math.pow(x, 2) + 1;
  max = size - 1;
  map = new Float32Array(size * size);
  setCorners();
  divide(max);
}

function getP(cooX, cooY) {
  if (cooX < 0 || cooX > max || cooY < 0 || cooY > max) return -1;
  var tmp = map[cooX + size * cooY];
  if (tmp < 0) {
    // console.log(cooX, " + ", cooY, " + ", tmp);
  }
  return tmp;
}

function setCorners() {
  setP(0, 0, (Math.random() * max));
  setP(max, 0, (Math.random() * max));
  setP(max, max, (Math.random() * max));
  setP(0, max, (Math.random() * max));
  // console.log(map[0 + size * 0], " & ", map[max + size * 0], " & ", map[max + size * max], " & ", map[0 + size * max]);
}

function setP(pX, pY, val) {
  map[pX + size * pY] = val;
}

function divide(size) {
  var x, y, half = size / 2;
  var scale = roughness * size;
  // console.log("SCALE: " + scale);

  if (half < 1) return;
  for (y = half; y < max; y += size) {
    for (x = half; x < max; x += size) {
      square(x, y, half, Math.random() * scale * 2 - scale);
    }
  }
  for (y = 0; y <= max; y += half) {
    for (x = (y + half) % size; x <= max; x += size) {
      diamond(x, y, half, Math.random() * scale * 2 - scale);
    }
  }
  divide(size / 2);
}

function average(values) {
  var valid = 0;
  var total = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] !== -1) {
      valid++;
      total += values[i];
    }
  }
  return valid === 0 ? 0 : total / valid;
}

function square(x, y, size, offset) {
  var ave = average([
    getP(x - size, y - size), // upper left
    getP(x + size, y - size), // upper right
    getP(x + size, y + size), // lower right
    getP(x - size, y + size) // lower left
  ]);
  var filler = ave + offset;
  if (filler < 0) {
    console.log("ça a chié");
    filler = filler * -1;
  }
  setP(x, y, filler);
}

function diamond(x, y, size, offset) {
  var ave = average([
    getP(x, y - size), // top
    getP(x + size, y), // right
    getP(x, y + size), // bottom
    getP(x - size, y) // left
  ]);
  var filler = ave + offset;
  if (filler < 0) {
    console.log("ça a chié");
    filler = filler * -1;
  }
  setP(x, y, filler);
}
