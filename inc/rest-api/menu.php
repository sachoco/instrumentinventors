<?php

add_action('rest_api_init', function () {
    register_rest_route('iii', '/menu', array(
        // register_rest_route('iii', '/menu(?:/(?P<lang>[a-z0-9,+]+))?', array(
        'methods' => 'GET',
        'callback' => 'get_menu',
        'permission_callback' => '__return_true',
    ));
});

function get_menu($request)
{

    $available_languages = wpml_get_active_languages_filter('', array('skip_missing' => false,));

    if ($request->get_param('lang')) {
        $lang = $request->get_param('lang');
    } else {
        $lang = "en";
    }
     // if (isset($_REQUEST['lang'])) {
    //     $lang = $_REQUEST['lang'];
    // } else {
    //     $lang = "en";
    // }

    // var_dump($available_languages);
    // $lang = "nl";
    
    if (isset($lang) && in_array($lang, array_keys($available_languages))) {
        do_action('wpml_switch_language', $lang);
    }

    $menus = array(); //wp_get_nav_menus();
    $menu_slug = get_nav_menu_locations();

    // var_dump($menu_slug);

    foreach ($menu_slug as $key => $value) {
        $items = wp_get_nav_menu_items($value);
        if (is_array($items)) {
            // var_dump($items);

            $menus[$key] = array_map('extract_from_menu', $items);
        }
    }
    do_action('wpml_switch_language', ICL_LANGUAGE_CODE);

    return $menus;

    // $x = wp_get_nav_menu_items('about-menu');
    // $menu = array();
    // $submenu = array();
    // foreach($x as $y){
    //   $y-> submenu = array();
    //   if($y->menu_item_parent === '0')
    //     array_push($menu, $y);
    //   else
    //     array_push($submenu, $y);
    // }
    // for($i=0; $i < count($submenu); $i++) {
    //   $index = get_index($menu,$submenu[$i]->menu_item_parent);
    //   if($index > -1) {
    //     array_push($menu[$index]->submenu,$submenu[$i]);
    //   }
    // }
    // return $menu;
}
function extract_from_menu($menu)
{
    $path     = isset(parse_url($menu->url)['path']) ? parse_url($menu->url)['path'] : '';
    $query    = isset(parse_url($menu->url)['query']) ? '?' . parse_url($menu->url)['query'] : '';
    return array("page_id" => get_post_meta($menu->ID, '_menu_item_object_id', true), "title" => $menu->title, "path" => $path . $query, "type" => $menu->type, "type_label" => $menu->type_label);
}
function get_index($menu, $parent_id)
{
    $index = -1;
    for ($i = 0; $i < count($menu); $i++) {
        if ((string)$menu[$i]->ID === $parent_id) {
            $index = $i;
            break;
        }
    }
    return $index;
}
