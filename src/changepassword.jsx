import React from 'react';
import ReactDOM from 'react-dom';

import {styles, templates} from 'styles';
import {registerStyles} from 'tinput';

registerStyles(styles, templates);

import ChangePassword from 'online/office/ChangePassword';

ReactDOM.render(
    <ChangePassword />,
    document.getElementById('root')
);
