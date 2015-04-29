var angular_app = angular.module('wpAngularPlugin', ['ngSanitize']);

angular_app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

var janitor = new HTMLJanitor({
    tags: {
	    div: {
		    id: true,
		    class: true
	    },
        p: {
	        id: true,
	        class: true
        },
        code: {},
        pre: {},
        // TODO: Map b => strong
        strong: {},
        b: {},
        // TODO: Map em => i
        em: {},
        i: {},
        // TODO: Map strike => del
        strike: {},
        del: {},
        a: { href: true },
        ul: {},
        ol: {},
        li: {},
        blockquote: {},
        h1: {},
        h2: {},
        h3: {},
        h4: {},
        h5: {},
        h6: {},
        sub: {},
        sup: {}
    }
});

angular_app.filter('sanitize', function (unsafeFilter) {
    return function (val) {
        return unsafeFilter(janitor.clean(val));
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