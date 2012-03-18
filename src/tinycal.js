var tinycal = (function() {
  
  var d = document;
  var startDate = new Date();
  
  var options = {
  	calendarID: 'tinycal',
  	year: startDate.getFullYear(), 
  	month: startDate.getMonth(), 
  	sunStart: true, 
  	fullWeek: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  	fullYear: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
  	callback: null
  }
  
  function toggleDate(year, month) {
    d.body.removeChild(d.getElementById(options.calendarID));
	createTable(year, month);
  }
    
  function createTable(year, month, sunStart) {
  	var now = new Date(year, month, 1);

  	var firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  	
    var table = d.createElement("table");
    var thead = d.createElement("thead");
    var tr = d.createElement("tr");
    var tcell = d.createElement("th");
    
    var link = d.createElement("a");
    link.addEventListener('click', function() { toggleDate(now.getFullYear(), now.getMonth() - 1) }, false);
    link.setAttribute("href", "#");
    link.appendChild(d.createTextNode("<"));
    link.style['float'] = "left";
    tcell.appendChild(link);
    
    tcell.appendChild(d.createTextNode(options.fullYear[now.getMonth()] + " " + now.getFullYear()));
    
    link = d.createElement("a");
    link.addEventListener('click', function() { toggleDate(now.getFullYear(), now.getMonth() + 1) }, false);
    link.setAttribute("href", "#");
    link.appendChild(d.createTextNode(">"));
    link.style['float'] = "right";
    tcell.appendChild(link);
    
    tcell.setAttribute("colspan", "7");
    tcell.setAttribute("align", "center");
	tr.appendChild(tcell);
    thead.appendChild(tr);
    tr = d.createElement("tr");
	
    for(i = 0; i < options.fullWeek.length; i++) {
	  tcell = d.createElement("th");
	  tcell.appendChild(d.createTextNode(options.fullWeek[i]));
	  tr.appendChild(tcell);
	}
	thead.appendChild(tr);

    var tbody = d.createElement("tbody");
	var row = d.createElement("tr");
	var tdsInRow = 1;
	var dayOffset = firstOfMonth.getDay();
	
	//Sunday is the seventh day of the week if !sunStart
	if(!sunStart && dayOffset === 0) {
		dayOffset = 7;	
	}
	
	var weekStart = sunStart ? 0 : 1;
	for(var i = weekStart; i < dayOffset; i++) {
		tcell = d.createElement("td");
		row.appendChild(tcell);
		tdsInRow++;
	}
	
	var isThisMonthAndYear = now.getFullYear() === startDate.getFullYear() && now.getMonth() === startDate.getMonth();
	
	//Next months 0 date is the length of this month
	var daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for(var i = 1; i <= daysInMonth; i++) {
        tcell = d.createElement("td");    
        link = d.createElement("a");
        link.setAttribute('href', '#');
        link.appendChild(d.createTextNode(i));
        
        if(isThisMonthAndYear && i == startDate.getDate()) {
        	tcell.setAttribute('class', 'today');		
        }
        
        tcell.appendChild(link);
        row.appendChild(tcell);
        
        if(tdsInRow % 7 === 0) {
        	tbody.appendChild(row);
        	row = d.createElement("tr");
        }
        
        if(options.callback !== null) {
        	(function() {
	        	var date = i;
	        	link.addEventListener('click', function t() { options.callback(new Date(year, month, date)); }, false);	
	        })();	
        }
        
        tdsInRow++;
    }
    
    tbody.appendChild(row);    
	table.appendChild(thead);
    table.appendChild(tbody);
    table.setAttribute('id', options.calendarID);
    table.className = 'tinycal';
    d.body.appendChild(table);
  }
  
  function init(opts) {
  	if(typeof opts !== 'undefined') {
  		
  		//JS months start with 0, human logic doesn't
  		if(typeof opts.month === 'number') {
  			opts.month = opts.month - 1;	
  		}
  		
  		for(var prop in options) {
	  		if(typeof opts[prop] !== 'undefined') {
	  			options[prop] = opts[prop];
	  		}
	  	}
  	}
  	
  	if(!options.sunStart) {
		options.fullWeek.push(options.fullWeek[0]);
		options.fullWeek.shift();
	}
	
  	createTable(options.year, options.month, options.sunStart);
  }

  return {
    init : init
  }

})();