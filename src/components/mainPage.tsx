import { useEffect, useState, } from 'react';
import { Row, Col, Card, Slider, Select, Button, Spin } from 'antd';
import OfficeMap from "./officeMap";
import _ from "lodash";
import axios from "axios";
 
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
const FindTaxi = (props) => {
    const [officeLocation, setOfficeLocation] = useState('sg')
    const [coords, setCoords] = useState([1.285194, 103.8522982]);
    const [drivers, setDrivers] = useState([]);
    const [spinLoading, setSpinLoading] = useState(false);

    useEffect(() => { 

        axios.get(`https://qa-interview-test.splytech.dev/api/drivers`,{
            params:{
            },
              withCredentials: false,
            //   crossDomain: true,
          }).then((res)=>{
              console.log(res)
          })

    }, [])
    useEffect(() => {
        function onChangeOfficeLocation() {
            let foundLocation = _.find(defaultLocation, { 'value': officeLocation });
            // let driverArray = [] as any;
            setCoords([foundLocation.latitude, foundLocation.longitude]);
        }
        onChangeOfficeLocation()
    }, [officeLocation])

    function handleChange(value) {
        setOfficeLocation(value)
    }

    function handleChangeNearestOffice() {
        onChangeNearestOffice()
    }

    function onChangeNearestOffice() {
        setSpinLoading(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(goToNearestOffice);
        }
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
        setOfficeLocation(nearestDistanceValue)
        setSpinLoading(false)
    }


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


    return (
        <div>
            <Row className='mainBg' gutter={16}  >
                <Col span={6} offset={6}>
                    <Row>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis deleniti vitae, iusto incidunt exercitationem sint porro, eius tempora harum, quidem accusamus natus hic quam est odio amet quos aspernatur officiis.</Row>

                    <Select defaultValue="sg" value={officeLocation} style={{ width: 120 }} onChange={handleChange}>
                        {defaultLocation.map((v) => {
                            return <Option value={v.value}>{v.locationName}</Option>
                        })}
                    </Select>

                    <Slider marks={marks} defaultValue={4} min={1} max={20} />
                </Col>
                <Col span={8}>
                    <Card title='Search Taxi'>
                        <Spin spinning={spinLoading}>
                            <OfficeMap coords={coords} drivers={drivers} />
                        </Spin>

                            <Button loading={spinLoading} className='margin-10px' onClick={handleChangeNearestOffice}>Back to Nearest Office</Button>
                    </Card>
                </Col>
            </Row>

        </div>
    );

}
export default (FindTaxi);