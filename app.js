//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { zipWith, forEach } = require("lodash");

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts=[{title: "This is the title", post: "This is the body"}]

app.get("/", (req, res) => {
  let options = {
    pageTitle: "Home",
    content: homeStartingContent,
    posts: posts
  };

  res.render("home", options);
});

app.get("/about", (req, res) => {
  let options = {
    pageTitle: "About Us",
    content: aboutContent,
  };

  res.render("about", options);
});

app.get('/posts/:title', (req, res) =>{
  let title = req.params.title;

  //works for now but needs to be optimised
  forEach(posts, (post) => {
    if (post.title === title) {
      let options = {
        title : title,
        post: post.post
      }

      res.render("post", options);
    }
  })
})

app.get("/contact", (req, res) => {
  let options = {
    pageTitle: "Contact Us",
    content: contactContent,
  };

  res.render("contact", options);
});

app.get("/compose", (req, res) => {
  let options = {
    pageTitle: "Compose"
  };

  res.render("compose", options);
});

app.post('/', (req, res) => {
  const newPost = {
    title: req.body.title,
    post: req.body.post,
  } 

  posts.push(newPost);
  res.redirect('/');

})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
