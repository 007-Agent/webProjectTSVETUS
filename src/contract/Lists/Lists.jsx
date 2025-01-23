import React from 'react';
import PropTypes from 'prop-types';

import {
    TPanel,
    TScroll,
    TPager,
    TTable,
    TDate,
    TCheck,
    merge,
    strDate,
    isoDate,
    clone,
    download,
    post
} from 'tinput';

import styles from './styles.js';

import Edit from './Edit';
import Delete from './Delete';
import Parse from './Parse';

function getDate() {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    return isoDate(date);
}

class Lists extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            attachQuery: {
                date: getDate()
            },
            personQuery: {
                errors: 1,
                filled: 1
            },
            id: -1,
            detail: [],
            list: [],
            items: [],
            edit: false,
            wait: false,
            delete: false,
            parse: false
        };
        this.refresh = this.refresh.bind(this);
        this.refreshDetail = this.refreshDetail.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.handleParse = this.handleParse.bind(this);
        this.handleCloseParse = this.handleCloseParse.bind(this);
        this.handleRowStyle = this.handleRowStyle.bind(this);
        this.handleAttachQuery = this.handleAttachQuery.bind(this);
        this.handlePersonQuery = this.handlePersonQuery.bind(this);
        this.handleLoadErrors = this.handleLoadErrors.bind(this);
        this.handleLoadList = this.handleLoadList.bind(this);
    };

    componentDidMount() {
        this.mounted = true;
        this.props.onCaption('Списки прикреплений');
        this.refresh();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.wait !== this.state.wait) {
            this.props.onTools([
                {icon: "add", onClick: this.handleAdd},
                {icon: "delete", onClick: this.handleDelete},
                {icon: "save", onClick: this.handleLoadErrors},
                {icon: "attention", onClick: this.handleLoadList},
                {icon: "attach", onClick: this.handleParse},
                {icon: "refresh", onClick: this.refresh, rotate: this.state.wait}
            ]);
        }
    }

    handleLoadErrors() {
        let name = 'attach_errors.xlsx';
        let url = "/api/attachment/get/errors?id=" + this.state.id + '&name=' + name + '&all=0';
        download(url, name);
    }

    handleLoadList() {
        let name = 'attach_errors.xlsx';
        let url = "/api/attachment/get/errors?id=" + this.state.id + '&name=' + name + '&all=1';
        download(url, name);
    }

    handlePage(event) {
        this.setState({items: event.items});
    }

    handleAdd() {
        this.setState({edit: true});
    }

    handleDelete() {
        this.setState({delete: true});
    }

    handleCloseAdd(event) {
        this.setState({edit: false});
        if (event.button = 'ok') {
            this.refresh();
        }
    }

    handleCloseDelete(event) {
        this.setState({delete: false});
        if (event.button = 'ok') {
            this.refresh();
        }
    }

    handleDetail(event) {
        if (event.item) {
            this.setState({id: event.item.id});
            this.refreshDetail(event.item.id);
        } else {
            this.setState({detail: [], id: -1});
        }
    }

    handleParse() {
        this.setState({parse: true});
    }

    handleCloseParse(event) {
        this.setState({parse: false});
        if (event.button = 'ok') {
            this.refresh();
        }
    }

    handleRowStyle(row) {
        if (row.errors > 0) {
            return {backgroundColor: 'rgba(255,0,0,0.25)'};
        }
    }

    parse(id) {
        post({
            url: '/api/attachment/parse',
            data: {query: {id: id}},
            sender: this,
            success: () => {
                this.refreshDetail(id);
            }
        });
    }

    refresh() {
        post({
            url: '/api/attachment/list',
            data: {query: this.state.attachQuery},
            sender: this,
            target: 'list'
        });
    }

    refreshDetail(id) {
        let q = {
            ...this.state.personQuery,
            id: id
        };
        post({
            url: '/api/attachment/persons',
            data: {query: q},
            sender: this,
            target: 'detail'
        });
    }

    handleAttachQuery(event) {
        let query = {
            ...clone(this.state.attachQuery),
            [event.name]: event.value
        };
        this.setState({attachQuery: query}, () => {
            this.refresh();
        });
    }

    handlePersonQuery(event) {
        let query = {
            ...clone(this.state.personQuery),
            [event.name]: event.value
        };
        this.setState({personQuery: query}, () => {
            this.refreshDetail(this.state.id);
        });
    }

    render() {

        let style = merge(styles, this.props.style);

        return (
            <div>
                <TPanel style={style.panel}>
                    <TCheck
                        style={style.check}
                        value={this.state.personQuery.errors}
                        label={'С ошибками:'}
                        name={'errors'}
                        checked={1}
                        unchecked={0}
                        onChange={this.handlePersonQuery} />
                    <TCheck
                        style={style.check}
                        value={this.state.personQuery.filled}
                        label={'Без ошибок:'}
                        name={'filled'}
                        checked={1}
                        unchecked={0}
                        onChange={this.handlePersonQuery} />
                    <TDate
                        style={style.date}
                        value={this.state.attachQuery.date}
                        label={'Дата с:'}
                        name={'date'}
                        calendar={true}
                        start={1}
                        onChange={this.handleAttachQuery} />
                </TPanel>
                <div style={{display: "flex"}}>
                    <TScroll style={style.detail}>
                        <TTable
                            style={style.table}
                            columns={{
                                link: {caption: '№', style: () => {return style.link}},
                                nib: {caption: 'НИБ'},
                                fio: {caption: 'ФИО'},
                                birthday: {caption: 'Дата рождения', value: (v) => {return strDate(v)}},
                                insurance: {caption: 'Полис'},
                                from: {caption: 'С', value: (v) => {return strDate(v)}},
                                to: {caption: 'ПО', value: (v) => {return strDate(v)}},
                                services: {caption: 'Условия обслуживания'},
                                error: {caption: 'Ошибки', style: () => {return style.link}}
                            }}
                            items={this.state.items}
                            onRowStyle={this.handleRowStyle} >
                            <TPager
                                items={this.state.detail}
                                size={300}
                                maxPages={5}
                                onChange={this.handlePage} />
                        </TTable>
                    </TScroll>
                    <TScroll style={style.list}>
                        <TTable
                            style={style.table}
                            columns={{
                                date: {caption: 'Дата', value: (v) => {return strDate(v)}},
                                description: {caption: 'Описание'}
                            }}
                            items={this.state.list}
                            index={this.state.id}
                            onChange={this.handleDetail} />
                    </TScroll>
                </div>
                <Edit show={this.state.edit} onClose={this.handleCloseAdd} />
                <Delete show={this.state.delete} id={this.state.id} onClose={this.handleCloseDelete} />
                <Parse show={this.state.parse} id={this.state.id} onClose={this.handleCloseParse} />
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
