<?php
$data_json = file_get_contents('../data-json/data_cars.json');

$members = json_decode($data_json, true);

function my_sort($key) {
	return function ($a, $b) use($key) {
		if ($a[$key] == $b[$key]) {
			return 0;
		}

		return $b[$key] - $a[$key];
	};
};

$members_sorted = usort($members, my_sort('id'));

json_encode($members);
die();