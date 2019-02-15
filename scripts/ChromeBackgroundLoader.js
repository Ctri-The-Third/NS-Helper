
// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
console.log("Successful hit of ChromeLoader.js");
  chrome.runtime.onStartup.addListener(function() {
	  //this all happens when the addon is INTALLED
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log('The color is green.');
    });
	
	
	
	//on page change, remove all rules.
	//after completion, do the function

	
	
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
		  //add a condition.
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostSuffix: 'netsuite.com'},
        })
        ],
		  //add an action
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });
  
  
  
  
  chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
	  console.log("Received 'save' request");
	  
	  chrome.storage.local.set({"NSCHJson" : JSON.stringify(request.values)});
	  //console.log(request.values);
	  
	  //console.log(sender);
	  chrome.storage.local.set({"NSCHGameJson" : JSON.stringify(request.gameobject)});
	      
		chrome.storage.local.get('NSCHJson', function (result) {
        console.log("Info now stored in storage.local: ");
        console.log(typeof result.NSCHJson);
		//console.log(result.NSCHJson);
		});
		
      	chrome.storage.local.get('NSCHGameJson', function (result) {
        console.log("Info now stored in storage.local: ");
        console.log(typeof result.NSCHGameJson);
		console.log(result.NSCHGameJson);});
      
	  
    //if (sender.url == blocklistedWebsite)
//      return;  // don't allow this web page access
    //if (request.openUrlInEditor)
//      openUrl(request.openUrlInEditor);

	
  });
