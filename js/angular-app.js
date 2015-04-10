var angular_app = angular.module('wpAngularPlugin', []);

angular_app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

angular_app.run( function( $rootScope, $http, $sce ) {
	$http.get(wpAngularVars.base + '/posts').then(function(res){
		$rootScope.posts = res.data;
	});
});