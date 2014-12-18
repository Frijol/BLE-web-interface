// Local vars
var port = 8080;
var timeout = 5000;
var pollFreq = 5000;
var noneFound;
var devices = [];
// Use this to add names to a specific device IDs
var recognizedDevices = {
  '105.105.60.123.235.203': 'Myo',
  '70.10.117.62.49.92': 'August'
};

// Set up server
var router = require('tiny-router');
router.get('/', function (req, res) {
  if (devices.length > 0) {
    var page = "<html><body>Devices in view:<br/><br/>";
    for (var device in devices) {
      var deviceID = devices[device].id;
      page += deviceID;
      if (deviceID in recognizedDevices) {
        page += "&nbsp;&nbsp;" + recognizedDevices[deviceID];
      }
      page += "<br/>";
    }
    page += "</body></html>";
    res.send(page);
  } else {
    res.send('No devices in range.');
  }
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
  devices.push({id: deviceID});
});

// Scan for devices regularly
function poll() {
  setTimeout(scan, pollFreq);
}

// Check and see if authed devices in range
function scan () {
  // Reset found devices
  devices = [];
  console.log('Scanning...');
  ble.startScanning();
  noneFound = setTimeout(function () {
    ble.stopScanning();
    // Check for changes
    poll();
  }, timeout);
}
