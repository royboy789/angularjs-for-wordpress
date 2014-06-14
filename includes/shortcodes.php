<?php
function ngPosts( $atts ) {
	$a = shortcode_atts( array(
		// EMPTY DEFAULTS
		'author_id' => '',
		'author_name' => '',
		'cat_id' => '',
		'cat_slug' => '',
		'post_order' => '',
		'post_orderby' => '',
		'post_type' => 'post',
		'search' => ''
	), $atts );
	
	$vars = '';
	foreach ($a as $key => $value) {
		// IF NOT EMPTY ADD TO VAR STRING
		if($value != '') {
			$ngAtt = str_replace('_', '-', $key);
			$vars .= $ngAtt.'="'.$value.'" ';
		}
	}
	ob_start();
	// ANGULARJS DIRECTIVE OUTPUT WITH VARS (IF DEFINED)
	echo '<ng-posts '.$vars.'></ng-posts>';
	return ob_get_clean();
}


add_shortcode( 'ng-posts', 'ngPosts' );

function ngPost( $atts ) {
	$a = shortcode_atts( array(
		'post_id' => ''
	), $atts );
	
	ob_start();
	if($a['post_id'] == ''){
		echo '<p>post_id must be set in shortcode to display content</p>';
		
	} else {
		echo '<ng-post id="'.$a['post_id'].'"></ng-post>';
	}
	return ob_get_clean();
}
add_shortcode( 'ng-post', 'ngPost' );
?>