<?php
function query_post($args, $request)
{
    if (isset($request['include_page'])) {
        $args['post_type'] = array('post', 'page');
    }
    if (isset($request['cat'])) {
        $args['cat'] = $request['cat'];
    }
    return $args;
}
add_filter('rest_post_query', 'query_post', 10, 2);


/**
 * Add a Formatted Date to the WordPress REST API JSON Post Object
 *
 * https://adambalee.com/?p=1547
 */
add_action('rest_api_init', function () {
    register_rest_field(
        array('post'),
        'formatted_date',
        array(
            'get_callback'    => function () {
                return get_the_date();
            },
            'update_callback' => null,
            'schema'          => null,
        )
    );
});
