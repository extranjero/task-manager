module.exports = sumSmallestNumbers;

function sumSmallestNumbers(numbers) {
    if(numbers.length < 2) {
       return numbers[0];
    }

    let sorted_nums = numbers.sort();

    return sorted_nums[0] + sorted_nums[1];
}



