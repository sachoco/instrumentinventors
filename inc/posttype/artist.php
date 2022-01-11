<?php
add_action( 'init', 'custom_post_artist');

function custom_post_artist() {
	register_post_type( 'artist',
		array(
			'labels' => array(
				'name' => __( 'Artists' ),
				'singular_name' => __( 'Artist' ),
			),
			'menu_icon' => 'dashicons-admin-users',
			'menu_position' => 26,
			'supports' => array('title', 'editor', 'author'),
			'public' => true,
			'has_archive' => 'artists', /* you can rename the slug here */
			'taxonomies' => array('post_tag'),
			'show_in_rest' => true,
			// 'register_meta_box_cb' => 'add_artist_metaboxes'
		)
	);
		add_post_type_support('artist', 'thumbnail');
}


function filter_artist_by_acf_field( $post_type, $which ) {

	// Apply this only on a specific post type
	if ( 'artist' !== $post_type )
		return;

	// A list of taxonomy slugs to filter by
	$acf_fields = array( 'badges' );
		// $acf_fields = array( 'field_615a077d70aaf' );

	foreach ( $acf_fields as $acf_field ) {

		// Retrieve taxonomy terms
		$field = get_field_object( $acf_field );
			// var_dump($field);
		// Display filter HTML
		echo "<select name='{$field["name"]}' id='{$field["name"]}' class='postform'>";
		echo '<option value="">' . sprintf( esc_html__( 'Show All %s', 'iii' ), $field["label"] ) . '</option>';
			if( $field['choices'] ):
		foreach ( $field['choices'] as $value => $label ) {
			printf(
				'<option value="%1$s" %2$s>%3$s</option>',
				$value,
				( ( isset( $_GET[$acf_field] ) && ( $_GET[$acf_field] == $value ) ) ? ' selected="selected"' : '' ),
				$label
			);
		}
			endif;
		echo '</select>';
	}

}
add_action( 'restrict_manage_posts', 'filter_artist_by_acf_field' , 10, 2);

function admin_artist_filter( $query )
{
	global $pagenow;
	if(!empty($query->query_vars['post_type'])){
		$post_type = $query->query_vars['post_type'];
		if ( is_admin() && isset($_GET['post_type']) && $_GET['post_type']=='artist' && $pagenow=='edit.php' && isset($_GET['badges']) && $_GET['badges'] != '' && $post_type=='artist') {
			$query->query_vars['meta_query'][] = array(
				'key' => 'badges',
				'value' => $_GET['badges'],
				'compare' => 'LIKE'
			);
		}
	}
}
add_filter( 'parse_query', 'admin_artist_filter' );


/*
 * Add Menu Order field to artist
 */

add_action('admin_init', 'iii_add_artist_page_attributes');
function iii_add_artist_page_attributes(){
    add_post_type_support( 'artist', 'page-attributes' );
}
/**
* add order column to admin listing screen
*/
function add_new_artist_column($post_columns) {
	$post_columns['menu_order'] = "Order";
	return $post_columns;
}
add_action('manage_edit-artist_columns', 'add_new_artist_column');
/**
* show custom order column values
*/
function show_order_column($name){
	global $post;
  
	switch ($name) {
	  case 'menu_order':
		$order = $post->menu_order;
		echo $order;
		break;
	 default:
		break;
	 }
}
add_action('manage_artist_posts_custom_column','show_order_column');
/**
* make column sortable
*/
function order_column_register_sortable($columns){
	$columns['menu_order'] = 'menu_order';
	return $columns;
}
add_filter('manage_edit-artist_sortable_columns','order_column_register_sortable');
  




function menu_order_update_value( $value, $post_id, $field  ) {
	$menu_order = 0;
	
	if(in_array("resident",$value)){
		$menu_order = 3;
	}else if(in_array("iii_member",$value)){
		$menu_order = 2;
	}else if(in_array("workspace_member",$value)){
		$menu_order = 1;
	}
	// var_dump($value);
	$post = array(
		'ID'           => $post_id,
		'menu_order' => $menu_order,
	);
	// Update the post into the database
	wp_update_post( $post );
	// return
    return $value;

}

add_filter('acf/update_value/name=badges', 'menu_order_update_value', 10, 3);







// Add the Artist Meta Boxes

// function add_artist_metaboxes() {
// 	add_meta_box('artist_url', '[!!!OBSOLETE] Website (without http://)', 'artist_url', 'artist', 'side', 'default');
// 	add_meta_box('artist_email', '[!!!OBSOLETE] Email', 'artist_email', 'artist', 'side', 'default');
// }


// // The Artist Metaboxes

// function artist_url() {
// 	global $post;

// 	// Noncename needed to verify where the data originated
// 	echo '<input type="hidden" name="artistmeta_noncename" id="artistmeta_noncename" value="' .
// 	wp_create_nonce( plugin_basename(__FILE__) ) . '" />';

// 	// Get the location data if its already been entered
// 	$url = get_post_meta($post->ID, '_url', true);

// 	// Echo out the field
// 	echo '<input type="text" name="_url" value="' . $url . '" class="widefat" />';

// }

// function artist_email() {
// 	global $post;

// 	// Noncename needed to verify where the data originated
// 	echo '<input type="hidden" name="artistmeta_noncename" id="artistmeta_noncename" value="' .
// 	wp_create_nonce( plugin_basename(__FILE__) ) . '" />';

// 	// Get the location data if its already been entered
// 	$url = get_post_meta($post->ID, '_email', true);

// 	// Echo out the field
// 	echo '<input type="text" name="_email" value="' . $url . '" class="widefat" />';

// }



// // Save the Metabox Data

// function save_artist_meta($post_id, $post) {

// 	// verify this came from the our screen and with proper authorization,
// 	// because save_post can be triggered at other times
// 	if ( !wp_verify_nonce( $_POST['artistmeta_noncename'], plugin_basename(__FILE__) )) {
// 		return $post->ID;
// 	}

// 	// Is the user allowed to edit the post or page?
// 	if ( !current_user_can( 'edit_post', $post->ID ))
// 		return $post->ID;

// 	// OK, we're authenticated: we need to find and save the data
//   // We'll put it into an array to make it easier to loop though.

// 	$artist_meta['_url'] = $_POST['_url'];
// 	$artist_meta['_email'] = $_POST['_email'];

// 	// Add values of $artist_meta as custom fields

// 	foreach ($artist_meta as $key => $value) { // Cycle through the $events_meta array!
// 		if( $post->post_type == 'revision' ) return; // Don't store custom data twice
//     $value = implode(',', (array)$value); // If $value is an array, make it a CSV (unlikely)
//     if(get_post_meta($post->ID, $key, FALSE)) { // If the custom field already has a value
//       update_post_meta($post->ID, $key, $value);
//     } else { // If the custom field doesn't have a value
// 			add_post_meta($post->ID, $key, $value);
// 		}
// 		if(!$value) delete_post_meta($post->ID, $key); // Delete if blank
// 	}

// }
// add_action('save_post', 'save_artist_meta', 1, 2); // save the custom fields
