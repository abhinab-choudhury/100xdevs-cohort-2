/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
*/

function Sum(n) {
    let sum = 0;
    for(let i = 0;i < n;i++) {
        sum += i;
    }
    return sum;
}

function calculateTime(n) {
    let timeBefore = new Date().getTime()
    console.log("Sum from 1 to", n , ":", Sum(n), "\nTime Difference : " + (new Date().getTime() - timeBefore) , "ms")

    return 0.01;
}

calculateTime(100)
calculateTime(10000)
calculateTime(10000000)
calculateTime(1000000000)
calculateTime(100000000000)
