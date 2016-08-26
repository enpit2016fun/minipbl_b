var storage = localStorage;

function show_result() {
    var result = "";
    var c = 0;

   storage.setItem("event", "2016-06-19,バザー,本保育園グラウンド,保護者の方や卒園生もぜひご参加ください。");
  storage.setItem("event2", "2016-06-04,運動会,本保育園グラウンド,今年も運動会の季節がやってまいりました！園児達の勇姿をぜひご覧ください。");
  storage.setItem("event3", "2016-04-09,入園式,本保育園体育館,ご入園おめでとうございます。心より歓迎申し上げます。");

//storage.clear();

  
  //保存されているデータの数だけループ
  for(var i = 0; i < storage.length; i++){
     
    //i番目のキーを取得
    var k = storage.key(i);
    
    if(k == "0" ||  k == "event" ||  k == "event2" || k == "event3"){
        //キーと値をコロン（：）区切りのテキストにする
       //result += k + "：" + storage.getItem(k) + "<br>";
        var Item = storage.getItem(k);
        var resArray = Item.split(",");
        //result = resArray[0];
        result += "<h5>" + resArray[0] + "</h5>" +
                    "<p>" + resArray[1] + "</p>" + 
                    "<p>" + "場所:" + resArray[2] + "</p>" + 
                    "<p>" + "説明文:" + resArray[3] + "</p>";
    }
  }
    //上のループで作成されたテキストを表示する
    document.getElementById("show_result").innerHTML = result;

}