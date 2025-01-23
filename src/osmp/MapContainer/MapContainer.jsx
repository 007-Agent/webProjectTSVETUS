import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.js';

import {
    merge,
    TCheck,
    TPanel,
    TScroll,
    post
} from 'tinput';

import List from './List';
import Map from './Map';

const CALL_TIMEOUT = 15*1000;
const CAR_TIMEOUT = 15*1000;

class MapContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            query: {
                osmp: 1,
                other: 0
            },
            show: props.show,
            list: [],
            times: [],
            cars: [],
            width: 0,
            height: 0,
            size: {
                width: 950,
                height: 910
            },
            wait: false
        };
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.getCalls = this.getCalls.bind(this);
        this.handleTimes = this.handleTimes.bind(this);
        this.getCars = this.getCars.bind(this);
        this.updateWindow = this.updateWindow.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleMapSize = this.handleMapSize.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.updateWindow();
        window.addEventListener('resize', this.updateWindow);
        this.props.onTools([
            {icon: 'refresh', onClick: this.handleRefresh}
        ]);
        this.props.onCaption('КАРТА АКТИВНЫХ МАРШРУТОВ');
        this.getCalls();
        this.getCars();
    }

    componentWillUnmount() {
        this.mounted = false;
        window.removeEventListener('resize', this.updateWindow);
        clearTimeout(this.timer);
        clearTimeout(this.carsTimer);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.show !== this.props.show) {
            this.setState({show: this.props.show});
        } else if (prevProps.user !== this.props.user) {
            this.getCalls();
        }
        if (prevState.wait !== this.state.wait) {
            let is = this.state.wait ? styles.wait : null;
            let rt = this.state.wait ? 700 : null;
            this.props.onTools([
                {icon: 'refresh', onClick: this.handleRefresh, style: is, rotateTime: rt}
            ]);
        }
    }

    updateWindow() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    handleTimes(times) {
        this.setState({times: times});
    }

    handleRefresh() {
        this.getCalls();
        this.getCars();
    }

    handleCheck(event) {
        let tmp;
        if(event.value){
            tmp=1;
        }
        else {
            tmp=0;
        }
        let query = {
            ...this.state.query,
            [event.name]: tmp
        };
        this.setState({query: query}, () => {
            this.getCars();
        });

    }

    handleShow(id) {
        let newShow = this.state.show.slice();
        let index = newShow.indexOf(id);
        if (index < 0) {
            newShow.push(id);
        } else {
            newShow.splice(index, 1);
        }
        this.setState({show: newShow});
    }

    handleMapSize(event) {
        this.setState({size: event.size});
    }

    getCalls(){
        clearTimeout(this.timer);
        if (this.mounted) {
            post({
                url: '/rest/help/short/calls',
                data: {query: {
                    cancelled: 0,
                    completed: 0,
                    finished: 0,
                    allCrew: 1,
                    execId: 1,
                    calc: 1
                }},
                force: true,
                sender: this,
                success: (response) => {
                    if (this.mounted) {
                        this.setState({list: response});
                        this.timer = setTimeout(() => {
                            this.getCalls();
                        }, CALL_TIMEOUT);
                    }
                },
                fail: (status) => {
                    if (this.mounted) {
                        this.timer = setTimeout(() => {
                            this.getCalls();
                        }, CALL_TIMEOUT);
                        this.props.onFail(status);
                    }
                }
            });
        }
    }

    getCars(){
        clearTimeout(this.carsTimer);
        if (this.mounted) {
            post({
                url: '/rest/help/cars',
                data: {query: this.state.query},
                force: true,
                sender: this,
                success: (response) => {
                    if (this.mounted) {
                        this.setState({cars: response});
                        this.carsTimer = setTimeout(() => {
                            this.getCars();
                        }, CAR_TIMEOUT);
                    }
                },
                fail: (status) => {
                    if (this.mounted) {
                        this.carsTimer = setTimeout(() => {
                            this.getCars();
                        }, CAR_TIMEOUT);
                        this.props.onFail(status);
                    }
                }
            });
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        let leftStyle = style.leftMid;
        if (this.state.width < 1600) {
            leftStyle = style.leftSmall;
        }

        return (
            <div>
                <TPanel style={style.panel}>
                    <TCheck
                        style={style.check}
                        onChange={this.handleCheck}
                        name={'osmp'}
                        label={'Бригады ОСМП:'}
                        value={this.state.query.osmp}
                        valueInt={true} />
                    <TCheck
                        style={style.check}
                        onChange={this.handleCheck}
                        name={'other'}
                        label={'Другие автомобили:'}
                        value={this.state.query.other}
                        valueInt={true} />
                </TPanel>
                <div style={style.container}>
                    <TScroll style={leftStyle}>
                        <List
                            user={this.props.user}
                            show={this.state.show}
                            list={this.state.list}
                            onFail={this.props.onFail}
                            times={this.state.times}
                            onShow={this.handleShow} />
                    </TScroll>
                    <TScroll style={style.right} onChange={this.handleMapSize}>
                        <Map
                            user={this.props.user}
                            show={this.state.show}
                            calls={this.state.list}
                            cars={this.state.cars}
                            onFail={this.props.onFail}
                            size={this.state.size}
                            onTimes={this.handleTimes} />
                    </TScroll>
                </div>
            </div>
        );
    }

}

MapContainer.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object,
    show: PropTypes.array.isRequired,
    onTools: PropTypes.func.isRequired,
    onFail: PropTypes.func.isRequired
};

export default MapContainer;
