<?php
require_once 'posttype/agenda.php';
require_once 'posttype/artist.php';
require_once 'posttype/project.php';
require_once 'posttype/work.php';

add_action( 'init', 'add_tags_to_pages' );
function add_tags_to_pages() {
	register_taxonomy_for_object_type('post_tag', 'page');
}

// custom post types : artist, work, news
function create_post_type() {
	// register_post_type( 'artist',
	// 	array(
	// 		'labels' => array(
	// 			'name' => __( 'Artists' ),
	// 			'singular_name' => __( 'Artist' ),
	// 		),
  //   'menu_icon' => 'dashicons-admin-users',
  //   'menu_position' => 26,
	// 	'supports' => array('title', 'editor', 'author'),
	// 	'public' => true,
	// 	'has_archive' => 'artists', /* you can rename the slug here */
	// 	// 'register_meta_box_cb' => 'add_artist_metaboxes'
	// 	)
	// );
  // add_post_type_support('artist', 'thumbnail');

	// register_post_type( 'work',
	// 	array(
	// 		'labels' => array(
  // 			'name' => __( 'Works' ),
  // 			'singular_name' => __( 'Work' ),
  // 			),
  //     'menu_icon' => 'dashicons-hammer',
  //     'menu_position' => 27,
  // 		'public' => true,
  // 		'has_archive' => 'works', /* you can rename the slug here */
  // 		'register_meta_box_cb' => 'add_work_metaboxes'
  //     'show_in_rest' => true
  //
	// 	)
	// );
  // add_post_type_support('work', 'thumbnail');


}
// add_action( 'init', 'create_post_type' );

add_action( 'init', 'custom_post_event');
add_action( 'init', 'custom_post_production');
add_action( 'init', 'custom_post_research');
add_action( 'init', 'custom_post_workshop');
add_action( 'init', 'custom_post_residency');

	// adding the function to the Wordpress init
// let's create the function for the custom type
function custom_post_event() {
	// creating (registering) the custom type
	register_post_type( 'event', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
		// let's now add all the options for this post type
		array( 'labels' => array(
			'name' => __( 'Event', 'iii' ), /* This is the Title of the Group */
			'singular_name' => __( 'Event', 'iii' ), /* This is the individual type */
			'all_items' => __( 'All Event', 'iii' ), /* the all items menu item */
			'add_new' => __( 'Add New', 'iii' ), /* The add new menu item */
			'add_new_item' => __( 'Add New Event', 'iii' ), /* Add New Display Title */
			'edit' => __( 'Edit', 'iii' ), /* Edit Dialog */
			'edit_item' => __( 'Edit Event', 'iii' ), /* Edit Display Title */
			'new_item' => __( 'New Event', 'iii' ), /* New Display Title */
			'view_item' => __( 'View Event', 'iii' ), /* View Display Title */
			'search_items' => __( 'Search Event', 'iii' ), /* Search Custom Type Title */
			'not_found' =>  __( 'Nothing found in the Database.', 'iii' ), /* This displays if there are no entries yet */
			'not_found_in_trash' => __( 'Nothing found in Trash', 'iii' ), /* This displays if there is nothing in the trash */
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'Event', 'iii' ), /* Custom Type Description */
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => true,
			'menu_position' => 30, /* this is what order you want it to appear in on the left hand side menu */
			'menu_icon' => 'dashicons-calendar', /* the icon for the custom post type menu */
			'rewrite'	=> array( 'slug' => 'event', 'with_front' => false ), /* you can specify its url slug */
			'has_archive' => 'agenda', /* you can rename the slug here */
			'capability_type' => 'post',
			'hierarchical' => false,
			/* the next one is important, it tells what's enabled in the post editor */
			'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields', 'revisions', 'sticky'),
      'show_in_rest' => true
		) /* end of options */
	); /* end of register post type */

	/* this adds your post categories to your custom post type */
	// register_taxonomy_for_object_type( 'category', 'event' );
	/* this adds your post tags to your custom post type */
	// register_taxonomy_for_object_type( 'post_tag', 'event' );

}


