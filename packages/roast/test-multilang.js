// Test file for multilingual roast
function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    if (items[i].price == undefined) {
      continue;
    }
    total = total + items[i].price;
  }
  return total;
}

// TODO: refactor this later
function processOrder(order) {
  if (order.items && order.items.length > 0) {
    var t = calculateTotal(order.items);
    if (t > 0) {
      console.log("Total: " + t);
      return t;
    }
  }
  return 0;
}
