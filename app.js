const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
let items = [];
let workItems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(request, response) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options);

  response.render("list.ejs", {listTitle: day, newlistitems: items});
});
app.post("/", function(request, response){
  let item = request.body.newItem;
  if(request.body.list === "work"){
    workItems.push(item);
    response.redirect("/work");
  }
  else{
    items.push(item);
    response.redirect("/");
  }
});
app.get("/work", function(request,response){
  response.render("list", {listTitle: "work List", newlistitems: workItems});
});
app.post("/work", function(request,response){
  let item = request.body.newItem;
  workItems.push(item);
  response.redirect("/work");
});
app.listen(3000, function() {
  console.log("server started");
});
