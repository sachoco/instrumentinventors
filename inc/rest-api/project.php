<?php
function query_project($args, $request)
{
    $args['meta_key'] = 'year_end';
    $args['orderby'] = array( 
        'meta_value_num' => 'DESC',
        'date' => 'DESC',
    );
    $args['meta_query'] = array('relation' => 'AND');

    if (isset($request["pricat"])) {
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
    if (isset($request["subcat"])) {

        foreach (explode(",", $request["subcat"]) as $item) {
            if (strpos($request["subcat"], "host") === FALSE && strpos($request["subcat"], "circulation") === FALSE) {
                $args['meta_query'][] = array(
                    'key'     => 'type',
                    'value'   => $item,
                    'compare' => 'LIKE',
                );
            } else {
                $args['meta_query'][] = array(
                    'key'     => 'host_|_circulation',
                    'value'   => $item,
                    'compare' => 'LIKE',
                );
            }
        }
    }

    if (isset($request["is_agency"])) {
        $args['meta_query'][] = array(
            'key' => 'is_agency',
            'value' => true,
            'compare' => '=='
        );
    }
    if (isset($request["is_highlighted"])) {
        $args['meta_query'][] = array(
            'key' => 'is_highlighted',
            'value' => true,
            'compare' => '=='
        );
    }

    return $args;
}
add_filter('rest_project_query', 'query_project', 10, 2);
