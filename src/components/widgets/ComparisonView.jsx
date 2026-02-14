import { useState } from 'react';

export default function ComparisonView({
    mode = 'side-by-side',
    itemA,
    itemB,
    showDifferences = false,
    fieldsToCompare = null,
    className = '',
    itemClassName = ''
}) {
    const [activeItem, setActiveItem] = useState('A');

    // Determine fields to compare
    const compareFields = fieldsToCompare || Object.keys(itemA.meta || {});

    // Check if values differ for highlighting
    const isDifferent = (field) => {
        if (!showDifferences) return false;
        const valA = itemA.meta?.[field];
        const valB = itemB.meta?.[field];
        return valA !== valB;
    };

    if (mode === 'toggle') {
        const activeData = activeItem === 'A' ? itemA : itemB;
        
        return (
            <div className={`comparison-view comparison-view--toggle ${className}`}>
                <div className="comparison-toggle">
                    <button 
                        className={activeItem === 'A' ? 'active' : ''}
                        onClick={() => setActiveItem('A')}
                    >
                        {itemA.title}
                    </button>
                    <button 
                        className={activeItem === 'B' ? 'active' : ''}
                        onClick={() => setActiveItem('B')}
                    >
                        {itemB.title}
                    </button>
                </div>
                <div className={`comparison-content ${itemClassName}`}>
                    <h4>{activeData.title}</h4>
                    {activeData.content}
                </div>
            </div>
        );
    }

    // Side-by-side mode
    return (
        <div className={`comparison-view comparison-view--side-by-side ${className}`}>
            <div className="comparison-grid">
                {/* Item A */}
                <div className={`comparison-item ${itemClassName}`}>
                    <div className="comparison-item-header">
                        {itemA.icon && <span className="comparison-icon">{itemA.icon}</span>}
                        <h4>{itemA.title}</h4>
                    </div>
                    <div className="comparison-item-content">
                        {itemA.content}
                    </div>
                    {itemA.meta && (
                        <div className="comparison-meta">
                            {compareFields.map(field => (
                                <div key={field} className="comparison-meta-row">
                                    <span className="meta-label">{field}:</span>
                                    <span className={`meta-value ${isDifferent(field) ? 'highlight-a' : ''}`}>
                                        {itemA.meta[field]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Item B */}
                <div className={`comparison-item ${itemClassName}`}>
                    <div className="comparison-item-header">
                        {itemB.icon && <span className="comparison-icon">{itemB.icon}</span>}
                        <h4>{itemB.title}</h4>
                    </div>
                    <div className="comparison-item-content">
                        {itemB.content}
                    </div>
                    {itemB.meta && (
                        <div className="comparison-meta">
                            {compareFields.map(field => (
                                <div key={field} className="comparison-meta-row">
                                    <span className="meta-label">{field}:</span>
                                    <span className={`meta-value ${isDifferent(field) ? 'highlight-b' : ''}`}>
                                        {itemB.meta[field]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
