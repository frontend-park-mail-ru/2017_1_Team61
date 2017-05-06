import React, {PropTypes} from 'react';
import styles from './Button.css';

export const Button = ({type, children}) => (
    <button className={[styles.default, styles[type].concat(' ')]}>
        {children}
    </button>
);

Button.propTypes = {
    type: PropTypes.oneOf(['primary', 'disabled', 'additional'])
};
