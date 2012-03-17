var dp = (function() {
  
  var d = document;

  var fullWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  var fullYear = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  var defaultDate = new Date();
  var defaults = { year: defaultDate.getFullYear(), month: defaultDate.getMonth() + 1, sunStart: false }
  
  function toggleDate(year, month) {
    d.body.removeChild(d.getElementById('cal'));
	createTable(year, month);
  }
  
  function createTable(year, month, sunStart) {
  	console.time("creating dp");
  	var now = new Date(year, month, 0);
  	var firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  	
    var table = d.createElement("table");
    var thead = d.createElement("thead");
    var tr = d.createElement("tr");
    var tcell = d.createElement("th");
    
    var link = d.createElement("a");
    link.addEventListener('click', function() { toggleDate(year, month - 1) }, false);
    link.setAttribute("href", "#");
    link.appendChild(d.createTextNode("<"));
    link.style['float'] = "left";
    tcell.appendChild(link);
    
    tcell.appendChild(d.createTextNode(fullYear[now.getMonth()] + " " + now.getFullYear()));
    
    link = d.createElement("a");
    link.addEventListener('click', function() { toggleDate(year, month + 1) }, false);
    link.setAttribute("href", "#");
    link.appendChild(d.createTextNode(">"));
    link.style['float'] = "right";
    tcell.appendChild(link);
    
    tcell.setAttribute("colspan", "7");
    tcell.setAttribute("align", "center");
	tr.appendChild(tcell);
    thead.appendChild(tr);
    tr = d.createElement("tr");
	
	var weekStart = sunStart ? 0 : 1;
	var weekEnd = sunStart ? fullWeek.length - 1 : fullWeek.length;
	
    for(i = weekStart; i < weekEnd; i++) {
	  tcell = d.createElement("th");
	  tcell.appendChild(d.createTextNode(fullWeek[i]));
	  tr.appendChild(tcell);
	}
	thead.appendChild(tr);

    var tableBody = d.createElement("tbody");
	var row = d.createElement("tr");
	var tdsInRow = 1;
	var dayOffset = firstOfMonth.getDay();
	
	var daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
		
	if(!sunStart && dayOffset === 0) {
		dayOffset = 7;	
	}
	
	for(var i = weekStart; i < dayOffset; i++) {
		tcell = d.createElement("td");
		row.appendChild(tcell);
		tdsInRow++;
	}

    for(var i = 1; i <= daysInMonth; i++) {
        tcell = d.createElement("td");    
        link = d.createElement("a");
        link.setAttribute('href', '#');
        link.appendChild(d.createTextNode(i));
        tcell.appendChild(link);
        row.appendChild(tcell);
        if(tdsInRow % 7 === 0) {
        	tableBody.appendChild(row);
        	row = d.createElement("tr");
        }
        tdsInRow++;
    }

    tableBody.appendChild(row);    
	table.appendChild(thead);
    table.appendChild(tableBody);
    table.setAttribute('id', 'cal');
    d.body.appendChild(table);
    console.timeEnd("creating dp");
  }
  
  function init(opts) {
  	if(typeof opts !== 'undefined') {
  		for(var prop in defaults) {
	  		if(typeof opts[prop] === 'undefined') {
	  			opts[prop] = defaults[prop]	
	  		}
	  	}
  	} else {
  		opts = defaults;	
  	}
  	createTable(opts['year'], opts['month'], opts['sunStart']);
  }

  return {
    init : init
  }

})();