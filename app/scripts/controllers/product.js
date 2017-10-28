'use strict';

angular.module('kibizApp')
		.controller('ProductCtrl', ['$scope','$http','$timeout','localStorageService','navModule', function($scope,$http,$timeout,localStorageService,navModule)
		{
			var vm = this;

		 this.loadProductPartials = function()
			{
				if (localStorageService.isSupported) 
				{
					if (localStorageService.get('subViewPrd')) 
						{
							var viewCurrent = localStorageService.get('subViewPrd');
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
					this.selectedView='views/partials/searchproduct.html';
				}


				if (this.selectedView =="views/partials/searchproduct.html") 
				{
					loadProductList();
				}
				else if (this.selectedView=="views/partials/searchproductgrid.html")
				{
					loadProductList();
				}
				else if (this.selectedView=='views/partials/productdetails.html') 
				{
						
				}			
			}



		function loadProductList()
			{

				vm.loaderPath = 'images/Eclipse.svg';
				vm.hideLoader = false;

				$http(
					{
					method:'GET',
					url:'json/product.json'
					}
					)
				.then(
					function success(response)
					{
						$scope.productdata = response.data;
					},
					function failure(response)
					{
						$scope.productdata = response.data;
					}
					);
					
					vm.hideLoader = true;
			}



		this.selectView = function(param)
			{
			
				if (localStorageService.isSupported) 
				{
					localStorageService.set('subViewPrd',param,'localStorage');
					
					
				}
				
				this.selectedView =  param;

				if (param=="views/partials/searchproduct.html") 
				{
					loadProductList();
				}
				else if (this.selectedView=='views/partials/productdetails.html') 
				{
						
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

