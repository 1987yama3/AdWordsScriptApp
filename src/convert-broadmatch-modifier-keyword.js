var config = {
  '対象キーワードのラベル': '絞り込み部分一致に変更',
  '既存のキーワードを一時停止する': true,
  '1文字目にスペースを追加する': true
};

function main () {
  procAccount(function (account) {
    executeKeywordWithLabel(account, config['対象キーワードのラベル'], function (keyword) {
      // 作成するキーワードの基礎情報
      var broadMatchModifierText = getBroadMatchModifier(keyword.getText());
      var destinationUrl = keyword.getDestinationUrl();
      var maxCpc = keyword.getMaxCpc()
      // 新規のキーワードの登録
      keyword.getAdGroup().createKeyword(broadMatchModifierText, maxCpc, destinationUrl);
      
      // 既存のキーワードからラベルを除去する
      keyword.removeLabel(config['対象キーワードのラベル']);
      
      if (config['既存のキーワードを一時停止する']) {
        keyword.pause();
      }
      Logger.log("[" + account.getName() + "] キーワード" + keyword.getText() + "のマッチタイプを絞り込み部分一致に変更しました。");
    });
  });
  Logger.log("処理が全て完了しました。");
  return true;
}

/**
 * 元のキーワードを絞り込み部分一致に変更するための関数.
 * 元のキーワード(の一部)に絞り込み部分一致の指定が行われている場合は
 * その語句には絞り込み部分一致の指定は追加的に指定しない.
 */
function getBroadMatchModifier(text) {
  var str = text.split(" ");
  for (var i = 0; i < str.length; i++) {
    if (str[i][0] != "+") {
      str[i] = "+" + str[i];
    }
  }
  if (config['1文字目にスペースを追加する']) {
    return ' ' + str.join(" ");
  } else {
    return str.join(" ");
  }
}

function executeKeywordWithLabel(account, labelName, callback) {
  var labels = AdWordsApp.labels().withCondition('Name = "' + labelName + '"').get();
  if (labels.hasNext()) {
    var keywords = labels.next().keywords().get();
    if (keywords.totalNumEntities() == 0) {
      Logger.log("[" + account.getName() + "] ラベル" + labelName + "が付与されたキーワードが存在しません。マッチタイプを絞り込み部分一致に変更するキーワードにラベル" + labelName + "を付与してください。");
    } else {
      Logger.log("[" + account.getName() + "] " + keywords.totalNumEntities() + "件のキーワードを処理します。");
      while (keywords.hasNext()) {
        var keyword = keywords.next();
        callback(keyword);
      }
    }
  } else {
    Logger.log("[" + account.getName() + "] ラベル" + labelName + 'が存在しません。ラベル' + labelName + 'を作成してください。');
  }
}

function procAccount(callback) {
  if (isMccAccount() == true) {
    var accountIterator = MccApp.accounts().get();
    var accounts = [];
    while (accountIterator.hasNext()) {
      var account = accountIterator.next();
      Logger.log("[" + account.getName() + "] 処理を開始します。");
      MccApp.select(account);
      callback(account);
      Logger.log("[" + account.getName() + "] 処理が完了しました。");
    }
  } else {
    callback(AdWordsApp.currentAccount());
  }
}
 
function isMccAccount() {
  try {
    var account = MccApp.accounts();
    return true;
  } catch (ex) {
    return false;
  }
}
 
