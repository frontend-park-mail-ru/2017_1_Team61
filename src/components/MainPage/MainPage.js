import React from 'react';
import CenteredLayout from '../CenteredLayout/CenteredLayout';
import MenuLayout from '../Menu/MenuLayout';
import MenuItem from '../Menu/MenuItem';
import Header from '../Header/Header';

export const MainPage = (props) => (
    <div>
        <Header/>
        <CenteredLayout>
            <MenuLayout title="Main Menu">
                <MenuItem caption="Item1"/>
                <MenuItem caption="Item2"/>
                <MenuItem caption="Item3"/>
            </MenuLayout>
        </CenteredLayout>
    </div>
);

export default MainPage;
