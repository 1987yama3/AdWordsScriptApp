function main() {
  var execute = false;  // 危険なスクリプトなので, 実行するときには, [false]を[true]に書き換えないと削除しないようになっています.
  var deleted;
  
  // インプレッションの発生していない広告を削除する.
  // 実行が不要な場合は, 下の2行を削除してください.
  deleted = deleteZeroImpressionAds(execute);
  Logger.log('インプレッションが全期間に渡って発生していない' + deleted.length + '件の広告を削除しました');


  // インプレッションの発生していないキーワードを削除する.
  // 実行が不要な場合は, 下の2行を削除してください.
  deleted = deleteZeroImpressionKeyword(execute);
  Logger.log('インプレッションが全期間に渡って発生していない' + deleted.length + '件のキーワードを削除しました');
}

function deleteZeroImpressionKeyword (execute) {
  var keywords = AdWordsApp.keywords().forDateRange('ALL_TIME').withCondition('Impressions = 0').get();
  var deleted = [];
  while (keywords.hasNext()) {
    var keyword = keywords.next();
    deleted.push(keyword.getText());
    if (execute) {
      keyword.remove();
    } else {
      Logger.log('キーワード: ' + keyword.getText() + 'を削除します');
    }
  }
  return deleted;
}

function deleteZeroImpressionAds (execute) {
  var ads = AdWordsApp.ads().forDateRange('ALL_TIME').withCondition('Impressions = 0').get();
  var deleted = [];
  while (ads.hasNext()) {
    var ad = ads.next();
    deleted.push(ad.getHeadline());
    if (execute) {
      ad.remove();
    } else {
      Logger.log('広告文: ' + ad.getHeadline() + 'を削除します');
    }
  }
  return deleted;
}
