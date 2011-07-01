<?php

/**
SVGReflection

Returns an SVG image with a reflection.

@version   0.0.1
@author    Finn Rudolph <finn.rudolph@googlemail.com>
	
*/

class SVG
{
	private $_svg;
	private $_image;
	private $_reflection;

	function __construct($request)
	{
		if($this->_requestIsValid($request))
		{
			$this->_setOptions($request);
		}
		else
		{
			die('You are missing mandatory parameters: "image", "width" and "height" are needed.');
		}
	}
	
	private function _requestIsValid($request)
	{
		return (isset($request['image']) && isset($request['width']) && isset($request['height'])) ? true : false;
	}
	
	private function _setOptions($request)
	{
		$this->_image = array(	'url' => $request['image'],
								'width' => intval($request['width']),
								'height' => intval($request['height']) );

		if(isset($request['percent']))
		{
			$percent = intval($request['percent']);
			$this->_reflection['percent'] = ($percent >= 0) ? intval($request['percent']) : 50;
		}
	}
	
	public function reflectImage()
	{
		/* Height of the reflection in pixel */
		$reflection_height = ($this->_image['height'] / 100) * $this->_reflection['percent'];
		
		/* Height of the SVG in pixel */
		$svg_height = $this->_image['height'] + $reflection_height;
		
		/* Height of the reflection image overlay (not visible) in pixel */
		$overlay_height = $this->_image['height'] - $reflection_height;
		
		/* Full transparency offset of the gradient */
		$offset = 50 + ($this->_reflection['percent'] / 2);
		
		/* Opacity of the reflection */
		$opacity = 5;
		$hex = dechex((255/100) * (100 - $opacity));
		$color = $hex.$hex.$hex;
		
		$this->_svg =  '<svg xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events"
							version="1.1" baseProfile="full"
							width="100%" height="100%"
							viewBox="0 0 '.$this->_image['width'].' '.$svg_height.'">
							<defs>
								<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%" >
									<stop offset="0" stop-color="#fff" />
									<stop offset="50%" stop-color="#fff" />
									<stop offset="50%" stop-color="#'.$color.'" />
									<stop offset="'.$offset.'%" stop-color="#000" />
								</linearGradient>
								<mask id="mask" maskContentUnits="objectBoundingBox">
									<rect x="0" y="0" height="1" width="1" fill="url(#gradient)" />
								</mask>
							</defs>
							<rect x="0" y="0" width="'.$this->_image['width'].'" height="'.$svg_height.'" fill="none"/>
							<g mask="url(#mask)">
								<image x="0" y="0" width="'.$this->_image['width'].'" height="'.$this->_image['height'].'" xlink:href="'.$this->_image['url'].'" />
								<image fill-opacity="0.1" transform="scale(1, -1)" x="0" y="-'.($svg_height + $overlay_height -1).'" width="'.$this->_image['width'].'" height="'.$this->_image['height'].'" xlink:href="'.$this->_image['url'].'" />
							</g>
						</svg>';
	}
	
	public function getImage()
	{
		return $this->_svg;
	}
}


/* Set the header to SVG */
header('Content-type: image/svg+xml');

/* Return the generated SVG XML */
$SVG = new SVG($_GET);
$SVG->reflectImage();
echo $SVG->getImage();


?>