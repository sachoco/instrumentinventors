<?php
function get_featured_items( $request ) {
  $page = $request['page'];
  $items = [];

  if($page=="agency"){
    $args = array(
      'post_type' => array('agenda'),
      // $args['meta_key'] = 'date_from';
      // $args['orderby'] = 'meta_value_num';
      // $args['order'] = 'ASC';
      'meta_query' => array(
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
          'key'     => 'host_|_circulation',
          'value'   => 'circulation',
          'compare' => 'LIKE',
        )
      )
    );
    $agenda_items = new WP_Query( $args );


    $args = array(
      'post_type' => array('project'),
      'meta_query' => array(
        'relation' => 'OR',
        array(
          'key' => 'host_|_circulation',
          'value' => "circulation",
          'compare' => 'LIKE'
        ),
        array(
          'relation' => 'AND',
          array(
            'key' => 'is_agency',
            'value' => true,
            'compare' => '=='
          ),
          array(
            'key' => 'is_highlighted',
            'value' => true,
            'compare' => '=='
          )
        )

      )
    );
    $project_items = new WP_Query( $args );


    $args = array(
      'post_type' => array('artist'),
      'meta_query' => array(
        'relation' => 'AND',
        array(
          'key' => 'badges',
          'value' => 'agency',
          'compare' => 'LIKE'
        ),
        array(
          'key' => 'is_highlighted',
          'value' => true,
          'compare' => '=='
        )
      )
    );
    $artist_items = new WP_Query( $args );

    $items = array_merge($agenda_items->posts,$project_items->posts,$artist_items->posts );

  }else if($page=="education"){
      $args = array(
        'post_type' => array('agenda'),
        // $args['meta_key'] = 'date_from';
        // $args['orderby'] = 'meta_value_num';
        // $args['order'] = 'ASC';
        'meta_query' => array(
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
            'key'     => 'category',
            'value'   => 'workshop',
            'compare' => 'LIKE',
          )
        )
      );
      $agenda_items = new WP_Query( $args );


      $args = array(
        'post_type' => array('project'),
        'meta_query' => array(
          'relation' => 'AND',
          array(
            'key' => 'category',
            'value' => 'workshops',
            'compare' => 'LIKE'
          ),
          array(
            'key' => 'is_highlighted',
            'value' => true,
            'compare' => '=='
          )
        )
      );
      $project_items = new WP_Query( $args );

      $items = array_merge($agenda_items->posts,$project_items->posts );
    }


  $data = [];
  if ( ! empty( $items ) ) {
    foreach ( $items as $post ) {
      $post_data['id'] = $post->ID;
      $post_data['title'] = $post->post_title;
      $post_data['subtype'] = $post->post_type;
      $post_data['tag'] = get_the_tags($post->ID);
      $post_data['url'] = esc_url(get_permalink($post->ID));
      $post_data['featured_image'] = get_the_post_thumbnail_url($post->ID,'large');
      $post_data['featuredd_result'] = true;
      if ($post->post_type == "artist") {
        $post_data['subcategory'] = get_field('badges', $post->ID);
        $post_data['date_from'] = get_field('date_from', $post->ID);
        $post_data['date_until'] = get_field('date_until', $post->ID);
        if ($post_data['subcategory'] == "resident") {
          if($post_data['date_from']){
            $post_data['date'] = $post_data['date_from'].' - ' .$post_data['date_until'];
          }else{
            $post_data['date'] = $post_data['date_from'];
          }
        }
      } else if ($post->post_type == "project") {
        $post_data['subcategory'] = get_field('category', $post->ID);
        $post_data['meta1'] = "author";
        $post_data['date'] = get_field('year', $post->ID);
      } else if ($post->post_type == "agenda") {
        $post_data['subcategory'] = get_field('category', $post->ID);
        $post_data['date_from'] = get_field('date_from', $post->ID);
        $post_data['date_until'] = get_field('date_until', $post->ID);
        if($post_data['date_from']){
          $post_data['date'] = $post_data['date_from'].' - ' .$post_data['date_until'];
        }else{
          $post_data['date'] = $post_data['date_from'];
        }
        $post_data['meta1'] = get_field('venue', $post->ID);
        $post_data['meta2'] = get_field('city', $post->ID);
        $post_data['meta3'] = get_field('host_|_circulation', $post->ID);
      } else {
        $post_data['date'] = $post->post_date;
        $post_data['subcategory'] = "---";
      }
      array_push($data,  $post_data );
    }
  }
  // Return all of our comment response data.
  return new WP_REST_Response($data, 200);
}
function get_featured_items_bak( $request ) {
  $page = $request['page'];

  if($page=="agency"){
    $args = array(
      'post_type' => array('agenda', 'project', 'artist'),
      // 'post_type' => array('agenda'),
      'meta_query' => array(
          'relation' => 'OR',
      )
    );
    // query for agenda
    // $args['meta_key'] = 'date_from';
    // $args['orderby'] = 'meta_value_num';
    // $args['order'] = 'ASC';
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
    );
    // query for project
    $args['meta_query'][] = array(
      'relation' => 'AND',
      array(
        'key' => 'is_agency',
        'value' => true,
        'compare' => '=='
      ),
      array(
        'key' => 'is_highlighted',
        'value' => true,
        'compare' => '=='
      )
    );
    // query for artist
    $args['meta_query'][] = array(
      'relation' => 'AND',
      array(
        'key' => 'badges',
        'value' => 'agency',
        'compare' => 'LIKE'
      ),
      array(
        'key' => 'is_highlighted',
        'value' => true,
        'compare' => '=='
      )
    );
  }

  $matched_items = new WP_Query( $args );

  $data = [];
  if ( ! empty( $matched_items->posts ) ) {
    foreach ( $matched_items->posts as $post ) {
      $post_data['id'] = $post->ID;
      $post_data['title'] = $post->post_title;
      $post_data['subtype'] = $post->post_type;
      $post_data['tag'] = get_the_tags($post->ID);
      $post_data['url'] = esc_url(get_permalink($post->ID));
      $post_data['featured_image'] = get_the_post_thumbnail_url($post->ID,'large');
      $post_data['featuredd_result'] = true;
      if ($post->post_type == "artist") {
        $post_data['subcategory'] = get_field('badges', $post->ID);
        $post_data['date_from'] = get_field('date_from', $post->ID);
        $post_data['date_until'] = get_field('date_until', $post->ID);
        if ($post_data['subcategory'] == "resident") {
          if($post_data['date_from']){
            $post_data['date'] = $post_data['date_from'].' - ' .$post_data['date_until'];
          }else{
            $post_data['date'] = $post_data['date_from'];
          }
        }
      } else if ($post->post_type == "project") {
        $post_data['subcategory'] = get_field('category', $post->ID);
        $post_data['meta1'] = "author";
        $post_data['date'] = get_field('year', $post->ID);
      } else if ($post->post_type == "agenda") {
        $post_data['subcategory'] = get_field('category', $post->ID);
        $post_data['date_from'] = get_field('date_from', $post->ID);
        $post_data['date_until'] = get_field('date_until', $post->ID);
        if($post_data['date_from']){
          $post_data['date'] = $post_data['date_from'].' - ' .$post_data['date_until'];
        }else{
          $post_data['date'] = $post_data['date_from'];
        }
        $post_data['meta1'] = get_field('venue', $post->ID);
        $post_data['meta2'] = get_field('city', $post->ID);
        $post_data['meta3'] = get_field('host_|_circulation', $post->ID);
      } else {
        $post_data['date'] = $post->post_date;
        $post_data['subcategory'] = "---";
      }
      array_push($data,  $post_data );
    }
  }
  // Return all of our comment response data.
  return new WP_REST_Response($data, 200);
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'iii', '/getFeatured\/(?P<page>[a-z0-9,+]+(?:-[a-z0-9,+]+)*)', array(
        'methods' => 'GET',
        'callback' => 'get_featured_items',
        'args' => array(
            'page' => array(
              'requred' => true
            ),
          ),
        'permission_callback' => '__return_true',
    ) );
} );
