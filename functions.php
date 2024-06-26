<?php
require_once 'inc/theme-posttype.php';
require_once 'inc/theme-restapi.php';
require_once 'inc/theme-json-export.php';
// include 'meta_box_defs.php';

// add_filter( 'show_admin_bar', '__return_false' );
add_theme_support( 'responsive-embeds' );

function register_my_menu() {
	register_nav_menu('main-menu',__( 'Main Menu' ));
	register_nav_menu('about-menu',__( 'About Menu' ));
	register_nav_menu('get_involved-menu',__( 'Get Involved Menu' ));
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


	// wp_enqueue_media();
	// wp_register_script( 'vibrant', get_stylesheet_directory_uri() . '/node_modules/node-vibrant/dist/vibrant.js', array('jquery'), '', true );
	// wp_enqueue_script( 'vibrant' );
	//
	//
	// Enqueue assets through wpackio/enqueue
	/**
	 * @var \WPackio\Enqueue
	 */
	global $enqueue;
	// if(!is_woocommerce()&&!is_product()&&!is_cart()&&!is_checkout()&&!is_account_page()&&!is_admin()):
	if(!is_admin()):
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'lightbox2' );
		wp_enqueue_style( 'lightbox2' );
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

	else:
		$assets = $enqueue->enqueue( 'theme', 'noreact',  [
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

	endif;

}

add_action( 'wp_enqueue_scripts', 'theme_scripts' );





function bidirectional_acf_update_value( $value, $post_id, $field  ) {

	// vars
	$field_name = $field['name'];
	$field_key = $field['key'];
	$global_name = 'is_updating_' . $field_name;


	// bail early if this filter was triggered from the update_field() function called within the loop below
	// - this prevents an inifinte loop
	if( !empty($GLOBALS[ $global_name ]) ) return $value;


	// set global variable to avoid inifite loop
	// - could also remove_filter() then add_filter() again, but this is simpler
	$GLOBALS[ $global_name ] = 1;


	// loop over selected posts and add this $post_id
	if( is_array($value) ) {

		foreach( $value as $post_id2 ) {

			// load existing related posts
			$value2 = get_field($field_name, $post_id2, false);


			// allow for selected posts to not contain a value
			if( empty($value2) ) {

				$value2 = array();

			}


			// bail early if the current $post_id is already found in selected post's $value2
			if( in_array($post_id, $value2) ) continue;


			// append the current $post_id to the selected post's 'related_posts' value
			$value2[] = $post_id;


			// update the selected post's value (use field's key for performance)
			update_field($field_key, $value2, $post_id2);

		}

	}


	// find posts which have been removed
	$old_value = get_field($field_name, $post_id, false);

	if( is_array($old_value) ) {

		foreach( $old_value as $post_id2 ) {

			// bail early if this value has not been removed
			if( is_array($value) && in_array($post_id2, $value) ) continue;


			// load existing related posts
			$value2 = get_field($field_name, $post_id2, false);


			// bail early if no value
			if( empty($value2) ) continue;


			// find the position of $post_id within $value2 so we can remove it
			$pos = array_search($post_id, $value2);


			// remove
			unset( $value2[ $pos] );


			// update the un-selected post's value (use field's key for performance)
			update_field($field_key, $value2, $post_id2);

		}

	}


	// reset global varibale to allow this filter to function as per normal
	$GLOBALS[ $global_name ] = 0;


	// return
    return $value;

}

add_filter('acf/update_value/name=related_posts', 'bidirectional_acf_update_value', 10, 3);


// add_filter( 'woocommerce_checkout_fields' , 'custom_remove_woo_checkout_fields' );

// function custom_remove_woo_checkout_fields( $fields ) {

//     // remove billing fields
// /*
//     unset($fields['billing']['billing_first_name']);
//     unset($fields['billing']['billing_last_name']);
// */
//     unset($fields['billing']['billing_company']);
//     unset($fields['billing']['billing_address_1']);

//     unset($fields['billing']['billing_address_2']);

//     unset($fields['billing']['billing_city']);
//     unset($fields['billing']['billing_postcode']);
//     unset($fields['billing']['billing_country']);
//     unset($fields['billing']['billing_state']);
// /*
//     unset($fields['billing']['billing_phone']);
//     unset($fields['billing']['billing_email']);
// */

//     // remove shipping fields
// /*
//     unset($fields['shipping']['shipping_first_name']);
//     unset($fields['shipping']['shipping_last_name']);
//     unset($fields['shipping']['shipping_company']);
//     unset($fields['shipping']['shipping_address_1']);
// */
//     unset($fields['shipping']['shipping_address_2']);
// /*
//     unset($fields['shipping']['shipping_city']);
//     unset($fields['shipping']['shipping_postcode']);
//     unset($fields['shipping']['shipping_country']);
//     unset($fields['shipping']['shipping_state']);
// */

//     // remove order comment fields
// //     unset($fields['order']['order_comments']);

//     return $fields;
// }


/**
 * Check if this is a request at the backend.
 *
 * @return bool true if is admin request, otherwise false.
 */
function is_admin_request() {
	/**
	 * Get current URL.
	 *
	 * @link https://wordpress.stackexchange.com/a/126534
	 */
	$current_url = home_url( add_query_arg( null, null ) );

	/**
	 * Get admin URL and referrer.
	 *
	 * @link https://core.trac.wordpress.org/browser/tags/4.8/src/wp-includes/pluggable.php#L1076
	 */
	$admin_url = strtolower( admin_url() );
	$referrer  = strtolower( wp_get_referer() );

	// /**
	//  * Check if this is a admin request. If true, it
	//  * could also be a AJAX request from the frontend.
	//  */
	// if ( 0 === strpos( $current_url, $admin_url ) ) {
	// 	/**
	// 	 * Check if the user comes from a admin page.
	// 	 */
	// 	if ( 0 === strpos( $referrer, $admin_url ) ) {
	// 		return true;
	// 	} else {
	// 		/**
	// 		 * Check for AJAX requests.
	// 		 *
	// 		 * @link https://gist.github.com/zitrusblau/58124d4b2c56d06b070573a99f33b9ed#file-lazy-load-responsive-images-php-L193
	// 		 */
	// 		if ( function_exists( 'wp_doing_ajax' ) ) {
	// 			return ! wp_doing_ajax();
	// 		} else {
	// 			return ! ( defined( 'DOING_AJAX' ) && DOING_AJAX );
	// 		}
	// 	}
	// } else {
	return 0 === strpos( $referrer, $admin_url );
	// }
}