// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
console.log("Successful hit of ChromeLoader.js");
  chrome.runtime.onInstalled.addListener(function() {
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
  
  
  