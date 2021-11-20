<?php
function query_artist($args, $request)
{
    // $args['meta_key'] = 'date_from';
    // $args['orderby'] = 'meta_value_num';
    $args['meta_query'] = array('relation' => 'AND');

    if (isset($request["pricat"])) {
        $args['meta_query'][] = array(
            'key' => 'badges',
            'value' => $request["pricat"],
            'compare' => 'LIKE'
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
add_filter('rest_artist_query', 'query_artist', 10, 2);
