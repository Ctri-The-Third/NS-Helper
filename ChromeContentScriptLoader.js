var s = document.createElement('script');
console.log("successful hit on the ChromeContentScriptLoader.js");

// REMEMBER add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('NSJavaScript.js');
document.getElementById("ns-dashboard-heading-panel").innerHTML="<h1 style = 'color:#aea;'>Cases</h1>"
document.head.appendChild(s);