//var script = document.createElement('script'); script.src = "https://github.com/Ctri-The-Third/NS-Helper/blob/master/NS%20JavaScript.js"; script.onload = function() {alert("Test");}; document.getElementsByTagName('head')[0].appendChild(script);
var scraperRunning;
var scraperInterval;
var scraperOutput;
var scraperOutputText;
var ticketAssignee;
function load()
{
	
	resetScraper();
	scraperOutput = new Array();
	scraperOutputText = "";
	scraperStartTarget = "https://system.na2.netsuite.com/app/center/card.nl?sc=-17&whence="
	ticketAssignee = "";
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
	console.log("scraper state:"+scraperRunning);
	
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
			console.log("Calling for scraper shutdown");
			
			console.log(scraperOutputText)
			
			//scraperDownload(scraperOutputText, "Ticket.csv", "text");
		}
	}
}

function pageLoadCompleteHandler(outputLength)
{
	var result = false;
	var max = parseInt(document.getElementById("totallinkneg706").innerHTML);
	if ( (scraperOutput.length * 2) < (max*2 ))
	{
		result = true;
		console.log("Found target of " + max+ " versus length of " +  scraperOutput.length + ". Needs more! returning " + result);
	}
	else
	{
		result = false;
		console.log("Found target of " + max+ " versus length of " +  scraperOutput.length + ", Enough/ too many! returning " + result);
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
		for ( y= 0; y < targetTableColsCount; y++)
		{
			outputColumn.push(targetTable.rows[x].cells[y].innerText);
			//scraperOutputText += "("+x+")("+y+")";
			//console.log("("+x+")("+y+")");
			var localtext = targetTable.rows[x].cells[y].innerText;
			localtext = localtext.replace("Â", " ");
			scraperOutputText += localtext + "\t";
			
		}
		outputColumn.push(targetTable.rows[x],ticketAssignee);
		scraperOutputText += ticketAssignee + "\t";
		
		scraperOutputText += "\n";
		scraperOutput.push(outputColumn);
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

load();
console.log("Successful load of NS JavaScript.");
loadUI();

setTimeout(function(){parseAllPages()},scraperInterval*2);	


//parseAllPages();

