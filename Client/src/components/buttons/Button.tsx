// src/components/buttons/PrimaryButton.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
type PrimaryButtonProps = {
    to: string;
    label: string;
};

const Button: React.FC<PrimaryButtonProps> = ({ to, label }) => {
    return (
        <NavLink to={to} className="primary-button">
            {label}
        </NavLink>
    );
};

export default Button;
