// 祝日情報を記載したGoogleカレンダーのカレンダーIDをここで指定.
// デフォルトは, 「日本の祝日」カレンダー
var CALENDAR_ID = 'ja.japanese#holiday@group.v.calendar.google.com';

function main() {
  var holiday = undefined;
  try {
    holiday = isHoliday();
  } catch (ex) {
    Logger.log('このプログラムはGoogle Calendar APIを利用しています。');
    Logger.log('利用するには, Google Developers Console上でAPIを有効にする手続きとAdWords Script上でスクリプトを有効にする手続きが必要になります.');
    Logger.log('利用手続きの詳細は');
    Logger.log('https://sem-technology.info/google-adwords/holiday-call-extension');
    Logger.log('をご覧ください');
  }
  if (holiday) {
    Logger.log('全てのキャンペーンから, 全ての電話番号表示オプションの関連付けを削除します');
    disablePhoneNumberExtension();
  } else {
    Logger.log('全てのキャンペーンに対し, 全ての電話番号表示オプションの関連付けを設定します');
    enablePhoneNumberExtension();
  }
  setPhoneNumberExtension( (isHoliday() ? '表示しない' : '表示する') );
}

function isHoliday() {
  // GoogleカレンダーAPIにアクセスして, 祝日を取得する.
  var events = Calendar.Events.list(CALENDAR_ID, {
    timeMin: (new Date()).toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 1
  }).items;

  if (events.length >= 1) {
    var start = events[0].start.date;
    return ((new Date()).toISOString().substr(0, 10) == start);
  } else {
    return false;
  }
}

/** 
 * 紐付いている電話番号表示オプションを全てOFFにする(紐付けを外す)
 *
 */
function disablePhoneNumberExtension() {
  var campaigns = AdWordsApp.campaigns().get();
  while (campaigns.hasNext()) {
    var campaign = campaigns.next();
    var phoneNumbers = campaign.extensions().phoneNumbers().get();
    while (phoneNumbers.hasNext()) {
      var phoneNumber = phoneNumbers.next();
      campaign.removePhoneNumber(phoneNumber);
    }
  }
}

/**
 * 全てのキャンペーンに対して, 全ての電話番号表示オプションを紐づける
 *
 */
function enablePhoneNumberExtension() {
  var campaigns = AdWordsApp.campaigns().get();
  while (campaigns.hasNext()) {
    var campaign = campaigns.next();
    var phoneNumbers = AdWordsApp.extensions().phoneNumbers().get();
    while (phoneNumbers.hasNext()) {
      var phoneNumber = phoneNumbers.next();
      campaign.addPhoneNumber(phoneNumber);
    }
  }
}


