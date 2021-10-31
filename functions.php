<?php
require_once 'inc/theme-posttype.php';
require_once 'inc/theme-restapi.php';
include 'meta_box_defs.php';

add_filter( 'show_admin_bar', '__return_false' );

function register_my_menu() {
	register_nav_menu('main-menu',__( 'Main Menu' ));
	register_nav_menu('side-menu',__( 'Side Menu' ));
}
add_action( 'init', 'register_my_menu' );

// Require the composer autoload for getting conflict-free access to enqueue
require_once __DIR__ . '/vendor/autoload.php';

// Instantiate
$enqueue = new \WPackio\Enqueue( 'instrumentInventors', 'dist', '1.0.0', 'theme', __FILE__ );

/**
 * Enqueue scripts and styles.
 */
function theme_scripts() {
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'lightbox2' );
	wp_enqueue_style( 'lightbox2' );

	// wp_enqueue_media();
	// wp_register_script( 'vibrant', get_stylesheet_directory_uri() . '/node_modules/node-vibrant/dist/vibrant.js', array('jquery'), '', true );
	// wp_enqueue_script( 'vibrant' );

	// Enqueue assets through wpackio/enqueue
	/**
	 * @var \WPackio\Enqueue
	 */
	global $enqueue;
	// $enqueue->enqueue( 'theme', 'main', [] );

	$assets = $enqueue->enqueue( 'theme', 'main',  [
		'js' => true,
		'css' => true,
		'js_dep' => ['jquery','lightbox2'],
		'css_dep' => [],
		'in_footer' => true,
		'media' => 'all',
	]  );
	$entry_point = array_pop( $assets['js'] );

	global $post;
	wp_localize_script( $entry_point['handle'], 'wpApiSettings', array(
	    'root' => esc_url_raw( rest_url() ),
	    'nonce' => wp_create_nonce( 'wp_rest' )
	) );



}

add_action( 'wp_enqueue_scripts', 'theme_scripts' );
