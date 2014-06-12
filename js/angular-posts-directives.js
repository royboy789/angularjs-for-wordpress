// DIRECTIVES FOR POST and POSTS 
app.directive('ngPosts', ['$http', '$rootScope', function($http, $rootScope){
	return {
		transclude: true,
		restrict: 'E',
		template: '<div ng-repeat="post in posts"><ng-include src="\''+wpAngularVars.template_directory.list_detail+'\'"></ng-include></div>'
	}
}]);

app.directive('ngPost', ['$http', '$rootScope', function($http, $rootScope){
	return {
		transclude: true,
		restrict: 'E',
		scope: {
			id: '='
		},
		controller: ['$scope', '$http', function($scope, $http) {
      $scope.getPost = function(id) {
	    	$http.get(wpAngularVars.base + '/posts/' + id).then(function(res){
					$scope.post = res.data;
				});
      }
    }],
    link: function($scope, $elm, attrs, ctrl){
    	$scope.getPost($scope.id);
    },
		template: '<div><ng-include src="\''+wpAngularVars.template_directory.single_detail+'\'"></ng-include></div>'
	}
}]);