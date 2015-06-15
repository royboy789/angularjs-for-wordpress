<?php

function angularFilter( $content ) {
	global $post;
	
	$meta = get_post_meta($post->ID, 'angularjsLoad', true);
	$meta = intval($meta);
	$content = str_replace('"', '\'', $content );
	
	$find_chat = strpos( $content, 'ng-chatroom' );
	if( $find_chat !== false ) {
		return $content;
	}
			
	if($meta){
		$content = '<div ng-app="wpAngularPlugin"><ng-post-content id="'.$post->ID.'" content="'.$content.'"></ng-post-content></div>';
	} else {
		$content = '<div ng-app="wpAngularPlugin">'.$content.'</div>';
	}

	return $content;
}
add_filter('the_content', 'angularFilter', 10, 3);


?>