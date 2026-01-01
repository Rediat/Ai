import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
    const baseStyle = "px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform active:scale-95";
    const variants = {
        primary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg hover:shadow-purple-500/30",
        secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/10",
    };

    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

export default Button;
