'use strict';

var _sendgrid = require('sendgrid');

var _sendgrid2 = _interopRequireDefault(_sendgrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleSendGridAdapter = function SimpleSendGridAdapter(mailOptions) {
  if (!mailOptions || !mailOptions.apiKey && !mailOptions.username && !mailOptions.password) {
    throw 'SimpleSendGridAdapter requires an apiKey or username / password';
  }
  if (!mailOptions.fromAddress) {
    throw 'SimpleSendGridAdapter requires fromAddress';
  }
  var sendgrid = mailOptions.apiKey ? (0, _sendgrid2.default)(mailOptions.apiKey) : (0, _sendgrid2.default)(mailOptions.username, mailOptions.password);

  var sendMail = function sendMail(_ref) {
    var to = _ref.to;
    var subject = _ref.subject;
    var text = _ref.text;

    return new Promise(function (resolve, reject) {
      sendgrid.send({
        from: mailOptions.fromAddress,
        to: to,
        subject: subject,
        text: text
      }, function (err, json) {
        if (err) {
          reject(err);
        }
        resolve(json);
      });
    });
  };

  return Object.freeze({
    sendMail: sendMail
  });
};

module.exports = SimpleSendGridAdapter;