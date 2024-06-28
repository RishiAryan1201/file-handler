const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const PORT = 8002;

const storage = multer.diskStorage({ 
  destination: function (req, file, cb){
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({storage});
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/upload", upload.single("profileimage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
