var randomImage = function(params) {
	var options = $.extend({
		bucket: null,
		path: null,
		awsRegion: "eu-west-1",
		container: ".random-image"
	}, params);

	if (options.bucket !== null && options.path !== null) {


		var renderImage = function(bucket, path,  container) {

			var url = "https://s3-eu-west-1.amazonaws.com/" + bucket + "?delimiter=%2F&encoding-type=url&marker=&max-keys=1000&prefix=" + encodeURI(path);

			$.get(url, function(xml) {

				if ($(xml).find("Contents").length > 1) {
					var d = [];
					var objects = $(xml).find("Contents");
					objects.splice(0, 1);
					var allowed = /^jpg|jpeg|gif|png$/;

					$.each(objects, function(k, v) {
						if ($(v).find("Key").length) {
                var key = $(v).find("Key").text();
                // console.log(key);
                var exten = key.split(".").pop().toLowerCase();
                if (key.lastIndexOf("__w_") === -1 && allowed.test(exten)) {
                  d.push(key);
                }
              }
					});

					var random = Math.floor((Math.random() * d.length));
						var randomImage = "<img src='/" + d[random]+ "' alt='' class='random-image random" + random + "' />";
						$(container).append(randomImage);


				} else {
					console.log("Bitte überprüfen Sie den Pfad in den Parameter");
				}


			}).error(function(error) {
				console.log(error);
			});

		};

		renderImage(options.bucket, options.path, options.container);

	} else {
		console.log('please define parameters bucket, path like {bucket: "my.bucket.com", path: "random/images/"}');
	}

};
