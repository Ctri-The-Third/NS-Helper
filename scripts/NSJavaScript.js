//var script = document.createElement('script'); script.src = "https://github.com/Ctri-The-Third/NS-Helper/blob/master/NS%20JavaScript.js"; script.onload = function() {alert("Test");}; document.getElementsByTagName('head')[0].appendChild(script);
var scraperRunning;
var scraperInterval;
var outputObject;
var scraperOutputText;
var ticketAssignee;
var scraperColumns;
var dbg = false;
var extensionID;
console.log("NSJavaScript.js successfully injected");
function load()
{
	
	outputObject = createOutputObject();
	
	var JSONElement = document.getElementById("NSCHUIJson");
	if (JSONElement != undefined)
	{
		console.log("Trying to parse JSON into legit object");
		outputObject.values = JSON.parse(JSONElement.value);
	}
	else {console.log("JSON load failed, couldn't find element");}
	resetScraper();
	extensionID = "occmhpdkmpdgabnmdjnjhnifmdimeeoo"; //TODO - inject this from the plugin, make it self aware.
	scraperOutputText = "";
	scraperStartTarget = "https://system.na2.netsuite.com/app/center/card.nl?sc=-17&whence="
	ticketAssignee = "";
	scraperColumns = new Array();
	
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
}

function resetScraper()
{
	scraperInterval = 1000;	
	scraperRunning = "Start";
}

function parseAllPages() //main
{
	console.log("scraper state:"+scraperRunning +", number of captured tickets = " + outputObject.values.length);
	
	if (scraperRunning == "Start") //first run, set to page 0 and begin.
	{
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
			scraperRunning = "Active";
			setTimeout(function(){parseAllPages()},scraperInterval);	
		}
		else
		{
			scraperRunning = "Complete";
			console.log("Calling for scraper shutdown number of values = " + outputObject.values.length);
			
			outputObject.fSortByTriage();
			console.log("Completed sort, number of values = " + outputObject.values.length);
			
			populateUI();
			
			
			var myJsonString = JSON.stringify(outputObject.values);
			//console.log(myJsonString);
			//scraperDownload(scraperOutputText, "Ticket.csv", "text");
			
		}
	}
}

function pageLoadCompleteHandler(outputLength)
{
	var result = false;
	var max = parseInt(document.getElementById("totallinkneg706").innerHTML);
	if ( (outputObject.values.length * 2) < (max*2 ))
	{
		result = true;
		console.log("Found target of " + max+ " versus length of " +  outputObject.values.length + ". Needs more! returning " + result);
		updateProgressBar((outputObject.values.length/max)*100,"#884");
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
		
		var outputColumn = new Array();
		//(systemID, ticketID, ticketSubject, ticketStatus, ticketAssignee, ticketPriority, ticketLastUpd, ticketCusID, ticketOneLiner, triagevalue)
		
		var linkRegex = /supportcase.nl\?id=[1-9]+/g;
		var linkRegex2 = /[1-9]+/g
		

		var systemLink = targetTable.rows[x].cells[2].innerHTML;	
		systemLink = linkRegex.exec(systemLink);
		systemLink = linkRegex2.exec (systemLink);
			
		outputObject.fAdd(
		systemLink, //systemID
		targetTable.rows[x].cells[2].innerText, //ticketID
		targetTable.rows[x].cells[4].innerText, //ticketSubject = 
		
		targetTable.rows[x].cells[6].innerText, //ticketStatus =
		ticketAssignee,
		targetTable.rows[x].cells[5].innerText, //ticketPriority =
		"1900-01-01 00:01",
		"0","", 999);
		
		
		
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

function ajaxrequest(path,target)
{
  var appendix = Math.random();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById(target).innerHTML = this.responseText;
    }
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
	
	
	ajaxrequest(document.getElementById("NSCH blob URL").value,NSCHUIdiv.id);
	
	
}


function UpdateDate(SystemID)
{
	outputObject.fUpdateDate(SystemID);
	outputObject.fSortByTriage();
	populateUI();
	save();
}

function save()
{
	console.log("DBG: entered save");
	var data= JSON.stringify(outputObject.values);
	document.getElementById("NSCHUISaveValue").value = data;
	
	

// updated: this works with Chrome 30:
	var evt=document.createEvent("NSCHUI_save");
evt.initCustomEvent("NSCHUI_save", true, true, data);
document.dispatchEvent(evt);


	
}
load();
console.log("Successful load of NS JavaScript.");
loadUI();

setTimeout(function(){updateProgressBar(1,"#884")},scraperInterval);
setTimeout(function(){parseAllPages()},scraperInterval*2);	



//parseAllPages();

