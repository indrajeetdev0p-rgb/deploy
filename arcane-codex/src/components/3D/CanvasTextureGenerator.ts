import * as THREE from 'three'
import type { PageContentData } from '../../data/spells'

export function createPageTexture(
  pageData: PageContentData, 
  side: 'left' | 'right',
  runeColorHex = '#38bdf8'
): THREE.CanvasTexture {
  const width = 2048;
  const height = 2896;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Aged Parchment Background
  const grad = ctx.createRadialGradient(width / 2, height / 2, 400, width / 2, height / 2, width);
  grad.addColorStop(0, '#f4e4bc');
  grad.addColorStop(0.7, '#dfc594');
  grad.addColorStop(1, '#9e7b47');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Paper Grain Noise
  for (let i = 0; i < 8000; i++) {
    const rx = Math.random() * width;
    const ry = Math.random() * height;
    const size = Math.random() * 5 + 1;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(70, 48, 20, 0.04)' : 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.arc(rx, ry, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Border Filligrees
  ctx.strokeStyle = 'rgba(60, 35, 10, 0.35)';
  ctx.lineWidth = 24;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  ctx.strokeStyle = '#b8860b'; // Gold foil
  ctx.lineWidth = 8;
  ctx.strokeRect(70, 70, width - 140, height - 140);
  ctx.strokeRect(90, 90, width - 180, height - 180);

  const isLeft = side === 'left';
  const title = isLeft ? pageData.leftTitle : pageData.rightTitle;
  const subtitle = isLeft ? pageData.leftSubtitle : pageData.rightSubtitle;
  const fullText = isLeft ? pageData.leftFullText : pageData.rightFullText;
  const incantation = isLeft ? pageData.leftIncantation : pageData.rightIncantation;
  const runeSymbol = isLeft ? pageData.leftRuneSymbol : pageData.rightRuneSymbol;
  const recipe = isLeft ? pageData.leftRecipe : pageData.rightRecipe;

  // Header Title
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(184, 134, 11, 0.1)';
  ctx.fillRect(140, 160, width - 280, 200);
  ctx.strokeStyle = 'rgba(184, 134, 11, 0.6)';
  ctx.lineWidth = 4;
  ctx.strokeRect(140, 160, width - 280, 200);

  ctx.fillStyle = '#1a0f02';
  ctx.font = 'bold 76px Cinzel, Georgia, serif';
  ctx.fillText(title, width / 2, 270);

  ctx.fillStyle = '#3d2314';
  ctx.font = 'italic 44px Cinzel, Georgia, serif';
  ctx.fillText(subtitle, width / 2, 420);

  // Central Magical Diagram Symbol (NO SHADOW BLUR!)
  const circleY = 880;
  ctx.save();
  ctx.translate(width / 2, circleY);
  ctx.strokeStyle = runeColorHex;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, 0, 240, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const px = Math.cos(angle) * 230;
    const py = Math.sin(angle) * 230;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = runeColorHex;
  ctx.font = '96px Georgia, serif';
  ctx.fillText(runeSymbol, 0, 32);
  ctx.restore();

  // Multi-line Full Readable Text
  ctx.fillStyle = '#000000'; // Pure black for max contrast
  ctx.font = '48px Inter, sans-serif';
  ctx.textAlign = 'left';

  const margin = 180;
  const maxWidth = width - margin * 2;
  let curY = 1300;

  fullText.forEach((paragraph) => {
    const words = paragraph.split(' ');
    let line = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, margin, curY);
        line = words[i] + ' ';
        curY += 72;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, margin, curY);
    curY += 84; // Paragraph gap
  });

  // Incantation Quote
  if (incantation) {
    curY += 50;
    ctx.fillStyle = '#5c220f'; // Dark red/brown
    ctx.font = 'bold italic 52px Cinzel, Georgia, serif';
    ctx.fillText(incantation, margin, curY);
  }

  // Recipe List
  if (recipe && recipe.length > 0) {
    curY += 70;
    ctx.fillStyle = '#5c220f';
    ctx.font = 'bold 46px Cinzel, Georgia, serif';
    ctx.fillText('INGREDIENTS & PREPARATION:', margin, curY);

    ctx.font = '42px Inter, sans-serif';
    ctx.fillStyle = '#1a0f02';
    recipe.forEach((item) => {
      curY += 70;
      ctx.fillText(`✦ ${item}`, margin + 30, curY);
    });
  }

  // Page Footer
  ctx.textAlign = 'center';
  ctx.fillStyle = '#78541c';
  ctx.font = 'bold 36px Cinzel, serif';
  const pageNumStr = isLeft ? `— Page ${pageData.pageIndex * 2 + 1} —` : `— Page ${pageData.pageIndex * 2 + 2} —`;
  ctx.fillText(pageNumStr, width / 2, height - 140);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
