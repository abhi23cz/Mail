const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')
var nodemailer = require("nodemailer");

const port= process.env.PORT || 8000

let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

const mail_date =  (year + "-" + month + "-" + date);

app.set('view-engine', 'ejs')

app.use(express.static(path.join(__dirname+ "/public"))) 
// app.use("/uploads", express.static(path.join(__dirname+ "/uploads")))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
    
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      
      cb(null, "4x6.jpg")
    }

  })
  
    const upload = multer({ storage: storage })

app.get("/", (req, res) =>{
    res.render("index.ejs")
    
})


app.post('/upload', upload.array('zrffile', 12), function (req, res, next) {
    
 

    var sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abhishekssingh0000@gmail.com',
            pass: '9984941753'
        }
        });
        
        var mail = {
        from: "abhishekssingh0000@gmail.com",
        to: "anosabhishek@gmail.com",
        subject: "Priya Studio 4x6 2--copy "+mail_date,
        text: "This is Automated",

        attachments: [
            {
                filename:"4x6.jpg",
                path:"./uploads/4x6.jpg",
                cid: '4x6.jpg'
            }
        ]
 
        };
        
        sender.sendMail(mail, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            res.render("uploaded.ejs")
            console.log("Email sent successfully: "
                        + info.response);
                        
        }
        });
        
    console.log("File uploaded Succesfully")
    

  })

app.listen(port, () =>{
    console.log("Started Server on port 80")
})
