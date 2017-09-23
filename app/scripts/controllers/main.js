'use strict';

/**
 * @ngdoc function
 * @name kibizApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kibizApp
 */
angular.module('kibizApp')
  .controller('MainCtrl',['$http','$scope','$location','navContact', function ($http,$scope,$location,navContact) {
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    this.menu1 = "New Product";
   this.kibiz_logo = "images/HeaderLogo.png";
   this.carouselimg1 = "images/Carousel1.jpg";
   this.carouselimg2 = "images/Carousel2.jpg";
   this.carouselimg3 = "images/Carousel3.jpg";
   this.carouselimg4 = "images/Carousel4.jpg";
   this.carouselimg5 = "images/Carousel5.jpg";
   this.cardmenu = [
   	{
   	"header": "Sales Order",
   	"url": "images/cardmenu1.png",
   	"desc": "Total 20 Sales Order",
   	"section": "salesorder"
   	},
   	{
   	"header": "contacts",
   	"url": "images/cardmenu2.png",
   	"desc": "Total 35 Contacts",
   	"section": "contacts"
   	},
   	{
   	"header": "Products",
   	"url": "images/cardmenu3.png",
   	"desc": "Total 56 Products",
   	"section": "products"
   	},
   	{
   	"header": "Reports",
   	"url": "images/cardmenu4.png",
   	"desc": "View The Reprts",
   	"section": "reports"
   	}
   ];
  


// Begining of http json fetch



function sideBarImage()
{
$http(
	{
		method:'GET',
		url:'https://api.jumpseller.com/v1/products.json?login=1bdae2ae3765ab2764fff0946d902e64&authtoken=3b0787f580911f25abfa481ed500dfb4'	
	}
	).then(function(response)
			{
				console.log(response.data);
				$scope.productResponse = response.status;
				$scope.productData = response.data;
				
			},function(response)
			{
			this.productData = 'Response Failed';
			console.log("failed");
			}
		); //end of then function scopr
	
	}

//$scope.load = sideBarImage();
    
function navigateSection( primaryPath, subpath, event)
{

console.log(primaryPath);
//navContact.setContactPartials(subpath);
$location.path('/' + primaryPath);



}


function addNum(a, b)
{
  console.log(a+b);
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

// java script code for adding event listener to navigation menu

$(document).ready(function()
{
$("#submnu001").click( function(event){event.preventDefault();});
$("#submnu001").click (navigateSection('contacts','views/partials/newcontact.html'));
});

 }]);
