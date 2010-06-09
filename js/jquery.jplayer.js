/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.happyworm.com/jquery/jplayer
 *
 * Copyright (c) 2009 - 2010 Happyworm Ltd
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: Mark J Panaghiston
 * Version: 1.1.1
 * Date: 29th April 2010
 */

(function(c){function l(a,b){function e(f){f=c[a][f]||[];return typeof f=="string"?f.split(/,?\s+/):f}var d=e("getter");return c.inArray(b,d)!=-1}c.fn.jPlayer=function(a){var b=typeof a=="string",e=Array.prototype.slice.call(arguments,1);if(b&&a.substring(0,1)=="_")return this;if(b&&l("jPlayer",a,e)){var d=c.data(this[0],"jPlayer");return d?d[a].apply(d,e):undefined}return this.each(function(){var f=c.data(this,"jPlayer");!f&&!b&&c.data(this,"jPlayer",new c.jPlayer(this,a))._init();f&&b&&c.isFunction(f[a])&&
f[a].apply(f,e)})};c.jPlayer=function(a,b){this.options=c.extend({},b);this.element=c(a)};c.jPlayer.getter="jPlayerOnProgressChange jPlayerOnSoundComplete jPlayerVolume jPlayerReady getData jPlayerController";c.jPlayer.defaults={cssPrefix:"jqjp",swfPath:"js",volume:80,oggSupport:false,nativeSupport:true,customCssIds:false,graphicsFix:true,errorAlerts:false,warningAlerts:false,position:"absolute",width:"0",height:"0",top:"0",left:"0",quality:"high",bgcolor:"#ffffff"};c.jPlayer._config={version:"1.1.1",
swfVersionRequired:"1.1.0",swfVersion:"unknown",jPlayerControllerId:undefined,delayedCommandId:undefined,isWaitingForPlay:false,isFileSet:false};c.jPlayer._diag={isPlaying:false,src:"",loadPercent:0,playedPercentRelative:0,playedPercentAbsolute:0,playedTime:0,totalTime:0};c.jPlayer._cssId={play:"jplayer_play",pause:"jplayer_pause",stop:"jplayer_stop",loadBar:"jplayer_load_bar",playBar:"jplayer_play_bar",volumeMin:"jplayer_volume_min",volumeMax:"jplayer_volume_max",volumeBar:"jplayer_volume_bar",volumeBarValue:"jplayer_volume_bar_value"};
c.jPlayer.count=0;c.jPlayer.timeFormat={showHour:false,showMin:true,showSec:true,padHour:false,padMin:true,padSec:true,sepHour:":",sepMin:":",sepSec:""};c.jPlayer.convertTime=function(a){var b=new Date(a),e=b.getUTCHours();a=b.getUTCMinutes();b=b.getUTCSeconds();e=c.jPlayer.timeFormat.padHour&&e<10?"0"+e:e;a=c.jPlayer.timeFormat.padMin&&a<10?"0"+a:a;b=c.jPlayer.timeFormat.padSec&&b<10?"0"+b:b;return(c.jPlayer.timeFormat.showHour?e+c.jPlayer.timeFormat.sepHour:"")+(c.jPlayer.timeFormat.showMin?a+c.jPlayer.timeFormat.sepMin:
"")+(c.jPlayer.timeFormat.showSec?b+c.jPlayer.timeFormat.sepSec:"")};c.jPlayer.prototype={_init:function(){var a=this,b=this.element;this.config=c.extend({},c.jPlayer.defaults,this.options,c.jPlayer._config);this.config.diag=c.extend({},c.jPlayer._diag);this.config.cssId={};this.config.cssSelector={};this.config.cssDisplay={};this.config.clickHandler={};this.element.data("jPlayer.config",this.config);c.extend(this.config,{id:this.element.attr("id"),swf:this.config.swfPath+(this.config.swfPath!=""&&
this.config.swfPath.slice(-1)!="/"?"/":"")+"Jplayer.swf",fid:this.config.cssPrefix+"_flash_"+c.jPlayer.count,aid:this.config.cssPrefix+"_audio_"+c.jPlayer.count,hid:this.config.cssPrefix+"_force_"+c.jPlayer.count,i:c.jPlayer.count,volume:this._limitValue(this.config.volume,0,100)});c.jPlayer.count++;if(this.config.ready!=undefined)if(c.isFunction(this.config.ready))this.jPlayerReadyCustom=this.config.ready;else this._warning("Constructor's ready option is not a function.");try{this.config.audio=new Audio;
this.config.audio.id=this.config.aid;this.element.append(this.config.audio)}catch(e){this.config.audio={}}c.extend(this.config,{canPlayMP3:!!(this.config.audio.canPlayType?""!=this.config.audio.canPlayType("audio/mpeg")&&"no"!=this.config.audio.canPlayType("audio/mpeg"):false),canPlayOGG:!!(this.config.audio.canPlayType?""!=this.config.audio.canPlayType("audio/ogg")&&"no"!=this.config.audio.canPlayType("audio/ogg"):false),aSel:c("#"+this.config.aid)});c.extend(this.config,{html5:!!(this.config.oggSupport?
this.config.canPlayOGG?true:this.config.canPlayMP3:this.config.canPlayMP3)});c.extend(this.config,{usingFlash:!(this.config.html5&&this.config.nativeSupport),usingMP3:!(this.config.oggSupport&&this.config.canPlayOGG&&this.config.nativeSupport)});var d={setButtons:function(h,g){a.config.diag.isPlaying=g;if(a.config.cssId.play!=undefined&&a.config.cssId.pause!=undefined)if(g){a.config.cssSelector.play.css("display","none");a.config.cssSelector.pause.css("display",a.config.cssDisplay.pause)}else{a.config.cssSelector.play.css("display",
a.config.cssDisplay.play);a.config.cssSelector.pause.css("display","none")}if(g)a.config.isWaitingForPlay=false}},f={setFile:function(h,g){try{a._getMovie().fl_setFile_mp3(g);a.config.diag.src=g;a.config.isFileSet=true;b.trigger("jPlayer.setButtons",false)}catch(j){a._flashError(j)}},clearFile:function(){try{b.trigger("jPlayer.setButtons",false);a._getMovie().fl_clearFile_mp3();a.config.diag.src="";a.config.isFileSet=false}catch(h){a._flashError(h)}},play:function(){try{a._getMovie().fl_play_mp3()&&
b.trigger("jPlayer.setButtons",true)}catch(h){a._flashError(h)}},pause:function(){try{a._getMovie().fl_pause_mp3()&&b.trigger("jPlayer.setButtons",false)}catch(h){a._flashError(h)}},stop:function(){try{a._getMovie().fl_stop_mp3()&&b.trigger("jPlayer.setButtons",false)}catch(h){a._flashError(h)}},playHead:function(h,g){try{a._getMovie().fl_play_head_mp3(g)&&b.trigger("jPlayer.setButtons",true)}catch(j){a._flashError(j)}},playHeadTime:function(h,g){try{a._getMovie().fl_play_head_time_mp3(g)&&b.trigger("jPlayer.setButtons",
true)}catch(j){a._flashError(j)}},volume:function(h,g){a.config.volume=g;try{a._getMovie().fl_volume_mp3(g)}catch(j){a._flashError(j)}}},k={setFile:function(h,g,j){a.config.audio=new Audio;a.config.audio.id=a.config.aid;a.config.aSel.replaceWith(a.config.audio);a.config.aSel=c("#"+a.config.aid);a.config.diag.src=a.config.usingMP3?g:j;a.config.isWaitingForPlay=true;a.config.isFileSet=true;b.trigger("jPlayer.setButtons",false);a.jPlayerOnProgressChange(0,0,0,0,0);clearInterval(a.config.jPlayerControllerId);
a.config.audio.addEventListener("canplay",function(){a.config.audio.volume=a.config.volume/100},false)},clearFile:function(){a.setFile("","");a.config.isWaitingForPlay=false;a.config.isFileSet=false},play:function(){if(a.config.isFileSet){if(a.config.isWaitingForPlay)a.config.audio.src=a.config.diag.src;a.config.audio.play();b.trigger("jPlayer.setButtons",true);clearInterval(a.config.jPlayerControllerId);a.config.jPlayerControllerId=window.setInterval(function(){a.jPlayerController(false)},100);clearInterval(a.config.delayedCommandId)}},
pause:function(){if(a.config.isFileSet){a.config.audio.pause();b.trigger("jPlayer.setButtons",false)}},stop:function(){if(a.config.isFileSet)try{a.config.audio.currentTime=0;b.trigger("jPlayer.pause");clearInterval(a.config.jPlayerControllerId);a.config.jPlayerControllerId=window.setInterval(function(){a.jPlayerController(true)},100)}catch(h){clearInterval(a.config.delayedCommandId);a.config.delayedCommandId=window.setTimeout(function(){a.stop()},100)}},playHead:function(h,g){if(a.config.isFileSet)try{a.config.audio.currentTime=
typeof a.config.audio.buffered=="object"&&a.config.audio.buffered.length>0?g*a.config.audio.buffered.end(a.config.audio.buffered.length-1)/100:g*a.config.audio.duration/100;b.trigger("jPlayer.play")}catch(j){clearInterval(a.config.delayedCommandId);a.config.delayedCommandId=window.setTimeout(function(){a.playHead(g)},100)}},playHeadTime:function(h,g){if(a.config.isFileSet)try{a.config.audio.currentTime=g/1E3;b.trigger("jPlayer.play")}catch(j){clearInterval(a.config.delayedCommandId);a.config.delayedCommandId=
window.setTimeout(function(){a.playHeadTime(g)},100)}},volume:function(h,g){a.config.volume=g;a.config.audio.volume=g/100;a.jPlayerVolume(g)}};this.config.usingFlash?c.extend(d,f):c.extend(d,k);for(var i in d){f="jPlayer."+i;this.element.unbind(f);this.element.bind(f,d[i])}if(this.config.usingFlash)if(this._checkForFlash(8))if(c.browser.msie){i='<object id="'+this.config.fid+'"';i+=' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';i+=' codebase="'+document.URL.substring(0,document.URL.indexOf(":"))+
'://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"';i+=' type="application/x-shockwave-flash"';i+=' width="'+this.config.width+'" height="'+this.config.height+'">';i+="</object>";d=[];d[0]='<param name="movie" value="'+this.config.swf+'" />';d[1]='<param name="quality" value="high" />';d[2]='<param name="FlashVars" value="id='+escape(this.config.id)+"&fid="+escape(this.config.fid)+"&vol="+this.config.volume+'" />';d[3]='<param name="allowScriptAccess" value="always" />';d[4]='<param name="bgcolor" value="'+
this.config.bgcolor+'" />';i=document.createElement(i);for(f=0;f<d.length;f++)i.appendChild(document.createElement(d[f]));this.element.html(i)}else{d='<embed name="'+this.config.fid+'" id="'+this.config.fid+'" src="'+this.config.swf+'"';d+=' width="'+this.config.width+'" height="'+this.config.height+'" bgcolor="'+this.config.bgcolor+'"';d+=' quality="high" FlashVars="id='+escape(this.config.id)+"&fid="+escape(this.config.fid)+"&vol="+this.config.volume+'"';d+=' allowScriptAccess="always"';d+=' type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
this.element.html(d)}else this.element.html("<p>Flash 8 or above is not installed. <a href='http://get.adobe.com/flashplayer'>Get Flash!</a></p>");this.element.css({position:this.config.position,top:this.config.top,left:this.config.left});if(this.config.graphicsFix){this.element.append('<div id="'+this.config.hid+'"></div>');c.extend(this.config,{hSel:c("#"+this.config.hid)});this.config.hSel.css({"text-indent":"-9999px"})}this.config.customCssIds||c.each(c.jPlayer._cssId,function(h,g){a.cssId(h,
g)});if(!this.config.usingFlash){this.element.css({left:"-9999px"});window.setTimeout(function(){a.volume(a.config.volume);a.jPlayerReady()},100)}},jPlayerReady:function(a){if(this.config.usingFlash){this.config.swfVersion=a;this.config.swfVersionRequired!=this.config.swfVersion&&this._error("jPlayer's JavaScript / SWF version mismatch!\n\nJavaScript requires SWF : "+this.config.swfVersionRequired+"\nThe Jplayer.swf used is : "+this.config.swfVersion)}else this.config.swfVersion="n/a";this.jPlayerReadyCustom()},
jPlayerReadyCustom:function(){},setFile:function(a,b){this.element.trigger("jPlayer.setFile",[a,b])},clearFile:function(){this.element.trigger("jPlayer.clearFile")},play:function(){this.element.trigger("jPlayer.play")},pause:function(){this.element.trigger("jPlayer.pause")},stop:function(){this.element.trigger("jPlayer.stop")},playHead:function(a){this.element.trigger("jPlayer.playHead",[a])},playHeadTime:function(a){this.element.trigger("jPlayer.playHeadTime",[a])},volume:function(a){a=this._limitValue(a,
0,100);this.element.trigger("jPlayer.volume",[a])},cssId:function(a,b){var e=this;if(typeof b=="string")if(c.jPlayer._cssId[a]){this.config.cssId[a]!=undefined&&this.config.cssSelector[a].unbind("click",this.config.clickHandler[a]);this.config.cssId[a]=b;this.config.cssSelector[a]=c("#"+b);this.config.clickHandler[a]=function(d){e[a](d);c(this).blur();return false};this.config.cssSelector[a].click(this.config.clickHandler[a]);this.config.cssDisplay[a]=this.config.cssSelector[a].css("display");a==
"pause"&&this.config.cssSelector[a].css("display","none")}else this._warning("Unknown/Illegal function in cssId\n\njPlayer('cssId', '"+a+"', '"+b+"')");else this._warning("cssId CSS Id must be a string\n\njPlayer('cssId', '"+a+"', "+b+")")},loadBar:function(a){if(this.config.cssId.loadBar!=undefined){var b=this.config.cssSelector.loadBar.offset();a=a.pageX-b.left;b=this.config.cssSelector.loadBar.width();this.playHead(100*a/b)}},playBar:function(a){this.loadBar(a)},onProgressChange:function(a){if(c.isFunction(a))this.onProgressChangeCustom=
a;else this._warning("onProgressChange parameter is not a function.")},onProgressChangeCustom:function(){},jPlayerOnProgressChange:function(a,b,e,d,f){this.config.diag.loadPercent=a;this.config.diag.playedPercentRelative=b;this.config.diag.playedPercentAbsolute=e;this.config.diag.playedTime=d;this.config.diag.totalTime=f;this.config.cssId.loadBar!=undefined&&this.config.cssSelector.loadBar.width(a+"%");this.config.cssId.playBar!=undefined&&this.config.cssSelector.playBar.width(b+"%");this.onProgressChangeCustom(a,
b,e,d,f);this._forceUpdate()},jPlayerController:function(a){var b=0,e=0,d=0,f=0,k=0;if(this.config.audio.readyState>=1){b=this.config.audio.currentTime*1E3;e=this.config.audio.duration*1E3;e=isNaN(e)?0:e;d=e>0?100*b/e:0;if(typeof this.config.audio.buffered=="object"&&this.config.audio.buffered.length>0){f=100*this.config.audio.buffered.end(this.config.audio.buffered.length-1)/this.config.audio.duration;k=100*this.config.audio.currentTime/this.config.audio.buffered.end(this.config.audio.buffered.length-
1)}else{f=100;k=d}}if(this.config.audio.ended){clearInterval(this.config.jPlayerControllerId);this.jPlayerOnSoundComplete()}else!this.config.diag.isPlaying&&f>=100&&clearInterval(this.config.jPlayerControllerId);a?this.jPlayerOnProgressChange(f,0,0,0,e):this.jPlayerOnProgressChange(f,k,d,b,e)},volumeMin:function(){this.volume(0)},volumeMax:function(){this.volume(100)},volumeBar:function(a){if(this.config.cssId.volumeBar!=undefined){var b=this.config.cssSelector.volumeBar.offset();a=a.pageX-b.left;
b=this.config.cssSelector.volumeBar.width();this.volume(100*a/b)}},volumeBarValue:function(a){this.volumeBar(a)},jPlayerVolume:function(a){if(this.config.cssId.volumeBarValue!=null){this.config.cssSelector.volumeBarValue.width(a+"%");this._forceUpdate()}},onSoundComplete:function(a){if(c.isFunction(a))this.onSoundCompleteCustom=a;else this._warning("onSoundComplete parameter is not a function.")},onSoundCompleteCustom:function(){},jPlayerOnSoundComplete:function(){this.element.trigger("jPlayer.setButtons",
false);this.onSoundCompleteCustom()},getData:function(a){for(var b=a.split("."),e=this.config,d=0;d<b.length;d++)if(e[b[d]]!=undefined)e=e[b[d]];else{this._warning("Undefined data requested.\n\njPlayer('getData', '"+a+"')");return}return e},_getMovie:function(){return document[this.config.fid]},_checkForFlash:function(a){var b=false,e;if(window.ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+a);b=true}catch(d){}else if(navigator.plugins&&navigator.mimeTypes.length>0)if(e=navigator.plugins["Shockwave Flash"])if(navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/,
"$1")>=a)b=true;return b},_forceUpdate:function(){this.config.graphicsFix&&this.config.hSel.text(""+Math.random())},_limitValue:function(a,b,e){return a<b?b:a>e?e:a},_flashError:function(a){this._error("Problem with Flash component.\n\nCheck the swfPath points at the Jplayer.swf path.\n\nswfPath = "+this.config.swfPath+"\nurl: "+this.config.swf+"\n\nError: "+a.message)},_error:function(a){this.config.errorAlerts&&this._alert("Error!\n\n"+a)},_warning:function(a){this.config.warningAlerts&&this._alert("Warning!\n\n"+
a)},_alert:function(a){alert("jPlayer "+this.config.version+" : id='"+this.config.id+"' : "+a)}}})(jQuery);