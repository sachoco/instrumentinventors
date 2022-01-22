<?php
add_action('rest_api_init', 'register_rest_search');
function register_rest_search()
{
    register_rest_field(
        'search-result',
        'featured_image',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field(
        'search-result',
        'search_result',
        array(
            'get_callback'    => function ($object) {
                return true;
            },
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field(
        'search-result',
        'acf',
        array(
            'get_callback'    => function ($object) {
                return get_fields($object['id']);
            },
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field(
        'search-result',
        'tags',
        array(
            'get_callback'    => function ($object) {
                $tags = [];
                if (get_the_tags($object['id'])) {
                    foreach(get_the_tags($object['id']) as $tag) {
                        $tags[] = array(
                            'id' => $tag->term_id,
                            'name' => $tag->name, 
                        ); 
                    }
                }else{
                    $tags = false;
                }
                return $tags;
            },
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
function get_rest_featured_image($object, $field_name, $request)
{
    $postId = $object['id'];
    $attachmentId = get_post_thumbnail_id($postId);
    if ($attachmentId) {
        $img = wp_get_attachment_image_src($attachmentId, 'medium_large');
        return $img[0];
    }
    return false;
}
