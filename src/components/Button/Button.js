import React, {PropTypes} from 'react';
import styles from './Button.css';

export const Button = ({type, children, onClick}) => (
    <button className={styles[type]} onClick={onClick}>
        {children}
    </button>
);

Button.propTypes = {
    type: PropTypes.oneOf(['primary', 'disabled', 'additional', 'default']),
    onClick: PropTypes.func
};

export default Button;
