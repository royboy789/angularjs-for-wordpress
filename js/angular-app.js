jQuery('html').attr('ng-app', 'wpAngularPlugin');
var app = angular.module('wpAngularPlugin', []);

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.run( function( $rootScope, $http, $sce ) {
	$http.get(wpAngularVars.base + '/posts').then(function(res){
		$rootScope.posts = res.data;
	});
});