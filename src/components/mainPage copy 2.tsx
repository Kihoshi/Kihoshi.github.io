import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Card, Slider, Select } from 'antd';
import { MapContainer, TileLayer, Marker, Popup,useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
interface RouterProps { // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}
type Props = RouteComponentProps<RouterProps>;
type State = {
    message: string;
    centerPositionX: number;
    centerPositionY: number;
}
const marks = {
    0: '1',
    10: '10',
    20: '20',
};

const { Option } = Select;
export default class FindTaxi extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            message: "",
            // centerPosition:[51.5049375, -0.0964509],
            centerPositionX: 1.285194,
            centerPositionY: 103.8522982
        };
    }

    handleChange = (value) => {

        let assignValueX = 51.5049375, assignValueY = -0.0964509
        // if (value === 'uk') {
        //     assignValueX = 51.5049375
        //     assignValueY = -0.0964509
        // }
         if (value === 'sg') {
            assignValueX = 1.285194
            assignValueY = 103.8522982
        }
        const map = useMap();
        map.setView([assignValueX,assignValueY]);
 
        this.setState({ centerPositionX: assignValueX, centerPositionY: assignValueY })
        console.log(`selected123 ${assignValueX} ${assignValueY}`);
        console.log(`selected ${value}`);
    }

 
 
    render() {

        let { centerPositionX, centerPositionY } = this.state
        console.log(centerPositionX,' ',centerPositionY)
        return (
            <div>
                <Row className='mainBg' gutter={16}  >
                    <Col span={6} offset={6}>
                        <Row>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis deleniti vitae, iusto incidunt exercitationem sint porro, eius tempora harum, quidem accusamus natus hic quam est odio amet quos aspernatur officiis.</Row>

                        <Select defaultValue="sg" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="sg">Singapore</Option>
                            <Option value="uk">London</Option>
                        </Select>

                        <Slider marks={marks} defaultValue={20} min={1} max={20} />
                    </Col>
                    <Col span={8}>
                        <Card title='Search Taxi'>
                            <MapContainer center={[centerPositionX, centerPositionY]} zoom={18} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </MapContainer>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}
