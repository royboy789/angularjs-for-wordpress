angular_app.factory('Posts', function($resource){
	return $resource(wpAngularVars.base +'/posts/:id?_wp_rest_nonce=' + wpAngularVars.nonce, {id: '@id'}, {
		update: {method: 'PUT'}
	});
});
