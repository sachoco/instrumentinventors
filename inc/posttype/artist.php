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



  // Add the Artist Meta Boxes
  //
  // function add_artist_metaboxes() {
  //     add_meta_box('artist_url', 'Website (without http://)', 'artist_url', 'artist', 'side', 'default');
  //     add_meta_box('artist_email', 'Email', 'artist_email', 'artist', 'side', 'default');
  // }
  //
  //
  // // The Artist Metaboxes
  //
  // function artist_url() {
  // 	global $post;
  //
  // 	// Noncename needed to verify where the data originated
  // 	echo '<input type="hidden" name="artistmeta_noncename" id="artistmeta_noncename" value="' .
  // 	wp_create_nonce( plugin_basename(__FILE__) ) . '" />';
  //
  // 	// Get the location data if its already been entered
  // 	$url = get_post_meta($post->ID, '_url', true);
  //
  // 	// Echo out the field
  // 	echo '<input type="text" name="_url" value="' . $url  . '" class="widefat" />';
  //
  // }
  //
  // function artist_email() {
  // 	global $post;
  //
  // 	// Noncename needed to verify where the data originated
  // 	echo '<input type="hidden" name="artistmeta_noncename" id="artistmeta_noncename" value="' .
  // 	wp_create_nonce( plugin_basename(__FILE__) ) . '" />';
  //
  // 	// Get the location data if its already been entered
  // 	$url = get_post_meta($post->ID, '_email', true);
  //
  // 	// Echo out the field
  // 	echo '<input type="text" name="_email" value="' . $url  . '" class="widefat" />';
  //
  // }
  //
  //
  //
  // // Save the Metabox Data
  //
  // function save_artist_meta($post_id, $post) {
  //
  // 	// verify this came from the our screen and with proper authorization,
  // 	// because save_post can be triggered at other times
  // 	if ( !wp_verify_nonce( $_POST['artistmeta_noncename'], plugin_basename(__FILE__) )) {
  // 	return $post->ID;
  // 	}
  //
  // 	// Is the user allowed to edit the post or page?
  // 	if ( !current_user_can( 'edit_post', $post->ID ))
  // 		return $post->ID;
  //
  // 	// OK, we're authenticated: we need to find and save the data
  // 	// We'll put it into an array to make it easier to loop though.
  //
  // 	$artist_meta['_url'] = $_POST['_url'];
  // 	$artist_meta['_email'] = $_POST['_email'];
  //
  // 	// Add values of $artist_meta as custom fields
  //
  // 	foreach ($artist_meta as $key => $value) { // Cycle through the $events_meta array!
  // 		if( $post->post_type == 'revision' ) return; // Don't store custom data twice
  // 		$value = implode(',', (array)$value); // If $value is an array, make it a CSV (unlikely)
  // 		if(get_post_meta($post->ID, $key, FALSE)) { // If the custom field already has a value
  // 			update_post_meta($post->ID, $key, $value);
  // 		} else { // If the custom field doesn't have a value
  // 			add_post_meta($post->ID, $key, $value);
  // 		}
  // 		if(!$value) delete_post_meta($post->ID, $key); // Delete if blank
  // 	}
  //
  // }
  // add_action('save_post', 'save_artist_meta', 1, 2); // save the custom fields
