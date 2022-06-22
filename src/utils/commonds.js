export const deepClone = (object) => (JSON.parse(JSON.stringify(object)));

export const getSum = (numbers) => {
	let sum = 0;

	numbers.forEach((number) => sum += number);

	return sum;
};