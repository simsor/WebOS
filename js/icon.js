/*
 
jQuery icon manager
by Simsor
under MIT license

Allows to create icons on the "desktop" of a WebOS

*/

jQuery.fn.icon = function(callback) {

$(this).addClass("icon");
$icon = $(this);

$("#desktop").click(function(){ $icon.children().removeClass("icon-selected"); $icon.addClass("icon");});
$icon.click(function(){ $icon.children().addClass("icon-selected"); $icon.removeClass("icon-selected");});

var move = function($obj, x, y){
	    
	x = parseInt(x);
	y = parseInt(y);
		
	$obj.attr("lastX",x)
	.attr("lastY",y);
	
        x = x+"px";
	y = y+"px";		
		
	$obj.css("left", x)
	    .css("top", y);
}

var dragging = function(e, $obj){
	if(true){
		e = e ? e : window.event;
	        var newx = parseInt($obj.css("left")) + (e.clientX - lastMouseX);
        	var newy = parseInt($obj.css("top")) + (e.clientY - lastMouseY);
	    	lastMouseX = e.clientX;
	    	lastMouseY = e.clientY;
	  	
	    	move($obj,newx,newy);
	}
};

$icon.bind('mousedown', function(e){
		e.preventDefault();
		if ($(e.target).attr("src") != undefined)
	    		$obj = $(e.target).parent();
	    	else
	    		$obj = $(e.target);
		
	    
	        e = e ? e : window.event;
		    lastMouseX = e.clientX;
		    lastMouseY = e.clientY;
		    
		    $(document).bind('mousemove', function(e){
			    dragging(e, $obj);
		    });
		    
			
		    $(document).bind('mouseup', function(e){
				$(document).unbind('mousemove');
				$(document).unbind('mouseup');
		    });
			
	    
});
};
