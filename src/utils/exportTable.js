// Client-side table export helpers.
// No network access is available to fetch libraries like SheetJS, so "Export
// Excel" produces a UTF-8 CSV (opens natively in Excel/Sheets/Numbers with no
// plugin). "Export PDF" builds a genuine PDF file in the browser using
// pdf-lib (bundled locally, no server round-trip).

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

function cellToString(v) {
  if (v === null || v === undefined) return '';
  return String(v);
}

export function exportToExcel(filename, columns, rows) {
  const headers = columns.map((c) => c.label);
  const lines = [headers.join(',')];
  rows.forEach((row) => {
    const line = columns.map((c) => {
      const raw = typeof c.value === 'function' ? c.value(row) : row[c.key];
      const str = cellToString(raw).replace(/"/g, '""');
      return /[",\n]/.test(str) ? `"${str}"` : str;
    });
    lines.push(line.join(','));
  });
  const csv = '﻿' + lines.join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${filename}.csv`);
}

export async function exportToPdf(filename, columns, rows, title) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 841.89; // A4 landscape
  const pageHeight = 595.28;
  const margin = 28;
  const rowHeight = 18;
  const usableWidth = pageWidth - margin * 2;
  const cellPad = 6;
  const fontSize = 8.5;

  // Give wider columns to fields that tend to hold longer text (name/title
  // style columns), narrower ones to short numeric/status columns, so long
  // values don't visually run into the next cell.
  const weights = columns.map((c) => {
    const key = (c.key || '').toLowerCase();
    if (/name|campaign|customer|title|remarks|comment/.test(key)) return 2.3;
    if (/phone|email|date|created|when/.test(key)) return 1.5;
    return 1;
  });
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const colWidths = weights.map((w) => (w / totalWeight) * usableWidth);
  const colX = [];
  let acc = margin;
  colWidths.forEach((w) => { colX.push(acc); acc += w; });

  const truncateToWidth = (str, width, useFont, size) => {
    if (useFont.widthOfTextAtSize(str, size) <= width) return str;
    let lo = 0, hi = str.length;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      const candidate = str.slice(0, mid) + '…';
      if (useFont.widthOfTextAtSize(candidate, size) <= width) lo = mid;
      else hi = mid - 1;
    }
    return lo <= 0 ? '' : str.slice(0, lo) + '…';
  };

  let page = doc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawHeaderBlock = () => {
    page.drawText(title || filename, { x: margin, y, size: 13, font: boldFont, color: rgb(0.15, 0.09, 0.02) });
    y -= 20;
    page.drawText(`Generated ${new Date().toLocaleString()}`, { x: margin, y, size: 8, font, color: rgb(0.45, 0.45, 0.5) });
    y -= 16;
    columns.forEach((c, i) => {
      const label = truncateToWidth(String(c.label || ''), colWidths[i] - cellPad, boldFont, fontSize);
      page.drawText(label, { x: colX[i], y, size: fontSize, font: boldFont, color: rgb(0.91, 0.35, 0.05) });
    });
    y -= 6;
    page.drawLine({ start: { x: margin, y }, end: { x: pageWidth - margin, y }, thickness: 0.75, color: rgb(0.85, 0.85, 0.85) });
    y -= rowHeight - 4;
  };

  drawHeaderBlock();

  rows.forEach((row, idx) => {
    if (y < margin + rowHeight) {
      page = doc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
      drawHeaderBlock();
    }
    if (idx % 2 === 0) {
      page.drawRectangle({ x: margin, y: y - 4, width: usableWidth, height: rowHeight, color: rgb(0.98, 0.97, 0.95) });
    }
    columns.forEach((c, i) => {
      const raw = typeof c.value === 'function' ? c.value(row) : row[c.key];
      const str = truncateToWidth(cellToString(raw), colWidths[i] - cellPad, font, fontSize);
      page.drawText(str, { x: colX[i], y, size: fontSize, font, color: rgb(0.1, 0.12, 0.16) });
    });
    y -= rowHeight;
  });

  const bytes = await doc.save();
  const blob = new Blob([bytes], { type: 'application/pdf' });
  downloadBlob(blob, `${filename}.pdf`);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
