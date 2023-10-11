export const indexOfLessOrEqual = (arr, value) => {
	let i = 0;
	while (i < arr.length && arr[i++] <= value) {
	}
	return i - 1;
};

export const getCumulativeSum = (arr) =>
	arr.reduce((acc, val) => [...acc, (acc[acc.length - 1] || 0) + val], []);
