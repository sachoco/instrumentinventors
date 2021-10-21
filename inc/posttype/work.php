<?php
// Add the Work Meta Boxes
register_post_type( 'work',
  array(
    'labels' => array(
      'name' => __( 'Works' ),
      'singular_name' => __( 'Work' ),
      ),
    'menu_icon' => 'dashicons-hammer',
    'menu_position' => 30,
    'public' => true,
    'has_archive' => 'works', /* you can rename the slug here */
    // 'register_meta_box_cb' => 'add_work_metaboxes',
    'show_in_rest' => true

  )
);
// add_post_type_support('work', 'thumbnail');
//
// function add_work_metaboxes() {
// 	if (is_admin()) { }
//     add_meta_box('work_date', 'Year', 'work_date', 'work', 'side', 'default');
//     //add_meta_box('artist_email', 'Email', 'artist_email', 'artist', 'side', 'default');
// }
//
// // The Work Metaboxes
//
// function work_date() {
// 	global $post;
//
// 	// Noncename needed to verify where the data originated
// 	echo '<input type="hidden" name="workmeta_noncename" id="workmeta_noncename" value="' .
// 	wp_create_nonce( plugin_basename(__FILE__) ) . '" />';
//
// 	// Get the location data if its already been entered
// 	$date = get_post_meta($post->ID, '_date', true);
//
// 	// Echo out the field
// 	echo '<input type="text" name="_date" value="' . $date  . '" class="widefat" />';
//
// }
//
// // Save the Metabox Data
//
// function save_work_meta($post_id, $post) {
//
// 	// verify this came from the our screen and with proper authorization,
// 	// because save_post can be triggered at other times
// 	if ( !wp_verify_nonce( $_POST['workmeta_noncename'], plugin_basename(__FILE__) )) {
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
// 	$work_meta['_date'] = $_POST['_date'];
// //	$artist_meta['_email'] = $_POST['_email'];
//
// 	// Add values of $artist_meta as custom fields
//
// 	foreach ($work_meta as $key => $value) { // Cycle through the $events_meta array!
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
// add_action('save_post', 'save_work_meta', 1, 2); // save the custom fields
