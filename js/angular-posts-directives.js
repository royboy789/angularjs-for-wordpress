// DIRECTIVES FOR POST and POSTS 
angular_app.directive('ngPosts', ['$http', '$rootScope', function($http, $rootScope){
	return {
		transclude: true,
		restrict: 'E',
		scope: {
			author: '=authorId',
			authorName: '@authorName',
			cat: '=catId',
			catName: '@catSlug',
			order: '@postOrder',
			orderBy: '@postOrderby',
			search: '@search',
			postType: '@postType',
			perPage: '@perPage',
			page: '@page'
		},
		controller: ['$scope', '$http', function($scope, $http) {
			$scope.getPosts = function(filters, postType, page){
				$scope.baseURL = wpAngularVars.base + '/posts?';

				if(filters.length > 0){
					angular.forEach(filters, function(value, key){
						if( value.filter === 'posts_per_page' ){
							$scope.baseURL = $scope.baseURL + 'per_page=' + value.value + '&';	
						} else if( value.filter == 'page' ) {
							$scope.baseURL = $scope.baseURL + 'page=' + value.value + '&';	
						} else {
							$scope.baseURL = $scope.baseURL + 'filter['+ value.filter + ']=' + value.value + '&';	
						}
					})
				}
				if(postType){
					$scope.baseURL = $scope.baseURL + '&type[]=' + postType;
				}
                if(page){
                        $scope.baseURL = $scope.baseURL + '&page=' + page;
                }
				$http.get($scope.baseURL).then(function(res){
				 	$scope.postsD = res.data;
				});

			}

		}],
		link: function($scope, $elm, attrs, ctrl){
			// Filters Array
			$scope.filters = [];
			if($scope.author){ $scope.filters.push({'filter': 'author', 'value': $scope.author}); }
			if($scope.authorName){ $scope.filters.push({'filter': 'author_name', 'value': $scope.authorName}); }
			if($scope.cat){ $scope.filters.push({'filter': 'cat', 'value': $scope.cat}); }
			if($scope.catName){ $scope.filters.push({'filter': 'category_name', 'value': $scope.catName}); }
			if($scope.order){ $scope.filters.push({'filter': 'order', 'value': $scope.order}); }
			if($scope.orderBy) { $scope.filters.push({'filter': 'orderby', 'value': $scope.orderBy }); }
			if($scope.search) { $scope.filters.push({'filter': 's', 'value': $scope.search}); }
			if($scope.perPage) { $scope.filters.push({'filter': 'posts_per_page', 'value': $scope.perPage}); }
			if($scope.page) { $scope.filters.push({'filter': 'page', 'value': $scope.page}); }	
			
			$scope.getPosts($scope.filters, $scope.postType);
		},
		template: '<div class="ngListWrapper" ng-repeat="post in postsD"><ng-include src="\''+wpAngularVars.template_directory.list_detail+'\'"></ng-include></div>'
	}
}]);

angular_app.directive('ngPost', ['$http', '$rootScope', function($http, $rootScope){
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
		template: '<div class="ngSingleWrapper"><ng-include src="\''+wpAngularVars.template_directory.single_detail+'\'"></ng-include></div>'
	}
}]);

angular_app.directive('ngPostContent', ['$http', '$rootScope', function($http, $rootScope){
	return {
		transclude: true,
		restrict: 'E',
		scope: {
			id: '=',
			content: '@'
		},
		template: '<div class="ngSingleWrapper"><ng-include src="\''+wpAngularVars.template_directory.post_content+'\'"></ng-include></div>'
	}
}]);


angular_app.directive('ngNewPost', ['$http', '$rootScope', function($http, $rootScope){
	return {
		transclude: true,
		restrict: 'E',
		scope: {
			id: '=',
			redirectURL: '@redirectUrl',
			afterSubmit: '@onSubmit',
			postType: '@postType',
		},
		controller: ['$scope', '$http', function($scope, $http) {
			
			$scope.chosenTax = [];
      		if( !$scope.postType ) {
      			$scope.postType = 'post'
      		}
			$http.get( wpAngularVars.base + '/taxonomies' ).then(function(res) {
				$scope.taxonomies = [];
				angular.forEach( res.data, function( value, key ) {
					if( value.types.indexOf($scope.postType) > -1 && value.name !== 'Format' ) {
						$http.get( wpAngularVars.base + '/terms/' + value.slug.toLowerCase() ).then(function(res){
							console.log(res);
							value.terms = res.data;
							$scope.taxonomies.push( value );
						});
					}
				});
				
			});
      		$scope.newPost = function() {
      			var form = jQuery('div.newPostFormWrapper form');
	    		$scope.data = {
	    			title: form.find('input[name="postTitle"]').val(),
	    			content: form.find('textarea[name="postContent"]').val(),
	    			status: 'publish',
	    			post_type: $scope.postType,
	    			post_taxonomies: []
	    		}
	    		form.find('select').each(function(key, value) { 
		    		if( jQuery(this).val() ) {
			    		var tax = jQuery(this).data('tax'),
			    		selected = jQuery(this).find(':selected');
			    		jQuery.each(selected, function( key, select ) {
				    		var term = jQuery( select ).val();
			    			$scope.data.post_taxonomies[term] = tax
			    		});
		    		}
		    	});
		    	var req = {
			    	method: 'POST',
			    	url: wpAngularVars.base + '/posts/',
			    	headers: {
				    	'X-WP-Nonce': wpAngularVars.nonce
			    	},
			    	data: $scope.data
		    	};
		    	
		    	if( $scope.postType && $scope.postType !== 'posts' ) {
			    	req.url = wpAngularVars.base + '/' + $scope.postType;
		    	}
		    	
	    		$http(req).then(function(res){
		    		console.log(res);
					if(res.data){
						// After Submit Function - redirect | clear | hide
						if(!$scope.afterSubmit) { window.location = wpAngularVars.site + '/?p=' + res.data.id; }
						if($scope.afterSubmit == 'redirect') {	
							if(!$scope.redirectURL) {
								window.location = wpAngularVars.site + '/?p=' + res.data.id;
							} else{
								window.location = $scope.redirectURL;
							}
						}
						if($scope.afterSubmit == 'clear') {
							form.find('input[name="postTitle"]').val('');
							form.find('textarea[name="postContent"]').val('');
						}
						if($scope.afterSubmit == 'hide') {
							form.hide();
						}

					} else {
						form.prepend('<p class="error">An error occured, please check your fields and try again</p>');
					}
				});
      		}
    	}],
		template: '<div class="newPostFormWrapper"><form ng-submit="newPost()"><ng-include src="\''+wpAngularVars.template_directory.new_post+'\'"></ng-include></form></div>'
	}
}]);