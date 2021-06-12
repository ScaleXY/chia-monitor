const df = require('@sindresorhus/df');
const fetch = require('node-fetch');
const Conf = require('conf');
const { v4: uuidv4 } = require('uuid');

const config = new Conf({
	projectName: "chia-monitor"
});

async function updateInfo(device_id) {
	await df()
		.then(data => {
			fetch("https://chiadash.scalexy.app",	{
				method: 'POST',
				mode: 'no-cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
				  'Content-Type': 'application/json'
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify({
					device_id: device_id,
					data: data,
				})
			  });
		})
};

function main() {
	// if (config.has('device_id')) {
	// 	device_id = config.get('device_id');
	// 	updateInfo(device_id);
	// } else {
	// 	config.
	// 	set('device_id', device_id);
	// 	console.log("DeviceID Set to: " + device_id);
	// }
	config.set('device_id', config.get('device_id') || uuidv4());
	device_id = config.get('device_id');
	console.log("DeviceID: " + device_id);
	updateInfo(device_id);
};

main();