function custom_post_production() {
	// creating (registering) the custom type
	register_post_type( 'production', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
		// let's now add all the options for this post type
		array( 'labels' => array(
			'name' => __( 'Production', 'iii' ), /* This is the Title of the Group */
			'singular_name' => __( 'Production', 'iii' ), /* This is the individual type */
			'all_items' => __( 'All Productions', 'iii' ), /* the all items menu item */
			'add_new' => __( 'Add New', 'iii' ), /* The add new menu item */
			'add_new_item' => __( 'Add New Production', 'iii' ), /* Add New Display Title */
			'edit' => __( 'Edit', 'iii' ), /* Edit Dialog */
			'edit_item' => __( 'Edit Production', 'iii' ), /* Edit Display Title */
			'new_item' => __( 'New Production', 'iii' ), /* New Display Title */
			'view_item' => __( 'View Production', 'iii' ), /* View Display Title */
			'search_items' => __( 'Search Production', 'iii' ), /* Search Custom Type Title */
			'not_found' =>  __( 'Nothing found in the Database.', 'iii' ), /* This displays if there are no entries yet */
			'not_found_in_trash' => __( 'Nothing found in Trash', 'iii' ), /* This displays if there is nothing in the trash */
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'Production', 'iii' ), /* Custom Type Description */
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => true,
			'menu_position' => 29, /* this is what order you want it to appear in on the left hand side menu */
      'menu_icon' => 'dashicons-admin-tools', /* the icon for the custom post type menu */
			'rewrite'	=> array( 'slug' => 'production', 'with_front' => false ), /* you can specify its url slug */
			'has_archive' => 'productions', /* you can rename the slug here */
			'capability_type' => 'post',
			'hierarchical' => false,
			/* the next one is important, it tells what's enabled in the post editor */
			'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'trackbacks', 'custom-fields', 'comments', 'revisions', 'sticky')
		) /* end of options */
	); /* end of register post type */

	/* this adds your post categories to your custom post type */
	// register_taxonomy_for_object_type( 'category', 'production' );
	/* this adds your post tags to your custom post type */
	// register_taxonomy_for_object_type( 'post_tag', 'production' );
  register_taxonomy( 'production_category',
		array('production'), /* if you change the name of register_post_type( 'custom_type', then you have to change this */
		array('hierarchical' => true,     /* if this is true, it acts like categories */
			'labels' => array(
				'name' => __( 'Production Categories', 'tas' ), /* name of the custom taxonomy */
				'singular_name' => __( 'Production Category', 'tas' ), /* single taxonomy name */
				'search_items' =>  __( 'Search Production Categories', 'tas' ), /* search title for taxomony */
				'all_items' => __( 'All Production Categories', 'tas' ), /* all title for taxonomies */
				'parent_item' => __( 'Parent Production Category', 'tas' ), /* parent title for taxonomy */
				'parent_item_colon' => __( 'Parent Production Category:', 'tas' ), /* parent taxonomy title */
				'edit_item' => __( 'Edit Production Category', 'tas' ), /* edit custom taxonomy title */
				'update_item' => __( 'Update Production Category', 'tas' ), /* update title for taxonomy */
				'add_new_item' => __( 'Add New Production Category', 'tas' ), /* add new title for taxonomy */
				'new_item_name' => __( 'New Production Category Name', 'tas' ) /* name title for taxonomy */
			),
			'show_admin_column' => true,
			'show_ui' => true,
			'query_var' => true,
			'rewrite' => array( 'slug' => 'production-category' ),
		)
	);
}

	// adding the function to the Wordpress init



function custom_post_research() {
	// creating (registering) the custom type
	register_post_type( 'research', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
		// let's now add all the options for this post type
		array( 'labels' => array(
			'name' => __( 'Research', 'iii' ), /* This is the Title of the Group */
			'singular_name' => __( 'Research', 'iii' ), /* This is the individual type */
			'all_items' => __( 'All Research', 'iii' ), /* the all items menu item */
			'add_new' => __( 'Add New', 'iii' ), /* The add new menu item */
			'add_new_item' => __( 'Add New Research', 'iii' ), /* Add New Display Title */
			'edit' => __( 'Edit', 'iii' ), /* Edit Dialog */
			'edit_item' => __( 'Edit Research', 'iii' ), /* Edit Display Title */
			'new_item' => __( 'New Research', 'iii' ), /* New Display Title */
			'view_item' => __( 'View Research', 'iii' ), /* View Display Title */
			'search_items' => __( 'Search Research', 'iii' ), /* Search Custom Type Title */
			'not_found' =>  __( 'Nothing found in the Database.', 'iii' ), /* This displays if there are no entries yet */
			'not_found_in_trash' => __( 'Nothing found in Trash', 'iii' ), /* This displays if there is nothing in the trash */
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'Research', 'iii' ), /* Custom Type Description */
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => true,
			'menu_position' => 30, /* this is what order you want it to appear in on the left hand side menu */
			'menu_icon' => 'dashicons-search', /* the icon for the custom post type menu */
			'rewrite'	=> array( 'slug' => 'research', 'with_front' => false ), /* you can specify its url slug */
			'has_archive' => 'research', /* you can rename the slug here */
			'capability_type' => 'post',
			'hierarchical' => false,
			/* the next one is important, it tells what's enabled in the post editor */
			'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'trackbacks', 'custom-fields', 'comments', 'revisions', 'sticky')
		) /* end of options */
	); /* end of register post type */

	/* this adds your post categories to your custom post type */
	// register_taxonomy_for_object_type( 'category', 'production' );
	/* this adds your post tags to your custom post type */
	// register_taxonomy_for_object_type( 'post_tag', 'production' );

}

	// adding the function to the Wordpress init

