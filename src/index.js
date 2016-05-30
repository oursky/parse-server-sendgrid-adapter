import SendGrid from 'sendgrid';

let SimpleSendGridAdapter = mailOptions => {
  if (!mailOptions || (!mailOptions.apiKey && !mailOptions.username && !mailOptions.password)){
    throw 'SimpleSendGridAdapter requires an apiKey or username / password';
  }
  if (!mailOptions.fromAddress){
    throw 'SimpleSendGridAdapter requires fromAddress';
  }
  let sendgrid = (mailOptions.apiKey ? SendGrid(mailOptions.apiKey) : SendGrid(mailOptions.username, mailOptions.password));

  let sendMail = ({to, subject, text}) => {
    return new Promise((resolve, reject) => {
      sendgrid.send({
        from: mailOptions.fromAddress,
        to: to,
        subject: subject,
        text: text,
      }, function(err, json) {
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
