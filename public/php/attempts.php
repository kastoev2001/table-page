<?php
$data_json = file_get_contents('../data-json/data_attempts.json');

$attempts = json_decode($data_json, true);

function my_sort($key) {
	return function ($a, $b) use($key) {
		if ($a[$key] == $b[$key]) {
			return 0;
		}

		return $b[$key] - $a[$key];
	};
};

usort($attempts, my_sort('result'));

json_encode($attempts);
die();
