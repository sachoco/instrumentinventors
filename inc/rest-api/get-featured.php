<?php
function get_featured_items($request)
{

  // Change the request language
  $lang = $request->get_param('lang');
  // if ($lang == "nl") {
  //   do_action('wpml_switch_language', $lang);
  // }

  $page = $request['page'];

  $items = [];

  if ($page == "home") {
    $args = array(
      'post_type' => array('post','artist','agenda','project'),
      'ignore_sticky_posts' => 1,
      'meta_query' => array(
        'relation' => 'AND',
        // array(
        //   'key' => 'is_featured_homepage',
        //   'compare' => 'EXISTS',
        //   'value' => ''
        // ),
        array(
          'key' => 'is_featured_homepage',
          'value' => true,
          'compare' => '=='
        )
      )
    );
    $featured_items = new WP_Query($args);
    $items = $featured_items->posts;

  } elseif ($page == "hostedprogram") {
    $args = array(
      'post_type' => array('agenda'),
      'meta_query' => array(
        'relation' => 'AND',
        array(
          'key' => 'host_|_circulation',
          'value' => "host",
          'compare' => 'LIKE'
        ),
        array(
          'key' => 'is_featured_hostedprogram',
          'value' => true,
          'compare' => '=='
        )
      )
    );
    $agenda_items = new WP_Query($args);
    $items = $agenda_items->posts;

  } elseif ($page == "agency") {


    $args = array(
      'post_type' => array('project'),
      'meta_query' => array(
        'relation' => 'AND',
        array(
          'key' => 'category',
          'value' => 'curated_programs',
          'compare' => 'LIKE'
        ),
        array(
          'key' => 'host_|_circulation',
          'value' => "circulation",
          'compare' => 'LIKE'
        ),
        array(
          'key' => 'is_highlighted',
          'value' => true,
          'compare' => '=='
        )
      )
    );
    $project_program_items = new WP_Query($args);

    $args = array(
      'post_type' => array('project'),
      'meta_query' => array(
        'relation' => 'AND',
        array(
          'key' => 'category',
          'value' => 'artworks',
          'compare' => 'LIKE'
        ),
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
    );
    $project_artworks_items = new WP_Query($args);

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
    );
    $project_workshops_items = new WP_Query($args);

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
    $artist_items = new WP_Query($args);

    // $items = array_merge($agenda_items->posts,$project_items->posts,$artist_items->posts );
    $items = array_merge($project_program_items->posts, $project_artworks_items->posts, $project_workshops_items->posts, $artist_items->posts);

  } elseif ($page == "education") {

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
    $project_items = new WP_Query($args);

    $args = array(
      'post_type' => array('agenda'),
      'meta_query' => array(
        'relation' => 'AND',
        array(
          'key' => 'category',
          'value' => 'workshops',
          'compare' => 'LIKE'
        ),
        array(
          'key' => 'is_featured_education',
          'value' => true,
          'compare' => '=='
        )
      )
    );
    $agenda_items = new WP_Query($args);

    $items = array_merge($agenda_items->posts, $project_items->posts);
  }


  $data = [];
  if (!empty($items)) {
    foreach ($items as $post) {
      $post_data = [];
      $post_data['id'] = $post->ID;
      $post_data['title'] = $post->post_title;
      if ($lang == "nl") {
        $translations = get_translations($post);
        if($translations['nl_NL']){
          $post_data['title'] = $translations['nl_NL']['post_title'];
        }
      }
      $post_data['post_type'] = $post->post_type;
      $post_data['tag'] = get_the_tags($post->ID);
      $post_data['url'] = esc_url(get_permalink($post->ID));
      $post_data['featured_image'] = get_the_post_thumbnail_url($post->ID, 'large');
      $post_data['featured_result'] = true;
      // $post_data['translations']= get_translations($post);
      if ($post->post_type == "artist") {
        $post_data['subcategory'] = get_field('badges', $post->ID);
        $post_data['date_from'] = get_field('date_from', $post->ID);
        $post_data['date_until'] = get_field('date_until', $post->ID);
        // if ($post_data['subcategory'] == "resident") {
        if ($post_data['date_from']) {
          $post_data['date'] = $post_data['date_from'] . ' - ' . $post_data['date_until'];
        } else {
          $post_data['date'] = $post_data['date_from'] . ' - ongoing';
        }
        // }
        $post_data['archive_base'] = "artists";
      } else if ($post->post_type == "project") {
        $post_data['subcategory'] = get_field('category', $post->ID);
        $post_data['meta1'] = get_field('authors', $post->ID);
        $post_data['meta2'] = get_field('year', $post->ID);
        $post_data['date'] = get_field('year', $post->ID);
        $post_data['archive_base'] = "projects";
      } else if ($post->post_type == "agenda") {
        $post_data['subcategory'] = get_field('category', $post->ID);
        $post_data['date_from'] = get_field('date_from', $post->ID);
        $post_data['date_until'] = get_field('date_until', $post->ID);
        if ($post_data['date_until']) {
          $post_data['date'] = $post_data['date_from'] . ' - ' . $post_data['date_until'];
        } else {
          $post_data['date'] = $post_data['date_from'];
        }
        $post_data['meta1'] = get_field('venue', $post->ID);
        $post_data['meta2'] = get_field('city', $post->ID);
        $post_data['meta3'] = get_field('host_|_circulation', $post->ID);
        $post_data['archive_base'] = "agenda";
      } else {
        $post_data['date'] = $post->post_date;
        $post_data['subcategory'] = "";
        $post_data['archive_base'] = "posts";
      }
      array_push($data,  $post_data);
    }
  }
  // Return all of our comment response data.
  $response = new WP_REST_Response($data, 200);
  if (empty($data)) {
    $response->header('x-wp-total', 0);
  }

  // back to the default language
  if ($lang == "nl") {
    do_action('wpml_switch_language', "en");
  }
  return $response;
}


