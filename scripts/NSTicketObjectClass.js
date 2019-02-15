console.log("Loaded: NSTicketObjectClass.js");
function createOutputObject()
{
	var returnObject =
	{
		gameObject : {
			silvers : 0,
			golds : 0	
		},
		values : [/*{
		systemID : "0",
		ticketID : "Ticket0",
		ticketSubject : "Empty population",
		ticketStatus : "Closed Dont Notify",
		ticketAssignee : "Peter Goudie",
		ticketPriority : "Normal",
		ticketLastUpd : "1900-01-01",
		ticketCusID : "54425864",
		ticketOneLiner : "See case notes & messages",
		triagevalue : 999,
		isOpen : false
		}*/],
		fSort : function ()
		{
			//sort all values
		},
		fAdd : function (newSystemID, newTicketID, newTicketSubject, newTicketStatus, newTicketAssignee, newTicketPriority, newTicketLastUpd, newTicketCusID, newTicketOneLiner, newTriagevalue, newIsOpen)
		{
			
			
		
		
			if(this.values == undefined || this.values == [])
			{
					//container object is empty
					
					 this.values = [];
        
    
			}
			
			var found = false;
			var looplength = this.values.length;
			for ( i = 0; i < looplength; i++)
			{
				
				//console.log("testing: " + this.values[i].systemID + " vs " + newSystemID);
				if (this.values[i] != undefined && this.values[i].systemID == ""+ newSystemID)
				{
					
					
					found = true;
					//console.log("Found a dupe, ID = " + this.values[i].systemID + " vs parameter " + newSystemID+", status "+this.values[i].ticketCusID +" vs "+ newTicketCusID);
					
					gameStatuscheck(this.values[i].ticketStatus,newTicketStatus)
					
					//check if old status and new status means ticket is closed
					
					this.values[i].ticketID = newTicketID
					this.values[i].ticketSubject = newTicketSubject
					this.values[i].ticketStatus   = newTicketStatus
					this.values[i].ticketAssignee   = newTicketAssignee
					this.values[i].ticketPriority   = newTicketPriority
					this.values[i].isOpen = newIsOpen
					//this.values[i].ticketLastUpd   = 
					if (newTicketCusID != "")
						this.values[i].ticketCusID   =  newTicketCusID
					//this.values[i].ticketOneLiner   = 
					//this.values[i].triagevalue   = 
					//console.log("DBG: "+newSystemID+" Triaging an existing value, with the date "+ this.values[i].ticketLastUpd) ;
					if(newSystemID == 8065909 || newSystemID == "8065909")
					{	console.log("DBG: Processing the test ticket. Current status = ["+this.values[i].ticketStatus+"], new status = ["+ newTicketStatus+ "], updated string [" + this.values[i].ticketLastUpd+"]"); }
						
					this.values[i].isClosed = checkIsClosed(newTicketStatus, this.values[i].ticketLastUpd);
					this.values[i].triagevalue = this.fTriage(this.values[i].isClosed, newTicketPriority, newTicketStatus,this.values[i].ticketLastUpd)
				}
				
			}
			if (!found)
			{
				
				
					this.values.push({
					systemID : newSystemID,
					ticketID : newTicketID,
					ticketSubject : newTicketSubject,
					ticketStatus : newTicketStatus,
					ticketAssignee : newTicketAssignee,
					ticketPriority : newTicketPriority,
					ticketLastUpd : newTicketLastUpd,
					ticketCusID : newTicketCusID,
					ticketOneLiner : newTicketOneLiner,
					triagevalue : newTriagevalue,
					isClosed : checkIsClosed(newTicketStatus, newTicketLastUpd)
				});
				
				
				
				if (newTriagevalue == 999) //999 is the default untriaged value. It should be -1
				{
					
					//console.log("DBG: Triaging a 999 value");
					this.values[looplength].triagevalue = this.fTriage(this.values[looplength].isClosed, newTicketPriority, newTicketStatus, newTicketLastUpd);
					
				}
				looplength = looplength + 1 
				
			}
			
			
			
	
			//check for dupes and add
		},
		fTriageAll : function ()
		{
			console.log("DBG: Triaging all!")
			for (i = 0; i < this.values.length; i++)
			{
				
				var oldvalue = this.values[i].triagevalue ;
				var newvalue = this.fTriage(this.values[i].isClosed, this.values[i].ticketPriority, this.values[i].ticketStatus, this.values[i].ticketLastUpd);
				//console.log("Traiging " +this.values[i].ticketID+ ", old var = " + oldvalue + ", and new var = " + newvalue);	
				this.values[i].triagevalue = newvalue;
			}
		},
		fTriageById : function (systemID)
		{
			
			for (i = 0; i < this.values.length; i++)
			{
				if (this.values[i].systemID == systemID)
				{
					
					this.values[i].triagevalue = this.fTriage(this.values[i].isClosed, this.values[i].ticketPriority, this.values[i].ticketStatus,this.values[i].ticketLastUpd);
				}
			}
			//set the triage value based on the parameters
		},
		fTriage : function (tIsClosed, tPriority, tStatus, tDate)
		{
			//console.log("Attempting to triage, priority & status & date = ["+tPriority+"],["+tStatus+"],["+tDate+"]");

			var returnValue = 0;
			var searchstring = tStatus + "ф" + tPriority;
			
			searchstring = searchstring.replace(/ /g,'');
			searchstring = searchstring.replace(/	/g,'');
			
			tPriority = tPriority.replace(/ /g,'');
			tPriority = tPriority.replace(/	/g,'');
			var triageTable  = {
			NotStartedфLow : 41,
			NotStartedфNormal : 31,
			NotStartedфHigh : 21,
			NotStartedфUrgent : 11,
			InProgressфLow : 42,
			InProgressфNormal : 32,
			InProgressфHigh : 22,
			InProgressфUrgent : 12,
			WithDevelopmentфLow : 44,
			WithDevelopmentфNormal : 44,
			WithDevelopmentфHigh : 24,
			WithDevelopmentфUrgent : 14,
			PendingResponseфLow : 43,
			PendingResponseфNormal : 33,
			PendingResponseфHigh : 23,
			PendingResponseфUrgent : 13,
			ResolvedфLow : 45,
			ResolvedфNormal : 35,
			ResolvedфHigh : 25,
			ResolvedфUrgent : 15,
			DuplicateCaseфLow : 59,
			DuplicateCaseфNormal : 59,
			DuplicateCaseфHigh : 59,
			DuplicateCaseфUrgent : 59,
			EscalatedфLow : 42,
			EscalatedфNormal : 32,
			EscalatedфHigh : 22,
			EscalatedфUrgent : 12,
			ClosedNotifyфLow : 59,
			ClosedNotifyфNormal : 59,
			ClosedNotifyфHigh : 59,
			ClosedNotifyфUrgent : 59};
			
			var updateDueTable = 
			{ Low : 4,
			Normal : 2,
			High : 1,
			Urgent : 1};
			
			var now = new Date();
			var curDate = new Date(tDate);
			//console.log("Parsed the following date: "+curDate + " from " + tDate );
			//console.log("The amount of forwards is: ["+tPriority +"][" +updateDueTable[tPriority] + "]");
			curDate.setDate(curDate.getDate() + updateDueTable[tPriority]);
			//console.log("Parsed the following date: "+curDate + " from " + tDate + "   ");
			if (tStatus == "WithDevelopment")
			{
				curDate = new Date(tDate);
				curDate.setDate(curDate.getDate() + 14);
				/*var dbgstring = "@@"+curDate + ":" + now + ":" ;
				if ( curDate > now) 
					dbgstring += "Curdate is in the future";
				else
					dbgstring += "Curdate is in the past";
				console.log (dbgstring); //*/
			}
			
			
			//console.log( "target date = [" + curDate +"], current time = [" +now+ "]" );
			if (tIsClosed)
			{returnValue = 300;}
		
			else if(curDate > now || triageTable[searchstring] == 59)
			{ returnValue = 200 }
			
			else
			{ returnValue = 100 }
			returnValue += triageTable[searchstring];
			//console.log( "Triage test : " + searchstring  + " | " + parseInt(returnValue));
			
			return parseInt(returnValue);

			
			
		},
		toString : function ()
		{
			return this.toString(",")
			
		},
		toString : function(delimeter,id)
		{
		return "" + this.values.systemID + delimeter 
		+ this.values[i].ticketID + delimeter 
		+ this.values[i].ticketSubject + delimeter
		+ this.values[i].ticketPriority + delimeter 
		+ this.values[i].ticketStatus + delimeter 
		
		+ this.values[i].ticketAssignee + delimeter 
		
		+ this.values[i].ticketLastUpd + delimeter 
		+ this.values[i].ticketCusID + delimeter
		+ this.values[i].ticketOneLiner + delimeter
		+ this.values[i].triagevalue + delimeter
		},
		compareTriageValue : function ( ticketA, ticketB ) 
		{
			
		if (ticketA.triagevalue < ticketB.triagevalue)
			return -1;
		if (ticketA.triagevalue > ticketB.triagevalue)
			return 1;
		if (ticketA.ticketLastUpd < ticketB.ticketLastUpd) 
			return -1; 
		if (ticketA.ticketLastUpd > ticketB.ticketLastUpd) 
			return 1;
		if (ticketA.ticketID < ticketB.ticketID)
			return -1;
		if (ticketA.ticketID > ticketB.ticketID)
			return 1;
		return 0;
		},
		fSortByTriage : function ()
		{
			this.values.sort(this.compareTriageValue)
		},
		fUpdateDate : function  (systemID)
		{
			var i = 0;
			var found = false;
			for (i = 0; i < this.values.length; i++)
			{
				if (this.values[i].systemID + "" == systemID + "")
				{
					
					var date = new Date();
					
					var dateString = date.getUTCFullYear() + "-" +
					("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
					("0" + date.getUTCDate()).slice(-2) + " " +
					("0" + date.getUTCHours()).slice(-2) + ":" +
					("0" + date.getUTCMinutes()).slice(-2);
					
					this.values[i].ticketLastUpd =  dateString;
					this.fTriageById(systemID);
					
					console.log("Found "+this.values[i].systemID+", updated date to" + this.values[i].ticketLastUpd);
					
				}
				
					
			}

		
		},
		fDelete : function (systemID)
		{
			var i = 0;
			var found = false;
			var foundID = 0;
			for (i = 0; i < this.values.length; i++)
			{
				if (this.values[i].systemID + "" == systemID + "")
				{
					foundID = i;
				}
			}
			this.values.splice(foundID,1);
			
		},
		fForceClose : function (systemID)
		{
			var i = 0;
			var found = false;
			var foundID = 0;
			for (i = 0; i < this.values.length; i++)
			{
				if (this.values[i].systemID + "" == systemID + "")
				{
					foundID = i;
				}
			}
			this.values[foundID].isClosed = true;
			this.values[foundID].ticketLastUpd = "1900-01-01";
			
		}
			
			
		
			
		
		
		
		
		
	}

	this.values = new Array();
	return returnObject;
		
	
		
		
	//returns an empty output object.
	
	//required functions?
	//Sort()
	//getNext (for the sort)
	//
	
	
	
}

function checkIsClosed(ticketstatus, closeddatetext)
{
	var output = false;
	var closedDate = new Date (closeddatetext);
	var today = new Date()
	var priorDate = new Date(today.getDate()-30)

	
	if (ticketstatus == "Closed Notify" || ticketstatus == "Resolved" || ticketstatus == "Duplicate Case")
	{
		//console.log("DBG: Closed date = ["+closedDate+"], prior date ["+priorDate+"], result ("+(closedDate < priorDate)+")");
		if (closedDate < priorDate)
			output = true;
	}
	
	
	return output;
}

function gameStatuscheck(old, newvar)
{
	
	if (newvar == "Resolved" || newvar == "ClosedNotify" || newvar == "Closed Notify")
	{
		if (old != "Resolved" && old != "ClosedNotify" && old !=  "Closed Notify")
		{
			outputObject.gameObject.golds ++;
			console.log("Successfully closed a ticket, added a gold! ["+old+","+newvar+"]");
			
		}
	
	}
}


