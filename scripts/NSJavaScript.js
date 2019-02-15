console.log("Loaded: NSJavaScript.js");
//var script = document.createElement('script'); script.src = "https://github.com/Ctri-The-Third/NS-Helper/blob/master/NS%20JavaScript.js"; script.onload = function() {alert("Test");}; document.getElementsByTagName('head')[0].appendChild(script);
var scraperRunning;

var outputObject;
var scraperOutputText;
var ticketAssignee;

var scraperPosition;
var dbg = false;
var extensionID;
var perPage;

function loadFromChrome()
{
	
	outputObject = createOutputObject();
	
	var JSONElement = document.getElementById("NSCHUISaveValue");
	if (JSONElement != undefined)
	{
		console.log("Trying to parse JSON into legit object");
		//console.log(JSONElement.value);
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
		console.log("Trying to parse Game JSON into legit object");
		console.log(JSONElement.value);
		try
		{
			outputObject.gameObject = JSON.parse(JSONElement.value);
			
			console.log("Success, we have ["+outputObject.gameObject.golds+"] golds, and ["+outputObject.gameObject.silvers+"] silvers");
		}
		catch (e)
		{
			outputObject.gameObject = {silvers : 0, golds: 0};
			console.log(e.message);
		}
	}
	else {console.log("JSON load failed, couldn't find element");}
	resetScraper();
	extensionID = "occmhpdkmpdgabnmdjnjhnifmdimeeoo"; //TODO - inject this from the plugin, make it self aware.
	scraperOutputText = "";
	scraperStartTarget = "https://system.na2.netsuite.com/app/center/card.nl?sc=-17&whence="
	ticketAssignee = "";
	
	perPage = 20;
	



	
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

}

function resetScraper()
{
	settings.scraperInterval = 2000;	
	scraperRunning = "Start";
	scraperPosition = 0;
}

