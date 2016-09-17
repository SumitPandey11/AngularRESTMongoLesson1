var app = angular.module("myApp", []);

app.controller("myAppController", function ($scope, $q, myAppFactory){
	$scope.message = "Welcome!";
	$scope.countryArray = new Array();
	
	$scope.clickMeFunction = function(){
		var promise = myAppFactory.callRestService() ;
		
		promise.then(function(returnFromSuccess){
			$scope.message = returnFromSuccess;
		},
		function(returnFromFaliure){
			$scope.message = returnFromFaliure;
		});
	
	console.log(angular.toJson($scope.message));
	};
	
	$scope.getCountryByIdFunction = function(countryId){
		var promise = myAppFactory.getCountryByID(countryId) ;
		
		//promise.then(returnFromSuccess(), returnFromFaliure());
		promise.then(function(returnFromSuccess){
			$scope.message = returnFromSuccess;
		},
		function(returnFromFaliure){
			$scope.message = returnFromFaliure;
		});
	
	console.log(angular.toJson($scope.message));
	return promise;
	};
	
	$scope.multipleCall = function(){
		
		var urlCalls = new Array();
		var countryIds = [1,2,3,4];
		
		angular.forEach(countryIds, function(item,index){
			urlCalls.push(myAppFactory.getCountryByID(item));
			console.log(item);
		});
		
		$q.all(urlCalls).then(function(results) {
			console.log("Printing " + angular.toJson(results));
			$scope.countryArray = results;
			for (var i = 0; i < results.length; i++){
				console.log( angular.toJson(results[i]) );
			}
		}, function(errors) {
			console.log(errors);
		}, function(updates) {
			console.log(updates);
		});


	};
	
	$scope.tableRowEdit = function(index){
		$scope.message = "Hello Devanshu ";
		console.log(" Hello Devanshu --- tableRowEdit called " + index);
	}
	
	$scope.getRowTemplate = function(){
		return "include/non-editable-row-template.html";
	}
	
});



app.factory("myAppFactory",function($http,$q){
					return {
						changeMessage : function() {
							return "message from factory";
						},

						callRestService : function() {
							return $http
									.get("http://localhost:8080/JAXRSJsonCRUDExample/rest/countries")
									.then(function(success) {
										return success.data[0].countryName;
									}, function(failure) {
										return $q.reject(failure.data);
									});
						},

						getCountryByID : function(countryId) {
							return $http.get("http://localhost:8080/JAXRSJsonCRUDExample/rest/countries/"+ countryId)
									.then(
										function(success) {
											return success.data;
									}, function(failure) {
											return $q.reject(failure.data);
									});

						},

					};
});
