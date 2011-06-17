/*
Name:       SVGReflection
Version:    0.0.2 (28. November 2010)
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
		/* Create an object element */
		var svg = document.createElement('object');
		svg.setAttribute('class', 'svg');
		svg.setAttribute('type', 'image/svg+xml');
		
		/* Reflect the image */
		this.reflect(svg, image.src, image.width, image.height);
		
		/* Create SVG element */
		document.body.appendChild(svg);
		
		//my.createEmbed(image.width, image.height);
	};
	
	
	this.createEmbed = function(width, height)
	{
		var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" version="1.1" baseProfile="full" width="390px" height="600px"><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%" ><stop offset="0" stop-color="#fff" /><stop offset="50%" stop-color="#fff" /><stop offset="100%" stop-color="#000" /></linearGradient><mask id="mask" maskContentUnits="objectBoundingBox"><rect x="0" y="0" height="1" width="1" fill="url(#gradient)" /></mask></defs><rect x="0" y="0" width="390" height="600" fill="none"/><g mask="url(#mask)"><image x="0" y="0" width="390" height="300" xlink:href="images/3101950593.jpg" /><image transform="scale(1, -1)" x="0" y="-600" width="390" height="300" xlink:href="images/3101950593.jpg" /></g></svg>';
		
		var embed = document.createElement('embed');
		embed.setAttribute('codebase', 'http://www.adobe.com/svg/viewer/install/');
		embed.setAttribute('classid', 'clsid:78156a80-c6a1-4bbf-8e6a-3cd390eeb4e2');
		embed.setAttribute('pluginspage', 'http://www.adobe.com/svg/viewer/install/');
		embed.setAttribute('src', 'blank.svg');
		embed.setAttribute('width', width);
		embed.setAttribute('height', height);
		embed.setAttribute('type', 'image/svg+xml');
		embed.setAttribute('id', 'embeddedSVG');
	
		document.body.appendChild(embed);
		
		embed.innerHTML = svg;
	}
	

	/* Reflect the image */
	this.reflect = function(svg, image, width, height)
	{
		var reflectedImageHeight = height * 2;
		var	data = '<svg xmlns="http://www.w3.org/2000/svg" ';
		data += 'xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" ';
		data += 'version="1.1" baseProfile="full" ';
		data += 'width="'+width+'px" height="'+reflectedImageHeight+'px">';
		data += '<defs>';
		data += '<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%" >';
		data += '<stop offset="0" stop-color="#fff" />';
		data += '<stop offset="50%" stop-color="#fff" />';
		data += '<stop offset="100%" stop-color="#000" />';
		data += '</linearGradient>';
		data += '<mask id="mask" maskContentUnits="objectBoundingBox">';
		data += '<rect x="0" y="0" height="1" width="1" fill="url(#gradient)" />';
		data += '</mask>';
		data += '</defs>';
		data += '<g mask="url(#mask)">';
		data += '<image x="0" y="0" width="'+width+'" height="'+height+'" xlink:href="'+image+'" />';
		data += '<image transform="scale(1, -1)" x="0" y="-'+reflectedImageHeight+'" width="'+width+'" height="'+height+'" xlink:href="'+image+'" />';
		data += '</g>';
		data += '</svg>';
	
		/* Add SVG data, width and height to object */
		svg.setAttribute('width', width+'px');
		svg.setAttribute('height', reflectedImageHeight+'px');
		svg.setAttribute('data', 'data:image/svg+xml,' + data);
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