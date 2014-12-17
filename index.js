// Local vars
var timeout = 5000;
var pollFreq = 5000;
var noneFound;

// Set up hardware
var tessel = require('tessel');
var blelib = require('ble-ble113a');
var ble = blelib.use(tessel.port['A']);

// Initial scan for devices
ble.on('ready', function () {
  scan();
});

// When a device is discovered
ble.on('discover', function(peripheral) {
  deviceID = peripheral.address._str;
  console.log('Found device:', deviceID);
});

// Scan for devices regularly
function poll() {
  setTimeout(scan, pollFreq);
}

// Check and see if authed devices in range
function scan () {
  console.log('Scanning...');
  ble.startScanning();
  noneFound = setTimeout(function () {
    ble.stopScanning();
    // Check for changes
    poll();
  }, timeout);
}
