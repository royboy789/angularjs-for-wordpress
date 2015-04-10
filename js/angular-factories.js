angular_app.factory('Posts', function($resource){
	return $resource(wpAngularVars.base +'/posts/:id?_wp_json_nonce=' + wpAngularVars.nonce, {id: '@id'}, {
		update: {method: 'PUT'}
	});
});