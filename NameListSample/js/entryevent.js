//変数storageにlocalStorageを格納
var storage = localStorage;
var a = 0; 

//データを保存する
function set() {
  
  //var key = "event3";
  var key = String(a);
  //a++;
  var date = document.forms.id_form1.Edate.value;
  var Ename = document.forms.id_form1.Ename.value;
  var Eplace = document.forms.id_form1.place.value;
  var Emessage = document.forms.id_form1.Emessage.value;
  var event = date + ", " + Ename + ", " + Eplace + ", " + Emessage; 
  
  storage.setItem(key, event);
  //show_result();
}

//データをクリアする
function cle() {
  storage.clear();
  show_result();
}

//保存されているデータをリスト表示する
function show_result() {
  var result = "";
  //保存されているデータの数だけループ
  for(var i=0; i<storage.length; i++){
    //i番目のキーを取得
    var k = storage.key(i);
    //キーと値をコロン（：）区切りのテキストにする
    result += k + "：" + storage.getItem(k) + "<br>";
  }
  //上のループで作成されたテキストを表示する
  document.getElementById("show_result").innerHTML = result;
}

//アラートを表示する関数
function art(){

	// 「OK」時の処理開始 ＋ 確認ダイアログの表示
	if(window.confirm("イベントを登録してもよろしいですか？")){

		location.href = "TOP.html"; // example_confirm.html へジャンプ
		set();
	}

}

