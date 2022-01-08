<?php
function query_artist($args, $request)
{
	// $args['meta_key'] = 'date_until';
	// $args['orderby'] = 'meta_value_num';

	$args['meta_query'] = array('relation' => 'AND');

	if (isset($request["pricat"])) {
		$args['meta_query'][] = array(
			'key' => 'badges',
			'value' => $request["pricat"],
			'compare' => 'LIKE'
		);
	}else{
		$args['meta_query'][] = array(
			'key' => 'badges',
			'compare' => 'EXISTS'
		); 
	}
	if (isset($request["is_highlighted"])) {
		$args['meta_query'][] = array(
			'key' => 'is_highlighted',
			'value' => true,
			'compare' => '=='
		);
	}

	if(isset($request["current"])) {
		$args['meta_key'] = 'badges';
		$args['meta_query'][] = array(
			'relation' => 'OR',
			array(
				'key' => 'date_until',
				'value' => date("Ymd", strtotime("now")),
				'type' => 'NUMERIC',
				'compare' => '>='
			),
			array(
				'key' => 'date_until',
				'value' => '',
				'compare' => '='
		    ),
			array(
				'key' => 'date_until',
				'compare' => 'NOT EXISTS'
			),
		);
		$args['orderby'] = array( 
			'menu_order' => 'DESC',
			'title' => 'ASC',
		);
	}else if(isset($request["past"])) {
		$args['meta_key'] = 'date_until';
		$args['meta_query'][] = array(
			'relation' => 'AND',
			array(
				'key' => 'date_until',
				'value' => date("Ymd", strtotime("now")),
				'type' => 'NUMERIC',
				'compare' => '<'
			),
			array(
				'key' => 'date_until',
				'value' => '',
				'compare' => '!='
		    ),
			array(
				'key' => 'date_until',
				'compare' => 'EXISTS'
			),
		);
        $args['orderby'] = array( 
			'meta_value_num' => 'DESC',
		);
	}


	return $args;
}
add_filter('rest_artist_query', 'query_artist', 10, 2);
