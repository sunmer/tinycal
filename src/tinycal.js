var tinycal = (function() {
  
  var d = document;
  var options, startDate;
  
  function toggleDate(year, month, currentOptions) {
    currentOptions.container.removeChild(d.getElementById(currentOptions.calendarID));
	createTable(year, month, currentOptions);
  }
  
  function createTable(year, month, currentOptions) {
  	var now = new Date(year, month, 1);

  	var firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  	
    var table = d.createElement("table");
    var thead = d.createElement("thead");
    var tr = d.createElement("tr");
    var tcell = d.createElement("th");
    
    var link = d.createElement("a");
    
   	if(!link.addEventListener) {
   		link.attachEvent('onclick', function() { toggleDate(now.getFullYear(), now.getMonth() - 1, currentOptions) });	
   	} else {
   		link.addEventListener('click', function() { toggleDate(now.getFullYear(), now.getMonth() - 1, currentOptions) }, false);	
   	}
    
    link.appendChild(d.createTextNode("<"));
    link.className = "prev";
    tcell.appendChild(link);
    
    var heading = d.createElement("span");
    heading.appendChild(d.createTextNode(options.fullYear[now.getMonth()] + " " + now.getFullYear()));
    tcell.appendChild(heading);
    
    link = d.createElement("a");
    
   	if(!link.addEventListener) {
   		link.attachEvent('onclick', function() { toggleDate(now.getFullYear(), now.getMonth() + 1, currentOptions) });	
   	} else {
   		link.addEventListener('click', function() { toggleDate(now.getFullYear(), now.getMonth() + 1, currentOptions) }, false);
   	}
	
    link.appendChild(d.createTextNode(">"));
    link.className = "next";
    tcell.appendChild(link);
    
    tcell.setAttribute("colSpan", "7");
	tr.appendChild(tcell);
    thead.appendChild(tr);
    tr = d.createElement("tr");
    
    for(i = 0; i < currentOptions.fullWeek.length; i++) {
      tcell = d.createElement("th");
	  tcell.appendChild(d.createTextNode(currentOptions.fullWeek[i]));
	  tr.appendChild(tcell);
	}
	thead.appendChild(tr);

    var tbody = d.createElement("tbody");
	var row = d.createElement("tr");
	var tcellsInRow = 1;
	var dayOffset = firstOfMonth.getDay();
	
	//Sunday is the seventh day of the week if !sunStart
	if(!currentOptions.sunStart && dayOffset === 0) {
		dayOffset = 7;
	}
	
	var weekStart = currentOptions.sunStart ? 0 : 1;
	for(var i = weekStart; i < dayOffset; i++) {
		tcell = d.createElement("td");
		row.appendChild(tcell);
		tcellsInRow++;
	}

	var isThisMonthAndYear = now.getFullYear() === startDate.getFullYear() && now.getMonth() === startDate.getMonth();
	
	//Next months 0 date is the length of this month
	var daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for(var i = 1; i <= daysInMonth; i++) {
        tcell = d.createElement("td");    
        if(isThisMonthAndYear && i == startDate.getDate()) {
        	tcell.className = 'today';		
        } else {
        	tcell.className = 'day';	
        }
        	
        link = d.createElement("a");
        link.appendChild(d.createTextNode(i));
        tcell.appendChild(link);
        row.appendChild(tcell);
        
        if(tcellsInRow % 6 == 0) {
        	tcell.className += " weekend sat";
        }
        
        if(tcellsInRow % 7 === 0) {
        	tcell.className += " weekend sun";
        	tbody.appendChild(row);
        	row = d.createElement("tr");
        	tcellsInRow = 0;
        }
        
        if(currentOptions.callback) {
        	(function() {
	        	var date = i;
	        	if(!link.addEventListener) {
		    		link.attachEvent('onclick', function t() { currentOptions.callback(new Date(year, month, date)); });	
		    	} else {
		    		link.addEventListener('click', function t() { currentOptions.callback(new Date(year, month, date)); }, false);	
		    	}
        	})();
        }
        
        tcellsInRow++;
    }
	
    for(var i = daysInMonth + dayOffset; i <  43; i++) {
    	tcell = d.createElement("td");
    	tcell.innerHTML = "&nbsp;";
    	row.appendChild(tcell);
    	
    	if(tcellsInRow % 7 === 0) {
        	tbody.appendChild(row);
        	row = d.createElement("tr");
        }
        tcellsInRow++;
    }
    
    tbody.appendChild(row);    
	table.appendChild(thead);
    table.appendChild(tbody);
    table.setAttribute('id', currentOptions.calendarID);
    table.className = 'tinycal';
    currentOptions.container.appendChild(table);
  }
  
  function init(opts) {
  	startDate = new Date();
  	options = {
	  	calendarID: 'tinycal',
	  	callback: false,
	  	container: document.body,
	  	month: startDate.getMonth(),
	  	year: startDate.getFullYear(),
	  	fullWeek: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
	  	fullYear: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
	  	sunStart: false
	}
	
  	if(typeof opts !== 'undefined') {
  		
  		//JS months start with 0, human logic doesn't
  		if(typeof opts.month === 'number') {
  			opts.month = opts.month - 1;	
  		}
  		
  		for(var prop in options) {
	  		if(typeof opts[prop] === 'undefined') {
	  			opts[prop] = options[prop];	
	  		}
	  	}
  	} else {
  		opts = options;
  	}
  	
  	if(opts.sunStart) {
		opts.fullWeek.unshift(opts.fullWeek.pop());
	}
	
	createTable(opts.year, opts.month, opts);
  }
  
  return {
    init : init
  }

})();