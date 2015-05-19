/*!
 * testproj632 <https://github.com/akileez/testproj632>
 *
 * Copyright (c) 2015 Keith Williams.
 * Licensed under the ISC license.
 */

var calendar = require('./lib/calendar')

exports.format = {
  yy : function () {
    return year.slice(2)
  },
  yyyy : function () {
    return year.toString()
  }
}

// core
var date = new Date()
var thisday = date.getDay()
var thismonth = date.getMonth()
var thisyear = date.getFullYear()
var day = date.getDate()
var month = date.getMonth() + 1
var hours = date.getHours()
var mins = date.getMinutes()
var secs = date.getSeconds()
var ms = date.getMilliseconds()

// formats
var d = day
var dd = pad(day)
var dx = calendar.days.short.filter(dayOfWeek).toString()
var ddd = calendar.days.abbr.filter(dayOfWeek).toString()
var dddd = calendar.days.names.filter(dayOfWeek).toString()


var m = month
var mm = pad(month)
var mmm = calendar.months.abbr.filter(monthOfYear).toString()
var mmmm = calendar.months.names.filter(monthOfYear).toString()
// var dinm = calendar.months.dim.filter(monthOfYear)

var year = thisyear.toString()
var yr = year.slice(2)

var dow = calendar.days.names.filter(dayOfWeek)
var abbrDay = calendar.days.abbr.filter(dayOfWeek)
var shortDay = calendar.days.short.filter(dayOfWeek).toString()
var mon = calendar.months.names.filter(monthOfYear)
var mo = calendar.months.abbr.filter(monthOfYear)

var h = hours % 12 || 12
var hh = pad(h)
var H = hours
var HH = pad(hours)

var M = mins
var MM = pad(mins)

var S = secs
var SS = pad(secs)

var s = ms
var ss = pad(ms, 3)

var t = hours < 12 ? ' a' : ' p'
var tt = hours < 12 ? ' am' : ' pm'
var T = hours < 12 ? ' A' : ' P'
var TT = hours < 12 ? ' AM' : ' PM'

var ts = [h, MM].join(':') + TT
var tss = [hh, MM].join(':') + TT

var now = date.toLocaleString()
var tim = date.toLocaleTimeString()
var times = date.toTimeString()
var offset = date.getTimezoneOffset()
var onset = date.getTimezoneOffset() / 60
var o = (offset > 0 ? '-' : '+') + pad(Math.floor(Math.abs(offset) / 60) * 100 + Math.abs(offset) % 60, 4)
var oo = (onset > 0 ? '-' : '+') + pad(Math.floor(Math.abs(onset)) * 100, 4)
// var sign
// if (offset > 0) sign = '-'
// else sign = '+'
// var Z = sign + '0' + offset.toString() + '00'
var iso8601 = year+'-'+mm+'-'+dd+'T'+HH+':'+MM+':'+SS+oo
var L = ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
var ordinal = d + L
var thisQuarter = quarter()
var getWEEk = getWeek()
var daynum = currentDayThisYear()
var daysthisyear = daysInYear()
var dim = daysInMonth().toString()
var arrtest = []
var arrtest1 = [1, 20]
var chkarr = isNull(arrtest1)

function monthOfYear (val, idx, arr) {
  if (idx === thismonth) return val
}

function dayOfWeek (val, idx, arr) {
  if (idx === thisday) return val
}

function getWeek() {
  var date = new Date()
  // Remove time components of date
  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Change date to Thursday same week
  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

  // Take January 4th as it is always in week 1 (see ISO 8601)
  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

  // Change date to Thursday same week
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

  // Check if daylight-saving-time-switch occured and correct for it
  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours(targetThursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
  return 1 + Math.floor(weekDiff);
}

function quarter () {
  if (thismonth < 3) return 1
  if (thismonth < 6) return 2
  if (thismonth < 9) return 3
  return 4
}

function isLeapYear () {
  return thisyear % 400 === 0 || (thisyear % 100 !== 0 && thisyear % 4 === 0)
}

function daysInMonth () {
  if (thismonth === 1 && isLeapYear(thisyear)) return 29
  else return calendar.months.dim.filter(monthOfYear)
}

// testing this out. looks to be more efficent.
function daysinMonth () {
  return new Date(year, month, 0).getDate()
}

function daysInYear () {
  return isLeapYear(thisyear) ? 366 : 365
}

function daysLeftThisWeek () {
  return 6 - thisday
}

function daysLeftThisMonth () {
  return daysinMonth() - day
}

function daysLeftThisYear () {
  return daysInYear() - daynum
}

function currentDayThisYear () {
  var end = new Date(date.getTime())
  var start = new Date(date.setMonth(0, 0))
  var diff = end - start
  return Math.ceil(diff / 86400000).toString()
}

function yrRange (startyear) {
  if (typeof startyear === 'object') startyear = ''
  var range = startyear ? startyear + '-' + year : year
  return range
}

function pad (val, len) {
  val = String(val)
  len = len || 2
  while (val.length < len) {
    val = '0' + val
  }
  return val
}

function isNull (arr) {
  // return arr
  if (arr.length === 0) return true
  else return false
}
var msInDay = 1000 * 60 * 60 * 24
function periodicMS () {
  var ms
}

// tests
console.log(now)
console.log(dow + ', ' + mon + ' ' + ordinal + ', ' + year + ', ' + ts)
console.log(tim)
console.log(times)
console.log(ts)
console.log(tss)
console.log(offset)
console.log(o)
console.log('offset: ', oo)
console.log(iso8601)
console.log('year: ', year)
console.log('year: ', yr)
console.log('fn year range: ', yrRange(2013))
console.log('fn yr range: ', yrRange())
console.log('month: ', m)
console.log('month: ', mm)
console.log('month: ', mmm)
console.log('month: ', mmmm)
console.log('day: ', d)
console.log('day: ', dd)
console.log('day: ', dx)
console.log('day: ', ddd)
console.log('day: ', dddd)
console.log('hour: ', h)
console.log('hour: ', hh)
console.log('hour: ', H)
console.log('hour: ', HH)
console.log('minutes: ', M)
console.log('minutes: ', MM)
console.log('seconds: ', S)
console.log('seconds: ', SS)
console.log('ms: ', s)
console.log('ms: ', ss)
console.log('iso week: ', getWEEk)
console.log('day number of year: ', daynum)
console.log('ordinal day: ', ordinal)
console.log('this quarter: ', thisQuarter)
console.log('days this month: ', dim)
console.log('number of days this month: ', daysinMonth())
console.log('is this a leap year? ', isLeapYear())
console.log('how many days this year? ', daysthisyear)
console.log('how many days left in this week: ', daysLeftThisWeek())
console.log('how many days left in this month: ', daysLeftThisMonth())
console.log('how many days left in this year: ', daysLeftThisYear())
console.log(chkarr)
console.log('newDate: ', new Date(new Date().getTime()))
console.log('firDate: ', new Date(new Date().setMonth(0, 0)))
console.log('diff: ', new Date(new Date().getTime()) - new Date(new Date().setMonth(0, 0)))
console.log('days: ', Math.ceil((new Date().getTime() - new Date(new Date().setMonth(0, 0))) / 86400000).toString())
console.log(msInDay)
  // switch (frmt) {
  //   case 'now' : return  Date.now(); break;
  //   case 'iso' : return new Date().toLocaleString(); break;
  //   default : break;
  // }

