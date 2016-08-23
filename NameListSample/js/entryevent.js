//変数storageにlocalStorageを格納
var storage = localStorage;

//データを保存する
function set() {
  var k = document.forms.id_form1.Ename.value;
  var v = document.forms.id_form1.place.value;
  storage.setItem(k, v);
  show_result();
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
