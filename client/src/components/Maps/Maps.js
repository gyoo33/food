/*global google*/
//import _ from "lodash";
import React from "react";
import {
  compose,
  withProps,
  withHandlers,
  withState,
  withStateHandlers
} from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import Container from "../Container";

let stores = [];

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBFlPuI4M4lSIitF4APyB6fktZW6PtdX6w&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withState("places", "updatePlaces", ""),
  withHandlers(() => {
    const refs = {
      map: undefined
    };
    return {
      onMapMounted: () => ref => {
        refs.map = ref;
      },
      fetchPlaces: ({ updatePlaces }) => {
        //let places;
        const bounds = refs.map.getBounds();
        const service = new window.google.maps.places.PlacesService(
          refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        );
        const request = {
          bounds: bounds,
          type: ["supermarket"]
        };
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            updatePlaces(results);
          }
        });
      }
    };
  }),
  withStateHandlers(
    () => ({
      isOpen: false,
      infoIndex: null
    }),
    {
      showInfo: ({ isOpen, infoIndex }) => results => ({
        isOpen: infoIndex !== results || !isOpen,
        infoIndex: results
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      onTilesLoaded={props.fetchPlaces}
      ref={props.onMapMounted}
      onBoundsChanged={props.fetchPlaces}
      defaultZoom={15}
      defaultCenter={{ lat: 40.7359, lng: -73.9911 }}
    >
      {props.places &&
        props.places.map((place, i) => (
          <Marker
            key={i}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }}
            onClick={() => {
              props.isOpen;
            }}
          >
            {props.isOpen && (
              <InfoWindow onCloseClick={props.showInfo}>
                <span>{Marker.info}</span>
                {console.log(InfoWindow)}
              </InfoWindow>
            )}
          </Marker>
        ))}
    </GoogleMap>
  );
});

//const enhance = _.identity;

const ReactGoogleMaps = () => [
  //<Header key="header" />,
  <Container
    key="ribbon"
    target="_blank"
    rel="noopener noreferrer"
    position="right"
  />,
  <MyMapComponent key="map" />
];

export default ReactGoogleMaps;
