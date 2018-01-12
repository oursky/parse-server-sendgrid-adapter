import SendGrid from 'sendgrid';

let SimpleSendGridAdapter = mailOptions => {
  if (!mailOptions || !mailOptions.apiKey || !mailOptions.fromAddress) {
    throw 'SimpleSendGridAdapter requires an API Key.';
  }
  let sendgrid = SendGrid(mailOptions.apiKey);

  let sendMail = ({to, subject, text, html}) => {
    const options = {
        from: mailOptions.fromAddress,
        to: to,
        subject: subject
    };
    if(text) {
      options.text = text;
    } else if(html) {
      options.html = html;
    }
    return new Promise((resolve, reject) => {
      sendgrid.send(options, function(err, json) {
        if (err) {
           reject(err);
        }
        resolve(json);
      });
    });
  }

  return Object.freeze({
      sendMail: sendMail
  });
}

module.exports = SimpleSendGridAdapter
