
n myFunction() {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slackApp = SlackApp.create(token); //SlackApp インスタンスの取得
  var options = {
    channelId: "#general29", //チャンネル名
    userName: "Kanchi", //投稿するbotの名前
    message: "Hello, World" //投稿するメッセージ
  };

  slackApp.postMessage(options.channelId, options.message, {username: options.userName});
}

function doPost(e) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var bot_name = "Kanchi";
  var bot_icon = "http://asamone.com/basic/kanchi.jpg";
  var verify_token = "---token here---";
  
  //投稿の認証
  if (verify_token != e.parameter.token) {
    throw new Error("invalid token.");
  }
  
  var app = SlackApp.create(token);
  
  //Trigger Words部分の削除
  var text = e.parameter.text.substr(7);
  var array = [
    //フレンチ
    ["ARGO\nhttp://restaurant.ikyu.com/100491/\nhttp://cdn-rs.ikyu.com/rsDatas/rsData100500/r100491/100491ga10000046.jpg",
                 "オー・プロヴァンソー\nhttp://tabelog.com/tokyo/A1308/A130803/13039033/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/7766/150x150_square_7766054.jpg",
                 "ビストロ ラフ\nhttp://tabelog.com/tokyo/A1308/A130803/13037808/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/20778/150x150_square_20778094.jpg",
                 "ラ・ネージュ\nhttp://tabelog.com/tokyo/A1308/A130803/13002219/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/41973/150x150_square_41973809.jpg",
                 "味館トライアングル\nhttp://tabelog.com/tokyo/A1308/A130803/13000291/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/18113/150x150_square_18113917.jpg",
                 "ラ・シャンス\nhttp://tabelog.com/tokyo/A1308/A130803/13004139/\nhttps://tabelog.ssl.k-img.com/resize/660x370c/restaurant/images/Rvw/25710/25710823.jpg?token=f94b1bb&api=v2"],
    //イタリアン
    ["ビアンカーネ\nhttp://tabelog.com/tokyo/A1308/A130803/13058231/dtlmap/?lid=tocoupon2\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/6419/150x150_square_6419018.jpg",
                 "ピッツェリア・ドォーロ麹町店\nhttp://tabelog.com/tokyo/A1308/A130803/13006388/\nhttps://tabelog.ssl.k-img.com/resize/660x370c/restaurant/images/Rvw/30187/30187551.jpg?token=17e8a8a&api=v2",
                 "エリオ・ロカンダ・イタリアーナ\nhttp://tabelog.com/tokyo/A1308/A130803/13000293/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/19918/150x150_square_19918277.jpg",
                 "エノテカ・ドォーロ\nhttp://tabelog.com/tokyo/A1308/A130803/13022137/\nhttps://tabelog.ssl.k-img.com/resize/660x370c/restaurant/images/Rvw/33200/33200089.jpg?token=c149805&api=v2",
                 "リアソール\nhttps://retty.me/area/PRE13/ARE18/SUB1802/100000704938/\nhttps://img.retty.me/img_repo/t/01/4631591.jpg",
                 "ピッツェリアアンジェリーノ\nhttps://retty.me/area/PRE13/ARE18/SUB1802/100000021865/\nhttps://ximg.retty.me/crop/s150x150/-/retty/img_repo/l/01/41417.jpg"],
    //中華
    ["中華料理　朝霞\nhttp://tabelog.com/tokyo/A1308/A130803/13144098/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/41272/150x150_square_41272321.jpg",
                 "桂園 半蔵門店\nhttp://tabelog.com/tokyo/A1308/A130803/13038328/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/34533/150x150_square_34533107.jpg",
                 "刀削麺 張家 麹町店\nhttp://tabelog.com/tokyo/A1308/A130803/13110707/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/38993/150x150_square_38993764.jpg",
                 "高級中国四川料理 登龍 麹町店\nhttp://tabelog.com/tokyo/A1308/A130803/13000437/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/5058/150x150_square_5058651.jpg",
                 "日高屋 麹町プリンス通店\nhttp://tabelog.com/tokyo/A1308/A130803/13054574/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/42077/150x150_square_42077176.jpg",
                 "京華茶楼 麹町2号店\nhttp://tabelog.com/tokyo/A1308/A130803/13097685/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/25917/150x150_square_25917727.jpg"],
    //韓国料理
    ["韓国料理ノルブネ 麹町店\nhttp://tabelog.com/tokyo/A1308/A130803/13009043/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/31020/150x150_square_31020993.jpg",
               "ちぢみ屋\nhttp://tabelog.com/tokyo/A1308/A130803/13137382/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/35359/200x200_square_35359177.jpg",
               "バリバリ 麹町店\nhttp://tabelog.com/tokyo/A1308/A130803/13047596/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/34500/150x150_square_34500168.jpg",
               "ワイスタイル YStyle\nhttp://tabelog.com/tokyo/A1308/A130803/13090116/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/35402/150x150_square_35402951.jpg"],
    //カレー
    ["アジャンタ麹町店\nhttp://tabelog.com/tokyo/A1308/A130803/13000438/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/49810/150x150_square_49810915.jpg",
                 "プティフ・ア・ラ・カンパーニュ\nhttp://tabelog.com/tokyo/A1308/A130803/13000254/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/38896/150x150_square_38896859.jpg",
                 "欧風カレーソレイユ\nhttp://tabelog.com/tokyo/A1309/A130904/13164006/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/26231/150x150_square_26231296.jpg",
                 "サロン・ド・カッパ\nhttp://tabelog.com/tokyo/A1308/A130803/13119465/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/15747/150x150_square_15747566.jpg",
                 "マザーインディア半蔵門駅前店\nhttp://tabelog.com/tokyo/A1308/A130803/13175995/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/45492/150x150_square_45492148.jpg",
                 "ガンジス\nhttp://www.ganges.jp/\n"],
    //割烹、日本食
    ["割烹 和田\nhttp://tabelog.com/tokyo/A1308/A130803/13129448/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/9787/150x150_square_9787031.jpg",
               "船宿割烹汐風\nhttp://tabelog.com/tokyo/A1308/A130803/13011400/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/38745/150x150_square_38745233.jpg",
               "うなぎ割烹中志満\nhttp://tabelog.com/tokyo/A1308/A130803/13079770/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/12858/150x150_square_12858221.jpg",
               "おでん割烹 稲垣\nhttp://tabelog.com/tokyo/A1308/A130803/13023706/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/22918/150x150_square_22918202.jpg"],
    //ラーメン
    ["めん徳 二代目 つじ田 麹町店\nhttp://tabelog.com/tokyo/A1308/A130803/13002402/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/18670/150x150_square_18670624.jpg",
               "素良\nhttp://tabelog.com/tokyo/A1308/A130803/13192817/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/49186/150x150_square_49186921.jpg",
               "ソラノイロ\nhttp://tabelog.com/tokyo/A1308/A130803/13126816/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/38259/150x150_square_38259967.jpg",
               "IBUKI -つけめんDINING-\nhttp://tabelog.com/tokyo/A1308/A130803/13045394/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/42756/150x150_square_42756079.jpg",
               "ジョニーヌードル\nhttp://tabelog.com/tokyo/A1308/A130803/13048265/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/48291/150x150_square_48291345.jpg"],
    //そば
    ["蕎麦小路 さわらび\nhttp://tabelog.com/tokyo/A1308/A130803/13022640/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/42215/150x150_square_42215025.jpg",
               "こいけ\nhttp://tabelog.com/tokyo/A1308/A130803/13021963/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/49296/150x150_square_49296189.jpg",
               "ナカジマ\nhttp://tabelog.com/tokyo/A1308/A130803/13110768/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/44833/150x150_square_44833471.jpg",
               "富士見庵\nhttp://tabelog.com/tokyo/A1308/A130803/13023896/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/44840/150x150_square_44840809.jpg",
               "椎葉\nhttp://tabelog.com/tokyo/A1308/A130803/13034190/\nhttps://tabelog.ssl.k-img.com/restaurant/images/Rvw/5323/150x150_square_5323632.jpg"]
  ];
  var genre_array = [];
  var genre = ['フレンチ','イタリアン','中華','韓国','カレー','割烹','ラーメン','そば'];
  if(text.match(/何か|何でも|まかせ/)){
    genre_array.push(99);
  }
  if(text.match(/フレンチ|french/)){//フレンチ
    genre_array.push(0);
  }
  if(text.match(/イタリアン|italian|ピザ|リゾット|チーズ/)){//イタリアン
    genre_array.push(1);
  }
  if(text.match(/中華|chinese|餃子|ギョーザ|麻婆豆腐|油淋鶏|回鍋肉/)){//中華
    genre_array.push(2);
  }
  if(text.match(/韓国料理|korean/)){//韓国
    genre_array.push(3);
  }
  if(text.match(/カレー|curry/)){//カレー
    genre_array.push(4);
  }
  if(text.match(/割烹|korean|寿司|日本食|和食/)){//割烹
    genre_array.push(5);
  }
  if(text.match(/ラーメン|ヌードル|noodle/)){//ラーメン
    genre_array.push(6);
  }
  if(text.match(/そば|soba/)){//そば
    genre_array.push(7);
  }
  
  if(genre_array.length>0){   
    var rand0 = Math.floor(Math.random() * genre_array.length);
    if(array[genre_array[rand0]]){
      var rand = Math.floor(Math.random() * array[genre_array[rand0]].length);
      var candidate = '';
      for(var i=0; i<genre_array.length; i++){
        if(genre[genre_array[i]]){
          candidate += genre[genre_array[i]];
          if(genre_array.length>1) candidate += 'か';
        }
      }
      var message = candidate+'なら\n' + array[genre_array[rand0]][rand];
    }else{
      var rand0 = Math.floor(Math.random() * array.length);
      var rand1 = Math.floor(Math.random() * array[rand0].length);
      var message = '何でもいいならこことかどう？\n'+array[rand0][rand1];
    }
  }else{
    if(text.match(/テストテスト/)){
      //var message = '`https://gyazo.com/5e547c2fc7445df71b71f217d770b462/`';
      var date = new Date();
      var message = 'http://tabelog.com/imgview/original?id=r8545840523749#' + date.getTime().toString();
    }
    else if(text.match(/ジャンル教えて/)){
      var message = 'フレンチ / イタリアン / 中華 / 韓国料理 / カレー / 割烹 / ラーメン';
    }
    else if(text.match(/対応している場所はどこ？/)){
      var message = '半蔵門と麹町だよー';
    }
    else if(text.match(/Hey!Siri!/)){
      var message = 'はい、なんでしょう？食べたい料理のジャンルを教えてね！（ジャンルはフレンチ / イタリアン / 中華 / 韓国料理 / カレー / 割烹 / ラーメンがあるよ！）';
    }
    else if(text.match(/Who are you?/)){
      var message = 'I am Kanchi^^';
    }
    else{
      var what_array = ['何言ってるの？','馬鹿にしてる？','kwsk','わかんねー'];
      var rand = Math.floor(Math.random() * what_array.length);
      var message = what_array[rand];
    }
  }
  
  return app.postMessage(e.parameter.channel_id, message, {
    username: bot_name,
    icon_url: bot_icon
  });
}
