/*
Name:       SVGReflection
Version:    0.0.3 (25. Juni 2011)
Author:     Finn Rudolph
Support:    finn.rudolph@googlemail.com

License:    This code is licensed under a Creative Commons 
            Attribution-Noncommercial 3.0 Unported License 
            (http://creativecommons.org/licenses/by-nc/3.0/).

            You are free:
                + to Share - to copy, distribute and transmit the work
                + to Remix - to adapt the work

            Under the following conditions:
                + Attribution. You must attribute the work in the manner specified by the author or licensor 
                  (but not in any way that suggests that they endorse you or your use of the work). 
                + Noncommercial. You may not use this work for commercial purposes. 

            + For any reuse or distribution, you must make clear to others the license terms of this work.
            + Any of the above conditions can be waived if you get permission from the copyright holder.
            + Nothing in this license impairs or restricts the author's moral rights.
*/

/* Constructor */
function SVGReflection()
{
	/* Closure for this */
	var my = this;

	/* Initialize */
	this.initialize = function(image)
	{
		var image, reflection;
		
		/* Get image width and height via attribute for the InternetExplorer */
		if(image.getAttribute('width') !== null && image.getAttribute('height') !== null)
		{
			width = parseInt(image.getAttribute('width'), 10);
			height = parseInt(image.getAttribute('height'), 10);
		}
		else
		{
			width = image.width;
			height = image.height;
		}
		
		/* Create SVG object */
		var svg = my.getSvgObject(image.src, width, height, 100);
		
		/* Replace source image with SVG object */
		document.body.appendChild(svg);
	};

	this.getSvgObject = function(source, width, height, percent)
	{
		/* Build path to PHP script that returns the SVG */
		var data = 'http://localhost/Entwickeln/SVGReflection/SVGReflection.php';
		data += '?image=' + source + '&height=' + height + '&width=' + width + '&percent=' + percent;
		
		/* Calculate new image height = source image + reflection */
		var height = height + ((height / 100) * percent);
		
		/* Create an object element */
		var svg = document.createElement('object');
		
		/* Set required object attributes */
		svg.setAttribute('type', 'image/svg+xml');
		svg.setAttribute('width', width + 'px');
		svg.setAttribute('height', height + 'px');
		svg.setAttribute('data', data);
		
		return svg;
	};
}	
	
/* Create global instance when the DOM structure has been loaded */
domReady(function()
{
	/* Reflect all images in the DOM */
	var images = document.getElementsByTagName('IMG'),
		max = images.length, 
		i;
	for(i=0;i<max;i++)
	{
		this['reflectedImage'+i] = new SVGReflection();
		this['reflectedImage'+i].initialize(images[i]);
	}
});