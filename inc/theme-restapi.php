<?php
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

require_once 'rest-api/get-featured.php';

function query_post($args, $request) {
  if(isset($request['include_page'])){
    $args['post_type'] = array('post','page');
  }
  if(isset($request['cat'])) {
    $args['cat'] = $request['cat'];
  }
  return $args;
}
add_filter('rest_post_query', 'query_post', 10, 2);



function query_agenda($args, $request) {
  $args['meta_key'] = 'date_from';
  $args['orderby'] = 'meta_value_num';
  $args['meta_query'] = array('relation' => 'AND');

    if(isset($request["cat"])) {
      $args['meta_query'][] = array(
          'key' => 'category',
          'value' => $request["cat"],
          'compare' => 'LIKE'
      );
    }
    if(isset($request["subcat"])) {
      foreach( explode(",",$request["subcat"]) as $item ){
        $args['meta_query'][] = array(
          'key'     => 'host_|_circulation',
          'value'   => $item,
          'compare' => 'LIKE',
        );
      }
      // $args['meta_query'][] = array(
      //     'key' => 'host_|_circulation',
      //     'value' => explode(",",$request["subcat"]),
      //     'compare' => 'LIKE'
      // );

    }

    if(isset($request["upcoming"])) {
        $args['meta_key'] = 'date_from';
        $args['orderby'] = 'meta_value_num';
        $args['meta_query'][] = array(
          'relation' => 'OR',
          array(
              'key' => 'date_from',
              'value' => date("Ymd", strtotime("now")),
              'type' => 'NUMERIC',
              'compare' => '>='
          ),
          array(
              'key' => 'date_until',
              'value' => date("Ymd", strtotime("now")),
              'type' => 'NUMERIC',
              'compare' => '>='
          ),
        );
    }else if(isset($request["featured"])) {
      $args['meta_key'] = 'date_from';
  		$args['orderby'] = 'meta_value_num';
  		$args['order'] = 'ASC';
  		$args['meta_query'][] = array(
  			'relation' => 'AND',
        array(
          'relation' => 'OR',
          array(
            'key' => 'date_from',
            'value' => date("Ymd", strtotime("now")),
            'type' => 'NUMERIC',
            'compare' => '>='
          ),
          array(
            'key' => 'date_until',
            'value' => date("Ymd", strtotime("now")),
            'type' => 'NUMERIC',
            'compare' => '>='
          )
        ),
        array(
          'key' => 'featured_on_homepage',
          'value' => true,
          'compare' => 'LIKE'
        )
  		);
    }

    return $args;
}
add_filter('rest_agenda_query', 'query_agenda', 10, 2);



function query_project($args, $request) {
  // $args['meta_key'] = 'year';
  // $args['orderby'] = 'meta_value_num';
  $args['meta_query'] = array('relation' => 'AND');

  if(isset($request["cat"])) {
    $args['meta_query'][] = array(
        'key' => 'category',
        'value' => $request["cat"],
        'compare' => 'LIKE'
    );
  }
  if(isset($request["subcat"])) {

    foreach( explode(",",$request["subcat"]) as $item ){
      if(strpos($request["subcat"], "host") === FALSE&&strpos($request["subcat"], "circulation") === FALSE){
        $args['meta_query'][] = array(
          'key'     => 'type',
          'value'   => $item,
          'compare' => 'LIKE',
        );
      }else{
        $args['meta_query'][] = array(
          'key'     => 'host_|_circulation',
          'value'   => $item,
          'compare' => 'LIKE',
        );
      }
    }
  }

  if(isset($request["is_agency"])) {
    $args['meta_query'][] = array(
        'key' => 'is_agency',
        'value' => true,
        'compare' => '=='
    );
  }
  if(isset($request["is_highlighted"])) {
    $args['meta_query'][] = array(
        'key' => 'is_highlighted',
        'value' => true,
        'compare' => '=='
    );
  }

    return $args;
}
add_filter('rest_project_query', 'query_project', 10, 2);




