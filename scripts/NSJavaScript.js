//var script = document.createElement('script'); script.src = "https://github.com/Ctri-The-Third/NS-Helper/blob/master/NS%20JavaScript.js"; script.onload = function() {alert("Test");}; document.getElementsByTagName('head')[0].appendChild(script);
var scraperRunning;
var scraperInterval;
var outputObject;
var scraperOutputText;
var ticketAssignee;
var scraperColumns;
var scraperPosition;
var dbg = false;
var extensionID;
var perPage;
console.log("NSJavaScript.js successfully injected");
function load()
{
	
	outputObject = createOutputObject();
	
	var JSONElement = document.getElementById("NSCHUISaveValue");
	if (JSONElement != undefined)
	{
		console.log("Trying to parse JSON into legit object");
		console.log(JSONElement.value);
		try
		{
			outputObject.values = JSON.parse(JSONElement.value);
			outputObject.fSortByTriage();
		}
		catch (e)
		{
			console.log(e.message);
		}
	}
	var JSONElement = document.getElementById("NSCHUIGameSaveValue");
	
	if (JSONElement != undefined)
	{
		console.log("Trying to parse JSON into legit object");
		console.log(JSONElement.value);
		try
		{
			outputObject.gameobject = JSON.parse(JSONElement.value);
			outputObject.fSortByTriage();
		}
		catch (e)
		{
			console.log(e.message);
		}
	}
	else {console.log("JSON load failed, couldn't find element");}
	resetScraper();
	extensionID = "occmhpdkmpdgabnmdjnjhnifmdimeeoo"; //TODO - inject this from the plugin, make it self aware.
	scraperOutputText = "";
	scraperStartTarget = "https://system.na2.netsuite.com/app/center/card.nl?sc=-17&whence="
	ticketAssignee = "";
	scraperColumns = new Array();
	perPage = 20;
	


	
	//TODO: De manualify this.
	scraperColumns[0] = "New";
	scraperColumns[1] = "Edit | View";
	scraperColumns[2] = "Number"
	scraperColumns[3] = "Grab"
	scraperColumns[4] = "Subject"
	scraperColumns[5] = "Priority"
	scraperColumns[6] = "Status"
	scraperColumns[7] = "Product"
	scraperColumns[8] = "Module"
	scraperColumns[9] = "Abacus Type";
	
	for( i = 1; i <= 100; i++)
	{
		
		try{
		
		ticketAssignee = document.getElementById("inpt_Case_ASSIGNED"+i).value;
		if (ticketAssignee != "")
		{ i = 101;}
			console.log("Found! inpt_Case_ASSIGNED"+i);
		}
		catch(e)
		{
			
		}
	}
	outputObject.gameObject.golds ++;
	outputObject.gameObject.silvers ++;
}

function resetScraper()
{
	scraperInterval = 2000;	
	scraperRunning = "Start";
	scraperPosition = 0;
}

function parseAllPages() //main
{
	console.log("scraper state:"+scraperRunning +", number of captured tickets = " + outputObject.values.length + ", and current position is " + scraperPosition);
	
	if (scraperRunning == "Start") //first run, set to page 0 and begin.
	{
		scraperPosition += perPage;
		NS.UI.Helpers.uir_paginationSelectHelper.onPaginationChange(NS.jQuery(document.getElementsByClassName("uir-pagination-select-wrapper")), 0);
		setTimeout(function(){scraperRunning="Active";parseAllPages()},scraperInterval);	
	}
	if (scraperRunning == "Active")
	{
		parsePage();
		//next page
		NS.UI.Helpers.uir_paginationSelectHelper.onPaginationNext(NS.jQuery(document.getElementsByClassName("uir-pagination-select-wrapper"))); 
		
		if (pageLoadCompleteHandler() == true)
		{
			scraperPosition += perPage;	
			scraperRunning = "Active";
			setTimeout(function(){parseAllPages()},scraperInterval);	
		}
		else
		{
			scraperRunning = "Complete";
			console.log("Calling for scraper shutdown number of values = " + outputObject.values.length + "position = " + scraperPosition);
			
			outputObject.fSortByTriage();
			console.log("Completed sort, number of values = " + outputObject.values.length);
			
			populateUI();
			
			
			var myJsonString = JSON.stringify(outputObject.values);
			//console.log(myJsonString);
			//scraperDownload(scraperOutputText, "Ticket.csv", "text");
			
		}
	}
}

