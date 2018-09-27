var s = document.createElement('script');
console.log("successful hit on the ChromeContentScriptLoader.js");

//REMEMBER add "script.js" to web_accessible_resources in manifest.json

s.src = chrome.extension.getURL('scripts/jquery-3.3.1.js');
s.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(s);


s = document.createElement('script');
s.src = chrome.extension.getURL('scripts/NSJavaScript.js');
s.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(s);


s = document.createElement('script');
s.src = chrome.extension.getURL('scripts/NSUIBuilder.js');
s.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(s);

s = document.createElement('script');
s.src = chrome.extension.getURL('scripts/NSTicketObjectClass.js');
s.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(s);



s = document.createElement('input');
s.type = "hidden";
s.value = chrome.extension.getURL('NSCHUI.html');
s.id = "NSCH blob URL";
document.getElementsByTagName('body')[0].appendChild(s);



document.getElementById("ns-dashboard-heading-panel").innerHTML="<h1 style = 'color:#afa;'>Cases</h1>"
/*$.ajax({url: "NS UI blob.html", 
success: function(result){
	//var html = $(".dashboard-column-2").html();
	$(".dashboard-column-2").html(result);
}}); //*/