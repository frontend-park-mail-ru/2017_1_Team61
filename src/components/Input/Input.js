import React, {PropTypes} from 'react';
import styles from './Input.css';

export const Input = ({type, children}) => (
    <input className={styles.input}/>
);

Input.propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string
};
