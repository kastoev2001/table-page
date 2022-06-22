import { getSum } from './commonds';

export const sortByAttempts = ({members = null, type = 'all'}) => {
	if (!members) {
		return;
	}

	if (type === 'all') {
		const sortedMembers = members.sort((a, b) => getSum(b.results) - getSum(a.results));

		return sortedMembers;
	}

	const sortedMembers = members.sort((a, b) => {
		return b.results[type] - a.results[type];
	});

	return sortedMembers;
};

export const setPlace = (members) => {
	let place = 1;

	members.forEach((member) => {
		member.place = place;

		place++;
	});

	return members;
};