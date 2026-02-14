import { useState } from 'react';

export default function InfoCard({
    variant = 'expand',
    front,
    back,
    width = '280px',
    height = 'auto',
    className = '',
    onFlip
}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFlip = () => {
        if (variant === 'flip') {
            setIsFlipped(!isFlipped);
            onFlip?.(!isFlipped);
        }
    };

    const handleExpand = () => {
        if (variant === 'expand') {
            setIsExpanded(!isExpanded);
        }
    };

    if (variant === 'flip') {
        return (
            <div 
                className={`info-card info-card--flip ${className} ${isFlipped ? 'flipped' : ''}`}
                style={{ width, height: height === 'auto' ? '200px' : height }}
                onClick={handleFlip}
            >
                <div className="info-card-inner">
                    {/* Front */}
                    <div className="info-card-front">
                        {front.icon && <div className="info-card-icon">{front.icon}</div>}
                        <h4 className="info-card-title">{front.title}</h4>
                        {(front.subtitle || front.brief) && (
                            <p className="info-card-subtitle">{front.subtitle || front.brief}</p>
                        )}
                        <span className="info-card-hint">Click to flip</span>
                    </div>
                    
                    {/* Back */}
                    <div className="info-card-back">
                        <div className="info-card-content">{back.content}</div>
                        {back.related && (
                            <div className="info-card-related">
                                <small>Related: {back.related.join(', ')}</small>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Expand variant
    return (
        <div 
            className={`info-card info-card--expand ${className} ${isExpanded ? 'expanded' : ''}`}
            style={{ width }}
        >
            <div 
                className="info-card-header"
                onClick={handleExpand}
            >
                {front.icon && <span className="info-card-icon">{front.icon}</span>}
                <div className="info-card-header-text">
                    <h4 className="info-card-title">{front.title}</h4>
                    {front.subtitle && <span className="info-card-subtitle">{front.subtitle}</span>}
                </div>
                <span className={`info-card-chevron ${isExpanded ? 'rotated' : ''}`}>▼</span>
            </div>
            <div 
                className="info-card-body"
                style={{
                    maxHeight: isExpanded ? '500px' : '0',
                    opacity: isExpanded ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease, opacity 0.3s ease'
                }}
            >
                <div className="info-card-content">{back.content}</div>
                {back.related && (
                    <div className="info-card-related">
                        <small>Related: {back.related.join(', ')}</small>
                    </div>
                )}
            </div>
        </div>
    );
}
