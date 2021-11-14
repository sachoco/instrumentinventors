<?php

function get_related($request)
{
    $slug = $request['slug'];
    $posttype = $request['posttype'];
    if ($post = get_page_by_path($slug, OBJECT, $posttype)) {
        $id = $post->ID;
    } else {
        return new WP_Error('empty_post', 'there is no post', array('status' => 404));
    }

    $related_posts = get_field('related_posts', $id);

    //
    $data = [];
    if (!empty($related_posts)) {
        foreach ($related_posts as $post) {
            $post_data['id'] = $post->ID;
            $post_data['title'] = $post->post_title;
            $post_data['subtype'] = $post->post_type;
            $post_data['tag'] = get_the_tags($post->ID);
            $post_data['url'] = esc_url(get_permalink($post->ID));
            $post_data['featured_image'] = get_the_post_thumbnail_url($post->ID, 'medium_large');
            $post_data['related_result'] = true;
            array_push($data,  $post_data);
        }
    }
    // Return all of our comment response data.
    $response = new WP_REST_Response($data, 200);
    if(empty($data)){
        $response->header('x-wp-total',0);
    }
    return $response;
}



add_action('rest_api_init', function () {

    register_rest_route('iii', '/related\/(?P<posttype>[a-z0-9,+]+(?:-[a-z0-9,+]+)*)\/(?P<slug>[a-z0-9,+,\/]+(?:-[a-z0-9,+,\/]+)*)', array(
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
});
