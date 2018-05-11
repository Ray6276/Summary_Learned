var express = require("express"),
    app = express(),
    http = require("http").Server(app).listen(3000),
    upload = require("express-fileupload");
    fs = require("fs")

app.use(upload())
console.log("Server started!")

// file type regex
let extRegex = /^(jpg|jpeg|png|gif|pdf|doc|docx)$/

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

})

// folder name
var username = 01

app.post("/upload",function(req,res){
    console.log(req.files.file)

    if(req.files){
        // get the file
        var file = req.files.file,
            filename = file.name;
            fileExtension = filename.split(".").pop();
            console.log(extRegex.test(fileExtension))
            // check file type
            if(!extRegex.test(fileExtension)){
                console.log(extRegex.test(fileExtension))
                res.send("wrond type")
                return
            }
            // check file size 
            if(file.data.length > 2000000){
                res.send("Too big")
                return
            } 
            // create a folder under uploads            
            var dir = "./upload/"+username+"/"
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }


            // upload file
            file.mv("./upload/"+username+"/"+filename,function(err){
                if(err){
                    console.log(err)
                    res.send("error occorde")
                }
                else {
                    res.send("SUCCESS")
                }
            })
    }
})
// file download
app.post('/download', function(req, res){
  var file = __dirname + '/upload/1/1.docx';
  res.download(file); 
});