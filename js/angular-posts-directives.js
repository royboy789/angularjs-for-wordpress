// DIRECTIVES FOR POST and POSTS 
app.directive('ngPosts', ['$http', '$rootScope', function($http, $rootScope){
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
			postType: '@postType'
		},
		controller: ['$scope', '$http', function($scope, $http) {
			$scope.getPosts = function(filters, postType){
				$scope.baseURL = wpAngularVars.base + '/posts?';

				if(filters.length > 0){
					angular.forEach(filters, function(value, key){
						$scope.baseURL = $scope.baseURL + 'filter['+ value.filter + ']=' + value.value + '&';
					})
				}
				if(postType){
					$scope.baseURL = $scope.baseURL + 'type[]=' + postType;
				}
				console.log($scope.baseURL);
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
			
			$scope.getPosts($scope.filters, $scope.postType);
		},
		template: '<div class="ngListWrapper" ng-repeat="post in postsD"><ng-include src="\''+wpAngularVars.template_directory.list_detail+'\'"></ng-include></div>'
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
		template: '<div class="ngSingleWrapper"><ng-include src="\''+wpAngularVars.template_directory.single_detail+'\'"></ng-include></div>'
	}
}]);

app.directive('ngPostContent', ['$http', '$rootScope', function($http, $rootScope){
	return {
		transclude: true,
		restrict: 'E',
		scope: {
			id: '='
		},
		controller: ['$scope', '$http', function($scope, $http) {
      		$scope.getPost = function(id) {
	    	$http.get(wpAngularVars.base + '/posts/' + id + '?context=edit&_wp_json_nonce=' + wpAngularVars.nonce).then(function(res){
				$scope.post = res.data;
			});
      	}
    }],
    link: function($scope, $elm, attrs, ctrl){
    	$scope.getPost($scope.id);
    },
		template: '<div class="ngSingleWrapper"><ng-include src="\''+wpAngularVars.template_directory.post_content+'\'"></ng-include></div>'
	}
}]);

app.directive('ngNewPost', ['$http', '$rootScope', function($http, $rootScope){
	return {
		transclude: true,
		restrict: 'E',
		scope: {
			id: '=',
			redirectURL: '@redirectUrl',
			afterSubmit: '@onSubmit'
		},
		controller: ['$scope', '$http', function($scope, $http) {
      		$scope.newPost = function() {
      			var form = jQuery('div.newPostFormWrapper form');
	    		$scope.data = {
	    			title: form.find('input[name="postTitle"]').val(),
	    			content_raw: form.find('textarea[name="postContent"]').val(),
	    			status: 'publish',
	    			post_category: 4,
	    			terms_names: [{ 'category': 4}]
	    		}
	    		$http.post(wpAngularVars.base + '/posts/?_wp_json_nonce=' + wpAngularVars.nonce, $scope.data).then(function(res){
					if(res.data){
						// After Submit Function - redirect | clear | hide
						if(!$scope.afterSubmit) { window.location = wpAngularVars.site + '/?p=' + res.data.ID; }
						if($scope.afterSubmit == 'redirect') {	
							if(!$scope.redirectURL) {
								window.location = wpAngularVars.site + '/?p=' + res.data.ID;
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