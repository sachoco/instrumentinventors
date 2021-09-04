<?php
// require_once 'inc/includes/theme-setup.php';
// require_once 'inc/includes/theme-functions.php';
// require_once 'inc/includes/theme-restapi.php';

// Require the composer autoload for getting conflict-free access to enqueue
require_once __DIR__ . '/vendor/autoload.php';

// Instantiate
$enqueue = new \WPackio\Enqueue( 'instrumentInventors', 'dist', '1.0.0', 'theme', __FILE__ );

/**
 * Enqueue scripts and styles.
 */
function theme_scripts() {
	wp_enqueue_script( 'jquery' );
	// wp_enqueue_media();
	// wp_register_script( 'vibrant', get_stylesheet_directory_uri() . '/node_modules/node-vibrant/dist/vibrant.js', array('jquery'), '', true );
	// wp_enqueue_script( 'vibrant' );

	// Enqueue assets through wpackio/enqueue
	/**
	 * @var \WPackio\Enqueue
	 */
	global $enqueue;
	$enqueue->enqueue( 'theme', 'main', [] );

	// $assets = $enqueue->enqueue( 'theme', 'main',  [
	// 	'js' => true,
	// 	'css' => true,
	// 	'js_dep' => [],
	// 	'css_dep' => [],
	// 	'in_footer' => true,
	// 	'media' => 'all',
	// ]  );
// $entry_point = array_pop( $assets['js'] );
	// wp_localize_script( $entry_point['handle'], 'wpApiSettings', array(
	//     'root' => esc_url_raw( rest_url() ),
	//     'nonce' => wp_create_nonce( 'wp_rest' ),
	// ) );



}

add_action( 'wp_enqueue_scripts', 'theme_scripts' );
