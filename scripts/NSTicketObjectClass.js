//NSDataObject
console.log("NSTicketObjectClass.js successfully injected");
function createOutputObject()
{
	var returnObject =
	{
		values : [{
		systemID : "0",
		ticketID : "Ticket0",
		ticketSubject : "Empty population",
		ticketStatus : "Closed Dont Notify",
		ticketAssignee : "Peter Goudie",
		ticketPriority : "Normal",
		ticketLastUpd : "1900-01-01",
		ticketCusID : "54425864",
		ticketOneLiner : "See case notes & messages",
		triagevalue : 999
		}],
		fSort : function ()
		{
			//sort all values
		},
		fAdd : function (newSystemID, newTicketID, newTicketSubject, newTicketStatus, newTicketAssignee, newTicketPriority, newTicketLastUpd, newTicketCusID, newTicketOneLiner, newTriagevalue)
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
					//found = true;
					console.log("Found a dupe, ID = " + this.values[i].systemID + " vs parameter " + newSystemID);
					
					this.values[i].ticketID = newTicketID
					this.values[i].ticketSubject = newTicketSubject
					this.values[i].ticketStatus   = newTicketStatus
					this.values[i].ticketAssignee   = newTicketAssignee
					this.values[i].ticketPriority   = newTicketPriority
					
					//this.values[i].ticketLastUpd   = 
					//this.values[i].ticketCusID   = 
					//this.values[i].ticketOneLiner   = 
					//this.values[i].triagevalue   = 
					
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
					triagevalue : newTriagevalue
				});
				
				
				
				if (newTriagevalue == 999) //999 is the default untriaged value. It should be -1
				{
					
					this.values[looplength].triagevalue = this.fTriage(newTicketPriority, newTicketStatus);
					
				}
				looplength = looplength + 1 
				
			}
	
			//check for dupes and add
		},
		fTriage : function (systemID)
		{
			
			for (i = 0; i < this.values.length; i++)
			{
				if (this.values[i].systemID == systemID)
				{
					values[i].triagevalue = fTriage(values[i].ticketPriority, values[i].ticketStatus);
				}
			}
			//set the triage value based on the parameters
		},
		fTriage : function (tPriority, tStatus)
		{
			var searchstring = tStatus + "ф" + tPriority;
			searchstring = searchstring.replace(/ /g,'');
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
			ClosedDontNotifyфLow : 59,
			ClosedDontNotifyфNormal : 59,
			ClosedDontNotifyфHigh : 59,
			ClosedDontNotifyфUrgent : 59,
			EscalatedфLow : 42,
			EscalatedфNormal : 32,
			EscalatedфHigh : 22,
			EscalatedфUrgent : 12,
			ClosedNotifyфLow : 59,
			ClosedNotifyфNormal : 59,
			ClosedNotifyфHigh : 59,
			ClosedNotifyфUrgent : 59};
			
			
			//console.log( "Triage test : " + searchstring );
			//console.log( "Triage test : " + triageTable[searchstring] );
			return triageTable[searchstring];

			
			
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
			var found = false;
			for (i = 0; i < this.values.length; i++)
			{
				if (this.values[i].systemID + "" == systemID + "")
				{
					
					var today = new Date();
					var dateString = today.getUTCFullYear() + "-" + today.getUTCMonth()+"-" +today.getUTCDate()+ " ";
					dateString += today.getUTCHours() <10 ? "0"+ today.getUTCHours() : today.getUTCHours();
					dateString += today.getUTCMinutes() <10 ? "0"+ today.getUTCMinutes() : today.getUTCMinutes();
					
					this.values[i].ticketLastUpd =  dateString;
					this.fTriage(systemID);
					
					console.log("Found "+this.values[i].ticketID+", updated date to" + this.values[i].ticketLastUpd);
					
				}
				
					
			}
		
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