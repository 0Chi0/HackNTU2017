'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = '68da1b8e09b6453bb8d81f100ae0984f';

var faceAPI = function faceAPI(image) {
	return (0, _nodeFetch2.default)('https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,emotion', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			'Ocp-Apim-Subscription-Key': '68da1b8e09b6453bb8d81f100ae0984f'
		},
		body: JSON.stringify({
			'url': image
		})
	}).then(function (res) {
		return res.json();
	}).then(function (json) {
		if (json.length == 0) {
			return {
				people: 0
			};
		} else if (json.length == 1) {
			return json.map(function (data) {
				return {
					people: 1,
					gender: data.faceAttributes.gender,
					age: data.faceAttributes.age,
					emotion: data.faceAttributes.emotion
				};
			});
		} else {
			return {
				people: 2
			};
		}
		console.log(json);
	}).catch(function (err) {
		console.log(err);
	});
};

faceAPI('http://fs.mis.kuas.edu.tw/~s1103137225/123.jpg').then(function (data) {
	console.log(data);
});

exports.default = faceAPI;