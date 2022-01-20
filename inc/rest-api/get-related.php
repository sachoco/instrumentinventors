<?php
 
function get_related($request)
{
    $slug = $request['slug'];
    $posttype = $request['posttype'];
    if($posttype=='posts'){
        $posttype = 'post';
    }
    if ($post = get_page_by_path($slug, OBJECT, $posttype)) {
        $id = $post->ID;
    } else {
        return new WP_Error('empty_post', 'there is no post', array('status' => 404));
    }

    $related_posts_ids = get_field('related_posts', $id);

    $related_posts = get_posts(array('post__in' => $related_posts_ids, 'post_type' => array('post','artist','project','agenda'), 'posts_per_page' => -1 ));
    // var_dump($related_posts);
    //

    $data = [];
    if (!empty($related_posts)) {
        $artist_array = array_filter($related_posts, function($post){
            if (isset($post->post_type)) {
                if ($post->post_type == 'artist') return true;
            }
            return false;
        });
        if(!empty($artist_array)){
            usort($artist_array, fn($a, $b) => strcmp($a->post_name, $b->post_name));
        }
        $project_array = array_filter($related_posts, function($post){
            if (isset($post->post_type)) {
                if ($post->post_type == 'project') return true;
            }
            return false;
        });
        if(!empty($project_array)){
            usort($project_array, fn($a, $b) => get_field('year',$b->ID) - get_field('year',$a->ID));
        }
        $news_array = array_filter($related_posts, function($post){
            if (isset($post->post_type)) {
                if ($post->post_type == 'post') return true;
            }
            return false;
        });
        if(!empty($news_array)){
            usort($news_array, fn($a, $b) => -1 * strcmp($a->post_date, $b->post_date));
        }
        $agenda_array = array_filter($related_posts, function($post){
            if (isset($post->post_type)) {
                if ($post->post_type == 'agenda') return true;
            }
            return false;
        });
        if(!empty($agenda_array)){
            usort($agenda_array, fn($a, $b) => strtotime(get_field('date_from',$b->ID)) - strtotime(get_field('date_from',$a->ID)));
        }
        $related_posts_array = array_merge($artist_array,$project_array,$news_array,$agenda_array);

        foreach ($related_posts_array as $post) {
            $post_data['id'] = $post->ID;
            $post_data['title'] = $post->post_title;
            $post_data['subtype'] = $post->post_type;
            $post_data['url'] = esc_url(get_permalink($post->ID));
            $post_data['featured_image'] = get_the_post_thumbnail_url($post->ID, 'medium_large');
            $post_data['related_result'] = true;
            $post_data['acf'] = get_fields($post->ID);
            $post_data['date'] = $post->post_date;
            // $post_data['tag'] = get_the_tags($post->ID);
            if (get_the_tags($post->ID)) {
                foreach(get_the_tags($post->ID) as $tag) {
                    $post_data["tags"][] = array(
                        'id' => $tag->term_id,
                        'name' => $tag->name, 
                    ); 
                }
            }else{
                $post_data["tags"] = false;
            }
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
