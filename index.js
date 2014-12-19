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
var tessel = require('tessel');
var blelib = require('ble-ble113a');
var ble = blelib.use(tessel.port['A']);

// Set up server
var router = require('tiny-router');
router.get('/', function (req, res) {
  console.log('request from client');
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
var networkInterfaces=require('os').networkInterfaces();

console.log('Visit http://'+networkInterfaces.en1[0].address+':'+port+' to see your devices');

// Set up hardware


ble.on('ready', function () {
  // Initial scan for devices
  console.log('ready');
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
  console.log('polling');
  setTimeout(scan, pollFreq);
}

// Check and see if authed devices in range
function scan () {
  // Reset found devices
  devices = [];
  console.log('Scanning for BLE devices transceive as an iBeacon');
  ble.startScanning();
  console.log('... started');
  noneFound = setTimeout(function () {
    ble.stopScanning();
    console.log('nothing found !');
    console.log('########################################');
    console.log('## Maybe you have no active iBeacon ? ##');
    console.log('## Normal Bluetooth 4.x devices will  ##');
    console.log('## not be discovered by this scan!    ##');
    console.log('########################################');
    // Check for changes
    poll();
  }, timeout);
}
