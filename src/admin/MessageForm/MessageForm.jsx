import React from 'react';
import PropTypes from 'prop-types';

import {
    TCheck,
    TForm,
    TPager,
    TTable,
    TButton,
    merge,
    clone,
    post,
    isoDate,
    strDate,
    cutTime
} from 'tinput';

import styles from './styles.js';

class MessageForm extends React.Component {

    constructor(props) {
        super(props);
        let to = new Date();
        let from = new Date(to.getTime() - 1000*60*60*24*30);
        this.state = {
            items: [],
            messages: [],
            show: false,
            wait: false,
            query: {
                from: isoDate(from),
                to: null,
                read: 0
            }
        };
        this.refresh = this.refresh.bind(this);
        this.read = this.read.bind(this);
        this.cellValue = this.cellValue.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlePage = this.handlePage.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.refresh();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    refresh() {
        setTimeout(() => {
            post({
                url: '/api/message/income',
                data: this.state.query,
                sender: this,
                target: 'messages',
                success: (messages) => {
                    if (messages && messages.length > 0) {
                        this.setState({show: true});
                    }
                }
            });
        }, 3000 );
    }

    read(event){
        let index = event.data;
        post({
            url: '/api/message/read',
            data: {messageId: this.state.messages[index].id},
            success: (msg) => {
                let messages = clone(this.state.messages);
                messages[index] = msg;
                this.setState({messages: messages});
            }
        });
    }

    handleQuery(event) {
        let query = clone(this.state.query);
        query[event.name] = event.value;
        this.setState({query: query}, () => {this.refresh()});
    }

    handleClose(event) {
        if (event.button === 'close') {
            this.setState({
                show: false
            });
        }
    }

    handlePage(event) {
        this.setState({items: event.items});
    }

    cellValue(event){
        if (event.column === "readDate"){
            if (event.item.readDate === null) {
                return (
                    <TButton
                        style={event.style.button}
                        data={event.index}
                        onClick={this.read}>
                        Прочитать
                    </TButton>
                );
            } else {
                return (
                    strDate(event.item.readDate) + ' ' + cutTime(event.item.readDate)
                );
            }
        } else if (event.column === "date") {
            return (
                strDate(event.item.date) + ' ' + cutTime(event.item.date)
            );
        }
    }

    render() {

        let style = merge(styles, this.props.style);

        let title = (
            <div style={style.title}>
                <TCheck
                    style={style.check}
                    name={'read'}
                    label={'Показать прочитанные:'}
                    value={this.state.query.read}
                    checked={1}
                    unchecked={0}
                    onChange={this.handleQuery} />
                <TPager
                    size={20}
                    hide={true}
                    items={this.state.messages}
                    onChange={this.handlePage} />
            </div>
        );

        return (

            <TForm
                style={style.form}
                name={'newMes'}
                show={this.state.show}
                buttons={{
                    close: "Закрыть"
                }}
                caption={'Сообщения'}
                onClose={this.handleClose}
                fitHeight={true}
                wait={this.state.wait}
                escape={true}
                titleContent={title}>

                <div>

                    <TTable
                        style={style.table}
                        name={'table'}
                        columns={{
                            date: {caption: 'Дата', width: "100px"},
                            text: {caption: 'Текст сообщения'},
                            readDate: {caption: "Прочитано", width: "100px"}
                        }}
                        items={this.state.items}
                        onCellValue={this.cellValue}>

                    </TTable>

                </div>

            </TForm>

        );

    }

}

MessageForm.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object
};

export default MessageForm;