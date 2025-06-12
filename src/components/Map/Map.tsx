import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Marker } from 'react-map-gl/maplibre';

const MapComponent = () => (
  <Map
    mapLib={import('maplibre-gl')}
    initialViewState={{
      latitude: 52.2297,
      longitude: 21.0122,
      zoom: 14,
    }}
    style={{ width: '100%', height: 500 }}
    mapStyle={`https://api.maptiler.com/maps/dataviz/style.json?key=uWNFxjJhDlsLx0fsVbRg`}
  >
    <Marker longitude={21.0122} latitude={52.2297} color="yellow" />
  </Map>
);

export default MapComponent;
