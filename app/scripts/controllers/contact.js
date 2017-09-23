'use strict';

angular.module('kibizApp')
		.controller('ContactCtrl', ['$scope','$http','localStorageService', function($scope,$http,localStorageService)
		{

		this.mapaddress="";
		this.mapaddress1="";
		this.mapaddress2="";
		this.mapaddress3="";
		this.mapaddress4="";
		
		
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
					},
					function failure(response)
					{
						$scope.contactdata = response.data;
					}
					);
					
			}



		this.selectView = function(param)
			{
			
				if (localStorageService.isSupported) 
				{
					localStorageService.set('subViewCurr',param,'localStorage');
					
					
				}
				
					this.selectedView =  param;

				if (param=="views/partials/searchcontact.html") 
				{
					loadContactList();
				}
				else if (this.selectedView=='views/partials/contactdetails.html') 
				{
						this.profImg = "images/Contact_Image/person_image_1.jpg";
				}
				else if (this.selectedView=='views/partials/contactlocation.html') 
				{
						geoLoc();
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

angular.module('kibizApp').service('navContact', function(localStorageService)
	{
		{
		this.setContactPartials = function(param)
			{
				this.selectedView = param;
			}			
		}
	});