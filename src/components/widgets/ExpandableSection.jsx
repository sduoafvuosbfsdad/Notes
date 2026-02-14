import { useState } from 'react';

export default function ExpandableSection({
    title,
    summary,
    children,
    defaultExpanded = false,
    icon = null,
    className = '',
    headerClassName = '',
    contentClassName = ''
}) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className={`expandable-section ${className} ${isExpanded ? 'expanded' : ''}`}>
            <button
                className={`expandable-header ${headerClassName}`}
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
            >
                <div className="expandable-title">
                    {icon && <span className="expandable-icon">{icon}</span>}
                    <span className="expandable-title-text">{title}</span>
                </div>
                {summary && !isExpanded && (
                    <span className="expandable-summary">{summary}</span>
                )}
                <span className={`expandable-chevron ${isExpanded ? 'rotated' : ''}`}>
                    ▼
                </span>
            </button>
            <div 
                className={`expandable-content ${contentClassName}`}
                style={{
                    maxHeight: isExpanded ? '2000px' : '0',
                    opacity: isExpanded ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease, opacity 0.3s ease'
                }}
            >
                <div className="expandable-inner">
                    {children}
                </div>
            </div>
        </div>
    );
}
