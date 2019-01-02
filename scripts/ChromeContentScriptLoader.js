var s = document.createElement('script');
console.log("successful hit on the ChromeContentScriptLoader.js");

//REMEMBER add "script.js" to web_accessible_resources in manifest.json


/*chrome.runtime.sendMessage("PluginID", {action:"save",saveObject: JSONstring },
	function(response) {
		if (!response.success)
		{ 
			//handle error 
		}	
	
	}); //*/







s.src = chrome.runtime.getURL('scripts/jquery-3.3.1.js');
s.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(s);



s = document.createElement('script');
s.src = chrome.runtime.getURL('scripts/NSTicketObjectClass.js');
s.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(s);


s = document.createElement('script');
s.src = chrome.runtime.getURL('scripts/NSJavaScript.js');
s.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(s);


// <LINK href="special.css" rel="stylesheet" type="text/css">
s = document.createElement('link');
s.href = chrome.runtime.getURL('CSS/NSCHUI.css');
s.rel = "stylesheet";
s.type = 'text/CSS';
document.getElementsByTagName('head')[0].appendChild(s);



s = document.createElement('script');
s.src = chrome.runtime.getURL('scripts/NSUIBuilder.js');
s.type = 'text/javascript'; 
document.getElementsByTagName('head')[0].appendChild(s);




s = document.createElement('input');
s.type = "hidden";
s.value = chrome.runtime.getURL('NSCHUI.html');
s.id = "NSCH blob URL";
document.getElementsByTagName('body')[0].appendChild(s);


s = document.createElement('input');
s.type = "hidden";
s.value = ""
s.id = "NSCHUISaveValue";
document.getElementsByTagName('body')[0].appendChild(s);


	chrome.storage.local.get(['NSCHJson'], function(result) {
		console.log("We have fetched JSON. Success unknown.");
		console.log(result.NSCHUIJson);
          document.getElementById("NSCHUISaveValue").value = result.NSCHJson;
        });

document.getElementById("ns-dashboard-heading-panel").innerHTML="<h1 style = 'color:#afa;'>Cases</h1>"
/*$.ajax({url: "NS UI blob.html", 
success: function(result){
	//var html = $(".dashboard-column-2").html();
	$(".dashboard-column-2").html(result);
}}); //*/





function chromeSave()
{
	value = document.getElementById("NSCHUISaveValue");
	if ( value != undefined){
	chrome.storage.local.set({NSCHUIJson : document.getElementById("NSCHUISaveValue").value });
	console.log("We are trying to extract and save to storage");
	}
	else
	{
		console.log("Couldn't get a lock on NSCHUISaveValue, possibly not loaded yet");
	}
}