
const FirstSensorData = [];
const SecondSensorData = [];
const FirstSensorInformation = {};
const SecondSensorInformation = {};
var currentSelecteSensorId = 0;
const fromDate = '';
const toDate = '';
var AllSensors = []

function applyFilter() {
    currentSelecteSensorId = document.getElementById("filter").value;
    if (currentSelecteSensorId != -1) {
        $('#datefilter').modal('toggle');
    }
    else {
        renderChartAllSensors()
    }
}

function filterResult() {
    var toDate = document.getElementById("todate").value;
    var fromDate = document.getElementById("fromdate").value;
    fetch(`https://api.smartcitizen.me/v0/devices/1616/readings?sensor_id=${currentSelecteSensorId}&rollup=1d&from=${fromDate}&to=${toDate}`)
        .then(response => response.json())
        .then(data => {
            let SensorData = [];
            data.readings.map(m => {
                const tempObj = { x: new Date(m[0]), y: Math.floor(m[1]), }
                SensorData.push(tempObj)

            })
            rendersingleChart(SensorData, "test")
            $('#datefilter').modal('toggle');
        });
}


fetch('https://api.smartcitizen.me/v0/devices/1616')
    .then(response => response.json())
    .then(data => {
        FirstSensorInformation.name = "Battery SCK";
        FirstSensorInformation.unit = "%";

        SecondSensorInformation.name = "DHT22 - Humidity"
        SecondSensorInformation.unit = "%";

        console.log(data)
        AllSensors = data.data.sensors;
        const select = document.getElementById('filter')

        select.innerHTML = `<option value="-1">All Sensors</option>`
            ;

        data.data.sensors.forEach(sensor => {
            const option = `
            <option value="${sensor.id}">${sensor.name}</option>
            `
            select.innerHTML += option
        });

        document.getElementById('totalSensors').innerHTML = data.data.sensors.length
        document.getElementById('batterySensors').innerHTML = data.data.sensors[0].value + ' ' + data.data.sensors[0].unit
        document.getElementById('DHT-humidity-Sensors').innerHTML = data.data.sensors[1].value + ' ' + data.data.sensors[1].unit
        document.getElementById('DHT-temperature-Sensors').innerHTML = data.data.sensors[2].value + ' ' + data.data.sensors[2].unit
        document.getElementById('MOS-Nos-gas-Sensors').innerHTML = data.data.sensors[3].value + ' ' + data.data.sensors[3].unit

    });

fetch('https://api.smartcitizen.me/v0/devices/1616/readings?sensor_id=5&rollup=1d&from=2015-02-02T18:15:34Z&to=2015-09-17T14:56:59Z')
    .then(response => response.json())
    .then(data => {

        data.readings.map(m => {
            const tempObj = { x: new Date(m[0]), y: Math.floor(m[1]), }
            FirstSensorData.push(tempObj)
        })

        fetch('https://api.smartcitizen.me/v0/devices/1616/readings?sensor_id=10&rollup=1d&from=2015-02-02&to=2020-12-11')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                data.readings.map(m => {
                    const tempObj = { x: new Date(m[0]), y: Math.floor(m[1]), }
                    SecondSensorData.push(tempObj)
                })

                renderChartAllSensors()

            });


    });
function toogleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    chart.render();
}

function rendersingleChart(chartdata, sensorName) {
    var chart = new CanvasJS.Chart("chartContainer", {

        axisX: {
            valueFormatString: "MMM YYYY"
        },
        axisY2: {
            title: "Reading",
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        data: [
            {
                type: "line",
                axisYType: "secondary",
                name: sensorName,
                showInLegend: true,
                markerSize: 0,
                yValueFormatString: "#,###",
                dataPoints: chartdata
            },

        ]
    });
    chart.render();
}
function renderChartAllSensors() {
    var chart = new CanvasJS.Chart("chartContainer", {

        axisX: {
            valueFormatString: "MMM YYYY"
        },
        axisY2: {
            title: "Reading",
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        data: [
            {
                type: "line",
                axisYType: "secondary",
                name: FirstSensorInformation.name,
                showInLegend: true,
                markerSize: 0,
                yValueFormatString: "#,###",
                dataPoints: FirstSensorData
            },
            {
                type: "line",
                axisYType: "secondary",
                name: SecondSensorInformation.name,
                showInLegend: true,
                markerSize: 0,
                yValueFormatString: "#,###",
                dataPoints: SecondSensorData
            },

        ]
    });
    chart.render();
}

