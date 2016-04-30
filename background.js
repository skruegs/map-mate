chrome.commands.onCommand.addListener(function (command) {
  if (command === 'search-google-maps') {
    searchGoogleMaps();
  }
  if (command === 'get-directions-to') {
    getDirectionsTo();
  }
  if (command === 'get-directions-from') {
    getDirectionsFrom();
  }
});

chrome.contextMenus.create({
  id: 'map',
  title: 'Search in Google Maps',
  contexts:['selection']
});

chrome.contextMenus.create({
  id: 'to',
  title: 'Get Directions to Selection',
  contexts:['selection']
});

chrome.contextMenus.create({
  id: 'from',
  title: 'Get Directions from Selection',
  contexts:['selection']
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'map') {
    searchGoogleMaps();
  }
  if (info.menuItemId === 'to') {
    getDirectionsTo();
  }
  if (info.menuItemId === 'from') {
    getDirectionsFrom();
  }
});

chrome.runtime.onInstalled.addListener(function () {
  // defaults
  localStorage['address1'] = '';
  localStorage['travel'] = 'd';
  // attempt to get current location to use as default saved address
  var geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 10 * 1000
  };
  var geoSuccess = function (position) {
    localStorage['address1'] = position.coords.latitude + ',' + 
                               position.coords.longitude;
  };
  var geoError = function (error) {
    console.log('Error occurred. Error code: ' + error.code);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

});

var url_base = 'http://maps.google.com/?q=';

var searchGoogleMaps = function () {
  chrome.tabs.executeScript(null, {
    code: 'window.getSelection().toString();'
  }, function (selection) {
    if (selection.length > 0) {
      chrome.tabs.create({url: url_base + selection[0]});
    }
  });
};

var getDirectionsTo = function () {
  var source = localStorage['address1'];
  var mode = localStorage['travel'];
  chrome.tabs.executeScript(null, {
    code: 'window.getSelection().toString();'
  }, function (selection) {
    if (selection.length > 0) {
      chrome.tabs.create({url: url_base + 'maps?f=d&saddr=' + source + 
                               '&daddr=' + selection[0] +
                               '&dirflg=' + mode});
    }
  });
};

var getDirectionsFrom = function () {
  var destination = localStorage['address1'];
  var mode = localStorage['travel'];
  chrome.tabs.executeScript(null, {
    code: 'window.getSelection().toString();'
  }, function (selection) {
    if (selection.length > 0) {
      chrome.tabs.create({url: url_base + 'maps?f=d&saddr=' + selection[0] + 
                               '&daddr=' + destination +
                               '&dirflg=' + mode});
    }
  });
};
