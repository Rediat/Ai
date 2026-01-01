import React from 'react';

const Select = ({ label, value, onChange, options, className = '' }) => {
    return (
        <div className={`flex flex-col space-y-2 ${className}`}>
            {label && <label className="text-sm font-medium text-white/70">{label}</label>}
            <select
                value={value}
                onChange={onChange}
                className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all font-mono appearance-none cursor-pointer"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
