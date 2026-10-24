// Samples the logo image into a particle cloud: positions (world units,
// centred, LOGO_WIDTH wide) and per-particle colours taken from the pixels.

export const LOGO_WIDTH = 16;

export type LogoCloud = { pos: Float32Array; col: Float32Array };

export async function sampleLogo(src: string, count: number): Promise<LogoCloud> {
  const img = new Image();
  img.src = src;
  await img.decode();

  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D canvas unavailable");
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, w, h).data;

  const hits: number[] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 140) hits.push(x, y);
    }
  }
  if (hits.length === 0) throw new Error("Logo has no opaque pixels");

  const unit = LOGO_WIDTH / w;
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const n = hits.length / 2;
  for (let i = 0; i < count; i++) {
    const j = Math.floor(Math.random() * n) * 2;
    const px = hits[j];
    const py = hits[j + 1];
    pos[i * 3] = (px + Math.random() - w / 2) * unit;
    pos[i * 3 + 1] = -(py + Math.random() - h / 2) * unit;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 0.25;

    // Exact logo pixel colour, so the particles match the real logo.
    const k = (py * w + px) * 4;
    col[i * 3] = data[k] / 255;
    col[i * 3 + 1] = data[k + 1] / 255;
    col[i * 3 + 2] = data[k + 2] / 255;
  }
  return { pos, col };
}
