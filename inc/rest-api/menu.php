<?php

add_action( 'rest_api_init', function () {
    register_rest_route( 'iii', '/menu', array(
        'methods' => 'GET',
        'callback' => 'get_menu',
        'permission_callback' => '__return_true',
    ) );
} );
function get_menu()
{
    $menus = array(); //wp_get_nav_menus();
    $menu_slug = get_nav_menu_locations();
    // var_dump($menu_slug);

    foreach ($menu_slug as $key => $value) {
        $items = wp_get_nav_menu_items($value);
        if (is_array($items)) {
            $menus[$key] = array_map('extract_from_menu', $items);
        }
    }
    return $menus;
    // $x = wp_get_nav_menu_items('about-menu');
    // $x = wp_get_nav_menu_items('about-menu');
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
    return array("title" => $menu->title, "path" => parse_url($menu->url)['path']);
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
