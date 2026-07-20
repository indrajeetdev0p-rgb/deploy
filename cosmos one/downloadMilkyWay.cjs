const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://www.solarsystemscope.com/textures/download/8k_stars_milky_way.jpg';
const filePath = path.join(__dirname, 'public', 'textures', 'milky_way.jpg');

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
             const file = fs.createWriteStream(filePath);
             redirectRes.pipe(file);
             file.on('finish', () => { file.close(); console.log(`Downloaded milky_way.jpg`); });
        });
        return;
    }
    if (res.statusCode === 200) {
      const file = fs.createWriteStream(filePath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded milky_way.jpg`);
      });
    } else {
       console.log(`Failed with status ${res.statusCode}`);
    }
}).on('error', (err) => {
    console.error(`Error: ${err.message}`);
});
