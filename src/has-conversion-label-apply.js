function main() {
  labelInitialize([ '過去CV有り' ]);
  procHasConversionKeywords(function (keyword) {
    if (keyword.labels().withCondition("Name = '過去CV有り'").get().hasNext() == false) {
      keyword.applyLabel('過去CV有り');
    }
  });

  procHasConversionAdgroups(function (adgroup) {
    if (adgroup.labels().withCondition("Name = '過去CV有り'").get().hasNext() == false) {
      adgroup.applyLabel('過去CV有り');
    }
  });
}

function procHasConversionKeywords(callback) {
  var keywords = AdWordsApp.keywords().withCondition("Conversions > 0").forDateRange("ALL_TIME").get();
  while (keywords.hasNext()) {
    var keyword = keywords.next();
    callback(keyword);
  }
}

function procHasConversionAdgroups(callback) {
  var adgroups = AdWordsApp.adGroups().withCondition("Conversions > 0").forDateRange("ALL_TIME").get();
  while (adgroups.hasNext()) {
    var adgroup = adgroups.next();
    callback(adgroup);
  }
}

function labelInitialize(labelNames) {
  for (var i = 0; i < labelNames.length; i++) {
    var labels = AdWordsApp.labels().withCondition('Name = "' + labelNames[i] + '"').get();
    if (labels.totalNumEntities() == 0) {
      AdWordsApp.createLabel(labelNames[i], labelNames[i])
    }
  }
}

