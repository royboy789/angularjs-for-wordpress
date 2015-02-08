jQuery('html').attr('ng-app', 'wpAngularPlugin');
var app = angular.module('wpAngularPlugin', []);

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
app.directive('ngRender', ['$compile', function ($compile) {
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
app.run( function( $rootScope, $http, $sce ) {
	$http.get(wpAngularVars.base + '/posts').then(function(res){
		$rootScope.posts = res.data;
	});
});