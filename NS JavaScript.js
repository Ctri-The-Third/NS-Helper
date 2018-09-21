//var script = document.createElement('script'); script.src = "https://github.com/Ctri-The-Third/NS-Helper/blob/master/NS%20JavaScript.js"; script.onload = function() {alert("Test");}; document.getElementsByTagName('head')[0].appendChild(script);

function testFunction()
{
	alert("Loaded");
	
	//loop
	var targetTable = document.getElementById("neg706__tab");
	
	var targetTableRowsCount = targetTable.rows.length;
	var targetTableColsCount = targetTable.rows[1].cells.length;
	var output = new Array();
		
	var outputtext = ""; 
	for (x = 1; x<=targetTableRowsCount; x++) 
	{
		var outputColumn = new Array();
		for ( y= 0; y < targetTableColsCount; y++)
		{
			outputtext += targetTable.rows[x].cells[y].innerText + ","
			outputColumn.push(targetTable.rows[x].cells[y].innerText);
		}
		outputtext += "\n";
		output.push(outputColumn);

	}

	//NS.UI.Helpers.uir_paginationSelectHelper.onPaginationNext(NS.jQuery(document.getElementsByClassName("uir-pagination-select-wrapper"))); 
}

testFunction();