const https = require('https');
const fs = require('fs');
const path = require('path');

const textures = {
  'sun.jpg': 'https://www.solarsystemscope.com/textures/download/2k_sun.jpg',
  'mercury.jpg': 'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg',
  'venus.jpg': 'https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg',
  'earth.jpg': 'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg',
  'moon.jpg': 'https://www.solarsystemscope.com/textures/download/2k_moon.jpg',
  'mars.jpg': 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg',
  'jupiter.jpg': 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg',
  'saturn.jpg': 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg',
  'saturn_ring.png': 'https://www.solarsystemscope.com/textures/download/2k_saturn_ring_alpha.png',
  'uranus.jpg': 'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg',
  'neptune.jpg': 'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg',
};

const dir = path.join(__dirname, 'public', 'textures');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

Object.entries(textures).forEach(([filename, url]) => {
  const filePath = path.join(dir, filename);
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    // Follow redirects if necessary
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
             const file = fs.createWriteStream(filePath);
             redirectRes.pipe(file);
             file.on('finish', () => { file.close(); console.log(`Downloaded ${filename}`); });
        });
        return;
    }

    if (res.statusCode === 200) {
      const file = fs.createWriteStream(filePath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
      });
    } else {
       console.log(`Failed ${filename} with status ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
});
