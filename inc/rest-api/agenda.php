<?php
function query_agenda($args, $request) {
  $args['meta_key'] = 'date_from';
  $args['orderby'] = 'meta_value_num';
  $args['meta_query'] = array('relation' => 'AND');

    if(isset($request["pricat"])) {
      $args['meta_query'][] = array(
          'key' => 'category',
          'value' => $request["pricat"],
          'compare' => 'LIKE'
      );
    }
    if(isset($request["in_pricat"])) {
      $arr = array('relation' => 'OR');
      $cats = explode(",",$request["in_pricat"]);
        foreach($cats as $cat){
          $arr[] = array(
            'key' => 'category',
            'value' => $cat,
            'compare' => 'LIKE'
        );
      }
      $args['meta_query'][] = $arr;
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
        $args['order'] = 'ASC';
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
    }else if(isset($request["past"])) {
      $args['meta_key'] = 'date_from';
  		$args['orderby'] = 'meta_value_num';
  		$args['order'] = 'DESC';
  		$args['meta_query'][] = array(
  			'relation' => 'AND',
        array(
          'key' => 'date_from',
          'value' => date("Ymd", strtotime("now")),
          'type' => 'NUMERIC',
          'compare' => '<'
        ),
        array(
          'key' => 'date_until',
          'value' => date("Ymd", strtotime("now")),
          'type' => 'NUMERIC',
          'compare' => '<'
        )       
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
