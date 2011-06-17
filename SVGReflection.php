<?php





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
		$image_height = $this->_image['height'] + (($this->_image['height'] / 100) * $this->_reflection['percent']);
		
		$this->_svg = '<svg xmlns="http://www.w3.org/2000/svg"
	 xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events"
	 version="1.1" baseProfile="full"
	 width="'.$this->_image['width'].'px" height="'.$image_height.'px">
	<defs>
		<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%" >
			<stop offset="0" stop-color="#fff" />
			<stop offset="50%" stop-color="#fff" />
			<stop offset="100%" stop-color="#000" />
		</linearGradient>
		<mask id="mask" maskContentUnits="objectBoundingBox">
			<rect x="0" y="0" height="1" width="1" fill="url(#gradient)" />
		</mask>
	</defs>
	<rect x="0" y="0" width="'.$this->_image['width'].'" height="'.$image_height.'" fill="none"/>
	<g mask="url(#mask)">
		<image x="0" y="0" width="'.$this->_image['width'].'" height="'.$this->_image['height'].'" xlink:href="'.$this->_image['url'].'" />
		<image transform="scale(1, -1)" x="0" y="-'.$image_height.'" width="'.$this->_image['width'].'" height="'.$this->_image['height'].'" xlink:href="images/3101950593.jpg" />
	</g>
</svg>';
	}
	
	public function getImage()
	{
		return $this->_svg;
	}
}



$SVG = new SVG($_GET);
$SVG->reflectImage();

header('Content-type: image/svg+xml');
echo $SVG->getImage();





?>