'use strict';

angular.module('kibizApp')
		.controller('ContactCtrl', ['$scope','$http','$timeout','localStorageService', function($scope,$http,$timeout,localStorageService)
		{

		this.mapaddress="";
		this.mapaddress1="";
		this.mapaddress2="";
		this.mapaddress3="";
		this.mapaddress4="";
		var vm = this;
		
		
		 this.loadContactPartials = function()
			{
				if (localStorageService.isSupported) 
				{
					if (localStorageService.get('subViewCurr')) 
						{
							var viewCurrent = localStorageService.get('subViewCurr');
							console.log(viewCurrent);
							this.selectedView= viewCurrent;

						}
					else
						{
							console.log(this.selectedView);
							overridelocStorage = "" ;
						}
				}
				else
				{
					this.selectedView='views/partials/searchcontact.html';
				}


				if (this.selectedView =="views/partials/searchcontact.html") 
				{
					loadContactList();
				}
				else if (this.selectedView=="views/partials/newcontact.html")

				{
					$http(
					{
						method:'GET',
						url:'https://restcountries.eu/rest/v2/all'
					})
					.then(
						function success(response)
						{
							$scope.listCountries=response.data;
						},
						function failure(response)
						{
							var resfailure =response.data;
						}
						);
				}
				else if (this.selectedView=='views/partials/contactdetails.html') 
				{
						this.profImg = "images/Contact_Image/person_image_1.jpg";
				}
				else if (this.selectedView=='views/partials/contactlocation.html') 
				{
						geoLoc();
						var mapObj = document.getElementById("mapviewer");
						google.maps.event.trigger(mapObj, 'resize');
				}
				
				
			}



		function loadContactList()
			{
				
				
				$http(
					{
					method:'GET',
					url:'json/mockdatacontacts.json'
					}
					)
				.then(
					function success(response)
					{
						$scope.contactdata = response.data;
						//this.selectedView = 'views/partials/searchcontact.html';
					},
					function failure(response)
					{
						$scope.contactdata = response.data;
					}
					);
			//vm.hideLoader = true;

				
				
			}
			
		
		angular.element("#tab-con-list").ready()
		{
			//$timeout( loadContactList(),100);
			vm.hideLoader = true;
			//vm.loadTableRows = true;
		};
		

		this.selectView = function(param)
			{
			
				if (localStorageService.isSupported) 
				{
					localStorageService.set('subViewCurr',param,'localStorage');
					
					
				}
				
				this.selectedView =  param;

				if (param=="views/partials/searchcontact.html") 
				{
					//this.selectedView = 'views/partials/pageloadtemp.html';
					vm.loaderPath = 'images/Eclipse.svg';
					vm.hideLoader = false;
					vm.loadTableRows = true;
					$timeout( loadContactList(),1000);
				
					//$timeout( loadContactList(),1000);
					//loadContactList();
					//this.selectedView = 'views/partials/searchcontact.html';
				}
				else if (this.selectedView=='views/partials/contactdetails.html') 
				{
						this.profImg = "images/Contact_Image/person_image_1.jpg";
				}
				else if (this.selectedView=='views/partials/contactlocation.html') 
				{
					$timeout(geoLoc(), 1000);
						//geoLoc();
						//var mapObj = document.getElementById("mapviewer");
						//google.maps.event.trigger(mapObj, 'resize');
				}
				
			
			}
			
		//this.load=loadContactPartials();

		$scope.deleteRow = function(param)
		{	
			var eleRemove = angular.element(document.querySelector('#'+param));
			eleRemove.remove();
		}
		this.view= function()
		{
			
		}

		// Section or the Google Maps
		var watchId = null;
		function geoLoc()
		{
			if(navigator.geolocation)
			{	
				var option={
					enableHighAccuracy: true,
					timeout:Infinity,
					maxage:0
				};

				watchId = navigator.geolocation.watchPosition(showPosition, showError, option);
				

			}
			else
			{
				alert('Geolocation not supported in your browser');
			}
		}
		this.callGeoCode = function ()
		{
			
			$timeout(geoCoder(),7000);
		};

		function geoCoder()
		{
			
			var mapObj = document.getElementById("mapviewer");
			var address = vm.mapaddress;
			if (address==" "|| address==null) 
			{
				console.log(address);
				geoLoc();
			}
			else if (address.length < 10) 
			{

			}

			else
			{	
				var geoCoder = new google.maps.Geocoder();
				var pos= new google.maps.LatLng(12.9546432, 77.6580367);
				var mapOpt = { zoom:10, center:pos , mapTypeId:'roadmap' };
				var mapLoc = new google.maps.Map(mapObj, mapOpt); 
				geoCoder.geocode(
					{'address':address},
						function(results,status )
						{
							if (status=='OK') 
								{
						console.log('results' + results);
								mapLoc.setCenter(results[0].geometry.location);
								mapLoc.setZoom(15);
								var pos = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
								var marker = new google.maps.Marker(
									{
										map: mapLoc,
										position:pos,
										animation: google.maps.Animation.DROP
									});
								}
							else
								{
									this.mapaddress = "Error in fetching the data";
								}
						}

					);
			}
			mapLoc.addListener('click', function(e)
				{
		 			var geoCoder = new google.maps.Geocoder;
		 			geoCoder.geocode(
		 				{'location':{lat:e.latLng.lat(), lng:e.latLng.lng()}}, function(results,status)
		 				{
		 					if (status=='OK') 
		 					{
		 						var address  = results[0].formatted_address;
		 						addAddress(address,e);
		 					}
		 					else
		 					{
		 						alert('Address can not be fetched due to status error' + status);
		 					}
		 				});

				});
			$timeout.cancel();
		}

		function showPosition()
		{
		//var lat = position.coords.latitude;
        //var lng = position.coords.longitude;
		var pos= new google.maps.LatLng(12.9546432, 77.6580367);
		var mapOpt = { zoom:10, center:pos , mapTypeId:'roadmap' };
		var mapObj = document.getElementById("mapviewer");
		var mapLoc = new google.maps.Map(mapObj, mapOpt); 
		var markerPos = {
			map:mapLoc,
			position:pos,
			animation: google.maps.Animation.DROP,
			title: "My Location"
		};
		var marker = new google.maps.Marker(markerPos);
		mapLoc.addListener('click', function(e)
				{
		 			var geoCoder = new google.maps.Geocoder;
		 			geoCoder.geocode(
		 				{'location':{lat:e.latLng.lat(), lng:e.latLng.lng()}}, function(results,status)
		 				{
		 					if (status=='OK') 
		 					{
		 						var address  = results[0].formatted_address;
		 						addAddress(address,e);
		 					}
		 					else
		 					{
		 						alert('Address can not be fetched due to status error' + status);
		 					}
		 				});

				});
		}
		function showError(error)
		{
			var err=document.getElementById("mapviewer");
			switch(error.code)
				{
					case error.PERMISSIONDENIED:
					err = "Permission denied by the clint"
					break;

					case error.TIMEOUT:
					err = "Request Timeout"
					break;

					case error.POSITION_UNAVAILABLE:
					err = "Poition is unavailable"
					break;

					case error.UNKNOWN_ERROR:
					err = "Unknown Error Occured"
					break;
				}

		}

		var addAddress = function(address, e)
		{
			var lat = e.latLng.lat();
			var lng = e.latLng.lng();
			var resultset = "";
			for ( var i=1 ; i<6 ; i++ )
				{

					var latlng1 = document.getElementById('maplat'+ i).value;
					latlng1 = latlng1.split(",",2);
					if (lat==latlng1[0] && lat==latlng1[1]) 
					{
						document.getElementById('maplat'+ i).innerHTML  = lat + "," + lng;
						resultset = 1 ;
					}
					
					if (resultset=="" && latlng1=="") 
					{
						document.getElementById('maplat'+ i).value  = lat + "," + lng;
						document.getElementById('mapaddress'+ i).value  = address;
						resultset = 1 ;
					}
				}
			if (resultset=="") 
				{
					for ( var i=1 ; i<5 ; i++ )
					{
						var j = i+1;
						document.getElementById('maplat'+ i).value = document.getElementById('maplat'+j).value;
						document.getElementById('mapaddress'+ i).value = document.getElementById('mapaddress'+j).value;		
					}
						document.getElementById('maplat5').value = lat + "," + lng;
						document.getElementById('mapaddress5').value = address;
				}
		}
		



$(document).ready(function(){
    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
            $(this).toggleClass('open');        
        			},
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
            $(this).toggleClass('open');       
        			}
    );
});

		}]);

//Create a service for sharing the location related information

angular.module('kibizApp').service('navModule', function(localStorageService)
	{
		{
		this.setModulePartials = function(param)
			{
				this.selectedView = param;
				if (localStorageService.isSupported) 
				{
					localStorageService.set('subViewCurr',param,'localStorage');
				}
			}			
		}
	});