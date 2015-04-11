var angular_app = angular.module('wpAngularPlugin', ['ngSanitize']);

angular_app.filter('unsafe', function($sce) {
    return function(val) {
	    if( $sce.trustAsHtml(val) )
        	return $sce.trustAsHtml(val).toString();
    };
});

angular_app.run( function( $rootScope, $http, $sce ) {
	$http.get(wpAngularVars.base + '/posts').then(function(res){
		$rootScope.posts = res.data;
	});
});

angular_app.directive('ngRender', ['$compile', function ($compile) {
    return {
      restrict: 'E',
      scope: {
        html: '='
      },
      link: function postLink(scope, element, attrs) {

          function appendHtml() {
              if(scope.html) {
                  var newElement = angular.element(scope.html);
                  $compile(newElement)(scope);
                  element.append(newElement);
              }
          }

          scope.$watch(function() { return scope.html }, appendHtml);
      }
    };
  }]);