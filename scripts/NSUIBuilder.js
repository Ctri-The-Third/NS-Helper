function NSCHcreateRow(AbsID, TicketID, Subject, Priority, Status, lastUpdated, UrgencyValue, rowID)
{

	var isOdd = false;
	if (rowID % 2 == 0)
	{
		isOdd = false;
	}
	else
	{
		isOdd = true;
	}
		
	var htmlString = "";

	if (isOdd)
	{
		htmlString += '<tr class="uir-list-row-tr uir-list-row-odd" id=NSCH_row"'+rowID+'">\n';
	}
	else
	{
		htmlString += '<tr class="uir-list-row-tr uir-list-row-even" id=NSCH_row"'+rowID+'">\n';
	}


	//Link
	htmlString += '<td valign="top" class="portlettextctr" nowrap="" style="">';
	htmlString +=   '[<a class="dottedlink" onclick="DeleteFromCache('+AbsID+')">X</a>]  -  ';
	htmlString += 	'<a class="dottedlink" onclick="window.open(\'/app/crm/support/supportcase.nl?id='+AbsID+'\')">View</a>  -  ';
	htmlString +=   '<a class="dottedlink" onclick="window.open(\'/app/crm/common/crmmessagehistory.nl?fkcol=kEvent&id='+AbsID+'\')">Message history</a>'
	htmlString += '</td> \n';

	//ID
	htmlString += '<td valign="top" class="portlettext" nowrap="" style="">';
	htmlString += 	TicketID;
	htmlString += '</td> \n';

	//subject
	htmlString += '<td valign="top" class="xxportlettext" style=""><a style="visibility:hidden" id="scrollid'+AbsID+'"></a><span id="lstinlnNSXX_0_0" class="listEditSpan uir-hoverable-anchor" rec_key="'+AbsID+'" onmouseover=\'var win = (typeof parent.getExtTooltip != "undefined" &amp;&amp; parent.getExtTooltip) ? parent : window;  if (typeof win.getExtTooltip != "undefined")var tip = win.getExtTooltip("lstinlnNSXX_0_0", "SUPPORTCASE", "TWO_COLUMN_TEMPLATE", '+AbsID+',null);if(tip != undefined) tip.onTargetOver(event);\'>'+Subject+'</span></td>';

	//priority
	htmlString += '<td valign="top" class="xxportlettext" style=""><a style="visibility:hidden" id="scrollid'+AbsID+'"></a><span id="lstinlnNSXX_0_1" class="listEditSpan" ntv_val="2" rec_key="'+AbsID+'">'+Priority+'</span></td>';

	//last updated
	htmlString += '<td valign="top" class="xxportlettext" style="">'+Status+ " <sup>(" +UrgencyValue+')</sup></td>';
	//status
	//console.log("@@ trying to parse date from " + lastUpdated);
	var date = new Date(lastUpdated);
	var dateString = date.getUTCFullYear() + "-" +
    ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
    ("0" + date.getUTCDate()).slice(-2) + " " +
    ("0" + date.getUTCHours()).slice(-2) + ":" +
    ("0" + date.getUTCMinutes()).slice(-2);
    
	htmlString += '<td valign="top" class="xxportlettext" style=""><a onclick = "UpdateDate('+AbsID+')">'+dateString+'</a></td>';
	
	htmlString += '</tr>';


	return htmlString
}





function populateUI()
{
	
	setTimeout(function ()
	{
		document.getElementById("NSCH_table").innerHTML = "";
		console.log("==========================================\n");
		console.log("number of rows to create = " + outputObject.values.length);
		var counter = 0;
		for (x = 0; x <  outputObject.values.length && x < 50; x++)
		{
			var string = "";
			//console.log(x + " | " + outputObject.length + " | @@ " + outputObject.toString());
			
			/*
			systemID : "",
			ticketID : "",
			ticketSubject : "",
			ticketStatus : "",
			ticketAssignee : "",
			ticketPriority : "",
			ticketLastUpd : "1900-01-01",
			ticketCusID : "54425864",
			ticketOneLiner : "See case notes & messages",
			triagevalue : 999
		}
			*/
			//NSCHcreateRow(AbsID, TicketID, Subject, Priority, Status, lastUpdated, UrgencyValue, rowID)
			
			if (outputObject.values[x].ticketStatus == "Closed Dont Notify")
			{
				counter ++;
			}
			if (counter <= 20)
			{
			document.getElementById("NSCH_table").innerHTML += 
			NSCHcreateRow(""+ outputObject.values[x].systemID, outputObject.values[x].ticketID, outputObject.values[x].ticketSubject, outputObject.values[x].ticketPriority, outputObject.values[x].ticketStatus, outputObject.values[x].ticketLastUpd, outputObject.values[x].triagevalue, x);
			}
		}
		console.log("==========================================\n");
		updateProgressBar(100,"green");
	},scraperInterval);
}

function updateProgressBar(percent,colour)
{
	var target = 	document.getElementById("NSCHUI_loading_bar");
	target.style.width = percent+"%"
	target.style.backgroundColor = colour;
}