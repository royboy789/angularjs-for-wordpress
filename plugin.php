<?php
/**
 * Plugin Name: AngularJS for WordPress
 * Plugin URI: http://www.roysivan.com/angularjs-for-wordpress
 * Description: This plugin will allow you to easily load WordPress content client-side using AngularJS. JSON REST API required.
 * Version: 1.2
 * Author: Roy Sivan
 * Author URI: http://www.roysivan.com
 * License: GPL2
 */

require_once('includes/metaBox.php');
require_once('includes/contentFilter.php');
require_once('includes/shortcodes.php');

define('WordPressAngularJS', '1.2');

class WordPressAngularJS {
	function WordPressAngularJS(){
		global $wpdb;
		add_action( 'wp_enqueue_scripts', array( $this, 'angularScripts' ) );
		add_filter( 'json_insert_post', array( $this, 'post_add_tax' ), 10, 3 );
	}

	function angularScripts() {
		// Angular Core
		wp_enqueue_script('angular-core', plugin_dir_url( __FILE__ ).'js/angular.min.js', array('jquery'), null, false);
		wp_enqueue_script('angular-app', plugin_dir_url( __FILE__ ).'js/angular-app.js', array('jquery'), null, false);

		// Angular Factories
		wp_enqueue_script('angular-factories', plugin_dir_url( __FILE__ ).'js/angular-factories.js', array('angular-app'), null, false);

		// Angular Directives
		wp_enqueue_script('angular-post-directives', plugin_dir_url( __FILE__ ).'js/angular-posts-directives.js', array('angular-factories'), null, false);

		// Template Directory
		$template_directory = array(
			'list_detail' => plugin_dir_url( __FILE__ ).'angularjs-templates/list-detail.html',
			'single_detail' => plugin_dir_url( __FILE__ ).'angularjs-templates/single-detail.html',
			'new_post' => plugin_dir_url( __FILE__ ).'angularjs-templates/new-post.html',
			'post_content' => plugin_dir_url( __FILE__ ).'angularjs-templates/post-content.html',
		);

		// TEMPLATE OVERRIDES
		if(file_exists(get_template_directory().'/angularjs-templates/list-detail.html')) {
			$template_directory['list_detail'] = get_bloginfo('template_directory').'/angularjs-templates/list-detail.html';
		}

		if(file_exists(get_template_directory().'/angularjs-templates/single-detail.html')) {
			$template_directory['list_detail'] = get_bloginfo('template_directory').'/angularjs-templates/single-detail.html';
		}
		if(file_exists(get_template_directory().'/angularjs-templates/new-post.html')) {
			$template_directory['new_post'] = get_bloginfo('template_directory').'/angularjs-templates/new-post.html';
		}
		if(file_exists(get_template_directory().'/angularjs-templates/post-content.html')) {
			$template_directory['post_content'] = get_bloginfo('template_directory').'/angularjs-templates/post-content.html';
		}

		// Localize Variables
		wp_localize_script( 
			'angular-core', 
			'wpAngularVars', 
			array( 
				'site' => get_bloginfo('wpurl'), 
				'base' => json_url(), 
				'nonce' => wp_create_nonce( 'wp_json' ), 
				'template_directory' => $template_directory 
			) 
		);
	}
	
	function post_add_tax( $post, $data, $update ) {
		foreach( $data['post_taxonomies'] as $term => $tax ){
			wp_set_post_terms( $post['ID'], array( intval( $term ) ), $tax, true );	        
	    }	    
	}
}

/** JSON REST API CHECK **/
function angular_wpapi_check(){
	if ( !is_plugin_active( 'json-rest-api/plugin.php' ) ) {
		add_action( 'admin_notices', 'angular_wpapi_error' );
	}
}

function angular_wpapi_error(){
	echo '<div class="error"><p><strong>JSON REST API</strong> must be installed and activated for the <strong>AngularJS for WP</strong> plugin to work properly - <a href="https://wordpress.org/plugins/json-rest-api/" target="_blank">Install Plugin</a></p></div>';
}

add_action('admin_init', 'angular_wpapi_check');

new WordPressAngularJS();
?>