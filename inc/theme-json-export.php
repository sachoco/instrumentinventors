<?php
function iii_export_json_btn($wp_admin_bar)
{
    $args = array(
        'id' => 'iii-export-json',
        'title' => '<span class="ab-icon"></span>' .'!!! Export JSON !!!',
        'href' => '#'
    );
    $wp_admin_bar->add_node($args);
}
add_action('admin_bar_menu', 'iii_export_json_btn', 500);

add_action( 'admin_footer', 'iii_export_json_js' );

function iii_export_json_js() { ?>
    <script type="text/javascript" >
       jQuery("li#wp-admin-bar-iii-export-json .ab-item").on( "click", function() {
          var data = {
                        'action': 'iii_export_json',
                      };
  
          /* since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php */
          jQuery.post(ajaxurl, data, function(response) {
             alert( response );
          });
  
        });
    </script> <?php
  }
  
  /* Here you hook and define ajax handler function */
  
  add_action( 'wp_ajax_iii_export_json', 'iii_export_json_callback' );
  
  function iii_export_json_callback() {
    //   global $wpdb; /* this is how you get access to the database */
      /* You cache purge logic should go here. */
      if(export_filter_in_json()){
          if(export_featured_in_json()){
            $response = "JSON exported :)";
            echo $response;
          }
      }

      wp_die(); /* this is required to terminate immediately and return a proper     response */
  } 





