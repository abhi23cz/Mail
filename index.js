var nodemailer = require("nodemailer");

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
subject: "Sending Email using Node.js",
text: "I am the Developer",
attachments: [
    {
        filename: 'mailtrap.png',
        path: "C:/Users/ABHI/Desktop/logo2.png",
        cid: 'logo2.png'
    }
]
};

sender.sendMail(mail, function(error, info) {
if (error) {
	console.log(error);
} else {
	console.log("Email sent successfully: "
				+ info.response);
}
});
