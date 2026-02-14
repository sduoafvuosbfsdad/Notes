import { useState, useMemo } from 'react';

export default function DataGrid({
    columns,
    data,
    filterable = false,
    sortable = false,
    rowDetailRenderer = null,
    onRowClick,
    title,
    className = '',
    tableClassName = '',
    emptyMessage = 'No data available'
}) {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [filters, setFilters] = useState({});
    const [expandedRow, setExpandedRow] = useState(null);

    // Handle sorting
    const handleSort = (columnKey) => {
        if (!sortable) return;
        
        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
    };

    // Handle filtering
    const handleFilterChange = (columnKey, value) => {
        setFilters(prev => ({
            ...prev,
            [columnKey]: value
        }));
    };

    // Process data with sort and filter
    const processedData = useMemo(() => {
        let result = [...data];

        // Apply filters
        if (filterable) {
            Object.entries(filters).forEach(([key, filterValue]) => {
                if (filterValue) {
                    result = result.filter(row => {
                        const cellValue = String(row[key] || '').toLowerCase();
                        return cellValue.includes(filterValue.toLowerCase());
                    });
                }
            });
        }

        // Apply sorting
        if (sortable && sortColumn) {
            result.sort((a, b) => {
                const aVal = a[sortColumn];
                const bVal = b[sortColumn];
                
                if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [data, filters, sortColumn, sortDirection, filterable, sortable]);

    const handleRowClick = (row, index) => {
        if (rowDetailRenderer) {
            setExpandedRow(expandedRow === index ? null : index);
        }
        onRowClick?.(row, index);
    };

    return (
        <div className={`data-grid ${className}`}>
            {title && <h3 className="data-grid-title">{title}</h3>}
            
            {/* Filter inputs */}
            {filterable && (
                <div className="data-grid-filters">
                    {columns.filter(col => col.filterable !== false).map(col => (
                        <input
                            key={col.key}
                            type="text"
                            placeholder={`Filter ${col.header}`}
                            value={filters[col.key] || ''}
                            onChange={(e) => handleFilterChange(col.key, e.target.value)}
                            className="data-grid-filter-input"
                        />
                    ))}
                </div>
            )}

            {/* Table */}
            <div className="data-grid-table-wrapper">
                <table className={`data-grid-table ${tableClassName}`}>
                    <thead>
                        <tr>
                            {columns.map(col => (
                                <th
                                    key={col.key}
                                    className={`${sortable && col.sortable !== false ? 'sortable' : ''} ${sortColumn === col.key ? `sorted-${sortDirection}` : ''}`}
                                    style={{ width: col.width }}
                                    onClick={() => handleSort(col.key)}
                                >
                                    {col.header}
                                    {sortable && col.sortable !== false && (
                                        <span className="sort-indicator">
                                            {sortColumn === col.key ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ' ◆'}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {processedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="data-grid-empty">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            processedData.map((row, rowIndex) => (
                                <>
                                    <tr
                                        key={rowIndex}
                                        className={`${rowDetailRenderer ? 'expandable' : ''} ${expandedRow === rowIndex ? 'expanded' : ''}`}
                                        onClick={() => handleRowClick(row, rowIndex)}
                                    >
                                        {columns.map(col => (
                                            <td key={col.key}>
                                                {col.render 
                                                    ? col.render(row[col.key], row)
                                                    : row[col.key]
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                    {rowDetailRenderer && expandedRow === rowIndex && (
                                        <tr className="detail-row">
                                            <td colSpan={columns.length}>
                                                <div className="detail-content">
                                                    {rowDetailRenderer(row)}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