function prep_rest_call()
{
    register_rest_field(
        array('post', 'page', 'artist', 'agenda', 'project'),
        'content',
        array(
            'get_callback'    => 'htr_do_shortcodes',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

function save_json($output)
{
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

    $save_path = ABSPATH . 'data/' . $output['type'] . '/' . urldecode($output['slug']) . '/' . $lang_dir . $file_name;
    if ($output['type'] == "page") {
        $save_path = ABSPATH . 'data/' . $output['type'] . stripslashes($output['path']) . $lang_dir . $file_name;
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
    if ($update) {
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
}
add_action('save_post_page', 'export_page_in_json', 10, 3);

/**
 * Exporting json for post-type 'post'
 */
function export_post_in_json($post_id, $post, $update)
{
    if ($update && $post->post_type=="post") {
        prep_rest_call();
        $request = new WP_REST_Request('GET', '/wp/v2/posts/'.$post_id);
        // $request->set_query_params(['id' => $post_id]);
        $response = rest_do_request($request);
        $server = rest_get_server();
        $output = $server->response_to_data($response, false);
        save_json($output);

    }
}
add_action('save_post', 'export_post_in_json', 10, 3);

/**
 * Exporting json for post-type 'artist'
 */
function export_artist_in_json($post_id, $post, $update)
{
    if ($update) {
        prep_rest_call();
        $request = new WP_REST_Request('GET', '/wp/v2/artist/'.$post_id);
        // $request->set_query_params(['id' => $post_id]);
        $response = rest_do_request($request);
        $server = rest_get_server();
        $output = $server->response_to_data($response, false);

        save_json($output);

    }
}
add_action('save_post_artist', 'export_artist_in_json', 10, 3);

/**
 * Exporting json for post-type 'agenda'
 */
function export_agenda_in_json($post_id, $post, $update)
{
    if ($update) {
        prep_rest_call();
        $request = new WP_REST_Request('GET', '/wp/v2/agenda/'.$post_id);
        $request->set_query_params(['id' => $post_id]);
        $response = rest_do_request($request);
        $server = rest_get_server();
        $output = $server->response_to_data($response, false);

        save_json($output);

    }
}
add_action('save_post_agenda', 'export_agenda_in_json', 10, 3);


/**
 * Exporting json for post-type 'project'
 */
function export_project_in_json($post_id, $post, $update)
{
    if ($update) {
        prep_rest_call();
        $request = new WP_REST_Request('GET', '/wp/v2/project/'.$post_id);
        $request->set_query_params(['id' => $post_id]);
        $response = rest_do_request($request);
        $server = rest_get_server();
        $output = $server->response_to_data($response, false);

        save_json($output);
    }
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
    prep_rest_call();
    $args = array(
        'post_type' => 'post',
        'post_status' => 'publish',
        'numberposts' => 100,
        'offset' => 0
    );
    // $args = array(
    //     'post_type' => 'project',
    //     'post_status' => 'publish',
    //     'posts_per_page' => 100,
    //     'paged' => 2
    // );
    // $all_posts = get_posts($args);
    $all_posts = new WP_Query($args);
    $ids = [];
    foreach ($all_posts->posts as $single_post) {
        array_push($ids, $single_post->ID);
    }
    $request = new WP_REST_Request( 'GET', '/wp/v2/posts' );
    // $request = new WP_REST_Request('GET', '/wp/v2/project');
    $request->set_query_params([
        'include' => implode(',', $ids),
        'per_page' => 100
    ]);
    $response = rest_do_request($request);
    $server = rest_get_server();
    $output = $server->response_to_data($response, false);
    // var_dump($output);

    foreach ($output as $data) {
        save_json($data);
    }
}
// add_action( 'wp_loaded', 'export_allpost_in_json' );




/**
 * Exporting json for menu
 */
function export_menu_in_json($nav_menu_selected_id)
{
    $lang = Array('en','nl');
    foreach($lang as $l){

        $request = new WP_REST_Request('GET', '/iii/menu');
        if($l=='nl'){
            $request->set_query_params( ['lang' => 'nl'] );
        }
        $response = rest_do_request($request);
        $server = rest_get_server();
        $output = $server->response_to_data($response, false);
        $data = json_encode($output);
        $file_name =  'data.json';

        $save_path = ABSPATH . 'data/menu/' . $l . '/' . $file_name;

        $dirname = dirname($save_path);
        if (!is_dir($dirname)) {
            mkdir($dirname, 0755, true);
        }
        $f = fopen($save_path, "w"); //if json file doesn't gets saved, comment this and uncomment the one below
        fwrite($f, $data);
        fclose($f);
    }
}
add_action('wp_update_nav_menu', 'export_menu_in_json', 10, 1);

/**
 * Exporting json for filter
 */
function export_filter_in_json()
{
    
    $posttypes = Array('posts','agenda','artist','project');
    foreach($posttypes as $pt){
        $request = new WP_REST_Request('GET', '/iii/filterItems/'.$pt);
        $response = rest_do_request($request);
        $server = rest_get_server();
        $output = $server->response_to_data($response, false);
        $data = json_encode($output);
        $file_name =  'data.json';
    
        $save_path = ABSPATH . 'data/filter/' . $pt . '/' . $file_name;
    
        $dirname = dirname($save_path);
        if (!is_dir($dirname)) {
            mkdir($dirname, 0755, true);
        }
        $f = fopen($save_path, "w"); //if json file doesn't gets saved, comment this and uncomment the one below
        fwrite($f, $data);
        fclose($f);
    }
    return true;
    
}
// add_action( 'wp_loaded', 'export_filter_in_json' );
/**
 * Exporting json for filter
 */
function export_featured_in_json()
{
    global $wpdb,$sitepress;
    $pages = Array('home','hostedprogram','agency','education');
    $lang = Array('en','nl');
    // var_dump($sitepress->get_current_language());
    $default_lang = ICL_LANGUAGE_CODE;
    if($sitepress->get_current_language()!="en"){
        $sitepress->switch_lang("en");
    }
    foreach($lang as $l){
        foreach($pages as $page){
            
            $request = new WP_REST_Request('GET', '/iii/getFeatured/'.$page);
            if($l=='nl'){
                $request->set_query_params( ['lang' => 'nl'] );
            }
            $response = rest_do_request($request);
            $server = rest_get_server();
            $output = $server->response_to_data($response, false);
            $data = json_encode($output);
            $file_name =  'data.json';
        
            $save_path = ABSPATH . 'data/featured/' . $page . '/' . $l . '/' . $file_name;
        
            $dirname = dirname($save_path);
            if (!is_dir($dirname)) {
                mkdir($dirname, 0755, true);
            }
            $f = fopen($save_path, "w"); //if json file doesn't gets saved, comment this and uncomment the one below
            fwrite($f, $data);
            fclose($f);
        }
    }
    if($default_lang!="en"){
        $sitepress->switch_lang($default_lang);
    }
    return true;
    
}

function test_json($output)
{
    $data = "test";
    $dir = "more-moire%c2%b2";
    // $dir.replaceAll('%c2%b2','²');
    // $dir = str_replace('%c2%b2', '²', $dir);
    $dir = urlencode($dir);
    // $dir = htmlspecialchars_decode($dir);
    $file_name =  'data.json';

    $save_path = ABSPATH . 'data/'.$dir.'/'. $file_name;

    $dirname = dirname($save_path);
    if (!is_dir($dirname)) {
        mkdir($dirname, 0755, true);
    }
    $f = fopen($save_path, "w"); //if json file doesn't gets saved, comment this and uncomment the one below
    fwrite($f, $data);
    fclose($f);
}
// add_action( 'wp_loaded', 'test_json' );
