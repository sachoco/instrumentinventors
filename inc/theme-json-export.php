<?php
function save_json($output){
    $data = json_encode($output);

    $lang_dir = 'en/';
    $post_language_information = apply_filters('wpml_post_language_details', NULL, $output['id']);
    // $post_language_information = wpml_get_language_information($post_id);
    // var_dump($post_language_information);
    if ($post_language_information) {
        $lang = $post_language_information['language_code'];
        if ($lang == 'nl') {
            $lang_dir = 'nl/';
        }
    }

    $file_name =  'data.json';

    $save_path = ABSPATH . 'data/' . $output['type'] . '/' . $output['slug'] . '/' . $lang_dir . $file_name;
    if($output['type']=="page"){
        $save_path = ABSPATH . 'data/' . $output['type'] .stripslashes($output['path']) . $lang_dir . $file_name;
    }

    $dirname = dirname($save_path);
    if (!is_dir($dirname)) {
        mkdir($dirname, 0755, true);
    }
    $f = fopen($save_path, "w"); //if json file doesn't gets saved, comment this and uncomment the one below
    fwrite($f, $data);
    fclose($f);

}
/**
 * Exporting json for post-type 'page'
 */
function export_page_in_json($post_id, $post, $update)
{
    WPBMap::addAllMappedShortcodes();
    $output = array();
    $path = parse_url(esc_url(get_permalink($post->ID)), PHP_URL_PATH);
    $output["id"] = $post_id;
    $output["title"] = $post->post_title;
    $output["content"] = apply_filters('the_content', $post->post_content);
    $output["type"] = $post->post_type;
    $output['path'] = $path;

    save_json($output);
}
add_action('save_post_page', 'export_page_in_json', 10, 3);

/**
 * Exporting json for post-type 'post'
 */
function export_post_in_json($post_id, $post, $update)
{
    $request = new WP_REST_Request( 'GET', '/wp/v2/posts' );
    $request->set_query_params( [ 'id' => $post_id ] );
    $response = rest_do_request( $request );
    $server = rest_get_server();
    $output = $server->response_to_data( $response, false );

    save_json($output[0]);
}
add_action('save_post', 'export_post_in_json', 10, 3);

/**
 * Exporting json for post-type 'artist'
 */
function export_artist_in_json($post_id, $post, $update)
{
    $request = new WP_REST_Request( 'GET', '/wp/v2/artist' );
    $request->set_query_params( [ 'id' => $post_id ] );
    $response = rest_do_request( $request );
    $server = rest_get_server();
    $output = $server->response_to_data( $response, false );

    save_json($output[0]);
}
add_action('save_post_artist', 'export_artist_in_json', 10, 3);

/**
 * Exporting json for post-type 'agenda'
 */
function export_agenda_in_json($post_id, $post, $update)
{
    $request = new WP_REST_Request( 'GET', '/wp/v2/agenda' );
    $request->set_query_params( [ 'id' => $post_id ] );
    $response = rest_do_request( $request );
    $server = rest_get_server();
    $output = $server->response_to_data( $response, false );

    save_json($output[0]);
}
add_action('save_post_agenda', 'export_agenda_in_json', 10, 3);


/**
 * Exporting json for post-type 'project'
 */
function export_project_in_json($post_id, $post, $update)
{
    $request = new WP_REST_Request( 'GET', '/wp/v2/project' );
    $request->set_query_params( [ 'id' => $post_id ] );
    $response = rest_do_request( $request );
    $server = rest_get_server();
    $output = $server->response_to_data( $response, false );

    save_json($output[0]);
}
add_action('save_post_project', 'export_project_in_json', 10, 3);


function update_all_posts()
{
    $args = array(
        'post_type' => 'post',
        'post_status' => 'publish',
        'numberposts' => 50,
        'offset' => 0
    );
    $all_posts = get_posts($args);
    foreach ($all_posts as $single_post) {
        $single_post->post_title = $single_post->post_title . '';
        wp_update_post($single_post);
    }
}
// add_action( 'wp_loaded', 'update_all_posts' );
function export_allpost_in_json()
{
    // $args = array(
    //     'post_type' => 'post',
    //     'post_status' => 'publish',
    //     'numberposts' => 100,
    //     'offset' => 0
    // );
    $args = array(
        'post_type' => 'project',
        'post_status' => 'publish',
        'posts_per_page' => 100,
        'paged' => 2
    );
    // $all_posts = get_posts($args);
    $all_posts = new WP_Query( $args );
    $ids = [];
    foreach ($all_posts->posts as $single_post) {
        array_push($ids, $single_post->ID);
    }
    // $request = new WP_REST_Request( 'GET', '/wp/v2/posts' );
    $request = new WP_REST_Request( 'GET', '/wp/v2/project' );
    $request->set_query_params( [ 
        'include' => implode(',',$ids),
        'per_page' => 100
        ] );
    $response = rest_do_request( $request );
    $server = rest_get_server();
    $output = $server->response_to_data( $response, false );
    // var_dump($output);

    foreach ($output as $data) {
        save_json($data);
    }
}
// add_action( 'wp_loaded', 'export_allpost_in_json' );
