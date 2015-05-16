function main () {
  executeAllCampaigns(function (campaign) {
    // ここに1つ1つのキャンペーンに対する処理を実装する.
    // Logger.log(campaign.getName());
  });
}


/**
 * キャンペーン全てに対する処理を行うときの定型パターンとしても使える.
 *
 */
function executeAllCampaigns(callback) {
  var campaigns = AdWordsApp.campaigns().get();
  while (campaigns.hasNext()) {
    var campaign = campaigns.next();
    callback(campaign);
  }
}
