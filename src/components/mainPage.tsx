import { useEffect, useState, } from 'react';
import { Row, Col, Card, Slider, Select, Button, Spin,Modal } from 'antd';
import OfficeMap from "./officeMap"; //Feature an interactive map.
import _ from "lodash";
import axios from "axios";
import { clear } from 'console';

const marks = {
    0: '1',
    10: '10',
    20: '20',
};
const defaultLocation = [
    { locationName: 'Singapore', latitude: 1.285194, longitude: 103.8522982, value: 'sg' },
    { locationName: 'London', latitude: 51.5049375, longitude: -0.0964509, value: 'uk' },
]
const { Option } = Select;
let timeout;

const FindTaxi = (props) => {
    const [officeLocation, setOfficeLocation] = useState('sg')
    const [coords, setCoords] = useState([1.285194, 103.8522982]);
    const [drivers, setDrivers] = useState([]);
    const [driverCount, setDriverCount] = useState(4);
    const [spinLoading, setSpinLoading] = useState(false);
    const url = "https://cors-anywhere.herokuapp.com/https://qa-interview-test.splytech.dev/api/drivers";

    useEffect(() => {
        //you should choose an appropriate refresh interval for most recent locations of taxis
        const intervalId = setInterval(() => {
            getNearByTaxiDriver(coords[0], coords[1], 'abc')
        }, 10000 * 5) // in milliseconds
        return () => clearInterval(intervalId)
    })

    useEffect(() => {
        function onChangeOfficeLocation() {
            let foundLocation = _.find(defaultLocation, { 'value': officeLocation });
            // let driverArray = [] as any;
            if (_.isEmpty(foundLocation) === false) {
                setCoords([foundLocation.latitude, foundLocation.longitude]);
                getNearByTaxiDriver(foundLocation.latitude, foundLocation.longitude, 'efg')
            }
        }
        onChangeOfficeLocation()

    }, [officeLocation])

    function handleChange(value) {
        setOfficeLocation(value)
    }


    //You should centre the map on the location of the nearest Splyt office to the user’s
    // current location. There should be the ability to manually switch between the office locations, or return to the nearest.
    // ○ Singapore: (1.285194, 103.8522982)
    // ○ London: (51.5049375, -0.0964509)

    function handleChangeNearestOffice() {
        onChangeNearestOffice()
    }
    function handleChangeMyLocation() {
        setSpinLoading(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(goToMyLocation);
        }
    }

    function onChangeNearestOffice() {
        setSpinLoading(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(goToNearestOffice);
        }
    }
    function goToMyLocation(position) {
        setCoords([position.coords.latitude, position.coords.longitude]);
        setSpinLoading(false)
    }

    function goToNearestOffice(position) {
        let latitude = position.coords.latitude,
            longitude = position.coords.longitude
        let nearestDistance = 0, nearestDistanceValue = ''
        defaultLocation.map((v) => {
            let distance = getDistance([latitude, longitude], [v.latitude, v.longitude])
            if (nearestDistance === 0 || nearestDistance > distance) {
                nearestDistance = distance
                nearestDistanceValue = v.value
            }
            return v
        })
        setOfficeLocation('')
        setOfficeLocation(nearestDistanceValue)

        setSpinLoading(false)
    }

    //calculate distance
    function getDistance(origin, destination) {
        // return distance in meters
        var lon1 = toRadian(origin[1]),
            lat1 = toRadian(origin[0]),
            lon2 = toRadian(destination[1]),
            lat2 = toRadian(destination[0]);

        var deltaLat = lat2 - lat1;
        var deltaLon = lon2 - lon1;

        var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
        var c = 2 * Math.asin(Math.sqrt(a));
        var EARTH_RADIUS = 6371;
        return c * EARTH_RADIUS * 1000;
    }
    function toRadian(degree) {
        return degree * Math.PI / 180;
    }

    //Feature a UI slider, that enables you to change the number of taxis displayed on
    // the map. You should choose a sensible lower and upper bound for the range.
    function handleChangeDriverCount(value) {
        getNearByTaxiDriver(coords[0], coords[1], 'eggg')
        setDriverCount(value)
    }

    //The map should show the most recent locations of taxis in the surrounding area     
    function getNearByTaxiDriver(x, y, where) {

        // return console.log('getNearByTaxiDriver '+where)
        axios.get('http://localhost:3031/getDriver', {
            params: {
                latitude: x,
                longitude: y,
                count: driverCount
            }
        }).then((res) => {
            console.log('res')
            console.log(res)
            if (res.data.err) {
                Modal.error({
                    title: 'This is an error message',
                    content: res.data.message,
                  });
            }
            else {
                // setDrivers(res.data.drivers)
            }
        }).catch((err) => {
            console.log('err')
            console.log(err)
        })

    }

    return (
        <div>
            <Row className='mainBg' gutter={16}  >
                <Col span={6} offset={6}>
                    <h1 className='headerText'>Find Taxi</h1>
                    <Row>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis deleniti vitae, iusto incidunt exercitationem sint porro, eius tempora harum, quidem accusamus natus hic quam est odio amet quos aspernatur officiis.</Row>

                    <Row gutter={16} className='margin-10px'><h2>Office Location</h2></Row>
                    <Select defaultValue="sg" value={officeLocation} style={{ width: 120 }} onChange={handleChange}>
                        {defaultLocation.map((v, i) => {
                            return <Option key={'location' + i} value={v.value}>{v.locationName}</Option>
                        })}
                    </Select>

                    <Row gutter={16} className='margin-10px'><h2>Show no. of Taxi</h2></Row>
                    <Slider marks={marks} defaultValue={4} min={1} max={20}
                        // onChange={handleChangeDriverCount}
                        onChange={(e) => {
                            clearTimeout(timeout);
                            timeout = setTimeout(function () {
                                handleChangeDriverCount(e)
                            }, 1000);

                        }}
                    />
                </Col>
                <Col span={8}>
                    <Card title='Search Taxi'>
                        <Spin spinning={spinLoading}>
                            <OfficeMap coords={coords} drivers={drivers} />
                        </Spin>

                        <Button loading={spinLoading} className='margin-10px' onClick={handleChangeNearestOffice}>Back to Nearest Office</Button>
                        <Button loading={spinLoading} className='margin-10px' onClick={handleChangeMyLocation}>Back to My Current Location</Button>
                    </Card>
                </Col>
            </Row>

        </div>
    );

}
export default (FindTaxi);