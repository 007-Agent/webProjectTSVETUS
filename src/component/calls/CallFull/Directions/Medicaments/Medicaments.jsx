import React from 'react';
import PropTypes from 'prop-types';

import {
    clone,
    TDate,
    TGroup,
    TSearch,
    TIcon,
    merge,
    post
} from 'tinput';

import Medicament from './Medicament';

import styles from './styles.js';

const ITEMS = [
  {code: 'key1', name: 'First item'},
  {code: 'key2', name: 'Second item'},
  {code: 'key3', name: 'Third item'},
  {code: 'key4', name: 'Forth item'}
];


class Medicaments extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.data = props.data;
        this.state = {
            data: clone(props.data),
            modified: false,
            items: [],
            med: null
        };
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.notify = this.notify.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.search = this.search.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getMeds = this.getMeds.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.getMeds();
    }

    componentWillUnmount() {
        this.mounted = false;

    }

    notify(save, cancel) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                save: save,
                cancel: cancel
            });
        }
    }
    getMeds(){
        post({
            url: '/rest/help/materials',
            data: null,
            sender: this,
            success: (data) => {
                this.setState({items: data});
            }
        })
    }

    cancel() {
        this.setState({
            data: clone(this.data),
            modified: false
        }, () => {
            this.notify();
        });
    }

    save() {
        let data = clone(this.state.data);
        data.forEach((v) => {
            v.planDate = this.state.planDate;
        });

        post({
            url: '/rest/help/medicaments/update',
            data: {id: this.props.id, data: this.state.data},
            sender: this,
            success: (data) => {
                this.setState({
                    data: clone(data),
                    modified: false
                }, () => {
                    this.data = data;
                    this.notify();
                });
            }
        })

    }

    handleDelete(event){
        let data = [];
        this.state.data.forEach((v, i) => {
            if(i!=event.data){
                data.push(v);
            }
        });
        this.setState({data: data});
    }

    handleChange(event) {
        let data = clone(this.state.data);
        data[event.index].services = event.data;
        this.setState({data: data}, () => {
            this.notify(this.save, this.cancel);
        });
    }

    handleDateChange(event) {
        let data = clone(this.state.data);
        data[event.data].planDate = event.value;
        this.setState({data: data}, () => {
            this.notify(this.save, this.cancel);
        });
    }

    search(event, callback) {
        let items = this.state.items.filter(v => {
            return (
                v.name.indexOf(event.value) >= 0 ||
                v.code.indexOf(event.value) >= 0 ||
                v.code == event.key
            );
        });
        setTimeout(() => {
            callback(items);
        }, 500);
    }

    render () {
        let style = merge(styles, this.props.style);

        let list = [];
        if(this.props.data){
            this.state.data.forEach((v, i) => {
                list.push(
                    <div key={i} style={style.box}>
                        <Medicament
                            style={style.service}
                            data={v}
                            index={i}
                            readOnly={true}/>
                        <TIcon
                            style={style.iconDelete}
                            name={'delete'}
                            onClick={this.handleDelete}
                            data={i} />
                    </div>
                );
            });
        }

        let content = null;
        if (this.state.data) {
            content = this.state.data.map((v, i) => {
                return (
                    <div style={style.box} key={i} >
                        {"test"}
                    </div>
                );
            });
        }

        return (
            <div>

                <TGroup style={style.group} label={'Медикаментозное лечение'}>
                    <div>
                        <TSearch
                            style={style.search}
                            name={'drugs'}
                            value={this.state.med}
                            placeholder={'Введите название медикамента'}
                            keyField={'code'}
                            valueField={'name'}
                            showMode={'name'}
                            listMode={'name'}
                            empty={{code: 0, name: '-'}}
                            nestedIcon={true}
                            onSearch={this.search}
                            onChange={this.change}
                        />
                    </div>

                </TGroup>

                {list}

            </div>

        );

    }

}

Medicaments.propTypes = {
    //data: PropTypes.array.isRequired
};

export default Medicaments;
