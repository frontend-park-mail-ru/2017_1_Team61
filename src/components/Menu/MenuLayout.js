import React from 'react';

export const MenuLayout = ({children, title}) => (
    <div>
        <div>
            {title}
        </div>
        <div>
            {children}
        </div>
    </div>
);

export default MenuLayout;
