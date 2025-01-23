import React from 'react';
import PropTypes from 'prop-types';

import {
    TPanel,
    TScroll,
    TPager,
    TTable,
    TDate,
    TCheck,
    TItemGroup,
    TForm,
    TGroup,
    TGroupButton,
    TModal,
    merge,
    strDate,
    isoDate,
    clone,
    download,
    post
} from 'tinput';

import Edit from './Editors';
import Store from './Editors/Store';

import styles from './styles.js';

function getDate() {
    let date = new Date();
    return isoDate(date);
}


class Lists extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            to: getDate(),
            from: getDate(),
            tab: 0,
            items: null,
            list: null,
            detail: null,
            show: false,
            store: null,
            active: null
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.refresh = this.refresh.bind(this);
        this.click = this.click.bind(this);
        this.getTabs = this.getTabs.bind(this);
        this.close = this.close.bind(this);
        this.handleDetailChange = this.handleDetailChange.bind(this);
        this.handleShowForm = this.handleShowForm.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    };

    componentDidMount() {
        this.mounted = true;
        this.props.onCaption(this.props.caption);
        this.getTabs();
        this.refresh();
        this.props.onTools([
            {icon: "refresh", onClick: this.refresh}
        ]);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.type != this.props.type){
            this.props.onCaption(this.props.caption);
            this.getTabs();
            this.refresh();
            this.props.onTools([
                {icon: "refresh", onClick: this.refresh}
            ]);
        }
    }

    refresh(){
        post({
            url: '/rest/store/list',
            data: {
                type: this.props.type,
                tab: this.state.tab,
                from: this.state.from,
                to: this.state.to,
                fromStore: null,
                toStore: null
            },
            success: (response) => {
                this.setState({detail: null});
                this.setState({list: response});
            }
        });
    }

    detail(id){
        post({
            url: '/rest/store/detail',
            data: {ivdId: id},
            success: (response) => {
                this.setState({detail: response});
            }
        });
    }

    getTabs(){
        post({
            url: '/rest/store/tabs',
            data: {type: this.props.type},
            success: (response) => {
                this.setState({items: response});
            }
        });
    }


    changeDetail(){
        post({
            url: '',
            data: {},
            success: (response) => {
            }
        });
    }

    handleItemChange(event){
        this.setState({detail: null});
        this.setState({tab:event.index}, ()=> this.refresh());
    }

    handleDateChange(event){
        this.setState({[event.name]:event.value},()=>this.refresh());

    }
    click(event){
        this.detail(event.item.id);
        this.setState({active:event.item.id});
    }

    close(){
        this.setState({show: false});
    }

    handleShowForm(){
        this.setState({show: true});
    }

    handleDetailChange(event){
        //this.changeDetail()
    }

    buttonClick(){
        this.setState({show: true});
    }

    render() {

        let style = merge(styles, this.props.style);

        return (
            <div>
                <TPanel style={style.panel}>
                    <Store
                        style={style.store}
                        label={"Склад"}
                        layout={"layout"}
                        name={"store"}
                        value={this.state.store}
                        placeholder={" "}
                        keyField={'id'}
                        valueField={'name'}
                        onChange={this.handleStoreChange}/>
                    <TDate
                        style={style.date}
                        name={'from'}
                        value={this.state.from}
                        label={'C:'}
                        calendar={true}
                        start={1}
                        navigators={'month'}
                        onChange={this.handleDateChange} />

                    <TDate
                        style={style.date}
                        name={'to'}
                        value={this.state.to}
                        label={'По:'}
                        calendar={true}
                        start={1}
                        navigators={'month'}
                        onChange={this.handleDateChange} />

                    <TItemGroup
                        label={''}
                         name={'buttons'}
                         style={style.tabs}
                         grouped={true}
                         index={this.state.index}
                         items={this.state.items}
                         keyField={'code'}
                         valueField={'name'}
                         onChange={this.handleItemChange} />
                </TPanel>
                <div style={style.container}>
                    <TForm
                        style={style.form}
                        name={'myForm'}
                        show={this.state.show}
                        buttons={{
                            save: "Сохранить",
                            cancel: "Отменить"
                        }}
                        caption={'Редактировать'}
                        onClose={this.close}>

                      <div style={style.formContent}>
                        <Edit
                            record={this.state.active}
                            tab={this.state.tab}
                            event={null}/>
                      </div>

                    </TForm>

                    <TScroll style={style.detail}>
                        <TTable
                            style={style.table}
                            columns={{
                                date: {caption: 'Дата'},
                                number: {caption: '№ Документа'},
                                atcNumber: {caption: '№ вх.'},
                                fromStore: {caption: 'Отправитель'},
                                toStore: {caption: 'Получатель'},
                                expType: {caption: 'Тип финансирования'},
                                doc: {caption: 'Документ'},
                                note: {caption: 'Примечание'},
                                purchaseSumFull: {caption: 'Сумма'},
                                purchaseSumNds: {caption: 'в.т.ч НДС'},
                                record: {caption: 'Записал'},
                                exportState: {caption: 'Отпр.'},
                                id: {caption: 'Id'}
                            }}
                            items={this.state.list}
                            onRowStyle={this.handleRowStyle}
                            onClick={this.click}>
                        </TTable>
                    </TScroll>
                    <TGroup
                        style={styles.buttons}>
                        <TGroupButton
                            style={styles.buttonsGroup}
                             name={'invoice'}
                             items={[
                                 {caption: 'Добавить', name: 'add'},
                                 {caption: 'Редактировать', name: 'edit'},
                                 {caption: 'Удалить', name: 'remove'}
                             ]}
                             onClick={this.buttonClick} />
                    </TGroup>
                    <TScroll style={style.detail}>
                        <TTable
                            style={style.table}
                            columns={{
                                number: {caption: '№'},
                                material: {caption: 'Наименование'},
                                batch: {caption: 'Серия'},
                                supply: {caption: 'Поставка'},
                                structCount: {caption: 'Кол-во'},
                                struct: {caption: 'Состав'},
                                purchaseSumFull: {caption: 'Вх. сумма'},
                                purchaseSumNds: {caption: 'Вх в т.ч. НДС'},
                                nds: {caption: '% НДС'},
                                retailSumFull: {caption: 'Роз. сумма'},
                                retailSumNds: {caption: 'Роз. в т.ч. НДС'},
                                unitCostFull: {caption: 'Роз. цена уп.'},
                                exportState: {caption: 'Отпр.'},
                                expnapr: {caption: 'Направление расхода'},
                                id: {caption: 'ivd_id'},
                                sgtin: {caption: 'sgtin'},
                            }}
                            items={this.state.detail}
                            onRowStyle={this.handleRowStyle}
                            onClick={this.handleShowForm}>
                        </TTable>
                    </TScroll>
                    <TGroup
                        style={styles.buttons}>
                        <TGroupButton
                            style={styles.buttonsGroup}
                             name={'detail'}
                             items={[
                                 {caption: 'Добавить', name: 'add'},
                                 {caption: 'Редактировать', name: 'edit'},
                                 {caption: 'Удалить', name: 'remove'}
                             ]}
                             onClick={this.click} />
                    </TGroup>
                </div>
            </div>
        );

    }

}

Lists.propTypes = {
    style: PropTypes.object,
    onTools: PropTypes.func,
    onCaption: PropTypes.func
};

export default Lists;
