var dp = (function() {
  
  var d = document;

  var fullWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  var fullYear = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  var defaultDate = new Date();
  var defaultOpts = { target: false, year: defaultDate.getFullYear(), month: defaultDate.getMonth() + 1, sunStart: false }
  var elTarget = false;
  
  function toggleDate(year, month) {
    d.body.removeChild(d.getElementById('cal'));
	createTable(year, month);
  }
  
  function writeDate(year, month, date) {
  	if(elTarget !== null) {
  		elTarget.value = new Date(year, month - 1, date).toString();	
  	}
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
	
    for(i = 0; i < fullWeek.length; i++) {
	  tcell = d.createElement("th");
	  tcell.appendChild(d.createTextNode(fullWeek[i]));
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
	
	var daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for(var i = 1; i <= daysInMonth; i++) {
        tcell = d.createElement("td");    
        link = d.createElement("a");
        link.setAttribute('href', '#');
        link.appendChild(d.createTextNode(i));
        tcell.appendChild(link);
        row.appendChild(tcell);
        if(tdsInRow % 7 === 0) {
        	tbody.appendChild(row);
        	row = d.createElement("tr");
        }
        (function() {
        	var date = i;
        	link.addEventListener('click', function t() { writeDate(year, month, date); }, false);	
        })();
        
        tdsInRow++;
    }
    
    tbody.appendChild(row);    
	table.appendChild(thead);
    table.appendChild(tbody);
    table.setAttribute('id', 'cal');
    d.body.appendChild(table);
    
    console.timeEnd("creating dp");
  }
  
  function init(opts) {
  	if(typeof opts !== 'undefined') {
  		for(var prop in defaultOpts) {
	  		if(typeof opts[prop] === 'undefined') {
	  			opts[prop] = defaultOpts[prop]	
	  		}
	  	}
  	} else {
  		opts = defaultOpts;	
  	}
  	if(!opts['sunStart']) {
		fullWeek.push(fullWeek[0]);
		fullWeek.shift();
	}
	
	elTarget = opts['target'];
	
  	createTable(opts['year'], opts['month'], opts['sunStart']);
  }

  return {
    init : init
  }

})();