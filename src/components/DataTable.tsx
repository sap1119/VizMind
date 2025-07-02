import React, { useState, useEffect } from 'react';
import { ParsedData } from '../types';
import { Table, Search, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Filter, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface DataTableProps {
  data: ParsedData;
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const { headers, rows } = data;

  // Initialize visible columns
  useEffect(() => {
    setVisibleColumns(headers);
  }, [headers]);

  // Toggle column visibility
  const toggleColumn = (column: string) => {
    if (visibleColumns.includes(column)) {
      if (visibleColumns.length > 1) { // Ensure at least one column is visible
        setVisibleColumns(visibleColumns.filter(col => col !== column));
      }
    } else {
      setVisibleColumns([...visibleColumns, column]);
    }
  };

  // Filter and sort data
  const filteredAndSortedRows = React.useMemo(() => {
    let filteredRows = rows;

    // Apply search filter
    if (searchTerm) {
      filteredRows = rows.filter(row => 
        headers.some(header => 
          String(row[header] || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortColumn) {
      filteredRows = [...filteredRows].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = String(aVal || '');
        const bStr = String(bVal || '');
        
        return sortDirection === 'asc' 
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }

    return filteredRows;
  }, [rows, headers, searchTerm, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredAndSortedRows.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const visibleData = [
      visibleColumns.join(','), // Header row
      ...filteredAndSortedRows.map(row => 
        visibleColumns.map(col => `"${row[col] || ''}"`).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([visibleData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md">
              <Table className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Data Explorer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {filteredAndSortedRows.length} of {rows.length} records
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-grow max-w-xs">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <button
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Columns</span>
            </button>
            
            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>
        
        {/* Column Selector */}
        {showColumnSelector && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-md"
          >
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Toggle Columns:</h4>
            <div className="flex flex-wrap gap-2">
              {headers.map(header => (
                <label key={header} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(header)}
                    onChange={() => toggleColumn(header)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{header}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {visibleColumns.map((header) => (
                <th
                  key={header}
                  onClick={() => handleSort(header)}
                  className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>{header}</span>
                    {sortColumn === header ? (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="w-4 h-4 text-blue-500" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-blue-500" />
                      )
                    ) : (
                      <div className="w-4 h-4"></div> // Placeholder for alignment
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentRows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                {visibleColumns.map((header) => (
                  <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                    {String(row[header] || '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedRows.length)} of {filteredAndSortedRows.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing rows per page
              }}
              className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {[5, 10, 25, 50, 100].map(value => (
                <option key={value} value={value}>
                  {value} rows
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md transition-colors ${
                      currentPage === pageNum
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};