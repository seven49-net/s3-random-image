# s3-random-image
Random image UI Control for displaying a random image.
randomImage() is a function to retrieve a random image of an image directory in a s3 bucket.
The function will autoload the AWS SDK. It works  with modern browsers like IE > 10, Firefox > 23, Safari > 5.1, Chrome > 28, Opera > 17. A default image for older browser should be specified!


The randomImage() function takes following options:
* bucket: "my.s3.bucket" // s3 bucket name
* path: "galleries/my-gallery/" // path to image directory
* container: ".random-image", // element to append the random image
* default: "/galleries/test1/img1.jpg" // default image for 
* awsRegion: "eu-west-1" // default eu-west-1, change only if another zone is used


##Example:

<code>
&lt;script src=&quot;http://cdn.seven49.net/common/js/jquery/seven49/randomImage-1.0.min.js&quot; &gt;&lt;/script&gt;
</code>  

<code>
&lt;div class=&quot;random-image&quot;&gt;&lt;/div&gt;
</code>

<code> 
&lt;script&gt;  
$(document).ready(function() {</code>
 
<code>
	randomImage({
		bucket: &quot;wwww.seven49.net&quot;,  
		path: &quot;galleries/my-super-gallery/&quot;,  
		container: &quot;.random-image&quot;,  
		default: &quot;/galleries/my-super-gallery/my-super-default-image.jpg&quot;  
   });
   </code>
 
 <code> 
});
</code>