function custom_post_residency() {
	// creating (registering) the custom type
	register_post_type( 'residency', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
		// let's now add all the options for this post type
		array( 'labels' => array(
			'name' => __( 'Residency', 'iii' ), /* This is the Title of the Group */
			'singular_name' => __( 'Residency', 'iii' ), /* This is the individual type */
			'all_items' => __( 'All Residencies', 'iii' ), /* the all items menu item */
			'add_new' => __( 'Add New', 'iii' ), /* The add new menu item */
			'add_new_item' => __( 'Add New Residency', 'iii' ), /* Add New Display Title */
			'edit' => __( 'Edit', 'iii' ), /* Edit Dialog */
			'edit_item' => __( 'Edit Residency', 'iii' ), /* Edit Display Title */
			'new_item' => __( 'New Residency', 'iii' ), /* New Display Title */
			'view_item' => __( 'View Residency', 'iii' ), /* View Display Title */
			'search_items' => __( 'Search Residency', 'iii' ), /* Search Custom Type Title */
			'not_found' =>  __( 'Nothing found in the Database.', 'iii' ), /* This displays if there are no entries yet */
			'not_found_in_trash' => __( 'Nothing found in Trash', 'iii' ), /* This displays if there is nothing in the trash */
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'Residency', 'iii' ), /* Custom Type Description */
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => true,
			'menu_position' => 31, /* this is what order you want it to appear in on the left hand side menu */
			'menu_icon' => 'dashicons-admin-home', /* the icon for the custom post type menu */
			'rewrite'	=> array( 'slug' => 'residency', 'with_front' => false ), /* you can specify its url slug */
			'has_archive' => 'residencies', /* you can rename the slug here */
            /* Custom archive label.  Must filter 'post_type_archive_title' to use. */
            'archive_title' => __( 'Residencies', 'iii' ),
			'capability_type' => 'post',
			'hierarchical' => false,
			/* the next one is important, it tells what's enabled in the post editor */
			'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'trackbacks', 'custom-fields', 'comments', 'revisions', 'sticky')
		) /* end of options */
	); /* end of register post type */

	/* this adds your post categories to your custom post type */
	// register_taxonomy_for_object_type( 'category', 'production' );
	/* this adds your post tags to your custom post type */
	// register_taxonomy_for_object_type( 'post_tag', 'production' );

}

	// adding the function to the Wordpress init
/****************************************************************/

function custom_post_workshop() {
	// creating (registering) the custom type
	register_post_type( 'workshop', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
		// let's now add all the options for this post type
		array( 'labels' => array(
			'name' => __( 'Workshop', 'iii' ), /* This is the Title of the Group */
			'singular_name' => __( 'Workshop', 'iii' ), /* This is the individual type */
			'all_items' => __( 'All Workshop', 'iii' ), /* the all items menu item */
			'add_new' => __( 'Add New', 'iii' ), /* The add new menu item */
			'add_new_item' => __( 'Add New Workshop', 'iii' ), /* Add New Display Title */
			'edit' => __( 'Edit', 'iii' ), /* Edit Dialog */
			'edit_item' => __( 'Edit Workshop', 'iii' ), /* Edit Display Title */
			'new_item' => __( 'New Workshop', 'iii' ), /* New Display Title */
			'view_item' => __( 'View Workshop', 'iii' ), /* View Display Title */
			'search_items' => __( 'Search Workshop', 'iii' ), /* Search Custom Type Title */
			'not_found' =>  __( 'Nothing found in the Database.', 'iii' ), /* This displays if there are no entries yet */
			'not_found_in_trash' => __( 'Nothing found in Trash', 'iii' ), /* This displays if there is nothing in the trash */
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'Workshop', 'iii' ), /* Custom Type Description */
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => true,
			'menu_position' => 32, /* this is what order you want it to appear in on the left hand side menu */
			'menu_icon' => 'dashicons-groups', /* the icon for the custom post type menu */
			'rewrite'	=> array( 'slug' => 'workshop', 'with_front' => false ), /* you can specify its url slug */
			'has_archive' => 'workshop', /* you can rename the slug here */
			'capability_type' => 'post',
			'hierarchical' => false,
			/* the next one is important, it tells what's enabled in the post editor */
			'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'trackbacks', 'custom-fields', 'comments', 'revisions', 'sticky')
		) /* end of options */
	); /* end of register post type */

	/* this adds your post categories to your custom post type */
	// register_taxonomy_for_object_type( 'category', 'production' );
	/* this adds your post tags to your custom post type */
	// register_taxonomy_for_object_type( 'post_tag', 'production' );

}

	// adding the function to the Wordpress init
	//
