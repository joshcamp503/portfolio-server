const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // since this is NOT SECURE AT ALL,
    // this is a throwaway email account and google 
    // app password that wont work for a regular sign-in
    // and is not connected to any of my other google accounts
    user: "joshcampdev@gmail.com",
    pass: "sqicukpsqohoacme",
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
    from: "Contact Form",
    to: "joshcampdev@gmail.com",
    subject: "Contact Form Submission",
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