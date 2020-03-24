/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


function onSuccess(values) {
  var state = values[0];
  console.log(state);
  alert(state);

}

function onError(error) {
   console.log(error);
   alert(error)
}

document.addEventListener("deviceready", function () {

    sensors.enableSensor("GRAVITY");

    setInterval(function(){
      sensors.getState(onSuccess, onError);
    }, 1000);


}, false);


// PROXIMITY - Measures the proximity of an object in cm relative to the view screen of a device.

// ACCELEROMETER - Measures the acceleration force in m/s2 that is applied to a device on all three physical axes (x, y, and z), including the force of gravity.

// GRAVITY - Measures the force of gravity in m/s2 that is applied to a device on all three physical axes (x, y, z).

// GYROSCOPE - Measures a device's rate of rotation in rad/s around each of the three physical axes (x, y, and z).
 
// GYROSCOPE_UNCALIBRATED - Rate of rotation (without drift compensation) around the x axis.

// LINEAR_ACCELERATION - Measures the acceleration force in m/s2 that is applied to a device on all three physical axes (x, y, and z), excluding the force of gravity.

// ROTATION_VECTOR - Measures the orientation of a device by providing the three elements of the device's rotation vector.

// STEP_COUNTER - Number of steps taken by the user since the last reboot while the sensor was activated.

// GAME_ROTATION_VECTOR - Rotation vector component along the x axis (x * sin(θ/2)).

// GEOMAGNETIC_ROTATION_VECTOR - Rotation vector component along the x axis (x * sin(θ/2)).

// MAGNETIC_FIELD - Measures the ambient geomagnetic field for all three physical axes (x, y, z) in μT.

// MAGNETIC_FIELD_UNCALIBRATED - Geomagnetic field strength (without hard iron calibration) along the x axis.

// ORIENTATION - Measures degrees of rotation that a device makes around all three physical axes (x, y, z).

// AMBIENT_TEMPERATURE - Measures the ambient room temperature in degrees Celsius (°C). See note below.

// LIGHT - Measures the ambient light level (illumination) in lx.

// PRESSURE - Measures the ambient air pressure in hPa or mbar.

// RELATIVE_HUMIDITY - Measures the relative ambient humidity in percent (%).

// TEMPERATURE - Measures the temperature of the device in degrees Celsius (°C).


