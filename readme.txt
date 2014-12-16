=== Plugin Name ===
Contributors: guavaworks
Donate link: http://www.codingofficehours.com/coh/#/teacher/23
Tags: angularjs, client side, single page application
Requires at least: 3.9
Tested up to: 4.0
Stable tag: 0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

AngularJS for WordPress allows you to easily leverage the power of AngularJS and put it into your theme.

== Description ==
  
AngularJS for WordPress was created to help anyone leverage the power of AngularJS and easily add it into their own theme.  
  
AngularJS is a client-side templating framework that lets you extend HTML vocabulary for your applications. It has a markup more similar to what HTML used to be. HTML its not a dynamic language
by itself, with AngularJS it is.
  
AngularJS for WordPress includes several directives (html elements) that will help you easily add in a block for a single post/page or a list. More directives will be added in.

WordPress shortcodes for directives are also included to avoid any confusion with code  
  
For even easier use for specific pages a new post meta box has been added. If selected the AngularJS directive will take over loading the content of the page client-side. This feature uses the post-content.html template.


== Installation ==

1. Download zipped archive of plugin
1. Log into your WordPress dashobard and add the new plugin via upload
1. ACtivate the plugin
1. Make sure you have the JSON REST API (WP-API) plugin also activated
1. View [documentation](http://www.roysivan.com/angularjs-for-wordpress) for how to utilize the directives


== Frequently Asked Questions ==

= Why use AngularJS? =

AngularJS renders your posts client-side. WordPress is built on PHP, so every page a user visits is converted to HTML on the server, then served to the client. With ANgularJS you are only getting a JSON Object (text) from the server
then renderring that to HTML using the client's machine. This will speed up your pages as well as allow for more concurrent visitors to your site as the strain on the server is reduced.

== Screenshots ==

1. In verison __0.2__ a meta box on post and pages edit screen was added, choose yes to have the contenet of the page loaded with AngularJS automatically. A new custom template was also added (post-content.html) 

== Changelog ==

= 0.1 =
* `ng-posts` and `ng-post` added
* `ng-post` with cat id support added

= 0.2 = 
* shortcodes [ng-posts] and [ng-post] added
* custom post & page meta box for display page content created
* new custom template added for displaying content on a single post or page (post-content.html)