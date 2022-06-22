<?php
$data_cars_json = file_get_contents('../data-json/data_cars.json');
$data_attempts_json = file_get_contents('../data-json/data_attempts.json');

$cars = array_values(json_decode($data_cars_json, true));
$attempts = array_values(json_decode($data_attempts_json, true));

function unite_value_array($array_one, $array_two, $key) {
	$array_result = [];

	for ($i = 0; $i < count($array_one); $i++) {
		$array_one[$i][$key] = [];

		for ($j = 0; $j < count($array_two); $j++) {
			if ($array_one[$i]['id'] === $array_two[$j]['id']) {
				array_push($array_one[$i][$key], $array_two[$j]['result']);
			}
		}
		array_push($array_result, $array_one[$i]);
	}
	return $array_result;
};

function my_sort($key) {
	return function ($a, $b) use($key) {
		if ($a[$key] == $b[$key]) {
			return 0;
		}

		return $a[$key] - $b[$key];
	};
};

$members = unite_value_array($cars, $attempts, 'results');

usort($members, my_sort('id'));

die(json_encode($members));