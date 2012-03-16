var dp = (function() {
  
  var now;
  var firstOfMonth;
  var d = document;
  var currYear, currMonth;
  
  var week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  var year = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  
  function getCurrentMonthStr() {
  	return year[now.getMonth()];
  }
  
  function createTable(year, month) {
  	console.time('createTable');
  	currYear = year;
  	currMonth = month;
  	now = new Date(currYear, currMonth, 0);
  	firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  	
    var body = d.getElementsByTagName("body")[0];
    var table = d.createElement("table");
    var thead = d.createElement("thead");
    var tr = d.createElement("tr");
    var tcell = d.createElement("th");
    
    var prevMonthArrow = d.createElement("a");
    prevMonthArrow.addEventListener('click',function () {
    	currMonth--;
    	d.body.removeChild(d.getElementById('cal'));
		createTable(currYear, currMonth);
	}, false);
    prevMonthArrow.setAttribute("href", "#");
    prevMonthArrow.style.float = "left";
    prevMonthArrow.appendChild(d.createTextNode("<"));
    
    var nextMonthArrow = d.createElement("a");
    nextMonthArrow.addEventListener('click',function () {
    	currMonth++;
    	d.body.removeChild(d.getElementById('cal'));
		createTable(currYear, currMonth);
	}, false);
	
    nextMonthArrow.setAttribute("href", "#");
    nextMonthArrow.appendChild(d.createTextNode(">"));
    nextMonthArrow.style.float = "right";
    
    tcell.appendChild(prevMonthArrow);
    tcell.appendChild(d.createTextNode(getCurrentMonthStr() + " " + now.getFullYear()));
    tcell.appendChild(nextMonthArrow);
    
    tcell.setAttribute("colspan", "7");
    tcell.setAttribute("align", "center");
	tr.appendChild(tcell);
    thead.appendChild(tr);
    tr = d.createElement("tr");
    for(var i = 0; i < week.length; i++) {
	  tcell = d.createElement("th");
	  var cellText = d.createTextNode(week[i]);
	  tcell.appendChild(cellText);
	  tr.appendChild(tcell);
	}
	thead.appendChild(tr);

    var tableBody = d.createElement("tbody");
	var row = d.createElement("tr");
	var tdsInRow = 1;
	var dayOffset = firstOfMonth.getDay();
	var daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    for (var i = 1 - dayOffset; i <= daysInMonth; i++) {
        var cell = d.createElement("td");        
        var cellText = d.createTextNode(i);
        cell.appendChild(cellText);
        row.appendChild(cell);
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
    body.appendChild(table);
    
    console.timeEnd('createTable');
  }

  return {
    createTable : createTable
  }

})();