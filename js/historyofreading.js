const loadingSpinner = `
<div class="loadingSpinner">
<svg class="spinner" viewBox="0 0 50 50">
    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5">
    </circle>
</svg>
</div>`;
const table = document.getElementById("batteryTable");
table.innerHTML = loadingSpinner;

fetch('https://api.smartcitizen.me/v0/devices/1616/readings?sensor_id=10&rollup=1d&from=2015-02-02&to=2020-12-11')
    .then(response => response.json())
    .then(data => {
        table.innerHTML = ""
        data.readings.forEach((reading, index) => {
            if (index < 10) {
                const row = `<tr>
                <td>${reading[0]}</td>
                <td>${Math.floor(reading[1])}</td>
             </tr>`;
                table.innerHTML += row;
            }
        });

    });

const DHTtable = document.getElementById("DHTTable");
DHTtable.innerHTML = loadingSpinner;

fetch('https://api.smartcitizen.me/v0/devices/1616/readings?sensor_id=5&rollup=1d&from=2015-02-02T18:15:34Z&to=2015-09-17T14:56:59Z')
    .then(response => response.json())
    .then(data => {
        DHTtable.innerHTML = ""
        data.readings.forEach((reading, index) => {
            if (index < 10) {
                const row = `<tr>
                <td>${reading[0]}</td>
                <td>${Math.floor(reading[1])}</td>
             </tr>`;
                DHTtable.innerHTML += row;
            }
        });

    });