$.get("/getImagesJSON", function(data, status) {
    files = JSON.parse(data);
    console.log(files);


    for (var i = 0; i < files.length; i++) 
    {
        document.getElementById("mySidenav").innerHTML += 
        '<img src=' + files[i][0]+ ' class="tileImage" ' + 'onmouseover=openNav2('+i+') ' + ' onmouseout=closeNav2() ' + '>' + 
        '<br>' +
        '<br>'
    }          



    document.getElementById('create').onclick = function(){
        var tile = document.createElement("div");
        tile.style.width = "200px";
        tile.style.height = "400px";
        tile.style.background = "blue";
        tile.className = "draggable";
        tile.innerHTML = '<img src="img/testImage.png" class="tileImage">' +
        '<button type="button" class="playButton">Play</button>' + 
        '<input type="text" class="textInput">'+'<button type="button" class="closeButton" onclick="closefunc(this)">close</button>';
        document.body.appendChild(tile);
    }




    interact('.draggable')
        .draggable({
            inertia: false,
            restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            autoScroll: true,
            onmove: dragMoveListener,
            onend: function (event) {
                console.log(event.target.querySelector('input'))

            }
        });

    // Write new procedure calls here
}); //End of File Callback


// Write new functions here



    
function playfunc(childButton){
    var text = childButton.parentElement.getElementsByClassName("textInput")[0].value;
    var speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
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
    for (var ii = 1; ii< files[folderNum].length; ii++) {
        document.getElementById("mySidenav2").innerHTML += 
        '<img src='+files[folderNum][ii]+' class="tileImage"  onclick=createTile('+folderNum+','+ii+') onmouseover=enlargeIcon(this) onmouseout=minimizwIcon(this)> '+
        '<br>' + 
        '<br>'
    }           	 
}

function minimizwIcon(a){
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


function closefunc(childButton){
    var parentDiv = childButton.parentElement;
    var body = parentDiv.parentElement;
    body.removeChild(parentDiv);
}
            
function dragMoveListener (event)
{
    var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    target.getAttribute('data-x'), target.getAttribute('data-x')
	
}

window.dragMoveListener = dragMoveListener;

            
function createTile(group,underGroup)
{
var tile = document.createElement("div");
tile.style.width = "200px";
tile.style.height = "200px";
tile.style.background = "blue";
tile.className = "draggable";
//tile.style.position = "absolute";
tile.innerHTML = '<img src='+files[group][underGroup]+ ' class="tileImage">' +
'<button type="button" class="playButton" onclick="playfunc(this)">Play</button>' + 
'<button type="button" class="closeButton" onclick="closefunc(this)">Close</button>' + 
//'<button type="button" class="play"'	
'<input type="text" class="textInput">'
document.body.appendChild(tile);
    randomlyPlace(tile);
console.log(files[group][underGroup]);
}

function defaultText(textInput) {
    if (textInput.lastIndexOf('/') + 1 >= textInput.length)
        return ""
    var fileNameWithoutExtention = textInput.substring(textInput.lastIndexOf('/') + 1 ,textInput.lastIndexOf('.'));
    var defaultTxt = 
        fileNameWithoutExtention.replaceAll('_','')
    return fileNameWithoutExtention;
}



function saveTiles() {
    var tiles = document.getElementsByClassName("draggable");
    var tilesToSave = [];
    for (var i = 0; i < tiles.length; i++)
    {
        var aTile =
        {
            x: tiles[i].getAttribute('data-x'),
            y: tiles[i].getAttribute('data-y'),
            text: tiles[i].getElementsByClassName('textInput')[0].value,//This last one is a 0
            img: tiles[i].getElementsByClassName('tileImage')[0].getAttribute('src'),
            color: tiles[i].style.background
        }
        tilesToSave.push(aTile);
    }
    console.log(tilesToSave);
    var outputJSON = {data: JSON.stringify(tilesToSave)};
    $.post('/saveTiles', outputJSON, function(data) {
        if(data == 'Saved!')
            alert('Saved!')
    });
}

function loadTiles() {
    $.get("/saveTiles", function(data, status) {
        tiles = JSON.parse((JSON.parse(data)).data);
        for (var i = 0; i < tiles.length; i++)
        {
            //Load in tiles
        }
        console.log(tiles);
    });
}

function removeTile(){
    document.removeChild()
}
			
 function randomlyPlace(el)
    {
    el.style.top = Math.floor(Math.random()*document.body.clientHeight);
    el.style.left = Math.floor(Math.random()*document.body.clientWidth);
  }