function parseAllPages() //main
{
	//console.log("scraper state:"+scraperRunning +", number of captured tickets = " + outputObject.values.length + ", and current position is " + scraperPosition);
	
	if (scraperRunning == "Start") //first run, set to page 0 and begin.
	{
		scraperPosition += perPage;
		NS.UI.Helpers.uir_paginationSelectHelper.onPaginationChange(NS.jQuery(document.getElementsByClassName("uir-pagination-select-wrapper")), 0);
		setTimeout(function(){scraperRunning="Active";parseAllPages()},settings.scraperInterval);	
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
			setTimeout(function(){parseAllPages()},settings.scraperInterval);	
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
		//console.log("Found target of " + max+ " versus length of " +  outputObject.values.length + ". Needs more! returning " + result);
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
	var targetTable = document.getElementById(strings.scraperTableTarget);
	
	var targetTableRowsCount = targetTable.rows.length;
	var targetTableColsCount = targetTable.rows[1].cells.length;
		
		//console.log("DBG: targetTable = ["+strings.scraperTableTarget+"], the captured value is = ["+targetTable+"]");
		//console.log("DBG: rows = ["+targetTable.rows.length+"], cols = ["+targetTable.rows[1].cells.length+"]");
	
	//header rows	
	
	//body
	if (targetTable != undefined)
		
	for (x = 1; x < targetTableRowsCount -1; x++) 
	{
		
		
		var outputColumn = new Array();
		//(systemID, ticketID, ticketSubject, ticketStatus, ticketAssignee, ticketPriority, ticketLastUpd, ticketCusID, ticketOneLiner, triagevalue)
		
		var linkRegex = /supportcase.nl\?id=[0-9]+/g;
		var linkRegex2 = /[0-9]+/g;
		var linkHasEditRegex = /(&amp;e=T)/;
		
		/*
		ScraperColumnEditView : "Edit | View",
		ScraperColumnTicketNumber : "Number",
		ScraperColumnSubject : "Subject",
		SCraperColumnPriority : "Priority",
		ScraperColumnStatus : "Status",
		ScraperColumnCompany : "Company",
		ScarperColumnContact : "Contact",
		ScraperColumnDateCreated : "Date Created",*/
		var isOpen = true;
		var systemLink = "";
		var ticketID = "";
		var ticketSubject = "";
		var ticketStatus = "";
		var ticketAssignee = "";
		var ticketPriority = "";
		var ticketCustomer = "";
		var ticketCreatedDate = "1900-01-01 00:01"
		//check each of the columns in a row
		for (i = 0; i < targetTable.rows[0].cells.length- 1; i++) 
		{
			var ColumnHeader = targetTable.rows[0].cells[i].innerText;
			ColumnHeader = ColumnHeader.replace(/[^| a-z0-9+]+/gi, '');
			//if ( targetTable.rows[x].cells[i].innerText != undefined)
			{
				//ColumnHeader = ColumnHeader.substring(0, ColumnHeader.length - 1);

				
				
					
				//console.log("inner text [" + ColumnHeader + "], test value ["+strings.ScraperColumnCompany+"]");
					
				//If the field displays "Edit | View", then it is editable. If it just says "View", or anything else, it is not editable and is not open.
				if ( ColumnHeader == strings.ScraperColumnEditView && targetTable.rows[x].cells[i].innerHTML != undefined) 
				{
					//console.log(" Found the '"+ColumnHeader +"' column");
					isOpen = linkHasEditRegex.exec(targetTable.rows[x].cells[i].innerHTML);
					isOpen = !!isOpen;
				}
				
				
				//Ticket system ID 
				if ( ColumnHeader == strings.ScraperColumnTicketNumber && targetTable.rows[x].cells[i].innerHTML != undefined )
				{
					//console.log(" Found the '"+ColumnHeader +"' column");
					systemLink = targetTable.rows[x].cells[i].innerHTML;	
					//console.log("Stripping stage 0: " + systemLink);
					systemLink = linkRegex.exec(systemLink);
					//console.log("Stripping stage 1: " + systemLink);
					systemLink = linkRegex2.exec (systemLink);
					//console.log("Stripping stage 2: " + systemLink);
				
				}
				
				//ticket summary / subject
				if (ColumnHeader == strings.ScraperColumnSubject)
				{	
					//console.log(" Found the '"+ColumnHeader +"' column");
					ticketSubject = targetTable.rows[x].cells[i].innerText;	
				}
			
				//ticket priority
				if (ColumnHeader == strings.ScraperColumnPriority)
				{
					//console.log(" Found the '"+ColumnHeader +"' column");
					ticketPriority = targetTable.rows[x].cells[i].innerText; }
			
				if (ColumnHeader == strings.ScraperColumnTicketNumber)
				{	
					//console.log(" Found the '"+ColumnHeader +"' column");
					ticketID = targetTable.rows[x].cells[i].innerText; }
			
				if (ColumnHeader == strings.ScraperColumnStatus)
				{	//console.log(" Found the '"+ColumnHeader +"' column");
					ticketStatus = targetTable.rows[x].cells[i].innerText;
				}
				
				if (ColumnHeader == strings.ScraperColumnDateCreated)	{}
				
				if (ColumnHeader == strings.ScraperColumnCompany)	
				{	
					//console.log(" Found the '"+ColumnHeader +"' column");
					ticketCustomer = targetTable.rows[x].cells[i].innerText; 
				}
			}

		}
		if (systemLink != "")
		{
			//console.log("DBG: Invoking fAdd");
			outputObject.fAdd(systemLink,ticketID,ticketSubject,ticketStatus,ticketAssignee,ticketPriority,ticketCreatedDate,ticketCustomer,"",999,isOpen);
		}
		else{
			console.log("DBG: Failed to add an object due to garbage data");
		}
		
		
		//console.log("DBG Ticket ID " + targetTable.rows[x].cells[2].innerText + " returned " + isOpen);
		//console.log(targetTable.rows[x].cells[1].innerHTML);
		outputColumn.push(targetTable.rows[x],ticketAssignee);
		//scraperOutputText += ticketAssignee + "\t";
		
		scraperOutputText += "\n";
		
	}
	else
	{Console.log("Could not find table to draw info from! Check strings.scraperTableTarget. Current value = ["+strings.scraperTableTarget+"]");}
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


function overrideClose (SystemID)
{
	outputObject.fForceClose(SystemID);
	outputObject.fTriageById(SystemID);
	outputObject.fSortByTriage();
	populateUI();
	save();
	
}

function UpdateDate(SystemID)
{
	console.log("ENTERING, silver = " + outputObject.gameObject.silvers);
	outputObject.gameObject.silvers ++;
	console.log("POST UPDATE, silver = " + outputObject.gameObject.silvers);
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

function saveToChrome()
{
	var DBGSaveValues = {values : outputObject.values,gameobject: outputObject.gameObject};
	console.log(DBGSaveValues);
chrome.runtime.sendMessage(extensionID, {values: outputObject.values,gameobject: outputObject.gameObject},
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

function load()
{
	if (settings.saveToCookie == true)
	{}
	if (settings.saveToChrome == true)
	{ loadFromChrome() }
		
}
function save()
{
	if (settings.saveToCookie == true)
	{}
	if (settings.saveToChrome == true)
	{ saveToChrome() }
}


load();
loadUI();

setTimeout(function(){updateProgressBar(1,"#884")},settings.scraperInterval);
setTimeout(function(){parseAllPages()},settings.scraperInterval*2);	




//parseAllPages();

