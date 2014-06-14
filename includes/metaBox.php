<?php
function myplugin_add_meta_box() {

	$screens = array( 'post', 'page' );

	foreach ( $screens as $screen ) {

		add_meta_box(
			'angaulrJSload',
			__( 'Load with AngularJS', 'angularjs_load' ),
			'angularjsCallback',
			$screen,
			'side',
			'high'
		);
	}
}
add_action( 'add_meta_boxes', 'myplugin_add_meta_box' );

function angularjsCallback( $post ) {

	// Add an nonce field so we can check for it later.
	wp_nonce_field( 'myplugin_meta_box', 'myplugin_meta_box_nonce' );

	$value = get_post_meta( $post->ID, 'angularjsLoad', true );

	$angularLoad = false;
	if($value == "1") { $angularLoad = true; }

	echo '<label for="myplugin_new_field">';
	_e( 'Load this post or page client side with AngularJS?' );
	echo '</label><br/><br/>';
	echo '<select name="angularjsLoad">';
	echo '<option value="1"';
		if($angularLoad) { echo 'selected="selected"'; }
	echo '>Yes</option>';
	echo '<option value="0"';
		if(!$angularLoad) { echo 'selected="selected"'; }
	echo '>No</option>';
	echo '</select>';

}

function angularSave( $post_id ) {

	// Check if our nonce is set.
	if ( ! isset( $_POST['myplugin_meta_box_nonce'] ) ) {
		return;
	}

	if ( ! wp_verify_nonce( $_POST['myplugin_meta_box_nonce'], 'myplugin_meta_box' ) ) {
		return;
	}

	// If this is an autosave, our form has not been submitted, so we don't want to do anything.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	// Check the user's permissions.
	if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] ) {

		if ( ! current_user_can( 'edit_page', $post_id ) ) {
			return;
		}

	} else {

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
	}

	if ( ! isset( $_POST['angularjsLoad'] ) ) {
		return;
	}



	// Sanitize user input.
	$my_data = sanitize_text_field( $_POST['angularjsLoad'] );

	// Update the meta field in the database.
	update_post_meta( $post_id, 'angularjsLoad', $my_data );

}
add_action( 'save_post', 'angularSave' );