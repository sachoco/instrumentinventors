<?php
add_action( 'init', 'custom_post_agenda');

function custom_post_agenda() {
  // creating (registering) the custom type
  register_post_type( 'agenda', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
    // let's now add all the options for this post type
    array( 'labels' => array(
      'name' => __( 'Agenda', 'iii' ), /* This is the Title of the Group */
      'singular_name' => __( 'Agenda', 'iii' ), /* This is the individual type */
      'all_items' => __( 'All Agenda', 'iii' ), /* the all items menu item */
      'add_new' => __( 'Add New', 'iii' ), /* The add new menu item */
      'add_new_item' => __( 'Add New Agenda', 'iii' ), /* Add New Display Title */
      'edit' => __( 'Edit', 'iii' ), /* Edit Dialog */
      'edit_item' => __( 'Edit Agenda', 'iii' ), /* Edit Display Title */
      'new_item' => __( 'New Agenda', 'iii' ), /* New Display Title */
      'view_item' => __( 'View Agenda', 'iii' ), /* View Display Title */
      'search_items' => __( 'Search Agenda', 'iii' ), /* Search Custom Type Title */
      'not_found' =>  __( 'Nothing found in the Database.', 'iii' ), /* This displays if there are no entries yet */
      'not_found_in_trash' => __( 'Nothing found in Trash', 'iii' ), /* This displays if there is nothing in the trash */
      'parent_item_colon' => ''
      ), /* end of arrays */
      'description' => __( 'Agenda', 'iii' ), /* Custom Type Description */
      'public' => true,
      'publicly_queryable' => true,
      'exclude_from_search' => false,
      'show_ui' => true,
      'query_var' => true,
      'menu_position' => 28, /* this is what order you want it to appear in on the left hand side menu */
      'menu_icon' => 'dashicons-calendar', /* the icon for the custom post type menu */
      'rewrite'	=> array( 'slug' => 'agenda', 'with_front' => false ), /* you can specify its url slug */
      'has_archive' => 'agenda', /* you can rename the slug here */
      'capability_type' => 'post',
      'hierarchical' => false,
      /* the next one is important, it tells what's enabled in the post editor */
      'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields', 'revisions', 'sticky'),
      'show_in_rest' => true,
      'taxonomies' => array('post_tag'),
    ) /* end of options */
  ); /* end of register post type */

  // register_taxonomy( 'agenda_category',
  //   array('agenda'), /* if you change the name of register_post_type( 'custom_type', then you have to change this */
  //   array('hierarchical' => true,     /* if this is true, it acts like categories */
  //     'labels' => array(
  //       'name' => __( 'Agenda Categories', 'iii' ), /* name of the custom taxonomy */
  //       'singular_name' => __( 'Agenda Category', 'iii' ), /* single taxonomy name */
  //       'search_items' =>  __( 'Search Agenda Categories', 'iii' ), /* search title for taxomony */
  //       'all_items' => __( 'All Agenda Categories', 'iii' ), /* all title for taxonomies */
  //       'parent_item' => __( 'Parent Agenda Category', 'iii' ), /* parent title for taxonomy */
  //       'parent_item_colon' => __( 'Parent Agenda Category:', 'iii' ), /* parent taxonomy title */
  //       'edit_item' => __( 'Edit Agenda Category', 'iii' ), /* edit custom taxonomy title */
  //       'update_item' => __( 'Update Agenda Category', 'iii' ), /* update title for taxonomy */
  //       'add_new_item' => __( 'Add New Agenda Category', 'iii' ), /* add new title for taxonomy */
  //       'new_item_name' => __( 'New Agenda Category Name', 'iii' ) /* name title for taxonomy */
  //     ),
  //     'show_admin_column' => true,
  //     'show_ui' => true,
  //     'query_var' => true,
  //     'rewrite' => array( 'slug' => 'agenda-category' ),
  //     'show_in_rest' => true,
  //   )
  // );


}



function filter_agenda_by_taxonomies( $post_type, $which ) {

	// Apply this only on a specific post type
	if ( 'agenda' !== $post_type )
		return;

	// A list of taxonomy slugs to filter by
	$taxonomies = array( 'agenda_category' );

	foreach ( $taxonomies as $taxonomy_slug ) {

		// Retrieve taxonomy data
		$taxonomy_obj = get_taxonomy( $taxonomy_slug );
		$taxonomy_name = $taxonomy_obj->labels->name;

		// Retrieve taxonomy terms
		$terms = get_terms( $taxonomy_slug );

		// Display filter HTML
		echo "<select name='{$taxonomy_slug}' id='{$taxonomy_slug}' class='postform'>";
		echo '<option value="">' . sprintf( esc_html__( 'Show All %s', 'iii' ), $taxonomy_name ) . '</option>';
		foreach ( $terms as $term ) {
			printf(
				'<option value="%1$s" %2$s>%3$s (%4$s)</option>',
				$term->slug,
				( ( isset( $_GET[$taxonomy_slug] ) && ( $_GET[$taxonomy_slug] == $term->slug ) ) ? ' selected="selected"' : '' ),
				$term->name,
				$term->count
			);
		}
		echo '</select>';
	}

}
// add_action( 'restrict_manage_posts', 'filter_agenda_by_taxonomies' , 10, 2);

/*
 * Add columns to exhibition post list
 */
 function add_acf_columns ( $columns ) {
   return array_merge ( $columns, array (
     // 'is_workshop' => __ ( 'Is Workshop' ),
     'date_from' => __ ( 'Date From' ),
     'date_until'   => __ ( 'Date Until' ),
     'featured_on_homepage'   => __ ( 'Featured?' )
   ) );
 }
 // add_filter ( 'manage_agenda_posts_columns', 'add_acf_columns' );
/*
 * Add columns to exhibition post list
 */
 function agenda_custom_column ( $column, $post_id ) {
   switch ( $column ) {
     case 'date_from':
       echo get_post_meta ( $post_id, 'date_from', true );
       break;
     case 'date_until':
       echo get_post_meta ( $post_id, 'date_until', true );
       break;
     case 'is_workshop':
       echo get_post_meta ( $post_id, 'is_workshop', true );
       break;
     case 'featured_on_homepage':
       echo get_post_meta ( $post_id, 'featured_on_homepage', true );
       break;
   }
 }
 // add_action ( 'manage_agenda_posts_custom_column', 'agenda_custom_column', 10, 2 );
