cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-sensors.sensors",
      "file": "plugins/cordova-plugin-sensors/www/sensors.js",
      "pluginId": "cordova-plugin-sensors",
      "clobbers": [
        "sensors"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-sensors": "0.7.0"
  };
});