// Local vars
var port = 8080;
var timeout = 5000;
var pollFreq = 5000;
var noneFound;

// Set up server
var router = require('tiny-router');
router.get('/', function (req, res) {
  console.log('Sending')
  res.send('Hi I am a Tessel');
  console.log('Sent')
  // res.end();
});

// Start server
router.listen(port);
console.log('Listening on port', port);

// Set up hardware
var tessel = require('tessel');
var blelib = require('ble-ble113a');
var ble = blelib.use(tessel.port['A']);


ble.on('ready', function () {
  // Initial scan for devices
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
