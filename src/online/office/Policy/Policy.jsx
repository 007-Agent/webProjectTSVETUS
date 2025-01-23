import React from 'react';
import PropTypes from 'prop-types';

import {
    TModal,
    TButton,
    merge,
    post,
    get
} from 'tinput';

import styles from './styles.js';

class Policy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            content: null
        };
        this.handleClose = this.handleClose.bind(this);
        this.refresh = this.refresh.bind(this);
        this.agree = this.agree.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.refresh();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    refresh() {
        get({
            url: '/policy',
            data: null,
            source: this,
            success: (content) => {
                this.setState({content: content});
            }
        });
    }

    agree() {
        post({
            url: '/api/webuser/agreed',
            data: null,
            source: this,
            success: () => {
                if (this.props.onChange) {
                    this.props.onChange({agreed: true});
                }
                this.setState({show: false});
            }
        });
    }

    handleClose(event){
        if (event.name === 'agree') {
            this.agree();
        } else {
            if (this.props.onChange) {
                this.props.onChange({agreed: false});
            }
            this.setState({show: false});
        }
    }

    render() {

        let style = merge(styles, this.props.style);

        let title = (

            <div style={style.buttons.container}>

                <TButton
                    style={style.buttons.disagree}
                    name={'disagree'}
                    onClick={this.handleClose}>
                    {'Несогласен'}
                </TButton>

                <TButton
                    style={style.buttons.agree}
                    name={'agree'}
                    onClick={this.handleClose}>
                    {'Cогласен'}
                </TButton>

            </div>

        );

        return (

            <div style={style.container}>

                <TModal
                    style={style.modal}
                    name={'policy'}
                    show={this.state.show}
                    showHeader={false}
                    escape={false}
                    fitHeight={true}
                    titleContent={title}
                    onClose={this.handleClose}>

                    <div>

                        <div style={style.text}>
                            <div dangerouslySetInnerHTML={{__html: this.state.content}} />
                        </div>

                    </div>

                </TModal>

            </div>

        );
    }

}

Policy.propTypes = {
    style: PropTypes.object,
    onChange: PropTypes.func
};

export default Policy;
