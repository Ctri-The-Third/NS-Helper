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
	htmlString += '<td valign="top" class="portlettextctr" nowrap="" style="">'
	htmlString += 	'<a class="dottedlink" href="/app/crm/support/supportcase.nl?id='+AbsID+'">View</a>'
	htmlString += '</td> \n';

	//ID
	htmlString += '<td valign="top" class="portlettext" nowrap="" style="">'
	htmlString += 	'<a href="/app/crm/support/supportcase.nl?id="'+AbsID+'" id="qsTarget_'+rowID+'" onmouseover="var win = (typeof parent.getExtTooltip != \'undefined\' &amp;&amp; parent.getExtTooltip) ? parent : window;  if (typeof win.getExtTooltip != \'undefined\')var tip = win.getExtTooltip(\'qsTarget_'+rowID+'\', \'SUPPORTCASE\', \'TWO_COLUMN_TEMPLATE\', '+rowID+',null);if(tip != undefined) tip.onTargetOver(event);">'+TicketID+'</a>'
	htmlString += '</td> \n';

	//subject
	htmlString += '<td valign="top" class="xxportlettext" style=""><a style="visibility:hidden" id="scrollid'+AbsID+'"></a><span id="lstinlnNSXX_0_0" class="listEditSpan uir-hoverable-anchor" rec_key="'+AbsID+'" onmouseover=\'var win = (typeof parent.getExtTooltip != "undefined" &amp;&amp; parent.getExtTooltip) ? parent : window;  if (typeof win.getExtTooltip != "undefined")var tip = win.getExtTooltip("lstinlnNSXX_0_0", "SUPPORTCASE", "TWO_COLUMN_TEMPLATE", '+AbsID+',null);if(tip != undefined) tip.onTargetOver(event);\'>'+Subject+'</span></td>';

	//priority
	htmlString += '<td valign="top" class="xxportlettext" style=""><a style="visibility:hidden" id="scrollid'+AbsID+'"></a><span id="lstinlnNSXX_0_1" class="listEditSpan" ntv_val="2" rec_key="'+AbsID+'">'+Priority+'</span></td>'

	//status
	htmlString += '<td valign="top" class="xxportlettext" style=""><a style="visibility:hidden" id="scrollid'+AbsID+'"></a><span id="lstinlnNSXX_0_2" class="listEditSpan" ntv_val="11" rec_key="'+AbsID+'">'+Status+'</span></td>'

	htmlString += '</tr>';


	return htmlString
}





function populateUI()
{
	
	setTimeout(function ()
	{
		console.log("==========================================\n");
		console.log("number of rows to create = " + outputObject.values.length);
		
		for (x = 0; x <  outputObject.values.length; x++)
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
			document.getElementById("NSCH_table").innerHTML += 
			NSCHcreateRow(""+ outputObject.values[x].systemID, outputObject.values[x].ticketID, outputObject.values[x].ticketSubject, outputObject.values[x].ticketPriority, outputObject.values[x].ticketStatus, outputObject.values[x].ticketLastUpd, outputObject.values[x].triagevalue, x);
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