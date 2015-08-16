const arrows = {
  up: new Buffer([180, 37]).toString('ucs2'),
  down: new Buffer([190, 37]).toString('ucs2'),
  left: new Buffer([194, 37]).toString('ucs2'),
  right: new Buffer([184, 37]).toString('ucs2')
}

export default function arrow (dir) {
  return arrows[dir]
}
