<?php
add_action('rest_api_init', function () {

    register_rest_route('iii', '/related\/(?P<posttype>[a-z0-9,+]+(?:-[a-z0-9,+]+)*)\/(?P<slug>[a-z0-9,+]+(?:-[a-z0-9,+]+)*)', array(
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
    ));
    register_rest_route('iii', '/filterItems\/(?P<posttype>[a-z0-9,+]+(?:-[a-z0-9,+]+)*)', array(
        'methods' => 'GET',
        'callback' => 'get_filter_items',
        'args' => array(
            'posttype' => array(
                'requred' => true
            ),
        ),
        'permission_callback' => '__return_true',
    ));
});


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