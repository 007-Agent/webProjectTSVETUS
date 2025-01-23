import React from 'react';
import PropTypes from 'prop-types';

import {
    TDate,
    TPanel,
    TScroll,
    TTable,
    TPager,
    TComponent,
    merge,
    clone,
    post,
    isoDate,
    strDate,
    cutTime
} from 'tinput';

import Edit from './Edit';
import Recipients from './Recipients';

import User from "component/User";
import Department from "component/Department";

import styles from './styles.js';

class Messages extends TComponent {

    constructor(props) {
        super(props);
        let to = new Date();
        let from = new Date(to.getTime() - 1000*60*60*24*30);
        this.state = {
            query: {
                from: isoDate(from),
                to: null
            },
            messages: [],
            messageDetail: [],
            testRecipients: null,
            items: [],
            itemDetail: [],
            showEdit: false,
            item: clone(Edit.EMPTY),
			current: clone(Edit.EMPTY),
            wait: false
        };
        this.refresh = this.refresh.bind(this);
        this.refreshDetail = this.refreshDetail.bind(this);
        this.handleTools = this.handleTools.bind(this);
        this.handleCaption = this.handleCaption.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    refresh() {
        post({
            url: '/api/message/list',
            data: this.state.query,
            sender: this,
            target: 'messages'
        });
    }

    refreshDetail(messageId) {
        post({
            url: '/api/message/destination',
            data: {messageId: messageId},
            sender: this,
            success: (message) => {
                let msg = message ? message : clone(Edit.EMPTY);
                let detail = clone(msg.departments);
                detail.push(...clone(msg.users));
                this.setState({
                    current: msg,
                    messageDetail: detail,
                    testRecipients: message
                });
            }
        });
    }

    handleTools() {
        this.props.onTools([
            {icon: 'edit', onClick: this.handleEdit},
            {icon: 'add', onClick: this.handleAdd},
            {icon: 'refresh', onClick: this.refresh, rotate: this.state.wait}
        ]);
    }

    handleCaption() {
        this.props.onCaption('Сообщения');
    }

    handleChange(event) {
        if (event.item) {
            this.refreshDetail(event.item.id);
        }
    }

    handleQuery(event) {
        let query = {
            ...clone(this.state.query),
            [event.name]: event.value
        };
        this.setState({query: query}, () => {
            this.refresh();
        });
    }

    handlePage(event) {
    	if (event.name === 'detail') {
            this.setState({itemDetail: event.items});
        } else {
            this.setState({items: event.items});
        }
    }

    handleAdd() {
        this.setState({
            showEdit: true,
            item: clone(Edit.EMPTY)
        });
    }

    handleEdit() {
        this.setState({
            showEdit: true,
            item: this.state.current
        });
    }

    handleClose(event) {
        this.setState({showEdit: false});
        if (event.button === 'save' || event.button === 'delete') {
            this.refresh();
        }
    }

    render () {

        // let items =[];
        // this.state.items.forEach((v, i) => {
        //     items.push(
        //         {
        //             senderName: v.sender.name,
        //             ...v
        //         }
        //     );
        // });


        let style = merge(styles, this.props.style);

        return (

            <div style={style.container}>

                <TPanel style={style.panel}>

                    <TDate
                        style={style.date}
                        label={'С:'}
                        name={'from'}
                        start={1}
                        calendar={true}
                        value={this.state.query.from}
                        onChange={this.handleQuery} />

                    <TDate
                        style={style.date}
                        label={'ПО:'}
                        name={'to'}
                        start={1}
                        calendar={true}
                        value={this.state.query.to}
                        onChange={this.handleQuery} />

                    <User
                        style={style.component}
                        name={'recipientId'}
                        label={'Получатель'}
                        value={this.state.recipientId}
                        showIcon={false}
                        onChange={this.handleQuery} />

                    <Department
                        style={style.component}
                        name={'departmentId'}
                        label={'Отдел'}
                        value={this.state.departmentId}
                        showIcon={false}
                        onChange={this.handleQuery} />

                </TPanel>

    			<div style={style.content}>

                    <div style={style.left}>

                        <TPager
                            hide={false}
                            items={this.state.messages}
                            onChange={this.handlePage} />

                        <TScroll style={style.scroll}>

                            <TTable
                                style={style.table}
                                name={'table'}
                                columns={{
                                    date: {
                                        caption: 'Дата',
                                        width: "100px",
                                        value: (v) => {
                                            return strDate(v) + ' ' + cutTime(v)
                                        }
                                    },
                                    sender: {
                                        caption: 'Отправитель',
                                        width: "150px",
                                        value: (v) => {
                                            return v.name
                                        }
                                    }  ,
                                    text: {caption: 'Текст сообщения'}
                                }}
                                items={this.state.items}
                                onChange={this.handleChange} />

                        </TScroll>

                    </div>

                    <div style={style.right}>

                        <TPager
                            hide={false}
                            name={'detail'}
                            items={this.state.messageDetail}
                            onChange={this.handlePage} />

                        <TScroll style={style.scroll} >

                            <Recipients
                                style={style.detail}
                                name={'detail'}
                                message={this.state.testRecipients}/>

                        </TScroll>



                    </div>

                </div>

                <Edit
                    name={'edit'}
                    show={this.state.showEdit}
                    item={this.state.item}
                    onClose={this.handleClose} />

		    </div>

        );

    }

}

Messages.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object,
    onTools: PropTypes.func.isRequired,
    onCaption: PropTypes.func.isRequired
};

export default Messages;