function query_artist($args, $request) {
  // $args['meta_key'] = 'date_from';
  // $args['orderby'] = 'meta_value_num';
  $args['meta_query'] = array('relation' => 'AND');

  if(isset($request["cat"])) {
    $args['meta_query'][] = array(
        'key' => 'badges',
        'value' => $request["cat"],
        'compare' => 'LIKE'
    );
  }
  if(isset($request["is_highlighted"])) {
    $args['meta_query'][] = array(
        'key' => 'is_highlighted',
        'value' => true,
        'compare' => '=='
    );
  }

  return $args;
}
add_filter('rest_artist_query', 'query_artist', 10, 2);

/**
 * Add a Formatted Date to the WordPress REST API JSON Post Object
 *
 * https://adambalee.com/?p=1547
 */
add_action('rest_api_init', function() {
    register_rest_field(
        array('post'),
        'formatted_date',
        array(
            'get_callback'    => function() {
                return get_the_date();
            },
            'update_callback' => null,
            'schema'          => null,
        )
    );
});

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

add_action('rest_api_init', 'register_rest_search' );
function register_rest_search(){
    register_rest_field( 'search-result',
        'featured_image',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'search-result',
        'search_result',
        array(
            'get_callback'    => function ( $object ) {
                    return true;
                },
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
function get_rest_featured_image( $object, $field_name, $request ) {
  $postId = $object['id'];
  $attachmentId = get_post_thumbnail_id( $postId );
  if($attachmentId){
    $img = wp_get_attachment_image_src( $attachmentId, 'medium_large' );
    return $img[0];
  }
  return false;
}


function get_menu() {
  $menus = array();//wp_get_nav_menus();
  $menu_slug = get_nav_menu_locations();
  foreach($menu_slug as $key => $value){
    $items = wp_get_nav_menu_items($value);
    if(is_array($items)){
      $menus[$key] = array_map('extract_from_menu', $items);
    }
  }
  return $menus;
  // $x = wp_get_nav_menu_items('about-menu');
  // $x = wp_get_nav_menu_items('about-menu');
  // $x = wp_get_nav_menu_items('about-menu');
  // $menu = array();
  // $submenu = array();
  // foreach($x as $y){
  //   $y-> submenu = array();
  //   if($y->menu_item_parent === '0')
  //     array_push($menu, $y);
  //   else
  //     array_push($submenu, $y);
  // }
  // for($i=0; $i < count($submenu); $i++) {
  //   $index = get_index($menu,$submenu[$i]->menu_item_parent);
  //   if($index > -1) {
  //     array_push($menu[$index]->submenu,$submenu[$i]);
  //   }
  // }
  // return $menu;
}
function extract_from_menu($menu){
  return array("title"=>$menu->title, "path"=>parse_url($menu->url)['path']);
}
function get_index($menu,$parent_id){
  $index = -1;
  for($i = 0; $i < count($menu); $i++) {
    if((string)$menu[$i]->ID === $parent_id) {
      $index = $i;
      break;
    }
  }
  return $index;
}

function get_related( $request ) {
  $slug = $request['slug'];
  $posttype = $request['posttype'];

  if ( $post = get_page_by_path( $slug, OBJECT, $posttype ) ) {
    $id = $post->ID;
  } else {
    return new WP_Error( 'empty_post', 'there is no post', array('status' => 404) );
  }

  $related_posts = get_field('related_posts',$id);

  //
  $data = [];
  if ( ! empty( $related_posts ) ) {
    foreach ( $related_posts as $post ) {
      $post_data['id'] = $post->ID;
      $post_data['title'] = $post->post_title;
      $post_data['subtype'] = $post->post_type;
      $post_data['tag'] = get_the_tags($post->ID);
      $post_data['url'] = esc_url(get_permalink($post->ID));
      $post_data['featured_image'] = get_the_post_thumbnail_url($post->ID,'medium_large');
      $post_data['related_result'] = true;
      array_push($data,  $post_data );
    }
  }
  // Return all of our comment response data.
  return new WP_REST_Response($data, 200);
}

function get_filter_items( $request ) {
  $posttype = $request['posttype'];
  $data = array();
  function format_data($obj){
    return array("value"=>$obj->term_id, "name"=>$obj->name);
  }
  function get_choices($field_id){
    $field = get_field_object($field_id);
    $choices = [];
    foreach($field['choices'] as $key=>$value) {
      array_push($choices, array("value"=>$key,"name"=>$value));
    }
    return $choices;
  }
  function get_filter_by_posttype($posttype){
    $data = array();
    if($posttype=="posts"){
      $cat = get_terms( array(
        'taxonomy' => 'category',
        'hide_empty' => true,
      ) );
      $data['cat'] = array_map('format_data', $cat);
      $tag = get_terms_per_post_type( 'post_tag', array( 'post_type' => 'post' ) );
      $data['tag'] = array_map('format_data', $tag);

    }else if($posttype=="artist"){
      $data['cat'] = get_choices('field_615a077d70aaf');
      $tag = get_terms_per_post_type( 'post_tag', array( 'post_type' => 'artist' ) );
      $data['tag'] = array_map('format_data', $tag);

    }else if($posttype=="agenda"){
      $data['cat'] = get_choices('field_615a1faff19c4');
      $data['subcat'] = get_choices('field_55c5b0997cd1f');
      $tag = get_terms_per_post_type( 'post_tag', array( 'post_type' => 'agenda' ) );
      $data['tag'] = array_map('format_data', $tag);

    }else if($posttype=="project"){
      $data['cat'] = get_choices('field_615a25b7a5c5f');
      $data['subcat']["curated_programs"] = get_choices('field_615a26e97d0a0');
      $data['subcat']["editions"] = get_choices('field_615a2778945ea');
      $tag = get_terms_per_post_type( 'post_tag', array( 'post_type' => 'project' ) );
      $data['tag'] = array_map('format_data', $tag);
    }
    return $data;
  }


  $data = get_filter_by_posttype($posttype);



  // Return all of our comment response data.
  return new WP_REST_Response($data, 200);
}

function get_terms_per_post_type( $taxonomies, $args=array() ) {
    //Parse $args in case its a query string.
    $args = wp_parse_args($args);

    if( !empty( $args['post_type'] ) ){

        $args['post_type'] = (array)$args['post_type'];

        add_filter( 'terms_clauses', function ( $pieces, $tax, $args){
            global $wpdb;

            //Don't use db count
            $pieces['fields'] .= ", COUNT(*) AS count_type" ;

            //Join extra tables to restrict by post type.
            $pieces['join'] .= " INNER JOIN $wpdb->term_relationships AS r ON r.term_taxonomy_id = tt.term_taxonomy_id
                                 INNER JOIN $wpdb->posts AS p ON p.ID = r.object_id ";

            //Restrict by post type and Group by term_id for COUNTing.
            $post_type = implode( ',', $args['post_type'] );
            $pieces['where'] .= $wpdb->prepare( " AND p.post_type IN(%s) GROUP BY t.term_id", $post_type );

            remove_filter( current_filter(), __FUNCTION__ );

            return $pieces;

        }, 10, 3 );

    }

    return get_terms($taxonomies, $args);
}


add_action( 'rest_api_init', function () {
    register_rest_route( 'iii', '/menu', array(
        'methods' => 'GET',
        'callback' => 'get_menu',
        'permission_callback' => '__return_true',
    ) );
    register_rest_route( 'iii', '/related\/(?P<posttype>[a-z0-9,+]+(?:-[a-z0-9,+]+)*)\/(?P<slug>[a-z0-9,+]+(?:-[a-z0-9,+]+)*)', array(
        'methods' => 'GET',
        'callback' => 'get_related',
        'args' => array(
            'posttype' => array(
              'requred' => true
            ),
						'slug' => array(
							'required' => true
						),
					),
        'permission_callback' => '__return_true',
    ) );
    register_rest_route( 'iii', '/filterItems\/(?P<posttype>[a-z0-9,+]+(?:-[a-z0-9,+]+)*)', array(
        'methods' => 'GET',
        'callback' => 'get_filter_items',
        'args' => array(
            'posttype' => array(
              'requred' => true
            ),
          ),
        'permission_callback' => '__return_true',
    ) );

} );
