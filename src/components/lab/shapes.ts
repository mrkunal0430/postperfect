// Target point clouds for the particle hero. Each shape is drawn on an
// offscreen 2D canvas, then sampled into `count` xyz positions in world units.

const W = 1200;
const H = 600;
const UNIT = 60; // canvas px per world unit

type Draw = (ctx: CanvasRenderingContext2D) => void;

function sample(draw: Draw, count: number, depth = 0.4): Float32Array {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const out = new Float32Array(count * 3);
  if (!ctx) return scatter(count, 6);

  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  draw(ctx);

  const data = ctx.getImageData(0, 0, W, H).data;
  const pts: number[] = [];
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (data[(y * W + x) * 4 + 3] > 128) pts.push(x, y);
    }
  }
  const n = pts.length / 2;
  if (n === 0) return scatter(count, 6);

  for (let i = 0; i < count; i++) {
    const j = Math.floor(Math.random() * n) * 2;
    out[i * 3] = (pts[j] - W / 2 + Math.random() * 2) / UNIT;
    out[i * 3 + 1] = -(pts[j + 1] - H / 2 + Math.random() * 2) / UNIT;
    out[i * 3 + 2] = (Math.random() - 0.5) * depth;
  }
  return out;
}

export function scatter(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    out[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    out[i * 3 + 2] = r * Math.cos(phi);
  }
  return out;
}

function sphere(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const jitter = radius * (1 + (Math.random() - 0.5) * 0.06);
    out[i * 3] = Math.cos(theta) * r * jitter;
    out[i * 3 + 1] = y * jitter;
    out[i * 3 + 2] = Math.sin(theta) * r * jitter;
  }
  return out;
}

function wordmark(family: string): Draw {
  return (ctx) => {
    let size = 230;
    ctx.font = `700 ${size}px ${family}`;
    const width = ctx.measureText("PostPerfect").width;
    if (width > W * 0.92) size = Math.floor((size * W * 0.92) / width);
    ctx.font = `700 ${size}px ${family}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("PostPerfect", W / 2, H / 2);
  };
}

const browser: Draw = (ctx) => {
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(340, 80, 520, 400, 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(340, 145);
  ctx.lineTo(860, 145);
  ctx.stroke();
  for (const x of [380, 412, 444]) {
    ctx.beginPath();
    ctx.arc(x, 112, 10, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillRect(385, 185, 250, 34);
  ctx.fillRect(385, 240, 170, 16);
  ctx.beginPath();
  ctx.roundRect(385, 280, 130, 40, 20);
  ctx.fill();
  ctx.lineWidth = 10;
  for (const x of [385, 545, 705]) {
    ctx.beginPath();
    ctx.roundRect(x, 355, 110, 90, 12);
    ctx.stroke();
  }
};

const play: Draw = (ctx) => {
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(600, 300, 215, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(535, 185);
  ctx.lineTo(535, 415);
  ctx.lineTo(725, 300);
  ctx.closePath();
  ctx.fill();
};

function brandMark(family: string): Draw {
  return (ctx) => {
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(600, 300, 230, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([4, 22]);
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(600, 300, 270, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = `700 330px ${family}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("P", 612, 318);
  };
}

const growth: Draw = (ctx) => {
  const heights = [90, 150, 200, 270, 350];
  heights.forEach((h, i) => {
    ctx.beginPath();
    ctx.roundRect(380 + i * 96, 480 - h, 64, h, 10);
    ctx.fill();
  });
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.moveTo(350, 330);
  ctx.lineTo(500, 250);
  ctx.lineTo(600, 290);
  ctx.lineTo(820, 110);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(760, 105);
  ctx.lineTo(830, 100);
  ctx.lineTo(822, 170);
  ctx.stroke();
};

const social: Draw = (ctx) => {
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(370, 90, 460, 330, 70);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(470, 418);
  ctx.lineTo(440, 500);
  ctx.lineTo(560, 420);
  ctx.stroke();
  // heart
  ctx.beginPath();
  ctx.moveTo(600, 360);
  ctx.bezierCurveTo(470, 280, 480, 160, 555, 160);
  ctx.bezierCurveTo(585, 160, 600, 185, 600, 200);
  ctx.bezierCurveTo(600, 185, 615, 160, 645, 160);
  ctx.bezierCurveTo(720, 160, 730, 280, 600, 360);
  ctx.fill();
};

/** Just the "PostPerfect" wordmark, for the site footer. */
export function wordmarkCloud(count: number, family: string): Float32Array {
  return sample(wordmark(family), count, 0.5);
}

/** Index of the shape that slowly rotates (the closing globe). */
export const SPHERE_INDEX = 6;

export function buildShapes(count: number, family: string): Float32Array[] {
  return [
    sample(wordmark(family), count, 0.5),
    sample(browser, count),
    sample(play, count),
    sample(brandMark(family), count),
    sample(growth, count),
    sample(social, count),
    sphere(count, 3.4),
  ];
}
