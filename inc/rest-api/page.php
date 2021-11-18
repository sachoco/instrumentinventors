<?php
/**
 * WP REST API - Search by Path
 */
 add_action('rest_api_init', function () {
	$namespace = 'iii';
 	register_rest_route( $namespace, '/pages/(?P<url>.*?)', array(
 		'methods'  => 'GET',
 		'callback' => 'get_page_from_path',
        'permission_callback' => '__return_true',
 	));
 });
 /**
 *
 * @return WP_Error|WP_REST_Response
 *
 */
 function get_page_from_path($data)
 {
     $postId    = url_to_postid($data['url']);
     $postType  = get_post_type($postId);
     $controller = new WP_REST_Posts_Controller($postType);
     $request    = new WP_REST_Request('GET', "/wp/v2/{$postType}s/{$postId}");
     $request->set_url_params(array('id' => $postId));
     return $controller->get_item($request);
 }