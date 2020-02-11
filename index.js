const inquirer = require("inquirer")
const generateHTML = require("./generateHTML")
const api = require("./api")
const convertFactory = require("electron-html-to");
var path = require("path");
var open = require("open")
const fs = require("fs")
const questions = [
    {
        type: "input",
        name: "username",
        message: "What is your Github username?"
    },

   {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: ["red","blue", "green","pink"]
    }
];

function writeToFile(fileName, data) {
 
}

function init() {
    inquirer.prompt(questions).then((answers) => {
        var username = answers.username;
        var color = answers.color;
        console.log(username +"   " +color);
        api.getUserInfo(username)
        .then(response => 
            api.getStarsInfo(username).then(stars => {
                return generateHTML({
                    stars, color, ...response.data
                })
            })
        )
        .then(html => {
            var conversion = convertFactory({
                converterPath: convertFactory.converters.PDF
              });
               
              conversion({ html}, function(err, result) {
                if (err) {
                  return console.error(err);
                }
                console.log(result.numberOfPages);
                console.log(result.logs);
                result.stream.pipe(fs.createWriteStream(path.join(__dirname, "resume.pdf")));
                //result.stream.pipe(fs.createWriteStream('./resume.pdf'));
                conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
              });
              open(path.join(process.cwd(), "resume.pdf"))
        })
    })
}

init();
