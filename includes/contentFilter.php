<?php

function angularFilter( $content ) {
	global $post;
	
	$meta = get_post_meta($post->ID, 'angularjsLoad', true);
	$meta = intval($meta);
	$content = str_replace('"', '\'', $content );
			
	if($meta){
		$content = '<div ng-app="wpAngularPlugin"><ng-post-content id="'.$post->ID.'" content="'.$content.'"></ng-post-content></div>';
	} else {
		$content = '<div ng-app="wpAngularPlugin">'.$content.'</div>';
	}

	return $content;
}
add_filter('the_content', 'angularFilter', 10, 3);


// function angularFilterTitle( $title, $id ) {
// 	$meta = get_post_meta($id, 'angularjsLoad', true);
// 	$meta = intval($meta);

// 	if($meta) {
// 		$title = '';
// 	}

// 	return $title;
// }

// add_filter('the_title', 'angularFilterTitle', 10, 3);
?>