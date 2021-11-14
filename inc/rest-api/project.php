<?php
function query_project($args, $request)
{
    // $args['meta_key'] = 'year';
    // $args['orderby'] = 'meta_value_num';
    $args['meta_query'] = array('relation' => 'AND');

    if (isset($request["cat"])) {
        $args['meta_query'][] = array(
            'key' => 'category',
            'value' => $request["cat"],
            'compare' => 'LIKE'
        );
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
