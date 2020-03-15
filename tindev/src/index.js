import React from 'react';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'Remote debugger is in a background tab',
  'Debugger and device times'
]);


import Routes from './Routes'

export default function App() {
  return (
    <Routes />
  );
}