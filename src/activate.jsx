import React from 'react';
import ReactDOM from 'react-dom';

import {styles, templates} from 'styles';
import {registerStyles} from 'tinput';

registerStyles(styles, templates);

import Activate from 'online/office/Activate';

ReactDOM.render(
    <Activate />,
    document.getElementById('root')
);
