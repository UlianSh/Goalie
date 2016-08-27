$.get("/getImagesJSON", function(data, status) {
    files = JSON.parse(data);
    console.log(files);



    var Arrows = 
    ["img/Arrows/arrows.png", "img/Arrows/BLUE_arrow.png", "img/Arrows/GREEN_arrow.png", "img/Arrows/GREY_arrow.png","img/Arrows/RED_arrows.png"];
    var Basic_routine =                          ["img/Basic_routine/basicRoutine.png","img/Basic_routine/dirty_laundry.png","img/Basic_routine/dishwasher_put_away.png","img/Basic_routine/dryer.png","img/Basic_routine/duffle_bag_1.png","img/Basic_routine/lunch_bag.png","img/Basic_routine/put_away_laundry.png","img/Basic_routine/put_in_dishwasher.png","img/Basic_routine/put_laundry_in_bin.png","img/Basic_routine/recycling(1).png","img/Basic_routine/recycling.png","img/Basic_routine/rx.png","img/Basic_routine/shower.png","img/Basic_routine/soccer.png","img/Basic_routine/swimming.png","img/Basic_routine/wash_sheets.png","img/Basic_routine/washing_machine.png"];
    var Computer_tasks = ["img/Computer_tasks/compTasks.png","img/Computer_tasks/download.png","img/Computer_tasks/excel.png","img/Computer_tasks/google_map.png","img/Computer_tasks/kurzweil3000.png","img/Computer_tasks/look_at.png","img/Computer_tasks/matlab.png","img/Computer_tasks/powerpoint.png","img/Computer_tasks/transfer.png","img/Computer_tasks/upload.png","img/Computer_tasks/word_doc.png"];
    var oldFiles = [Arrows,Basic_routine,Computer_tasks];

    for (var i = 0; i < files.length; i++) {

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

    console.log(document.getElementsByClassName("playButton"))

    var playbuttons = document.getElementsByClassName("playButton");
    for (var i = 0; i < playbuttons.length; i++)
    {
        playbuttons[i].onclick = function() {
            var text = this.parentElement.getElementsByClassName("textInput")[0].value;
            var speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
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
tile.innerHTML = '<img src='+files[group][underGroup]+ ' class="tileImage">' +
'<button type="button" class="playButton">Play</button>' + 
'<button type="button" onclick="closefunc(this)">Close</button>' + 
//'<button type="button" class="play"'	
'<input type="text" class="textInput">'
document.body.appendChild(tile);
console.log(files[group][underGroup]);
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
}

function removeTile(){
    document.removeChild()
}
			
            
