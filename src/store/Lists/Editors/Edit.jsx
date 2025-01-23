import React from 'react';
import PropTypes from 'prop-types';

import {
    merge,
    TDate,
    TText
} from 'tinput';

import Clients from './Clients';
import Store from './Store';
import Ref from 'component/Ref';

import styles from './styles.js';

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            docDate: null,
            docNumber: null,
            doc: null,
            provider: {id: null, name: null},
            recipient: null,
            note: null,
            exptype: null
        };
        this.handleClientChange = this.handleClientChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    };

    componentDidMount(){

    }

    handleClientChange(event){
        if(event.item){
            let tmp={id: event.item.id, name:event.item.name}
            this.setState({provider: tmp});
        }
    }

    handleStoreChange(event){
        if(event.item){
            let tmp={id: event.item.id, name:event.item.name}
            this.setState({provider: tmp});
        }
    }

    handleDateChange(event){
        this.setState({[event.name]:event.value});
    }

    handleTextChange(event){
    }

    render() {

        let style = merge(styles, this.props.style);

        return (
            <div style={style.container}>
                <div style={style.left}>
                    <div style={style.document}>
                        <TDate
                            style={style.date}
                            name={'docDate'}
                            value={this.state.docDate}
                            label={'Дата:'}
                            calendar={true}
                            start={1}
                            navigators={'month'}
                            onChange={this.handleDateChange} />
                        <TText
                            style={style.number}
                            name={"docNumber"}
                            value={this.state.docNumber}
                            label={'Номер:'}
                            onChange={this.handleTextChange}/>
                    </div>

                    <TText
                        style={style.fields}
                        name={"doc"}
                        value={this.state.doc}
                        label={'Документ:'}
                        onChange={this.handleTextChange}/>

                    <Clients
                        style={style.fields}
                        label={"Поставщик:"}
                        layout={"layout"}
                        name={"client"}
                        value={this.state.provider.name}
                        placeholder={" "}
                        keyField={'id'}
                        valueField={'name'}
                        onChange={this.handleClientChange}/>

                    <Store
                        style={style.fields}
                        label={"Получатель:"}
                        layout={"layout"}
                        name={"store"}
                        value={this.state.recipient}
                        placeholder={" "}
                        keyField={'id'}
                        valueField={'name'}
                        onChange={this.handleStoreChange}/>

                    <TText
                        style={style.fields}
                        name={"note"}
                        value={this.state.note}
                        label={'Примечание:'}
                        onChange={this.handleTextChange}/>
                </div>
                <div style={style.right}>
                    <TDate
                        style={style.date}
                        name={'date'}
                        value={this.state.date}
                        label={'Дата записи:'}
                        calendar={true}
                        start={1}
                        navigators={'month'}
                        onChange={this.handleDateChange}/>

                    <Ref
                        style={style.ref}
                        table={'ref_exptype'}
                        placeholder={'Тип финансирования:'}
                        value={this.state.exptype}
                        onChange={this.handleChange}
                        name={'exptype'} />
                </div>

            </div>
        );

    }

}

Edit.propTypes = {
    style: PropTypes.object
};

export default Edit;