add_action('rest_api_init', function () {
  register_rest_route('iii', '/getFeatured\/(?P<page>[a-z0-9,+]+(?:-[a-z0-9,+]+)*)', array(
    'methods' => 'GET',
    'callback' => 'get_featured_items',
    'args' => array(
      'page' => array(
        'requred' => true
      ),
    ),
    'permission_callback' => '__return_true',
  ));
});

function get_translations( $post ) {
  $languages = apply_filters('wpml_active_languages', null);
  $translations = [];
  $show_on_front = get_option( 'show_on_front' );
  $page_on_front = get_option( 'page_on_front' );

  foreach ($languages as $language) {
    $post_id = wpml_object_id_filter( $post->ID, 'post', false, $language['language_code'] );
    if ( $post_id === null || $post_id == $object['id'] ) {
      continue;
    }
    $thisPost = get_post( $post_id );

    // Only show published posts
    if ( 'publish' !== $thisPost->post_status ) {
      continue;
    }

    $href = apply_filters( 'WPML_filter_link', $language['url'], $language );
    $href = apply_filters( 'wpmlrestapi_translations_href', $href, $thisPost );
    $href = trailingslashit( $href );

    if ( ! ( 'page' == $show_on_front && $post->ID == $page_on_front ) ) {
      // $postUrl = $this->calculate_rel_path( $thisPost );
      // if ( strpos( $href, '?' ) !== false ) {
      //   $href = str_replace( '?', '/' . $postUrl . '/?', $href );
      // } else {
      //   if ( substr( $href, - 1 ) !== '/' ) {
      //     $href .= '/';
      //   }

      //   $href .= $postUrl . '/';
      // }

      $translation  = array(
        'locale'     => $language['default_locale'],
        'id'         => $thisPost->ID,
        'post_title' => $thisPost->post_title,
        // 'href'       => $href,
      );

      $translation = apply_filters( 'wpmlrestapi_get_translation', $translation, $thisPost, $language );
      $translations[$translation['locale']] = $translation;
    }
  }

  return $translations;
}