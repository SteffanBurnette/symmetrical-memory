import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const MapComponent = ({ lat, lng }) => {
  const mapStyles = {
    height: "400px",
    width: "600px",
  };

  const defaultCenter = {
    lat: lat,
    lng: lng,
  };

  return (
    <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
      <Marker position={defaultCenter} />
    </GoogleMap>
  );
};

export default MapComponent;