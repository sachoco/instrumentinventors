<?php

/**
 * III_REST_API
 * To add basic field for all the posttypes
 */
namespace satopin\III;

use WP_REST_Request;

class III_REST_API {

	public function wordpress_hooks() {
		add_action( 'rest_api_init', array($this, 'init'), 1000 );
	}

	public function init() {

		// Add iii fields to all post types
		// Thanks to Roy Sivan for this trick.
		// http://www.roysivan.com/wp-api-v2-adding-fields-to-all-post-types/#.VsH0e5MrLcM

		$post_types = get_post_types( array( 'public' => true, 'exclude_from_search' => false ), 'names' );
		array_push($post_types, 'search-result');
        foreach( $post_types as $post_type ) {
			$this->register_api_field($post_type);
		}
	}

	public function register_api_field($post_type) {
		register_rest_field( $post_type,
			'iii',
			array(
				'get_callback'    => array($this, 'get_iii_fields'),
				'update_callback' => null,
				'schema'          => null,
			)
		);
	}

	/**
	 * Get missing basic fields
	 *
	 * @param array $object Details of current post.
	 * @param string $field_name Name of field.
	 * @param WP_REST_Request $request Current request
	 *
	 * @return array
	 */
	public function get_iii_fields( array $object, $field_name, WP_REST_Request $request ) {
        $output = [];
        $postId = $object['id'];
        $attachmentId = get_post_thumbnail_id($postId);
        if ($attachmentId) {
            $full = wp_get_attachment_image_src($attachmentId, 'full');
            $large = wp_get_attachment_image_src($attachmentId, 'large');
            $medium = wp_get_attachment_image_src($attachmentId, 'medium_large');
            $output["featured_image"] = array(
                'full' => $full[0], 
                'large' => $large[0], 
                'medium' => $medium[0]
            );
        }else{
            $output["featured_image"] = false;
        }
        $posttags = get_the_tags($postId);
        if ($posttags) {
            foreach($posttags as $tag) {
                $output["tags"][] = array(
                    'id' => $tag->term_id,
                    'name' => $tag->name, 
                ); 
            }
        }else{
            $output["tags"] = false;
        }
        $postcategory = get_the_category($postId);
        if ($postcategory) {
            foreach($postcategory as $cat) {
                $output["category"][] = array(
                    'id' => $cat->term_id,
                    'name' => $cat->name, 
                ); 
            }
        }else{
            $output["category"] = false;
        }
        
        $output["path"] = parse_url(esc_url(get_permalink($postId)),PHP_URL_PATH);

        $related_posts_ids = get_field('related_posts', $postId);
        $related_artists = get_posts(array('post__in' => $related_posts_ids, 'post_type' => array('artist'), 'posts_per_page' => -1 ));
        if ($related_artists) {
            usort($related_artists, fn($a, $b) => strcmp($a->post_name, $b->post_name));
            foreach($related_artists as $artist) {
                $output["artists"][] = array(
                    'id' => $artist->ID,
                    'name' => $artist->post_title, 
                ); 
            }
        }else{
            $output["artists"] = false;
        }
        
        return $output;
	}
}

$GLOBALS['III_REST_API'] = new III_REST_API();
$GLOBALS['III_REST_API']->wordpress_hooks();