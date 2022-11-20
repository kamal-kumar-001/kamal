const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "kkhatiwal1@gmail.com",
      pass: "rsjlyzyuvcpjscxd",
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

  router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: "kkhatiwal1@gmail.com",
      subject: `Contact Form Submission by ${name}`,
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });


  if ( process.env.NODE_ENV == "production"){ 
    app.use(express.static("client/build")); 
    const path = require("path"); 
    app.get("*", (req, res) => { 
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); 
    })
  } 