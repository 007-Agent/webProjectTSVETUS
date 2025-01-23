import React from 'react';
import PropTypes from 'prop-types';

import {
    TForm,
    TMemo,
    TItemGroup,
    merge,
    clone,
    post
} from 'tinput';

import styles from './styles.js';

import Parameters from './Parameters';
import Recipients from './Recipients';

import Departments from "../../../component/Departments";
import Users from "../../../component/Users";

const ITEMS = [
  {code: 1, name: 'Текст', group: 0},
  {code: 2, name: 'Получатели', group: 0},
  {code: 3, name: 'Параметры', group: 0}
];

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: props.item ? props.item : clone(Edit.EMPTY),
            message: null,
            error: null,
            wait: false,
            tab: 1
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.change = this.change.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(old) {
        if (old.item !== this.props.item) {
            this.setState({item: this.props.item ? this.props.item : clone(Edit.EMPTY)});
        }
    }

    handleClose(event) {
        if (event.button === 'ok') {
            this.setState({error: null});
        } else if (event.button === 'save') {
            if(this.props.item){
                this.update(event);
            }else{
                this.create(event);
            }
		} else if (event.button === 'delete') {
			this.delete(event);
        } else {
            this.props.onClose(event);
        }
    }

    handleChange(event) {
        let item = {
            ...clone(this.state.item),
            [event.name]: event.value
        };
        this.setState({item: item});
    }

    update(event) {
        post({
            url: '/api/message/update',
            data: this.state.item,
			sender: this,
            success: () => {
                this.props.onClose(event);
            }
        });
    }

	delete(event) {
        post({
            url: '/api/message/delete',
            data: {messageId: this.state.item.id},
			sender: this,
            success: () => {
                this.props.onClose(event);
            }
        });
	}

    change(event){
        this.setState({tab: event.value});
    }

    render () {

        let style = merge(styles, this.props.style);

        let caption = null;
        if (this.props.item.id) {
            caption = 'Изменение!';
        } else {
            caption = 'Новая запись!';
        }

		let buttons = {
            cancel: 'Отмена',
            save: 'Сохранить'
		};
		if (this.props.item.id) {
			buttons.delete = 'Удалить';
		}

        let content = null;
        switch (this.state.tab) {
            case 1:
                content =
                    <TMemo
                        style={style.text}
                        name={'text'}
                        value={this.state.item.text}
                        wrap={true}
                        onChange={this.handleChange} />;
            break;
            case 2:
                content =
                    <Recipients
                        style={style.component}
                        item={this.state.item}
                        onChange={this.handleChange}
                    />;
            break;
            case 3:
                content =
                    <Parameters
                        style={style.component}
                        value={null}
                        onChange={this.handleChange}
                    />;
            break
}

        return (

            <TForm
                style={style.form}
                name={this.props.name}
                show={this.props.show}
                caption={caption}
                buttons={buttons}
                wait={this.state.wait}
                error={this.state.error}
                outerClick={true}
                onClose={this.handleClose}>

                <TItemGroup
                    label={null}
                    name={'tab'}
                    style={style.pager}
                    grouped={true}
                    items={ITEMS}
                    keyField={'code'}
                    valueField={'name'}
                    value={this.state.tab}
                    onChange={this.change} />

                {content}

            </TForm>

        );

    }

}

Edit.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    show: PropTypes.any,
    item: PropTypes.object,
    onClose: PropTypes.func
};

Edit.defaultProps = {
    show: false
};

Edit.EMPTY = {
    users: [],
    departments: []
};

export default Edit;
