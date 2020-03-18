const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

var screen = {
  width: 40 * 3,
  height: 41 * 3,
  zoom: 6,
  scale: 3,
}

canvas.width = screen.width;
canvas.height = screen.height;

canvas.style.width = (screen.width * screen.zoom) + 'px';
canvas.style.height = (screen.height * screen.zoom) + 'px';
canvas.style['image-rendering'] = 'pixelated';

const context = canvas.getContext('2d');

function clear() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, screen.width, screen.height);
}

function pixel(x, y, color = 'yellow') {
  context.fillStyle = color;
  context.fillRect(x * screen.scale + 1, y * screen.scale + 1, 1, 1);
}

function cell(x, y, color = 'yellow') {
  context.fillStyle = color;
  context.fillRect(x * screen.scale, y * screen.scale, screen.scale, screen.scale);
}

// context.fillStyle = 'black';
// context.fillRect(0, 0, screen.width, screen.height);

// context.fillStyle = 'red';
// context.fillRect(15, 15, 1, 1);
// context.fillRect(16, 14, 1, 1);
// context.fillRect(12, 18, 1, 1);
// context.fillRect(15, 17, 1, 1);
// context.fillRect(16, 16, 1, 1);

// context.clearRect(0, 0, 500, 500)

let mapStrings =
  `BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BS                 B                  BB
B BBBBBBB BBBBBBBB B BBBBBBBB BBBBBBB BB
B BBBBBBB BBBBBBBB B BBBBBBBB BBBBBBB BB
BPBBBBBBB BBBBBBBB B BBBBBBBB BBBBBBBPBB
B BBBBBBB BBBBBBBB B BBBBBBBB BBBBBBB BB
B                                     BB
B BBBBBBB BBBBB BBBBBBB BBBBB BBBBBBB BB
B BBBBBBB BBBBB BBBBBBB BBBBB BBBBBBB BB
B    BBBB    BB    B    BB    BBBB    BB
B BB      BB BBBBB B BBBBB BB      BB BB
B BBBBBBB BB BBBBB B BBBBB BB BBBBBBB BB
B BB         BBBBB B BBBBB         BB BB
B    BBBB BB               BB BBBB    BB
BBBBBBBBB BB BB BBB BBB BB BB BBBBBBBBBB
BBBBBBBBB    BB B     B BB    BBBBBBBBBB
BBBBBBBBBBBB BB B     B BB BBBBBBBBBBBBB
BBBBBBBBBBBB BB B     B BB BBBBBBBBBBBBB
BBBBBBBBBBBB BB BBB BBB BB BBBBBBBBBBBBB
BBBBBBBBBBBB               BBBBBBBBBBBBB
BBBBBBBBBBBB BB BBBBBBB BB BBBBBBBBBBBBB
BBBBBBBBBBBB BB BBBBBBB BB BBBBBBBBBBBBB
BBBBBBBBBBBB BB         BB BBBBBBBBBBBBB
BBBBBBBBBBBB BB BBB BBB BB BBBBBBBBBBBBB
BBBBBBBBBBBB BB BBB BBB BB BBBBBBBBBBBBB
B                                     BB
B BBBBBBB BB BBBBBBBBBBBBB BB BBBBBBB BB
B BBBBBBB BB BBBBBBBBBBBBB BB BBBBBBB BB
B      BB BB      BBB      BB BB      BB
BBBBBB BB BB BBBB BBB BBBB BB BB BBBBBBB
BBBBBB BB BB BBBB BBB BBBB BB BB BBBBBBB
B      BB BB BBBB BBB BBBB BB BB      BB
B BBBB BB BB               BB BB BBBB BB
B BBBB BB    BBBBBBBBBBBBB    BB BBBB BB
BPBBBB BBBBB BBBBBBBBBBBBB BBBBB BBBBPBB
B BBBB            BBB            BBBB BB
B BBBB BBBBBBBBBB BBB BBBBBBBBBB BBBB BB
B BBBB BBBBBBBBBB BBB BBBBBBBBBB BBBB BB
B                                     BB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB`.split('\n');

// let mapNumbers = [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
//   [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,],
//   [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,],
//   [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1,],  
//   [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,],
//   [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,],
//   [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1,],  
//   [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,],
//   [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,],
//   [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1,],  
//   [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,],
//   [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,],
//   [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1,],
//   [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1,],  
//   [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,],
//   [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,],
//   [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1,],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
// ]

let mapNumbers = [];

for (let row = 0; row < mapStrings.length; row++) {
  let strRow = mapStrings[row]
  let newRow = []
  for (let col = 0; col, col < strRow.length; col++) {
    if (strRow[col] == 'B') {
      newRow.push(1)
    } else {
      newRow.push(0)
    }
  }
  mapNumbers.push(newRow);
}


class Entity {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.color = 'gray';
  }

  render() {
    pixel(this.x, this.y, this.color);
  }

  update() {

  }
}

const dir_x = [1, 0, -1, 0];
const dir_y = [0, 1, 0, -1];

class Pacman extends Entity {
  constructor() {
    super();
    this.color = 'yellow';
    this.dx = 1;
    this.dy = 0;
    this.eatGhosts = false;
  }

  render() {
    cell(this.x, this.y, this.color);
  }

