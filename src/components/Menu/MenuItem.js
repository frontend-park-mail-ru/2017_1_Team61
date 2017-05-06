import React, {PropTypes} from 'react';

export const MenuItem = ({caption, to}) =>  (
    <div>
        {caption}
    </div>
);

MenuItem.propTypes = {
    /** Надпись на кнопке */
    caption: PropTypes.string,
    /** Имя роута куда ведет элемент меню */
    to: PropTypes.string,
};

export default MenuItem;
