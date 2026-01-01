import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, className = '' }) => {
    return (
        <div className={`flex flex-col space-y-2 ${className}`}>
            {label && <label className="text-sm font-medium text-white/70">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white/30 transition-all font-mono"
            />
        </div>
    );
};

export default Input;
