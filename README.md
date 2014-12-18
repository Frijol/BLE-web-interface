BLE-web-interface
=================

Displays nearby BLE devices on a webpage served by a Tessel.

You have the option to pre-register devices into the code if you want them to show up with a name next to them.

This could be useful if you just want to know what BLE devices are around you– or if a group of people regularly carry BLE-broadcasting devices (e.g. Fitbits or phones), you could register them into the code and use this for a roll-call of who is present.

## Materials

* [Tessel](//tessel.io)
* [Bluetooth Low Energy Module](//tessel.io/modules#module-ble)

## To run

1. Clone this repo
1. From inside your local copy of the repo, `npm install` to install dependencies
1. Plug the Bluetooth Low Energy Module into port A on your Tessel
1. Connect Tessel to wifi– this should be the same wifi your computer is connected to. (`tessel wifi -n network -p password`). Note the IP address of your tessel when it connects (you can also show it again with `tessel wifi -l`)
1. Start the server and begin scanning for BLE devices with `tessel run index.js`
1. Once the console has logged that it's listening, go to your tessel's IP address in the browser + the port– so in my case, '192.168.8.106:8080'. The page served from your Tessel should appear!
1. I didn't do anything fancy with this, so you'll have to refresh to get the most recent listing.
