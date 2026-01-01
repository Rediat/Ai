import React from 'react';

const Card = ({ children, title, description, formula, className = '' }) => {
    return (
        <div className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl ${className}`}>
            {title && <h3 className="text-xl font-bold mb-2 text-white/90">{title}</h3>}
            {description && <p className="text-sm text-white/60 mb-2">{description}</p>}
            {formula && <p className="text-xs font-mono text-purple-300 mb-4 bg-purple-900/30 p-2 rounded border border-purple-500/20 inline-block">{formula}</p>}
            {children}
        </div>
    );
};

export default Card;
