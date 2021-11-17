<?php

require_once 'rest-api/agenda.php';
require_once 'rest-api/post.php';
require_once 'rest-api/project.php';
require_once 'rest-api/artist.php';
require_once 'rest-api/search.php';
require_once 'rest-api/menu.php';
require_once 'rest-api/filter-item.php';
require_once 'rest-api/get-featured.php';
require_once 'rest-api/get-related.php';

require_once 'rest-api/common.php';

require_once 'rest-api/wpml.php';

/**
 * Register the /wp-json/acf/v3/posts endpoint so it will be cached.
 */
function wprc_add_acf_posts_endpoint( $allowed_endpoints ) {
    if ( ! isset( $allowed_endpoints[ 'acf/v3' ] ) || ! in_array( 'posts', $allowed_endpoints[ 'acf/v3' ] ) ) {
        $allowed_endpoints[ 'acf/v3' ][] = 'posts';
    }
    return $allowed_endpoints;
}
add_filter( 'wp_rest_cache/allowed_endpoints', 'wprc_add_acf_posts_endpoint', 10, 1);


function wprc_add_iii_endpoint( $allowed_endpoints ) {
    if ( ! isset( $allowed_endpoints[ 'iii' ] ) || ! in_array( 'menu', $allowed_endpoints[ 'iii' ] )|| ! in_array( 'related', $allowed_endpoints[ 'iii' ] )|| ! in_array( 'filterItems', $allowed_endpoints[ 'iii' ] )|| ! in_array( 'getFeatured', $allowed_endpoints[ 'iii' ] ) ) {
        $allowed_endpoints[ 'iii' ][] = 'menu';
        $allowed_endpoints[ 'iii' ][] = 'related';
        $allowed_endpoints[ 'iii' ][] = 'filterItems';
        $allowed_endpoints[ 'iii' ][] = 'getFeatured';
    }
    return $allowed_endpoints;
}
add_filter( 'wp_rest_cache/allowed_endpoints', 'wprc_add_iii_endpoint', 10, 1);



add_action( 'rest_api_init', function ()
{
  if ( ! is_admin() ) {
    register_rest_field(
       array('post','page','artist','agenda','project'),
       'content',
       array(
              'get_callback'    => 'htr_do_shortcodes',
              'update_callback' => null,
              'schema'          => null,
       )
    );
  }

});
function htr_do_shortcodes( $object, $field_name, $request ){
   WPBMap::addAllMappedShortcodes();
   global $post;
   $post = get_post ($object['id']);
   $output['rendered'] = apply_filters( 'the_content', $post->post_content );
   return $output;
}
