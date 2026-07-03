import React, { useMemo, useState } from 'react';
import Pagination from './Pagination';
import { IconDownload, IconPdf, IconSearch } from './icons';
import { exportToExcel, exportToPdf } from '../utils/exportTable';

/**
 * Generic, reusable data table with client-side search, pagination and
 * Excel/PDF export. `columns` = [{ key, label, render?(row), value?(row), width? }]
 */
export default function DataTable({
  columns,
  rows,
  filename = 'export',
  title,
  searchPlaceholder = 'Search…',
  searchKeys,
  pageSize = 8,
  extraFilters,
  emptyMessage = 'No records found.',
  rightSlot,
  onRowClick,
  hideToolbar = false,
}) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    const keys = searchKeys || columns.map((c) => c.key);
    return rows.filter((row) =>
      keys.some((k) => {
        const val = row[k];
        return val !== undefined && val !== null && String(val).toLowerCase().includes(q);
      })
    );
  }, [rows, query, columns, searchKeys]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(page, pageCount);
  const pageRows = filtered.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  const handleSearch = (v) => { setQuery(v); setPage(1); };

  return (
    <div>
      {!hideToolbar && (
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between mb-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative w-full sm:w-72">
              <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input
                className="input pl-10"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {extraFilters}
          </div>
          <div className="flex items-center gap-2">
            {rightSlot}
            <select
              className="select"
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
            >
              {[5, 8, 10, 25, 50].map((n) => <option key={n} value={n}>{n} rows</option>)}
            </select>
            <button
              className="btn btn-secondary text-xs px-3.5 py-2"
              onClick={() => exportToExcel(filename, columns, filtered)}
            >
              <IconDownload size={15} /> Excel
            </button>
            <button
              className="btn btn-danger text-xs px-3.5 py-2"
              onClick={() => exportToPdf(filename, columns, filtered, title)}
            >
              <IconPdf size={15} /> PDF
            </button>
          </div>
        </div>
      )}

      <div className="table-wrap glass card">
        <table>
          <thead className="table-head">
            <tr>
              {columns.map((c) => (
                <th key={c.key} style={c.width ? { width: c.width } : undefined}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-sm text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            )}
            {pageRows.map((row, i) => (
              <tr
                key={row.id || i}
                className={`table-row ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((c) => (
                  <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={safePage}
        pageCount={pageCount}
        onChange={setPage}
        totalItems={filtered.length}
        pageSize={rowsPerPage}
      />
    </div>
  );
}
