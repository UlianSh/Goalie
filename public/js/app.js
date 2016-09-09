initModals();

$.get("/projects", function(data, status) {
	projects = JSON.parse(data);
	var numOfProjects = projects.length;
	console.log("projects loaded:" + projects);
	console.log("total number of user projects is:" + numOfProjects);
	
	if (numOfProjects == 0){
		//first app run, no projects
		document.getElementById('myModal').style.display="block";
		CreateNewProjectNameBtn();
	}
	else{
		select = document.getElementById("mySelect");
		for (var i = 0; i < numOfProjects; i++){
  			select.innerHTML += '<option value="'+projects[i]+'">'+projects[i];
		}
		loadTiles(projects[0]);
	}		
});

$.get("/getImagesJSON", function(data, status) {
    files = JSON.parse(data);
    console.log(files);
    for (var i = 0; i < files.length; i++)
    {
        document.getElementById("mySidenav").innerHTML +=
        '<img src=' + files[i][0]+ ' class="tileImage" ' + 'onmouseover=openNav2('+i+') ' + ' onmouseout=closeNav2()>' +
        '<br>' +
        '<br>'
    }

    interact('.draggable')
        .draggable({
            inertia: false,
            restrict: {
                //restriction: "parent",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            autoScroll: true,
            onmove: dragMoveListener,
            onend: function (event) {
                console.log(event.target.querySelector('input'))

            }
        });

});


//End of Callback

// Write new functions,procedures here!

function initModals(){
//FIRST MODAL FUNCTIONS-CREATE PROJECT
	// Get the modal
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementById("close");

	// When the user clicks the button, open the modal
	btn.onclick = function() {
		  modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		  modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
  		if (event.target == modal)  {
    			modal.style.display = "none";
				alert('The Project was not created!, type any project name and click enter button');
  		}
		
		 if(event.target == modal2){
			 modal2.style.display = "none";
		 }
	}

	document.getElementById("newProjectNameTextField")
      .addEventListener("keyup", function(event) {
      //event.preventDefault();
      if (event.keyCode == 13) {
          document.getElementById("CreateNewProjectNameBtnID").click();// ();
      }
	});




	// SECOND MODAL FUNCTIONS- REMOVE PROJECT WARNING
	// Get the modal
	var modal2 = document.getElementById('myModal2');

	// Get the button that opens the modal
	var btn2 = document.getElementById("myDeleteBtn");

	// Get the <span> element that closes the modal
	var span2 = document.getElementById("close2");

	// When the user clicks the button, open the modal
	btn2.onclick = function() {
		modal2.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span2.onclick = function() {
		modal2.style.display = "none";
	}
}

function onClickSaveBtn(projName){
	select = document.getElementById("mySelect");
	saveTiles(select.value);	
}

function onClickDeleteBtn(){
  	select = document.getElementById("mySelect");
  	value = select.selectedIndex;
  	if (value>-1){
			deleteTiles(select.value);
    		select.removeChild(select[value]);
    		console.log("index deleted: "+value);		
  	}
	else{}
	value = select.selectedIndex;
	if (value>-1){
			// LOAD other projec if exist by "value"
			loadTiles(select.value);	
  	}
	else{removeAllTiles();
	}
	
  	document.getElementById('myModal2').style.display = "none";
}

var lastSelectedValueOnDropDwnMenu = "";
function onMouseDownDropdown(){
	var selected =  document.getElementById("mySelect").value;
	
	if (selected !=""){
		this.lastSelectedValueOnDropDwnMenu =selected;
		console.log(this.lastSelectedValueOnDropDwnMenu);
	}
}

function onChangeDropdown(){
	
  	var x = document.getElementById("mySelect").value;
  	//console.log(x);
	saveTiles(this.lastSelectedValueOnDropDwnMenu);
    loadTiles(x); //This should load in that project.
	
}

function CreateNewProjectNameBtn() {
    var x = document.getElementById("newProjectNameTextField").value;
  	document.getElementById("newProjectNameTextField").value = "";
  	var modal = document.getElementById('myModal');
  	if (x!="")
  	{
			select = document.getElementById("mySelect");
			if(select.length==0){
				// no projects
			}
			else{
				// atleast one project already exist so saving the prevoius open
				saveTiles(select.value);
				removeAllTiles();
			}
				
  			select.innerHTML += '<option value="'+x+'">'+x;
  			var l = select.length;
  			select.selectedIndex = l-1;
			modal.style.display = "none";
  	}
	
    
}

function playFunc(childButton){
    window.speechSynthesis.cancel();
    setTimeout(function() {
        var text = childButton.parentElement.getElementsByClassName("textInput")[0].value;
        var speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }, 1000)
}

function openNav() {
    document.getElementById("mySidenav").style.width = "120px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";

}

function openNav2(folderNum) {
    document.getElementById("mySidenav2").style.width = "120px";
    document.getElementById("mySidenav2").innerHTML=null;
    for (var ii = 1; ii< files[folderNum].length; ii++)
    {
        var imgSrc = files[folderNum][ii];
        document.getElementById("mySidenav2").innerHTML +=
        '<img src="' + imgSrc + '" class="tileImage"  onclick="createTile(\'' + imgSrc + '\''+','+'true)" onmouseover="enlargeIcon(this)" onmouseout="minimizeIcon(this)"> '+
        '<br>' +
        '<br>'
    }
}

function minimizeIcon(a){
    a.style.width="100px";
    a.style.height="100px";
}

function enlargeIcon(a){
    a.style.width="105px";
    a.style.height="105px";
}

function closeNav2() {
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("mySidenav").style.width = "0";
}

function keepNavOpen(){
    document.getElementById("mySidenav").style.width = "120px";
    document.getElementById("mySidenav2").style.width = "120px";
}

var lastClosedTile = [];
function backButton(){
	if(lastClosedTile.length>0)
		document.body.appendChild(this.lastClosedTile.pop());
	
	
}

function closeFunc(childButton){
    var parentDiv = childButton.parentElement;
    var body = parentDiv.parentElement;
	lastClosedTile.push(parentDiv);
    body.removeChild(parentDiv);
}

function dragMoveListener(event){
    var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    moveTile(target,x,y);

}

function moveTile(target,x,y){
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    target.getAttribute('data-x'), target.getAttribute('data-x')
}

window.dragMoveListener = dragMoveListener;

function createTile(imgSrc,newOrOld){
/* inputs: image url, bool new or loaded element*/

    var tile = document.createElement("div");
  	if (newOrOld){
  	  	tile.style.top += Math.floor(((Math.random()*2-1) * 10+ 400))+'px';
      	tile.style.left += Math.floor(((Math.random()*2-1) * 10 + 400))+'px';
  	}
    tile.style.background = "white";
    tile.className = "draggable";
    console.log('test:',imgSrc.indexOf('arrow'))
    if(imgSrc.indexOf('arrow') == -1) // Not arrow
    {
		tile.style.width = "170px";
    	tile.style.height = "200px";
        tile.innerHTML = '<img src="' + imgSrc + '" class="generalTileImage"></img>' +
        '<button type="button" class="playButton" onclick="playFunc(this)">Play</button>' +
        '<button type="button" class="closeButton" onclick="closeFunc(this)">X</button>' +
        '<textarea rows="4" cols="50" class="textInput"></textarea>' + 
		'<var isArrow = "false" class="arrowFlag"></var>';
    }
    else	//	Arrow 
    {
        tile.style.width = "150px";
        tile.style.height = "120px";
        tile.innerHTML = '<img src="' + imgSrc + '" class="arrowTileImage">'+ 
		'<button type="button" class="closeButton" onclick="closeFunc(this)">X</button>' +
		'<var isArrow = "true" class="arrowFlag"></var>';
    }
    document.body.appendChild(tile);
    console.log(imgSrc);
    return tile;
}

function loadTile(loadedTile){
    var tile = createTile(loadedTile.img,false);
    moveTile(tile,loadTile.x,loadedTile.y);
  	if(loadedTile.isArrow == 'false') {
        tile.getElementsByClassName('textInput')[0].value = loadedTile.text;
    }
    tile.style.background = loadedTile.color;
    moveTile(tile,loadedTile.x,loadedTile.y)
    return tile;
}

function defaultText(textInput) {
    if (textInput.lastIndexOf('/') + 1 >= textInput.length)
        return ""
    var fileNameWithoutExtention = textInput.substring(textInput.lastIndexOf('/') + 1 ,textInput.lastIndexOf('.'));
    var defaultTxt =
        fileNameWithoutExtention.replaceAll('_','')
    return fileNameWithoutExtention;
}

function removeAllTiles(){
    var tiles = document.getElementsByClassName("draggable");
    var tileLength = tiles.length; //We need this as when we delete a tile, it will shorten the length of the array.
    var i = 0;
    while(tiles.length > 0)
    {
        var body = tiles[0].parentElement;
        body.removeChild(tiles[0]);
        i++;
    }
}

function deleteTiles(projectName) {
    var objectOut = {project: projectName}
    $.post('/deleteTiles', objectOut, function(data) {
        if(data == 'Deleted!')
            alert('Deleted!')
        else
            alert('Sorry, there was an error. This project could not be deleted.')
    });
}

function saveTiles(projectName) {
    var tiles = document.getElementsByClassName("draggable");
    var tilesToSave = [];
    for (var i = 0; i < tiles.length; i++)
    {
        var aTile;
    		isArrowFlag = tiles[i].getElementsByClassName('arrowFlag')[0].getAttribute('isArrow');
    		if(isArrowFlag == 'true'){
      			var aTile =
      			{
        				x: tiles[i].getAttribute('data-x'),
        				y: tiles[i].getAttribute('data-y'),
						text:"",
        				img: tiles[i].getElementsByClassName('arrowTileImage')[0].getAttribute('src'),
        				color: tiles[i].style.background,
        				isArrow: isArrowFlag
      			}
    		}
    		else // not arrow
        	{
				
      			var aTile =
      			{
        				x: tiles[i].getAttribute('data-x'),
        				y: tiles[i].getAttribute('data-y'),
        				text: tiles[i].getElementsByClassName('textInput')[0].value,//This last one is a 0
        				img: tiles[i].getElementsByClassName('generalTileImage')[0].getAttribute('src'),
        				color: tiles[i].style.background,
        				isArrow: isArrowFlag
      			}
				console.log(tiles[i].getElementsByClassName('textInput')[0].value);
		    }
        tilesToSave.push(aTile);
		//
    }
	
    console.log(tilesToSave);
    var outputJSON = {data: JSON.stringify(tilesToSave), project: projectName};
    $.post('/saveTiles', outputJSON, function(data) {
        if(data == 'Saved!')
            alert('Saved!')
        else
            alert('Sorry, there was an error. This project could not be saved.')
    });
}

function loadTiles(projectName) {
    removeAllTiles();
    $.get("/saveTiles?" + "project=" + projectName, function(data, status) {
        var tiles = JSON.parse((JSON.parse(data)).data);
        var loadedProjectName = JSON.parse(data).project;
        for (var i = 0; i < tiles.length; i++)
        {
            loadTile(tiles[i]);
            //Load in tiles
        }
        console.log(tiles);
    });
}