import React from 'react';
import styles from './FullPageLayout.css';

export const FullPageLayout = ({children, className}) => (
    <div className={[styles.container, className].join(' ')}>
        {children}
    </div>
);

export default FullPageLayout;
