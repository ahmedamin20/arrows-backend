module.exports = {
    quotation: {
        "to": "#emailTo",
        "cc": "palearning@se.com",
        "subject": "Request Quotation Notification - #courseTitle",
        "body": "<p>Dear All,</p> <p>Request quotation received from <b>#country</b>  for courses: <b>#courses</b></p> <p style='margin:0'><b>Contact Details:</b></p> <p style='margin:0'><b>Name: </b>#name</p> <p style='margin:0'><b>Email: </b>#email</p> <p style='margin:0'><b>Company: </b>#company</p> <p style='margin:0'><b>Phone Number: </b>#phoneNumber</p> <p style='margin:0'><b>Prefer Phone Calls: </b>#canCall</p> <p style='margin:0'><b>Region: </b>#region</p> <p style='margin:0'><b>Additional Information: </b>#additionalInfo</p> <p style='margin-bottom:0;'>Best Regards,</p> <p style='margin:0; color:#24B43F;'><b>Schneider Electric Industry Services Academy</b></p>",
        "contentType": "text/html",
    }
};

