import React from 'react';
import CenteredLayout from '../CenteredLayout/CenteredLayout';
import MenuLayout from '../Menu/MenuLayout';
import MenuItem from '../Menu/MenuItem';

export const MainPage = (props) => (
    <CenteredLayout>
        <MenuLayout title="Main Menu">
            <MenuItem caption="Item1"/>
            <MenuItem caption="Item2"/>
            <MenuItem caption="Item3"/>
        </MenuLayout>
    </CenteredLayout>
);

export default MainPage;
