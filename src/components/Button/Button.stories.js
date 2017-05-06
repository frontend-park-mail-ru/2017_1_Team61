import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {withKnobs, select} from '@kadira/storybook-addon-knobs';

import Button from './Button';


const stories = storiesOf('Button', module);

// Этот компонент можно редактировать
stories.addDecorator(withKnobs);

const getType = (defaultType = 'default') => {
    const options = {
        primary: 'primary',
        additional: 'additional',
        disabled: 'disabled',
        'default': 'default'
    };

    return select('Button type', options, defaultType);
};

stories.add('Mode primary', () => (
    <Button
        onClick={action('clicked')}
        type={getType('primary')}
    >
        Hello Button
    </Button>
));

stories.add('Mode default', () => (
    <Button
        onClick={action('clicked')}
        type={getType()}
    >
        Hello Button
    </Button>
));

stories.add('Mode disabled', () => (
    <Button
        onClick={action('clicked')}
        type={getType('disabled')}
    >
        Hello Button
    </Button>
));