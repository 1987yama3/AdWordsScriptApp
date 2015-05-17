var APPLY_LABEL_NAME_LOWER = '低クリック率';
var APPLY_LABEL_NAME_UPPER = '高クリック率';
var CONFIG_THRESHOLD_RATE_LOWER = 0.7;
var CONFIG_THRESHOLD_RATE_UPPER = 1.3;

function expectedCtr(rank) {
  return 7.892776 * Math.pow(0.704769, rank) / 100;
}

function main() {
  labelInitialize([ APPLY_LABEL_NAME_LOWER, APPLY_LABEL_NAME_UPPER ]);
  executeAllSearchAd(function(ad, stat) {
    if (stat.getImpressions() > 100) {
      if (expectedCtr(stat.getAveragePosition()) * CONFIG_THRESHOLD_RATE_LOWER > stat.getCtr()) {
        ad.applyLabel(APPLY_LABEL_NAME_LOWER);
      }
      if (expectedCtr(stat.getAveragePosition()) * CONFIG_THRESHOLD_RATE_UPPER < stat.getCtr()) {
        ad.applyLabel(APPLY_LABEL_NAME_UPPER);
      }
    }
  });
}

function executeAllSearchAd(callback) {
  var ads = AdWordsApp.ads().withCondition('Status = ENABLED').get();
  var campaigns = getSearchCampaignList();
  var index = 0;
  while(ads.hasNext()) {
    var ad = ads.next();
    if (campaigns.indexOf(ad.getCampaign().getName()) >= 0) {
      var stat = ad.getStatsFor('LAST_30_DAYS');
      callback(ad, stat);
    }
  }
  return index;
}

function getSearchCampaignList () {
  var awql = 'select Impressions, AdNetworkType2, CampaignName from CAMPAIGN_PERFORMANCE_REPORT where AdNetworkType2 IN ["SEARCH"] and Impressions > 0 during LAST_30_DAYS'
  var rows = AdWordsApp.report(awql).rows();
  var campaignName = [];
  while (rows.hasNext()) {
    var row = rows.next();
    campaignName.push(row['CampaignName']);
  }
  return campaignName;
}

function labelInitialize(labelNames) {
  for (var i = 0; i < labelNames.length; i++) {
    var labels = AdWordsApp.labels().withCondition('Name = "' + labelNames[i] + '"').get();
    if (labels.totalNumEntities() == 0) {
      AdWordsApp.createLabel(labelNames[i], labelNames[i])
    }
  }
}

