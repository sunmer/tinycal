# tinycal.js - a lightweight JavaScript datepicker

tinycal.js is a simple date picker made to be easy to use yet
highly flexible. Weighing in at around 4kb and requiring no
external dependencies it's a good choice for developers looking
to implement date handling in their web applications.

## usage
tinycal.init() - Will render a default unstyled date picker

## default options:
    var options = {
  	calendarID: the id attribute for the date picker table which is generated. Default: 'tinycal',
  	year: the initial year which is rendered. Default: current year, 
  	month: the initial month which is rendered. Default: current month, 
  	sunStart: start the week on sunday (true) or monday (false). Default: false, 
  	fullWeek: array of days which represents the week. Default: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  	fullYear: array of months which represents the year. Default: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
  	callback: callback method when a date has been clicked. Default: null
    }

## Example options
    tinycal.init({
  	calendarID: 'tinycal',
  	year: 2012, 
  	month: 7, 
  	sunStart: false, 
  	fullWeek: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  	fullYear: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
  	callback: function(date) { 
  		alert(date); 
  	}
    });