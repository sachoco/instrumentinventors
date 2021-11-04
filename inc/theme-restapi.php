<?php

function query_post($args, $request) {
  if(isset($request['include_page'])){
    $args['post_type'] = array('post','page');
  }
  return $args;
}
add_filter('rest_post_query', 'query_post', 10, 2);



function query_agenda($args, $request) {
  $args['meta_key'] = 'date_from';
  $args['orderby'] = 'meta_value_num';
  $args['meta_query'] = array('relation' => 'AND');

    if(isset($request["cat"])) {
      if($request["cat"]=="hosted"){
        $args['meta_query'][] = array(
            'key' => 'host_|_circulation',
            'value' => 'host',
            'compare' => 'LIKE'
        );
      }else if($request["cat"]=="circulation"){
        $args['meta_query'][] = array(
            'key' => 'host_|_circulation',
            'value' => 'circulation',
            'compare' => 'LIKE'
        );
      }
    }
    if(isset($request["subcat"])) {
      $args['meta_query'][] = array(
          'key' => 'category',
          'value' => $request["subcat"],
          'compare' => 'LIKE'
      );
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

  if(isset($request["type"])) {
    $args['meta_query'][] = array(
        'key' => 'category',
        'value' => $request["type"],
        'compare' => 'LIKE'
    );
  }

  if(isset($request["cat"])) {
    if($request["cat"]=="hosted"){
      $args['meta_query'][] = array(
          'key' => 'host_|_circulation',
          'value' => 'host',
          'compare' => 'LIKE'
      );
    }else if($request["cat"]=="circulation"){
      $args['meta_query'][] = array(
          'key' => 'host_|_circulation',
          'value' => 'circulation',
          'compare' => 'LIKE'
      );
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
    $menus[$key] = array_map('extract_from_menu', $items);
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
  return array("title"=>$menu->title, "path"=>parse_url($menu->url)[path]);
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

function get_related() {
  // if ( $post = get_page_by_path( $request['slug'], OBJECT, $request['posttype'] ) )

  if ( $post = get_page_by_path( 'lauren-jetty', OBJECT, 'artist' ) ) {
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
} );
/*
Custom endpoints
 */
// add_action( 'rest_api_init', function () {
//   register_rest_route( 'iii/v1', '/featured/', array(
//     'methods' => 'GET',
//     'callback' => 'get_featured',
//   ) );
// } );
function get_featured( WP_REST_Request $request ) {
	$args = array(
		'post_type' => array('agenda', 'project', 'posts'),
		'meta_query' => array(
		    'relation' => 'AND',
		)

	);


	$items = new WP_User_Query( $args );

	// User Loop
	$data = [];
	if ( ! empty( $items->results ) ) {
		foreach ( $items->results as $item ) {

			$item_data['acf'] = get_fields($item->id);
			$item_data['id'] = $item->id;
			// $user_data['display_name'] = $user->display_name;					// $user_data['meta']=get_userdata($userId);
			// $data[] = $user_data;
			array_push($data,  $item_data );
    }
	}else{
    return null;
  }
	// $data['looking_for']=$looking_for;
	// $data['query']=$matched_members;
	// $data['suggested']=$matched_members->results;



	// Return all of our comment response data.
	return new WP_REST_Response($data, 200);
	// return rest_ensure_response( $res );
}
