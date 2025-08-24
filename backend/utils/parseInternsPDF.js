const pdfParse = require('pdf-parse');
const fs = require('fs');
const Intern = require('../models/Intern');

async function parseAndInsertInterns(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);
  // Example parsing logic: split lines, extract name and batchCode
  const lines = data.text.split('\n');
  for (const line of lines) {
    // Match: everything up to last space is name, last word is batchCode
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split(' ');
    if (parts.length < 2) continue;
    const batchCode = parts[parts.length - 1];
    const name = parts.slice(0, parts.length - 1).join(' ');
    await Intern.updateOne(
      { name },
      { name, batchCode },
      { upsert: true }
    );
  }
  return 'Interns parsed and inserted.';
}

module.exports = { parseAndInsertInterns };
