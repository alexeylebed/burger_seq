var express = require('express');
var mysql = require('mysql');
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 8090;

//var connection = require('./config/connection.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var burgersToDevour = [];
var devouredBurgers = [];


function burgersSort(burgers){
    burgersToDevour = [];
    devouredBurgers = [];

    burgers.forEach(element => {
        if(element.devoured == false){
        burgersToDevour.push(element)
        } else if(element.devoured == true){
        devouredBurgers.push(element)
        }
    });
};

// Requiring our models for syncing
var db = require("./models");


app.get('/' , function(req, response){
    db.burger.findAll({}).then((res) =>{
        burgersSort(res)
        response.render("index" , {
            burgersToDevour: burgersToDevour,
            devouredBurgers: devouredBurgers
        });
    });
});


app.post('/addburger' , function(req, response){
    db.burger.create({
        burger: req.body.burger,
        devoured: false
    }).then((res) => {
        response.json(res)
    })    
});

app.post('/devour' , function(req, response){
    db.burger.update(
        {devoured: true},
        {where: {id: req.body.id}}
        ).then((res) =>{
        response.json(res)
    });
});

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });








