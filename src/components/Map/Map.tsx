import type { FeatureCollection, Polygon } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Layer, Marker, Source } from 'react-map-gl/maplibre';

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  radius?: number;
}

// Function to create a GeoJSON circle
function createGeoJSONCircle(center: [number, number], radiusInKm: number, points = 64): FeatureCollection {
  const coords = {
    latitude: center[1],
    longitude: center[0],
  };
  const km = radiusInKm;
  const ret: [number, number][] = [];
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
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [ret],
        } as Polygon,
      },
    ],
  };
}

const defaultCoords: [number, number] = [21.0122, 52.2297];
const defaultRadius = 0.5;

const circleLayer = {
  id: 'circle-radius',
  type: 'fill' as const,
  paint: {
    'fill-color': '#FFD700',
    'fill-opacity': 0.2,
  },
};

const MapComponent = ({ center, zoom, radius }: MapComponentProps) => {
  const finalCenter = center || defaultCoords;
  const finalZoom = zoom || 14;
  const finalRadius = radius || defaultRadius;
  const circleGeoJSON = createGeoJSONCircle(finalCenter, finalRadius);

  return (
    <Map
      mapLib={import('maplibre-gl')}
      initialViewState={{
        latitude: finalCenter[1],
        longitude: finalCenter[0],
        zoom: finalZoom,
      }}
      style={{ width: '100%', height: 500 }}
      mapStyle="https://api.maptiler.com/maps/dataviz/style.json?key=uWNFxjJhDlsLx0fsVbRg"
      cooperativeGestures={true}
    >
      <Source id="circle-source" type="geojson" data={circleGeoJSON}>
        <Layer {...circleLayer} />
      </Source>
      <Marker longitude={finalCenter[0]} latitude={finalCenter[1]} color="orange" />
    </Map>
  );
};

export default MapComponent;
