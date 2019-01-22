console.log("Loaded: NSStrings.js");
var strings = {
	openStates : ["In Progress","Pending Response","With Development"],
	closedStates : ["Resolved","Closed Notify","Duplicate Case"],
	scraperTableTarget: "neg706__tab",
	//scraperColumns: [ "New", "Edit | View", "Number", "Grab", "Subject", "Priority", "Status", "Product", "Module", "Abacus Type"],  //For the cases "View" dropdown. this is "Status"
	//scraperColumns: [ "New", "Edit | View", "Number", "Priority", "Subject", "Status", "Company", "Contact", "Date Created"], //For the cases "View" dropdown. this is "Support - All Open Cases"
	ScraperColumnEditView : "EDIT | VIEW",
	ScraperColumnTicketNumber : "NUMBER",
	ScraperColumnSubject : "SUBJECT",
	ScraperColumnPriority : "PRIORITY",
	ScraperColumnStatus : "STATUS",
	ScraperColumnCompany : "COMPANY",
	ScraperColumnContact : "CONTACT",
	ScraperColumnDateCreated : "DATE CREATED",
}

var settings = {
	scraperInterval : 2000,
	OutputLengths : {
		customerColumn : 15,
		StatusLength:10,
	},
}