  update() {
    if (keyLeft) {
      this.dx = -1;
      this.dy = 0;
    } else if (keyRight) {
      this.dx = 1;
      this.dy = 0;
    } else if (keyUp) {
      this.dx = 0;
      this.dy = -1;
    } else if (keyDown) {
      this.dx = 0;
      this.dy = 1;
    }
    const x_old = this.x;
    const y_old = this.y;
    const x_new = x_old + this.dx;
    const y_new = y_old + this.dy;
    if (y_new < 0 || y_new >= mapNumbers.length
      || mapNumbers[y_new][x_new] !== 1) {
      this.x = x_new;
      this.y = y_new;
    }
    for (let i = 0; i < entities.length; i++) {
      if (entities[i].x == this.x &&
        entities[i].y == this.y &&
        entities[i] instanceof Fruit
        || entities[i] instanceof Ghost
        && this.eatGhosts) {
        if (entities[i].yummy) {
          this.eatGhosts = true;
        }
        remove(entities[i])
      }
    }
  }
}

const dir_love = [0, 0, 0];

class Ghost extends Entity {
  constructor() {
    super();
    this.color = 'red';
    this.direction = 0;
  }

  render() {
    cell(this.x, this.y, this.color);
  }

  update() {
    if(pacman.eatGhosts) {
      this.color = 'aqua';
    } else {
      this.color = 'red';
    }
    dir_love[0] = (this.direction + 3) % 4;
    dir_love[1] = this.direction;
    dir_love[2] = (this.direction + 1) % 4;
    dir_love[3] = (this.direction + 2) % 4;

    if (Math.random() < 0.2) {
      dir_love[0] = (this.direction + 1) % 4;
      dir_love[1] = this.direction;
      dir_love[2] = (this.direction + 3) % 4;
      dir_love[3] = (this.direction + 2) % 4;
    }

    for (let i = 0; i < 4; i++) {
      const dir = dir_love[i];
      const dx = dir_x[dir];
      const dy = dir_y[dir];

      const x_old = this.x;
      const y_old = this.y;
      const x_new = x_old + dx;
      const y_new = y_old + dy;
      if (y_new < 0 || y_new >= mapNumbers.length
        || mapNumbers[y_new][x_new] !== 1) {
        this.x = x_new;
        this.y = y_new;
        this.direction = dir;
        break;
      }
      for (let i = 0; i < entities.length; i++) {
        if (entities[i].x == this.x &&
          entities[i].y == this.y &&
          entities[i] instanceof Pacman &&
          !entities[i].eatGhosts) {
          remove(entities[i])
        }
      }
    }

    // if (this.y >= mapNumbers.length || mapNumbers[this.y][this.x + 1] !== 1) {
    //   this.x++;
    // }
  }
}

class Map extends Entity {
  render() {
    const rows = mapNumbers.length;
    const cols = mapNumbers[0].length;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (mapNumbers[row][col] !== 0) {
          cell(this.x + col, this.y + row, this.color);
        }
      }
    }
  }
}

class Fruit extends Entity {
  constructor() {
    super();
    this.color = 'white';
    this.yummy = 0;
  }

  makeYummy() {
    this.yummy = 1;
    this.color = 'lime';
  }

}

let entities = [];

function add(e) {
  entities.push(e)
}

function remove(e) {
  const ind = entities.indexOf(e);
  if (ind >= 0) {
    entities.splice(ind, 1);
  }
}

let map = new Map();
add(map);

let pacman = new Pacman();

add(pacman);

pacman.x = 1;
pacman.y = 2;

const maxW = screen.width / screen.scale;
const maxH = screen.height / screen.scale;

for (let j = 0; j < maxH; j++) {
  for (let i = 0; i < maxW; i++) {
    if (j >= 0 && j < mapNumbers.length && mapNumbers[j][i] === 0) {
      let fruit = new Fruit();
      fruit.x = i;
      fruit.y = j;
      if (mapStrings[j][i] === 'S') {
        fruit.makeYummy()
      }
      add(fruit);
    }
  }
}

for (let i = 0; i < 20; i++) {
  let x = Math.floor(Math.random() * maxW)
  let y = Math.floor(Math.random() * maxH)
  if (y < mapNumbers.length && mapNumbers[y][x] === 1) {
    continue;
  }
  let ghost = new Ghost();
  ghost.x = x;
  ghost.y = y;
  add(ghost);
}

// for (let j=0; j<maxH; j++) {
//   for (let i=0; i<maxW; i++) {
//     if (j>=0 && j<mapNumbers.length && mapNumbers[j][i] === 0) {
//       let ghost = new Fruit();
//       ghost.x = i;
//       ghost.y = j;
//       add(ghost);
//     }
//   }
// }

function frame() {
  for (let i = 0; i < entities.length; i++) {
    entities[i].update();
  }

  clear();
  for (let i = 0; i < entities.length; i++) {
    entities[i].render();
  }
}

let keyRight = false;
let keyUp = false;
let keyLeft = false;
let keyDown = false;
document.addEventListener('keydown', function (event) {
  switch (event.which) {
    case 39:
    case 68:
      keyRight = true;
      break;
    case 38:
    case 87:
      keyUp = true;
      break;
    case 37:
    case 65:
      keyLeft = true;
      break;
    case 40:
    case 83:
      keyDown = true;
      break;
  }
});
document.addEventListener('keyup', function (event) {
  switch (event.which) {
    case 39:
    case 68:
      keyRight = false;
      break;
    case 38:
    case 87:
      keyUp = false;
      break;
    case 37:
    case 65:
      keyLeft = false;
      break;
    case 40:
    case 83:
      keyDown = false;
      break;
  }
});

frame()

setInterval(frame, 250)
