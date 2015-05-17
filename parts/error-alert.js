/*
 * 定期実行しているAdWordsスクリプトにエラーが発生したときにメールを送信する
 * ためのスクリプト. 定期実行しているAdWordsスクリプトが知らない間にエラーを吐いて
 * 実行できていなかった, といった事態を避けることができる.
 * メイン処理の実装が完了したあとに, 実際のスクリプト運用のために追加する処理.
 * 実装完了後にスクリプト内にある「function main ()」の部分をmainからprocessに変更する.
 * その後以下のスクリプトを追加して, SCRIPT_NAMEとMAIL_TOを書き換えればOK.
 *
 */

function main () {
  var SCRIPT_NAME = 'スクリプト名をここに記載';
  var MAIL_TO = 'メールの送信先をここに記載';
  try {
    process(); // ここで実際のメイン処理が実行される.
  } catch (error) {
    // メイン処理の途中でエラーが発生したら, エラー情報を収集して, メールで通知する
    var subject = '[Error] [AdWordsスクリプト] ' + AdWordsApp.currentAccount().getName() + 'のスクリプト「' + SCRIPT_NAME + '」でエラーが発生しました';
    var contents = ""
    contents += "エラー発生日時: " + Utilities.formatDate(new Date(), 'GMT+9', "yyyy-MM-dd HH:mm:ss") + "\n";
    contents += "エラーメッセージ: \n";
    contents += error.message + "\n";
    contents += 'エラー発生行: ' + error.lineNumber + "\n";
    contents += "エラーの詳細: \n";
    contents += error.stack + "\n";
    MailApp.sendEmail({
      "to": MAIL_TO,
      //"bcc": "BCCに設定するメールアドレス", // BCCを利用する場合はコメントを外す
      //"cc": "CCに設定するメールアドレス", // CCを利用する場合はコメントを外す
      "subject": subject,
      "body": contents
    });
    
    throw error; // 最後にこれをいれないと, AdWordsスクリプト側がエラーを検知できない
  }
}

