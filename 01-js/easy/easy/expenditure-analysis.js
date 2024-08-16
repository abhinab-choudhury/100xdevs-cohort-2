/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  let arr = []
  for(let i = 0;i < transactions.length; i++) {
    let category = transactions[i]["category"]
    arr.push(category)
  }
  const categories = new Set(arr)
  
  arr = []
  categories.forEach((item) => {
    let obb = { 
      category:item,
      totalSpent:0
    }
    transactions.forEach((object) => {
      if (item === object.category) {
        obb.totalSpent += object.price;
      }
    })
    arr.push(obb)
  })
  return arr;
}

module.exports = calculateTotalSpentByCategory;
