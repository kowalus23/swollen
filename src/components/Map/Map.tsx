import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Layer, Marker, Source } from 'react-map-gl/maplibre';

const warsawCoords = [21.0122, 52.2297];

// Function to create a GeoJSON circle
function createGeoJSONCircle(center: [number, number], radiusInKm: number, points = 64) {
  const coords = {
    latitude: center[1],
    longitude: center[0],
  };
  const km = radiusInKm;
  const ret = [];
  const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
  const distanceY = km / 110.574;

  for (let i = 0; i < points; i++) {
    const theta = (i / points) * (2 * Math.PI);
    const x = distanceX * Math.cos(theta);
    const y = distanceY * Math.sin(theta);
    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [ret],
        },
      },
    ],
  };
}

const circleGeoJSON = createGeoJSONCircle(warsawCoords, 0.5);

const circleLayer = {
  id: 'circle-radius',
  type: 'fill',
  paint: {
    'fill-color': '#FFD700',
    'fill-opacity': 0.2,
  },
};

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
    <Source id="circle-source" type="geojson" data={circleGeoJSON}>
      <Layer {...circleLayer} />
    </Source>
    <Marker longitude={21.0122} latitude={52.2297} color="yellow" />
  </Map>
);

export default MapComponent;
