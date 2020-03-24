cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-sensors/www/sensors.js",
        "id": "cordova-plugin-sensors.sensors",
        "pluginId": "cordova-plugin-sensors",
        "clobbers": [
            "sensors"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-sensors": "0.7.0"
}
// BOTTOM OF METADATA
});