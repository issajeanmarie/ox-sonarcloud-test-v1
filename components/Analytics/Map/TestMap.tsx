// declare let window: { [key: string]: any };

// import React, { useState, useEffect } from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "100vh"
// };

// const center = { lat: -1.9440727, lng: 30.0618851 };

// // https://stackoverflow.com/a/55043218/9058905
// function animateMarkerTo(marker: any, newPosition: any) {
//   const options = {
//     duration: 1000,
//     easing: function (x: number, t: number, b: number, c: number, d: number) {
//       // jquery animation: swing (easeOutQuad)
//       return -c * (t /= d) * (t - 2) + b;
//     }
//   };

//   window.requestAnimationFrame =
//     window.requestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.msRequestAnimationFrame;
//   window.cancelAnimationFrame =
//     window.cancelAnimationFrame || window.mozCancelAnimationFrame;

//   // save current position. prefixed to avoid name collisions. separate for lat/lng to avoid calling lat()/lng() in every frame
//   marker.AT_startPosition_lat = marker.getPosition().lat();
//   marker.AT_startPosition_lng = marker.getPosition().lng();
//   const newPosition_lat = newPosition.lat();
//   let newPosition_lng = newPosition.lng();

//   // crossing the 180° meridian and going the long way around the earth?
//   if (Math.abs(newPosition_lng - marker.AT_startPosition_lng) > 180) {
//     if (newPosition_lng > marker.AT_startPosition_lng) {
//       newPosition_lng -= 360;
//     } else {
//       newPosition_lng += 360;
//     }
//   }

//   const animateStep = function (marker: any, startTime: string) {
//     const ellapsedTime = new Date().getTime() - +startTime;
//     const durationRatio = ellapsedTime / options.duration; // 0 - 1
//     const easingDurationRatio = options.easing(
//       durationRatio,
//       ellapsedTime,
//       0,
//       1,
//       options.duration
//     );

//     if (durationRatio < 1) {
//       marker.setPosition({
//         lat:
//           marker.AT_startPosition_lat +
//           (newPosition_lat - marker.AT_startPosition_lat) * easingDurationRatio,
//         lng:
//           marker.AT_startPosition_lng +
//           (newPosition_lng - marker.AT_startPosition_lng) * easingDurationRatio
//       });

//       // use requestAnimationFrame if it exists on this browser. If not, use setTimeout with ~60 fps
//       if (window.requestAnimationFrame) {
//         marker.AT_animationHandler = window.requestAnimationFrame(function () {
//           animateStep(marker, startTime);
//         });
//       } else {
//         marker.AT_animationHandler = setTimeout(function () {
//           animateStep(marker, startTime);
//         }, 17);
//       }
//     } else {
//       marker.setPosition(newPosition);
//     }
//   };

//   // stop possibly running animation
//   if (window.cancelAnimationFrame) {
//     window.cancelAnimationFrame(marker.AT_animationHandler);
//   } else {
//     clearTimeout(marker.AT_animationHandler);
//   }

//   const date = new Date();

//   animateStep(marker, String(date.getTime()));
// }

// const TestMap = () => {
//   const [state, setState] = useState({
//     lat: -1.9440128018170264,
//     lng: 30.06187468187567
//   });

//   const [currentPos, setCurrentPos] = useState(0);

//   const dumpData = [
//     {
//       lat: -1.9440128018170264,
//       lng: 30.06187468187567
//     },

//     { lat: -1.9441144916860336, lng: 30.061506187557978 },

//     { lat: -1.9437352159272254, lng: 30.062171677295904 },

//     { lat: -1.944388465326629, lng: 30.062328100086127 },

//     {
//       lat: -1.9448996218361374,
//       lng: 30.063054460541306
//     },

//     { lat: -1.945112168830093, lng: 30.063992124035533 },
//     { lat: -1.9453348393954946, lng: 30.065080275563854 },
//     { lat: -1.9464708255227556, lng: 30.068040956218095 },
//     { lat: -1.9483138412780632, lng: 30.07123020216414 },
//     { lat: -1.95097455837261, lng: 30.072984918909714 }
//   ];

//   useEffect(() => {
//     const doSomething = () => {
//       setState(dumpData[currentPos + 1]);
//       setCurrentPos(currentPos + 1);
//       // animateMarkerTo(markerRef?.current?.marker, dumpData[currentPos + 1]);
//     };

//     const interval = setInterval(() => {
//       if (dumpData.indexOf(state) - 2 < dumpData.length) doSomething();
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [state]);

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script"
//   });

//   const mapRef: any = React.useRef(null);
//   const markerRef: any = React.useRef(null);

//   // const onLoad = React.useCallback(function callback(map) {
//   //   const bounds = new window.google.maps.LatLngBounds(center);
//   //   map.fitBounds(bounds);
//   //   mapRef.current = map;
//   // }, []);

//   const onClick = React.useCallback((event) => {
//     animateMarkerTo(markerRef?.current?.marker, event.latLng);
//   }, []);

//   const onUnmount = React.useCallback(function callback(map) {
//     mapRef.current = null;
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       // onLoad={onLoad}
//       onUnmount={onUnmount}
//       onClick={onClick}
//     >
//       <Marker ref={markerRef} position={state} />
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// };

// export default React.memo(TestMap);
const TestMap = () => <p>This is it</p>;

export default TestMap;
