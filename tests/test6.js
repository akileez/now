var getDate = require('../index')


var p1 = new Date('2011-10-22T09:01:48')
var p2 = new Date("2011-10-10T14:48:00")

function log (date, attr) {
  console.log(getDate(date, attr))
}

console.log()
console.log(new Date().toLocaleString())
console.log()
console.log('------------ PARSED STRING-----------------')
log(p1, 'default')
log(p2, 'default')
log(p2)