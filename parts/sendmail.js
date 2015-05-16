function main () {
  // HTMLメールを送信する場合
  MailApp.sendEmail({
    "to": "送信先メールアドレス",
    //"bcc": "BCCに設定するメールアドレス", // BCCを利用する場合はコメントを外す
    //"cc": "CCに設定するメールアドレス", // CCを利用する場合はコメントを外す
    //"replyTo": "返信先に設定するメールアドレス", // replyToを利用する場合はコメントを外す
    "subject": "メールの件名",
    "htmlBody": "メールの本文をここにHTMLで記述する"
  });

  // テキスト形式のメールを送信する場合
  MailApp.sendEmail({
    "to": "送信先メールアドレス",
    //"bcc": "BCCに設定するメールアドレス", // BCCを利用する場合はコメントを外す
    //"cc": "CCに設定するメールアドレス", // CCを利用する場合はコメントを外す
    "subject": "メールの件名",
    "body": "メールの本文をここにHTMLで記述する"
  });
}