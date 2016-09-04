var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

var fileFormats = ['jpg', 'jpeg', 'bmp', 'png', 'gif'];

var directory = 'public/img';
var directories = fs.readdirSync(directory);


function containsFileExtention(fileName)
{
    for (var i = 0; i < fileFormats.length; i++)
    {
        if (fileName.indexOf('.' + fileFormats[i]) != -1)
            return true;
    }
    return false;
}

//console.log('CONTAINS' + containsFileExtention('test.bmp', fileFormats))

function getImages()
{
    var images = [];

    for (var i = 0; i < directories.length; i++)
    {
        var possibleDirectoryPath = directory + '/' + directories[i];
        if (fs.lstatSync(possibleDirectoryPath).isDirectory())
        {
            //console.log(possibleDirectoryPath + '\t' + fs.lstatSync(possibleDirectoryPath).isDirectory())
            //This is a directory. Get all the images from it.
            //We are only getting file formats in 'fileFormats'
            var files = fs.readdirSync(possibleDirectoryPath);
            var imagesInDirectory = [];
            for (var j = 0; j < files.length; j++)
            {
                if (containsFileExtention(files[j]))
                {
                    var fileOutputPath = (possibleDirectoryPath + '/' + files[j]).replace('public/', '');
                    imagesInDirectory.push(fileOutputPath);
                }
            }
            if (imagesInDirectory.length > 0)
                images.push(imagesInDirectory);
        }
    }

    return images;
}

function getUserFolder()
{
    return "only"
}

function getUserProjects()
{
    fs.readdirSync('userSaveData/' + getUserFolder(), (err, data) => {
        console.log(err);
        if (!err)
        {
            console.log(data);
        }
    })
}

var onPort = 3000;
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
    res.send('Post: ' + new Date());
});

app.post('/saveTiles', function (req, res) {
    var projectName = req.body.project;
    console.log(projectName);
    var newFileName = projectName.toString().replace(/[^a-z0-9]/gi,'');
    var filePath = 'userSaveData/' + getUserFolder() + '/' + newFileName;
    console.log('Path:' + filePath);
    var dataOut = JSON.stringify(req.body);
    console.log(dataOut)
    fs.writeFile(filePath, dataOut, (err) => {
        if (err)
        {
            res.send('Error');
            console.log(err);
        }
        else
            res.send('Saved!');
    });
});

app.get('/projects', function (req, res) {
    var userDirectory = 'userSaveData/' + getUserFolder();
    var userProjects = [];
    if (fs.lstatSync(userDirectory).isDirectory())
        userProjects = fs.readdirSync(userDirectory);
    var sendData = JSON.stringify(userProjects);
    res.send(sendData);
})

app.get('/saveTiles', function (req, res) {
    var projectName = req.query.project;
    console.log(projectName);
    var newFileName = projectName.toString().replace(/[^a-z0-9]/gi,'');
    var filePath = 'userSaveData/' + getUserFolder() + '/' + newFileName;

    var dataOut = JSON.stringify(req.body);

    fs.readFile(filePath, (err, data) => {
        if (err)
        {
            res.send('{"data":"[]"}');
            console.log(err);
        }
        else
            res.send(data);
    });
});

app.get('/getImagesJSON', function (req, res) {
    var images = getImages();
    var imagesJSON = JSON.stringify(images);
    res.send(imagesJSON);
});

app.listen(onPort, function () {
    console.log('App Running on Port: ' + onPort);
});
