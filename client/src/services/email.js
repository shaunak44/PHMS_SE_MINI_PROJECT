var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'phms2232@gmail.com',
        pass: 'Mahajan@123'
    }
    });

    var mailOptions = {
    from: 'PHMS',
    to: 'shaunakmahajan44@gmail.com',
    subject: 'Appointment booked',
    text: `Hello here`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });