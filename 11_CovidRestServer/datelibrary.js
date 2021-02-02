'use strict';

function dateToIsoDate(date) {
  const [isoDate, ] = date.toISOString().split('T'); // Returns only date, not the time (.split('T')) w/o --> eg. 2021-01-27T12:50:05.456Z
  return isoDate;
}

function isoDateNow() {
  return dateToIsoDate(new Date(Date.now()));
}

// For using the date range in queries:
function addDays(isoDate, daysToAdd) {
  const dayInMs = 24*60*60*1000; // one day in milliseconds
  const date = new Date(isoDate);
  date.setTime(date.getTime() + dayInMs*daysToAdd); // getTime --> current time in ms

  return dateToIsoDate(date);
}

function addOneDay(isoDate) {
  return addDays(isoDate, 1);
}

module.exports = { dateToIsoDate, isoDateNow, addDays, addOneDay };