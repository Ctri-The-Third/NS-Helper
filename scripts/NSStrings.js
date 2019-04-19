console.log("Loaded: NSStrings.js");
var strings = {
	openStates : ["In Progress","Pending Response","With Development","Scheduled"],
	closedStates : ["Resolved","Closed Notify","Duplicate Case"],
	scraperTableTarget: "neg706__tab",
	//scraperColumns: [ "New", "Edit | View", "Number", "Grab", "Subject", "Priority", "Status", "Product", "Module", "Abacus Type"],  //For the cases "View" dropdown. this is "Status"
	//scraperColumns: [ "New", "Edit | View", "Number", "Priority", "Subject", "Status", "Company", "Contact", "Date Created"], //For the cases "View" dropdown. this is "Support - All Open Cases"
	ScraperColumnEditView : "Edit | View",
	ScraperColumnTicketNumber : "Number",
	ScraperColumnSubject : "Subject",
	ScraperColumnPriority : "Priority",
	ScraperColumnStatus : "Status",
	ScraperColumnCompany : "Company",
	ScraperColumnContact : "Contact",
	ScraperColumnDateCreated : "Date Created",
}

var settings = {
	scraperInterval : 2000,
	OutputLengths : {
		customerColumn : 15,
		StatusLength:10,
	},
	saveToChrome : true,
	saveToCookie : true,
	cookieCacheExpiry : 5,
}


