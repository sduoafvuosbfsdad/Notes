import React from 'react';

export default function GlassContainer({ 
    children, 
    className = '',
    blur = 20,
    opacity = 0.25,
    padding = '2rem',
    maxWidth = '800px',
    hover = false
}) {
    return (
        <div 
            className={`glass-container ${className} ${hover ? 'glass-hover' : ''}`}
            style={{
                '--glass-opacity': opacity,
                '--glass-blur': `${blur}px`,
                '--glass-padding': padding,
                '--glass-max-width': maxWidth,
            }}
        >
            {children}
        </div>
    );
}
