var dp = (function() {
  
  var now;
  var firstOfMonth;
  var d = document;
  
  var fullWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  var fullYear = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  
  function toggleDate(year, month) {
    d.body.removeChild(d.getElementById('cal'));
	createTable(year, month);
  }
  
  function createTable(year, month) {
  	console.time('createTable');
  	now = new Date(year, month, 0);
  	firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  	
    var table = d.createElement("table");
    var thead = d.createElement("thead");
    var tr = d.createElement("tr");
    var tcell = d.createElement("th");
    
    var prevMonthArrow = d.createElement("a");
    prevMonthArrow.addEventListener('click', function() { toggleDate(year, month - 1) }, false);
    prevMonthArrow.setAttribute("href", "#");
    prevMonthArrow.appendChild(d.createTextNode("<"));
    prevMonthArrow.style.float = "left";
    
    var nextMonthArrow = d.createElement("a");
    nextMonthArrow.addEventListener('click', function() { toggleDate(year, month + 1) }, false);
    nextMonthArrow.setAttribute("href", "#");
    nextMonthArrow.appendChild(d.createTextNode(">"));
    nextMonthArrow.style.float = "right";
    
    tcell.appendChild(prevMonthArrow);
    tcell.appendChild(d.createTextNode(fullYear[now.getMonth()] + " " + now.getFullYear()));
    tcell.appendChild(nextMonthArrow);
    
    tcell.setAttribute("colspan", "7");
    tcell.setAttribute("align", "center");
	tr.appendChild(tcell);
    thead.appendChild(tr);
    tr = d.createElement("tr");
    for(var i = 0; i < fullWeek.length; i++) {
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

    for(var i = 1 - dayOffset; i <= daysInMonth; i++) {
        tcell = d.createElement("td");        
        var cellText = d.createTextNode(i > 0 ? i : "");
        tcell.appendChild(cellText);
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
    
    console.timeEnd('createTable');
  }

  return {
    createTable : createTable
  }

})();