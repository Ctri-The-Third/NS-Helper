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
		for (x = 0; x < scraperOutput.length; x++)
		{
			var string = "";
			console.log(x + " | " + scraperOutput.length + " | @@ " + scraperOutput[x]);
			document.getElementById("NSCH_table").innerHTML += NSCHcreateRow(""+ (x*2), scraperOutput[x][0], "Fake subject"+x, "Normal", "In Progress", "2018-09-27", 100, x);
		}
		console.log("==========================================\n");
	},scraperInterval);
}