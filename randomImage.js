///////////////////////
// randomImage() version 1.0
//////////////////////
var randomImage = function(params) {
	var options = $.extend({
		bucket: "webbear.seven49.net",
		path: "galleries/test/",
		awsRegion: "eu-west-1",
		container: ".random-image",
		default: "/galleries/test1/img1.jpg"
	}, params);
	var defaultImage = "<img src='" + options.default +"' class='random-image default' alt=''  />";

	var loadScript = function(url, callback) {
		var head = document.getElementsByTagName("head")[0];
		var script = document.createElement("script");
		script.src = url;

		// Attach handlers for all browsers
		var done = false;
		script.onload = script.onreadystatechange = function() {
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				// Continue your code
				callback();
				// Handle memory leak in IE
				script.onload = script.onreadystatechange = null;
				head.removeChild(script);
			}
		};
		head.appendChild(script);
	};


	var awsSDKsupport = function() {
		var ua = navigator.userAgent.toLowerCase();
		var out = true;
		//console.log(ua);
		if (ua.indexOf('msie') > -1) {
			//old ie check
			if (ua.indexOf('msie 10') > -1) {
				out = true;
			} else {
				out = false;
			}
		}
		// chrome check
		else if (ua.indexOf('chrome') !== -1 && parseFloat(ua.substring(ua.indexOf('chrome') + 7).split(' ')[0]) < 28) {
			out = false;
		}
		// safari check
		else if (ua.indexOf('safari') !== -1 && ua.indexOf('version') && parseFloat(ua.substring(ua.indexOf('version') + 8).split(' ')[0]) < 5.1) {
			out = false;
		}
		// opera check
		else if (ua.indexOf('opera') !== -1 && parseFloat(ua.substring(ua.indexOf('version') + 8).split(' ')[0]) < 17) {
			out = false;
		}
		// firefox check
		else if (ua.indexOf('firefox') !== -1 && parseFloat(ua.substring(ua.indexOf('firefox') + 8)) < 23) {
			out = false;
		}
		return out;
	};

	var renderImage = function(bucket, path, awsRegion,  container) {

		AWS.config.update({
			accessKeyId: 'AKIAJ3CTMVV7WBH5CO2Q',
			secretAccessKey: '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'
		});

		AWS.config.region = awsRegion;

		var params = {
			Bucket: bucket, // required /
			Delimiter: '/',
			EncodingType: 'url',
			Marker: '',
			MaxKeys: 1000,
			Prefix: path
		};

		var s3 = new AWS.S3({
			sslEnabled: true
		});
		s3.listObjects(params, function(error, data) {
			if (error) {
				$(container).append(defaultImage);
			} else {
				var d = [];
				// console.log(data);
				if (data.Contents.length === 0) {
					$(container).append(defaultImage);
				} else if (data.Contents.length > 1) {
					data.Contents.shift();

					var objects = data.Contents,
						allowed = /^jpg|jpeg|gif|png$/;

					for (var i = 0, dataL = objects.length; i < dataL; i++) {
						// console.log(objects[i])
						var key = objects[i].Key,
							exten = key.split(".").pop().toLowerCase();
						if (key.lastIndexOf("__w_") === -1 && allowed.test(exten)) {
							d.push(objects[i]);
						}
					}

					var random = Math.floor((Math.random() * d.length));
					var randomImage = "<img src='/" + d[random].Key+ "' alt='' class='random-image random" + random + "' />";
					$(container).append(randomImage);
				}
			}
		});
	};

	if (awsSDKsupport()) {
		if (typeof AWS === 'undefined') {
			loadScript("https://sdk.amazonaws.com/js/aws-sdk-2.1.27.min.js", function(){
				renderImage(options.bucket, options.path, options.awsRegion, options.container);
			});
		} else {
			renderImage(options.bucket, options.path, options.awsRegion, options.container);
		}
	} else {
		$(options.container).append(defaultImage);
	}

};
