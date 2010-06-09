function webos_notification(title, msg, delay)
{
	$.jGrowl(msg,{header:title,life:delay});
}
