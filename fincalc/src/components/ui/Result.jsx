import React from 'react';

const Result = ({ label, value, prefix = '$' }) => {
    return (
        <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-all">
            <span className="text-white/60 font-medium">{label}</span>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                {prefix}{value}
            </span>
        </div>
    );
};

export default Result;
