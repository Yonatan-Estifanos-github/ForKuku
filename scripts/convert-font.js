const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

// Convert TTF to Three.js JSON font format
async function convertFont(inputPath, outputPath) {
  const font = await opentype.load(inputPath);

  const scale = 1000 / font.unitsPerEm;

  const glyphs = {};
  const glyphsToInclude = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&.,!?\'"()-+=/\\@#$%^*:; ';

  for (const char of glyphsToInclude) {
    const glyph = font.charToGlyph(char);
    if (!glyph || glyph.index === 0 && char !== ' ') continue;

    const path = glyph.getPath(0, 0, 1000);
    const commands = path.commands;

    let outline = '';
    for (const cmd of commands) {
      switch (cmd.type) {
        case 'M':
          outline += `m ${Math.round(cmd.x * scale)} ${Math.round(1000 - cmd.y * scale)} `;
          break;
        case 'L':
          outline += `l ${Math.round(cmd.x * scale)} ${Math.round(1000 - cmd.y * scale)} `;
          break;
        case 'Q':
          outline += `q ${Math.round(cmd.x1 * scale)} ${Math.round(1000 - cmd.y1 * scale)} ${Math.round(cmd.x * scale)} ${Math.round(1000 - cmd.y * scale)} `;
          break;
        case 'C':
          outline += `b ${Math.round(cmd.x1 * scale)} ${Math.round(1000 - cmd.y1 * scale)} ${Math.round(cmd.x2 * scale)} ${Math.round(1000 - cmd.y2 * scale)} ${Math.round(cmd.x * scale)} ${Math.round(1000 - cmd.y * scale)} `;
          break;
        case 'Z':
          break;
      }
    }

    glyphs[char] = {
      ha: Math.round(glyph.advanceWidth * scale),
      x_min: Math.round((glyph.xMin || 0) * scale),
      x_max: Math.round((glyph.xMax || glyph.advanceWidth) * scale),
      o: outline.trim()
    };
  }

  const fontData = {
    glyphs: glyphs,
    familyName: font.names.fontFamily?.en || 'Unknown',
    ascender: Math.round(font.ascender * scale),
    descender: Math.round(font.descender * scale),
    underlinePosition: Math.round((font.tables.post?.underlinePosition || -100) * scale),
    underlineThickness: Math.round((font.tables.post?.underlineThickness || 50) * scale),
    boundingBox: {
      yMin: Math.round(font.tables.head.yMin * scale),
      xMin: Math.round(font.tables.head.xMin * scale),
      yMax: Math.round(font.tables.head.yMax * scale),
      xMax: Math.round(font.tables.head.xMax * scale)
    },
    resolution: 1000,
    original_font_information: {
      format: 0,
      copyright: font.names.copyright?.en || '',
      fontFamily: font.names.fontFamily?.en || '',
      fontSubfamily: font.names.fontSubfamily?.en || '',
      uniqueID: font.names.uniqueID?.en || '',
      fullName: font.names.fullName?.en || '',
      version: font.names.version?.en || '',
      postScriptName: font.names.postScriptName?.en || ''
    }
  };

  fs.writeFileSync(outputPath, JSON.stringify(fontData));
  console.log(`Font converted successfully to ${outputPath}`);
}

const inputPath = path.join(__dirname, '../public/fonts/PlayfairDisplay-Regular.ttf');
const outputPath = path.join(__dirname, '../public/fonts/PlayfairDisplay-Regular.json');

convertFont(inputPath, outputPath).catch(console.error);
