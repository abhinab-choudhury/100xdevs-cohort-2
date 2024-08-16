/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function bubblesort(str) {
  let arr = str.split("")

  for(let i = 0;i < arr.length - 1;i++) {
    for(let j = 0;j < arr.length - i - 1;j++) {
      if(arr[j].charCodeAt(0) > arr[j + 1].charCodeAt(0)) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr.join('');
}

function isAnagram(str1, str2) {
  str1 = bubblesort(str1.toLowerCase())
  str2 = bubblesort(str2.toLowerCase())
  console.log(str1 , " " , str2)
  if (str1 === str2) {
    return true
  }
  return false;
}

module.exports = isAnagram;
