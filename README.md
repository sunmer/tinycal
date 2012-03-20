# tinycal.js - a lightweight JavaScript datepicker

tinycal.js is a date picker which is easy to use yet
highly flexible. Weighing in at around 4kb and requiring no
external dependencies it's a good choice for developers looking
to use date handling in their web applications.

## basic usage
tinycal.init( { container: document.body } ) - Will render a default unstyled date picker. The 
container option is the only required option, the others can be left out.

## Default options
    var options = {
  	  calendarID: the id attribute for the date picker table which is generated. Default: 'tinycal',
  	  callback: callback method when a date has been clicked. Default: null,
  	  container: DOM object which tinycalendar is appended to. Example: document.body, 
  	  month: the initial month which is rendered. Default: current month, 
  	  year: the initial year which is rendered. Default: current year,
  	  fullWeek: array of days which represents the week. Default: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  	  fullYear: array of months which represents the year. Default: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
  	  sunStart: start the week on sunday (true) or monday (false). Default: false
    }

## Example options
    var options = {
  	  calendarID: 'myCalendar',
  	  callback: function(date) { alert(date); }, 
  	  container: document.getElementsByTagName('body')[0], 
  	  month: 4, 
  	  year: 2017,
  	  fullWeek: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  	  fullYear: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'oktober', 'november', 'december'],
  	  sunStart: true
    }
    
    tinycal.init(options);