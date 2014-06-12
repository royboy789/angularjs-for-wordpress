<?php
/**
 * Plugin Name: AngularJS for WordPress
 * Plugin URI: http://www.roysivan.com/angular-wordpress-plugin
 * Description: This plugin will allow you to easily load WordPress content client-side using AngularJS. JSON REST API required.
 * Version: 0.1
 * Author: Roy Sivan
 * Author URI: http://www.roysivan.com
 * License: GPL2
 */
define('WordPressAngularJS', '0.1'); 

class WordPressAngularJS {
	function WordPressAngularJS(){
		global $wpdb;
		add_action( 'wp_enqueue_scripts', array( $this, 'angularScripts' ) );
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
				'single_detail' => plugin_dir_url( __FILE__ ).'angularjs-templates/single-detail.html' 
			);
			
			// TEMPLATE OVERRIDES 
			if(file_exists(get_template_directory().'/angularjs-templates/list-detail.html')) {
				$template_directory['list_detail'] = get_bloginfo('template_directory').'/angularjs-templates/list-detail.html';
			}
			
			if(file_exists(get_template_directory().'/angularjs-templates/single-detail.html')) {
				$template_directory['list_detail'] = get_bloginfo('template_directory').'/angularjs-templates/single-detail.html';
			}
		
		// Localize Variables
		wp_localize_script( 'angular-core', 'wpAngularVars', array( 'base' => json_url(), 'nonce' => wp_create_nonce( 'wp_json' ), 'template_directory' => $template_directory ) );
	}
}

new WordPressAngularJS();

?>