<?php
add_action( 'init', 'custom_post_project');

function custom_post_project() {
  // creating (registering) the custom type
  register_post_type( 'project', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
    // let's now add all the options for this post type
    array( 'labels' => array(
      'name' => __( 'Projects', 'iii' ), /* This is the Title of the Group */
      'singular_name' => __( 'Project', 'iii' ), /* This is the individual type */
      'all_items' => __( 'All Artworks', 'iii' ), /* the all items menu item */
      'add_new' => __( 'Add New', 'iii' ), /* The add new menu item */
      'add_new_item' => __( 'Add New Project', 'iii' ), /* Add New Display Title */
      'edit' => __( 'Edit', 'iii' ), /* Edit Dialog */
      'edit_item' => __( 'Edit Project', 'iii' ), /* Edit Display Title */
      'new_item' => __( 'New Project', 'iii' ), /* New Display Title */
      'view_item' => __( 'View Project', 'iii' ), /* View Display Title */
      'search_items' => __( 'Search Artworks', 'iii' ), /* Search Custom Type Title */
      'not_found' =>  __( 'Nothing found in the Database.', 'iii' ), /* This displays if there are no entries yet */
      'not_found_in_trash' => __( 'Nothing found in Trash', 'iii' ), /* This displays if there is nothing in the trash */
      'parent_item_colon' => ''
      ), /* end of arrays */
      'description' => __( 'Project', 'iii' ), /* Custom Type Description */
      'public' => true,
      'publicly_queryable' => true,
      'exclude_from_search' => false,
      'show_ui' => true,
      'query_var' => true,
      'menu_position' => 28, /* this is what order you want it to appear in on the left hand side menu */
      'menu_icon' => 'dashicons-hammer', /* the icon for the custom post type menu */
      'rewrite'	=> array( 'slug' => 'project', 'with_front' => false ), /* you can specify its url slug */
      'has_archive' => 'projects', /* you can rename the slug here */
      'capability_type' => 'post',
      'hierarchical' => false,
      /* the next one is important, it tells what's enabled in the post editor */
      'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields', 'revisions', 'sticky'),
      'show_in_rest' => true,
      'taxonomies' => array('post_tag'),
    ) /* end of options */
  ); /* end of register post type */
}
