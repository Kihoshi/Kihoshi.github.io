import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { DatePicker, message, Row, Col, Card } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
interface RouterProps { // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}
type Props = RouteComponentProps<RouterProps>;
type State = {
    message: string;
}

export default class FindTaxi extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            message: "",
        };
    }

    componentDidMount() { }

    render() {

        return (
            <div>
                <Row className='mainBg'>
                    <Col span={6} offset={6}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis deleniti vitae, iusto incidunt exercitationem sint porro, eius tempora harum, quidem accusamus natus hic quam est odio amet quos aspernatur officiis.</Col>
                    <Col span={6}>
                        <Card title='Search Maps'>
                            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[51.505, -0.09]}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}
