
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import Leaflet from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";

let DefaultIcon = Leaflet.icon({
  ...Leaflet.Icon.Default.prototype.options,
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

var driverIcon = Leaflet.icon({
  iconUrl: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF',
});


const zoom = 18
function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, zoom);

  return null;
}


function OfficeMap({ coords, drivers }) {
  return (
    <>
      <MapContainer
        classsName="map"
        center={coords}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick coords={coords} />
        <Marker position={coords} />

        {drivers.length > 0 ?
          drivers.map((v, i) => {
            console.log(v)
            return <Marker position={v.coords} icon={driverIcon} />
          })
          : ''}
        <div className="leaflet-bottom leaflet-left">

        </div>
      </MapContainer>

    </>
  );
}

export default OfficeMap;
