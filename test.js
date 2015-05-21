/*!
 * testproj632 <https://github.com/akileez/testproj632>
 *
 * Copyright (c) 2015 Keith Williams.
 * Licensed under the ISC license.
 */

var calendar = require('./lib/calendar')
var frmt     = require('./lib/formats')

// core
var date = new Date()

var thisday = date.getDay()
var thisweek = getWeek()
var thismonth = date.getMonth()
var thisquarter = getQuarter()
var thisyear = date.getFullYear()

var day = date.getDate()
var month = date.getMonth() + 1
var year = thisyear.toString()
var hours = date.getHours()
var mins = date.getMinutes()
var secs = date.getSeconds()
var ms = date.getMilliseconds()

var offset = date.getTimezoneOffset()
var GMT = (offset > 0 ? '-' : '+') + pad(Math.floor(Math.abs(offset) / 60) * 100 + Math.abs(offset) % 60, 4)

var ordinal = day + ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]

var daythisyear
var daysthisyear
var daysthismonth
var daysleftthisweek
var daysleftthismonth
var daysleftthisyear


var flags = {
  d        : day,
  dd       : pad(day),
  ddd      : calendar.days.abbr.filter(dayOfWeek).toString(),
  dddd     : calendar.days.names.filter(dayOfWeek).toString(),
  m        : month,
  mm       : pad(month),
  mmm      : calendar.months.abbr.filter(monthOfYear).toString(),
  mmmm     : calendar.months.names.filter(monthOfYear).toString(),
  yyyy     : year,
  yy       : year.slice(2),
  h        : hours % 12 || 12,
  hh       : pad(h),
  H        : hours,
  HH       : pad(hours),
  M        : mins,
  MM       : pad(mins),
  S        : secs,
  SS       : pad(secs),
  s        : ms,
  ss       : pad(ms, 3),
  t        : hours < 12 ? ' a' : ' p',
  tt       : hours < 12 ? ' am' : ' pm',
  T        : hours < 12 ? ' A' : ' P',
  TT       : hours < 12 ? ' AM' : ' PM',
  Z        : GMT,
  o        : ordinal,
  O        : calendar.days.short.filter(dayOfWeek).toString()
}

function getDate (datetime, mask) {
  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g
  if (arguments.length === 1 && kindOf(datetime) === 'string' && !/\d/.test(datetime)) {
    mask = datetime
    datetime = undefined
  }
  console.log(/\d/.test(datetime))
  datetime = datetime || new Date
  if (!(datetime instanceof Date)) datetime = new Date(datetime)
  if (isNaN(datetime)) throw TypeError('Invalid date')

  mask = String(frmt[mask] || mask || frmt.default)
  console.log(mask)
  return mask.replace(token, function (match) {
    if (match in flags) return flags[match]
    return match.slice(1, match.length - 1)
  })
}

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

// testing new quarter calculation.
function getQuarter () {
  return (Math.ceil(month / 3))
}

function isLeapYear () {
  return thisyear % 400 === 0 || (thisyear % 100 !== 0 && thisyear % 4 === 0)
}

function daysInMonth () {
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
  var msid = 1000 * 60 * 60 * 24 // 86,400,000 ms
  var end = new Date(date.getTime())
  var start = new Date(date.setMonth(0, 0))
  var diff = end - start
  return Math.ceil(diff / msid)
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

function kindOf(val) {
  if (val === null) {
    return 'null';
  }

  if (val === undefined) {
    return 'undefined';
  }

  if (typeof val !== 'object') {
    return typeof val;
  }

  if (Array.isArray(val)) {
    return 'array';
  }

  return {}.toString.call(val)
    .slice(8, -1).toLowerCase();
};