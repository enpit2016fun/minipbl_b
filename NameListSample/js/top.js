var storage = localStorage;

function show_result() {
    var result = "";
    var c = 0;

  
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