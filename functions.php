<?php
require_once 'inc/theme-posttype.php';
require_once 'inc/theme-restapi.php';
include 'meta_box_defs.php';

// add_filter( 'show_admin_bar', '__return_false' );

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
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'lightbox2' );
	wp_enqueue_style( 'lightbox2' );

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
	if(!is_woocommerce()&&!is_product()&&!is_cart()&&!is_checkout()&&!is_account_page()):


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


function export_page_in_json( $post_id, $post, $update ) {
	WPBMap::addAllMappedShortcodes();
	$output = array();
	$path = parse_url(esc_url(get_permalink($post->ID)),PHP_URL_PATH);
	$output["id"]=$post_id;
	$output["title"]=$post->post_title;
	$output["content"]=apply_filters( 'the_content', $post->post_content );
	$output["type"]=$post->post_type;
	$output['path'] = $path;
    $data = json_encode($output);
	
    $upload_dir = wp_get_upload_dir(); // set to save in the /wp-content/uploads folder
    $file_name =  'data.json';
    // $save_path = $upload_dir['basedir'] . '/data/' . $file_name;


    $save_path = ABSPATH . 'data/page' . stripslashes($path) . $file_name;
	$dirname = dirname($save_path);
	if (!is_dir($dirname)) {
		mkdir($dirname, 0755, true);
	 }
	// var_dump($save_path);
	// var_dump($post);
    $f = fopen($save_path, "w"); //if json file doesn't gets saved, comment this and uncomment the one below
    //$f = @fopen( $save_path , "w" ) or die(print_r(error_get_last(),true)); //if json file doesn't gets saved, uncomment this to check for errors
    fwrite($f, $data);
    fclose($f);
}

add_action('save_post_page', 'export_page_in_json', 10,3);