function pageLoadCompleteHandler()
{
	var result = false;
	var max = parseInt(document.getElementById("totallinkneg706").innerHTML);
	if ( (scraperPosition * 2) < (max*2 ))
	{
		result = true;
		console.log("Found target of " + max+ " versus length of " +  outputObject.values.length + ". Needs more! returning " + result);
		updateProgressBar((scraperPosition/max)*100,"#884");
	}
	else
	{
		result = false;
		console.log("Found target of " + max+ " versus length of " +  outputObject.values.length + ", Enough/ too many! returning " + result);
		updateProgressBar(100,"884");
	}
	
	return result;
}

function parsePage()
{
	var targetTable = document.getElementById("neg706__tab");
	
	var targetTableRowsCount = targetTable.rows.length;
	var targetTableColsCount = targetTable.rows[1].cells.length;
		
	
	//header rows	
	
	//body
	
	for (x = 1; x < targetTableRowsCount -1; x++) 
	{
		//console.log("-----");
		var outputColumn = new Array();
		//(systemID, ticketID, ticketSubject, ticketStatus, ticketAssignee, ticketPriority, ticketLastUpd, ticketCusID, ticketOneLiner, triagevalue)
		
		var linkRegex = /supportcase.nl\?id=[0-9]+/g;
		var linkRegex2 = /[0-9]+/g;
		var linkHasEditRegex = /(&amp;e=T)/;
		
	
		var systemLink = targetTable.rows[x].cells[2].innerHTML;	
		var isOpen = linkHasEditRegex.exec(targetTable.rows[x].cells[1].innerHTML);
		isOpen = !!isOpen;
		
		//console.log("Stripping stage 0: " + systemLink);
		systemLink = linkRegex.exec(systemLink);
		//console.log("Stripping stage 1: " + systemLink);
		systemLink = linkRegex2.exec (systemLink);
		//console.log("Stripping stage 2: " + systemLink);
			
		outputObject.fAdd(
		systemLink, //systemID
		targetTable.rows[x].cells[2].innerText, //ticketID
		targetTable.rows[x].cells[4].innerText, //ticketSubject = 
		
		targetTable.rows[x].cells[6].innerText, //ticketStatus =
		ticketAssignee,
		targetTable.rows[x].cells[5].innerText, //ticketPriority =
		"1900-01-01 00:01",
		"0","", 999, isOpen);
		
		
		console.log("DBG Ticket ID " + targetTable.rows[x].cells[2].innerText + " returned " + isOpen);
		//console.log(targetTable.rows[x].cells[1].innerHTML);
		outputColumn.push(targetTable.rows[x],ticketAssignee);
		//scraperOutputText += ticketAssignee + "\t";
		
		scraperOutputText += "\n";
		
	}
	//console.log(scraperOutputText);
}

function scraperDownload(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function ajaxrequest(path,target,onsuccess)
{
  var appendix = Math.random();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById(target).innerHTML = this.responseText;
    }
	onsuccess();
  };
  xhttp.open("GET", path+"?"+appendix, true);
  xhttp.send();

}


function loadUI()
{
	//
	
	var NSCHUIdiv= document.createElement("div")
	NSCHUIdiv.class = "ns-portlet-wrapper ns-portlet-window-state-normal";
	NSCHUIdiv.id = "NSCHUI"
	
	var target = document.getElementById("dashboard-column-2")
	
	target.insertBefore(NSCHUIdiv, target.firstChild);
	
	
	ajaxrequest(document.getElementById("NSCH blob URL").value,NSCHUIdiv.id,function(){populateUI();});
	
	
}


function UpdateDate(SystemID)
{
	outputObject.fUpdateDate(SystemID);
	outputObject.fSortByTriage();
	populateUI();
	save();
}

function DeleteFromCache(SystemID)
{
	outputObject.fDelete(SystemID)
	outputObject.fSortByTriage();
	populateUI();
	save();
}



function purgeCache()
{
	outputObject.values = [];
	populateUI();
chrome.runtime.sendMessage(extensionID, {values: ""},
  function(response) {
    if (!response.success)
      handleError(url);
  });
}

function save()
{
	var DBGSaveValues = {values : outputObject.values,gameobject: outputObject.gameobject};
	
chrome.runtime.sendMessage(extensionID, {values: outputObject.values,gameobject: outputObject.gameobject},
  function(response) {
    if (!response.success)
      handleError(url);
  });

}

function triageAll()
{
	outputObject.fTriageAll();
	populateUI();
}
load();
console.log("Successful load of NS JavaScript.");
loadUI();

setTimeout(function(){updateProgressBar(1,"#884")},scraperInterval);
setTimeout(function(){parseAllPages()},scraperInterval*2);	




//parseAllPages();

