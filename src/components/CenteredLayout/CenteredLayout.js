import React from 'react';
import FullPageLayout from '../FullPageLayout/FullPageLayout';
import styles from './CenteredLayout.css';

export const CenteredLayout = ({children}) => (
    <FullPageLayout className={styles.container}>
        {children}
    </FullPageLayout>
);

export default CenteredLayout;
