/**
 * スクリプト内で利用するラベルの初期化を行う.
 * アカウント内に指定のラベルが存在するかどうかをチェックし, 存在しなければ
 * ラベルを新規に作成する. 既に存在するのであれば何もしない.
 * 引数は, ラベル名を配列で指定する.
 * 主に, AdWordsスクリプト上でキーワードや広告グループなどに自動でラベルを割り振る
 * スクリプトの最初に利用することを想定.
 *
 * 利用例:
 *    labelInitialize([
 *      'スクリプトで利用するラベル名1',
 *      'スクリプトで利用するラベル名2',
 *      'スクリプトで利用するラベル名3'
 *    ]);
 */
function labelInitialize(labelNames) {
  for (var i = 0; i < labelNames.length; i++) {
    var labels = AdWordsApp.labels().withCondition('Name = "' + labelNames[i] + '"').get();
    if (labels.totalNumEntities() == 0) {
      AdWordsApp.createLabel(labelNames[i], labelNames[i])
    }
  }
}

