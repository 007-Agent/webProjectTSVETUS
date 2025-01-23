import React from 'react';
import PropTypes from 'prop-types';

import {
    merge,
    TScroll,
    TIcon
} from 'tinput';

import styles from './styles.js';

class Map extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.calls = [];
        this.carObjects = [];
        this.cars = [];
        this.times = [];
        this.init = this.init.bind(this);
        this.showRoutes = this.showRoutes.bind(this);
        this.createRoute = this.createRoute.bind(this);
        this.updateRoute = this.updateRoute.bind(this);
        this.removeRoute = this.removeRoute.bind(this);
        this.compareCallPositions = this.compareCallPositions.bind(this);
        this.compareCalls = this.compareCalls.bind(this);
        this.compareCars = this.compareCars.bind(this);
        this.getShowOptions = this.getShowOptions.bind(this);
        this.updateTimes = this.updateTimes.bind(this);
        this.createCar = this.createCar.bind(this);
        this.showCars = this.showCars.bind(this);
        this.cleanRoutes = this.cleanRoutes.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        if (typeof ymaps !== 'undefined') {
            ymaps.ready(this.init);
            this.showRoutes(this.props.calls);
            this.showCars(this.props.cars);
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        if (this.map) {
            this.map.destroy();
        }
    }

    componentDidUpdate(old) {
        if (old.calls !== this.props.calls) {
            this.showRoutes(this.props.calls);
        }
        if (old.cars !== this.props.cars) {
            this.showCars(this.props.cars);
        }
        if (old.size !== this.props.size && this.map) {
            this.map.container.fitToViewport();
        }
    }

    init() {
        if (!this.map) {
            // Создаем карту
            this.map = new ymaps.Map('map', {
                    center: [55.76, 37.64],
                    zoom: 11
                }, {
                    searchControlProvider: 'yandex#search'
                }
            );
        }
    }

    compareCallPositions(oldCall, newCall){
        if (oldCall.crewId > 0 && newCall.crewId > 0) {
            return (
                oldCall.position.lattitude != newCall.position.lattitude &&
                oldCall.position.longitude != newCall.position.longitude
            );
        } else {
            return true;
        }
    }

    compareCalls(oldCall, newCall){
        return (
            oldCall.id == newCall.id &&
            oldCall.crewId == newCall.crewId &&
            oldCall.calc == newCall.calc &&
            oldCall.addressNorm == newCall.addressNorm &&
            oldCall.urgent == newCall.urgent &&
            oldCall.nib == newCall.nib
        );
    }

    getShowOptions(call){

        let style = call.urgent > 0 ? 'solid' : 'dash';

        let color = call.color;
        let iconColor = call.color;
        let iconBackground = '#ffffff';
        if (call.urgent > 0 && !call.crewId) {
            iconColor = '#ffff00';
            iconBackground = '#ff0000';
        }

        let width = 4;

        let html = '<span></span>';
        if (call.calc == 0) {
            html = '<span style="font-size: 12px; font-family: Arial; opacity: 0.6; white-space: nowrap;' +
                'background-color: ' + iconBackground + '; border: 2px solid ' + iconColor + '; border-radius: 8px 8px 8px 0; padding: 4px;' +
                'font-weight: bold; color: ' + iconColor + '">' +
                    call.addressShort +
                '</span>'
        }

        let layout = ymaps.templateLayoutFactory.createClass(html);

        return {
            wayPointStartIconLayout: "default#image",
            wayPointStartIconImageHref: "img/empty.png",
            wayPointStartIconImageSize: [8, 8],
            wayPointStartIconImageOffset: [-4, -4],
            wayPointFinishIconLayout: layout,
            wayPointFinishIconColor: "#FAFA00",
            wayPointFinishIconFillColor: "#FF0000",
            wayPointFinishIconOffset: [-1, -23],
            routeActiveStrokeWidth: width,
            routeActiveStrokeColor: color,
            routeActiveStrokeStyle: style,
            boundsAutoApply: false
        }

    }

    updateTimes(multiRoute) {
        let times = [];
        this.calls.forEach((v) => {
            if (multiRoute && v.obj && multiRoute && v.obj === multiRoute) {
                v.time = multiRoute.getActiveRoute().properties.get("duration").text;
            }
            times.push({from: v, to: v, time: v.time});
        });
        this.props.onTimes(times);
    }

    removeRoute(multiRoute) {
        this.map.geoObjects.remove(multiRoute);
    }

    createRoute(route) {

        let call = route[route.length - 1];

        let options = this.getShowOptions(call);

        let list = route.map((v, i) => {
            if (i === 0) {
                return [v.position.lattitude, v.position.longitude];
            } else {
                return v.addressNorm;
            }
        });

        let multiRoute = new ymaps.multiRouter.MultiRoute({
            // Описание опорных точек мультимаршрута.
            referencePoints: list,
            // Параметры маршрутизации.
            params: {
                // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
                results: 1//2
            }
        }, {
            ...options
        });

        multiRoute.model.events.add('requestsuccess', () => {
            this.updateTimes(multiRoute);
        });

        if (multiRoute) {
            this.map.geoObjects.add(multiRoute);
        }

        return multiRoute;

    }

    updateRoute(route, multiRoute) {

        let points = multiRoute.model.getReferencePoints();

        if (points.length === route.length) {
            points[0] = [route[0].position.lattitude, route[0].position.longitude];
        } else {
            points = route.map((v, i) => {
                if (i === 0) {
                    return [v.position.lattitude, v.position.longitude];
                } else {
                    return v.addressNorm;
                }
            });
        }

        multiRoute.model.setReferencePoints(points);

        return multiRoute;

    }

    cleanRoutes() {

        if (!this.mounted) {
            return;
        }

        if (!this.map) {
            return;
        }

        let count = 0;
        let toDelete = [];
        this.map.geoObjects.each((v) => {
            if (v instanceof ymaps.multiRouter.MultiRoute) {
                let found = this.calls.find((f) => {return f.obj === v;});
                if (!found) {
                    toDelete.push(v);
                }
                count++;
            }
        });

        toDelete.forEach((v) => {this.removeRoute(v)});

    };

    showRoutes(newList) {

        if (!this.mounted) {
            return;
        }

        if (!this.map) {
            return;
        }

        // Удаляем старые объекты
        this.calls.forEach((oldItem) => {
            // Ищем удаленные
            let newItem = newList.find((v) => {return this.compareCalls(v, oldItem);});
            if (!newItem) {
                // Удаляем объект
                let route = [oldItem, oldItem];
                this.removeRoute(route, oldItem.obj);
            }
        });

        // Создаем новые объекты
        newList.forEach((newItem) => {
            // Ищем новые
            let oldItem = this.calls.find((v) => {return this.compareCalls(v, newItem);});
            if (!oldItem) {
                // Создаем новый объект
                let route = [newItem, newItem];
                newItem.obj = this.createRoute(route);
            }
        });

        // Перерисовываем измененные объекты
        newList.forEach((newItem) => {
            // Ищем в старых
            let oldItem = this.calls.find((v) => {return this.compareCalls(v, newItem);});
            if (oldItem) {
                // Сравниваем
                if (this.compareCallPositions(oldItem, newItem)) {
                    newItem.obj = oldItem.obj;
                    newItem.time = oldItem.time;
                } else {
                    let route = [newItem, newItem];
                    newItem.obj = this.updateRoute(route, oldItem.obj);
                }
            }
        });

        this.calls = newList;

        this.cleanRoutes();

    }

    compareCars(oldCar, newCar){
        if (!oldCar || !newCar) {
            return true;
        }
        if (oldCar.number != newCar.number) {
            return false;
        } else if (oldCar.position.lattitude != newCar.position.lattitude) {
            return false;
        } else if (oldCar.position.longitude != newCar.position.longitude) {
            return false;
        }
        return true;
    }

    createCar(params) {
        let crew = 'Н/О';
        let cap = params.car.number.substr(1, 3);
        let fontSize = '18px';
        let top = '14px';
        if (params.car.crew && params.car.crew.name) {
            crew = params.car.crew.name;
            cap = params.car.crew.name.substr(1).trim();
            fontSize = '32px';
            top = '6px';
        }


        let layout = ymaps.templateLayoutFactory.createClass(
            '<div class="placemark_layout_container">' +
                '<div class="circle_layout">' +
                    '<div style="width:48px;height:48px;opacity:0.9">' +
                        '<svg style="position:absolute;top:0;left:0;width:48px;height:48px;pointer-events:none;" viewBox="' +
                            TIcon.icons.bagel.w +'">' +
                            '<path style="fill:' + params.car.color + ';"d="' + TIcon.icons.bagel.d + '"/>' +
                        '</svg>' +
                    '<div style="position:absolute;top:' + top + ';left:0;font-weight:bold;text-align:center;width:48px;' +
                        'font-size:' + fontSize + ';font-family:Arial;color:' + params.car.color + '">' + cap +
                    '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );

        let placemark = new ymaps.Placemark([params.car.position.lattitude, params.car.position.longitude], {
                balloonContent: 'Бригада ' + crew + '   гос.номер: ' + params.car.number,
                clusterCaption: 'Бригада ' + crew + '   гос.номер: ' + params.car.number,
                carColor: params.car.color,
                cap: cap
        }, {
            iconLayout: layout,
            iconOffset: [-24, -24],
            iconShape: {
                type: 'Circle',
                coordinates: [22, 22],
                radius: 25
            },
            hideIconOnBalloonOpen: false,
            preset: 'islands#violetIcon'

        });

        return placemark;

    }

    showCars(newList) {

        if (!this.mounted) {
            return;
        }

        if (!this.map) {
            return;
        }

        let objects = [];

        var customBalloonContentLayout = ymaps.templateLayoutFactory.createClass([
                '<div class=list style="display:block; width: 280px; max-height:400px; overflow:scroll;">',
                '{% for geoObject in properties.geoObjects %}',
                    '<div class=string>',
                        '<div style="float:left;width:32px;height:32px;opacity:0.9">',
                            '<svg style="position:relative;float: left;top:0;left:0;width:32px;height:32px;pointer-events:none;" viewBox="',
                                TIcon.icons.bagel.w +'">',
                                '<path style="fill:{{ geoObject.properties.carColor|raw }};"d="' + TIcon.icons.bagel.d + '"/>',
                            '</svg>',
                            '<div style="position:relative;top: -25px;left: 4px;float: left;font-weight:bold;text-align:center;width:24px;' +
                                'font-size:12px;font-family:Arial;color:{{ geoObject.properties.carColor|raw }}">{{ geoObject.properties.cap|raw }}' +
                            '</div>',
                        '</div>',
                        '<p style= "float:left;position:relative;top:-6px;left:2px">{{ geoObject.properties.balloonContent|raw }}</p>',
                    '</div>',
                '{% endfor %}',
                '</div>'
            ].join(''));

        let clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            clusterBalloonContentLayout: customBalloonContentLayout,
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        });

        // Удаляем старые объекты
        this.cars.forEach((oldItem, index) => {
            // Ищем удаленные
            let foundItem = newList.find((v) => {return v.id == oldItem.id});
            if (!foundItem) {
                // Находим объект
                let obj = this.carObjects[index];
                // Удаляем объект
                if (obj) {
                    clusterer.remove(obj)
                    //this.map.geoObjects.remove(obj);
                }
            }
        });

        // Создаем новые объекты
        newList.forEach((newItem, index) => {
            // Ищем новые
            let foundItem = this.cars.find((v) => {return v.id == newItem.id});
            if (!foundItem) {
                // Создаем новый объект
                let obj = this.createCar({index: index, car: newItem});
                if (obj) {
                    objects[index] = obj;
                    clusterer.add(obj);
                    //this.map.geoObjects.add(obj);
                }
            }
        });

        // Пересоздаем измененные объекты
        newList.forEach((newItem, index) => {
            // Ищем в старых
            let oldItem = null;
            let oldObject = null;
            for (let i=0; i<this.cars.length; i++) {
                if (this.cars[i].id == newItem.id) {
                    oldItem = this.cars[i];
                    oldObject = this.carObjects[i];
                }
            }
            if (oldItem) {
                // Сравниваем
                if (!this.compareCars(oldItem, newItem)) {
                    oldObject.geometry.setCoordinates([oldItem.position.lattitude, oldItem.position.longitude]);
                    objects[index] = oldObject;
                } else {
                    objects[index] = oldObject;
                }
            }
        });

        this.carObjects = objects;
        this.cars = newList;

        this.map.geoObjects.add(clusterer);
    }

    render () {

        let map = {
            width: this.props.size.width - 4  + "px",
            height: this.props.size.height - 4 + "px"
        };

        let style = merge(styles, this.props.style, {map: map});

        return (
            <div id="map" style={style.map}></div>
        );

    }

}

Map.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object,
    show: PropTypes.array.isRequired,
    onFail: PropTypes.func.isRequired,
    onTimes: PropTypes.func,
    calls: PropTypes.array.isRequired,
    cars: PropTypes.array.isRequired
};

export default Map;
