
// 1順内に周回する回数(マイナスなら, 分岐質問の数), "質問内容"
var q_sheet = [

    [ 3,"自己紹介をお願いします。"],
    [ 4,"志望理由は何ですか。"],
    [ 3,"長所と短所を教えてください。"],
    [ 3,"本学でやりたいことは何ですか。"],
    [ 2,"今までで一番頑張ったことは何ですか。"],
    [ 1,"なぜ交通システムに興味を持ったのですか。"],
    [ 1,"都市一極集中問題に懸念するようになったきっかけは何ですか。"],
    [ 2,"本学を知ったきっかけはなんですか。"],
    [ 1,"北海道新幹線についてどう思いますか。"],
    [ 1,"新型コロナウイルスの問題に対して、交通システムができることはありますか。"],

];

var vq_sheet = [];

function get_random_int(max) {
    return Math.floor(Math.random() * max);
}

// quoted from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function new_question(prev_key){
    if(prev_key < 0){
        vq_sheet = [0];
        return 0;
    }
    if(vq_sheet.length == 0 || prev_key == vq_sheet.length-1){
        
        var vq_sheet_block = [];
        for(var i = 0; i < q_sheet.length; i++){
            if(q_sheet[i][0] < 0) continue;
            
            //質問ツリー単体
            var vqp = [];
            var vqp_last_node = i;
            vqp.push(i);
            for(var j = i-1; j >= 0; j--){
                if(q_sheet[j][0] <= j-vqp_last_node){
                    vqp_last_node = j;
                    vqp.push(vqp_last_node);
                }
            }
            vq_sheet_block.push(vqp);
        }

        shuffle(vq_sheet_block);
        
        vq_sheet = [];

        for(var i = 0; i < vq_sheet_block.length; i++){
            for(var j = 0; j < vq_sheet_block[i].length; j++){
                vq_sheet.push(vq_sheet_block[i][vq_sheet_block[i].length-j-1]);
            }
        }

        return 0;
    }
    return prev_key+1;

}

function update(text, ctx){
    ctx.clearRect(0, 0, canvas_src.width, canvas_src.height);
    ctx.fillStyle = "#222222";
    ctx.font = "30px 'Serif'";
    ctx.textAlign = "center";
    ctx.textBaseline = "center";

    ctx.fillText(text,canvas_src.width/2,canvas_src.height/2,canvas_src.width);

}
  
function main(){
    var canvas_src = document.getElementById("canvas_src");
    var ctx = canvas_src.getContext("2d");
    canvas_src.width  = window.innerWidth;
    canvas_src.height = window.innerHeight;

    var key = -1;

    document.addEventListener('click', function(){
        if(key < 0){
            key = new_question(key);
        } else {
            var bv = vq_sheet[key];
            while(true){
                key = new_question(key);
                if(bv != vq_sheet[key]) break;
            }
        }
        update(q_sheet[vq_sheet[key]][1], ctx);

    });
}
