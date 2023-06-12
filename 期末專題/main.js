let mapArray,ctx, currentImgMain;//, mapArray2, mapArray3,mapArray4, mapArray5
let imgMountain, imgMain, imgEnemy;
let currentevent;
const gridLength = 50;


$(function (){
    document.getElementById("a").hidden=true;
    document.getElementById("b").hidden=true;
    document.getElementById("c").hidden=true;
    document.getElementById("d").hidden=true;
});
function clearRadio() {
    var radioButtons = document.getElementsByName("option");
    for (var i = 0; i < radioButtons.length; i++) {
      radioButtons[i].checked = false;
    }
  }

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}
//$(function showlevel(){
//    
//})
//initial
$(function(){
    // 0 : available, 1 : Mountain, 2 : Final Stop, 3 : Enemy, 4:Q1,5:Q2,6:Q3,7:Q4,8:Q5,9:finishQ
    mapArray = [//16*16
        [0, 1, 1, 1, 0, 0, 0, 0, 1, 3, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 3, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 3, 0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0, 1, 0, 0, 1, 3, 0, 0, 7, 1, 1, 0],
        [0, 3, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 3],
        [0, 1, 0, 3, 0, 0, 5, 0, 1, 0, 1, 0, 0, 0, 0, 3],
        [0, 1, 1, 0, 0, 1, 0, 0, 0, 6, 1, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 3],
        [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 3],
        [0, 4, 0, 1, 0, 1, 0, 0, 1, 3, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 0, 3, 0, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 8],
        [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 3, 1, 1, 2]
    ];
    /*for(var i=0;i<16;i++){
        var l=0;
        for(var j=0;j<16;j++){
            var randamnum;
            randamnum=Math.floor(Math.random()*4);
            while(randamnum!=2&&randamnum!=l){
                mapArray[i][j]=randamnum;
                l=randamnum;
            }
        }
        mapArray[15][15]=2;
    }*/

    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        x:0,
        y:0
    };

    imgMain.onload = function(){
        ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x, currentImgMain.y, gridLength,gridLength);
        // ctx.drawImage(imgMain, 360, 0, 80, 130, 200,0, gridLength, gridLength*3);
    };

    let sources = {
        mountain: "images/material.png",
        enemy: "images/Enemy.png",
        question1: "images/material.png",
        question2: "images/material.png",
        question3:"images/material.png",
        question4:"images/material.png",
        question5:"images/material.png"
    };

    // imgMountain = new Image();
    // imgMountain.src = "images/material.png";
    // imgEnemy = new Image();
    // imgEnemy.src = "images/Enemy.png";

    loadImages(sources, function(images){
        for (let x in mapArray) {
            for (let y in mapArray[x]) {
                if (mapArray[x][y] == 1) {
                    ctx.drawImage(images.mountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                }
                else if (mapArray[x][y] == 3) {
                    ctx.drawImage(images.enemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                }
                else if (mapArray[x][y] == 4) {
                    ctx.drawImage(images.question1, 65, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                }
                else if (mapArray[x][y] == 5) {
                    ctx.drawImage(images.question2, 260, 0, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                }
                else if (mapArray[x][y] == 6) {
                    ctx.drawImage(images.question3, 125, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                }
                else if (mapArray[x][y] == 7) {
                    ctx.drawImage(images.question4, 225, 160, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                }
                else if (mapArray[x][y] == 8) {
                    ctx.drawImage(images.question5, 0, 98, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                }
                else if (mapArray[x][y] == 2) {
                    ctx.drawImage(images.question5, 350, 0, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
    });

    document.getElementById("radio1").hidden=true;
});

let questionArray=[
    "請問這個積雪有多厚？",
    "為什麼這個男人這麼興奮？",
    "我的豆花!!!＿＿＿塊!!!",
    "請問這隻狗的主人叫什麼？",
    "當我＿＿＿、＿＿＿的時候，基德總是在一旁全力支持我。"
];
let questionpicture=[
    "images/20cm.png",
    "images/超大雙人床.png",
    "images/豆花.png",
    "images/阿偉.png",
    "images/不要瞎掰好嗎.png"
];

// function randomquestionnum(){
//     let randamnum;
//     randamnum=Math.floor(Math.random()* questionArray.length);
//     return randamnum;
// }

// let memorizenum=[];
let answer1=[
    "A.10cm",
    "B.15cm",
    "C.20cm",//c
    "D.25cm"
];
let answer2=[
    "A.白色的床",
    "B.飯店的床",
    "C.超大雙人床",//c
    "D.好大的床"
];
let answer3=[
    "A.滷味",
    "B.土魠魚",
    "C.豆花",//c
    "D.關東煮"
];
let answer4=[
    "A.阿寶",
    "B.阿公",
    "C.阿偉",//c
    "D.阿哲"
];
let answer5=[
    "A.打工過度,身心俱疲",
    "B.人緣不好,身心俱疲",
    "C.身上缺錢,又思鄉病",//c
    "D.被同學打,打工過度"
];

let numOfquestion;
function showquestion(numOfquestion){//亂數出現迷音問題或腦筋急轉彎的問答
    $("#talkBox1").text(questionArray[numOfquestion]);
    document.getElementById("a").hidden=false;
    document.getElementById("b").hidden=false;
    document.getElementById("c").hidden=false;
    document.getElementById("d").hidden=false;
};

let haschecked = 0;
function selectanswer(){
    var option1 = document.getElementById("a");
    var option2 = document.getElementById("b");
    var option3 = document.getElementById("c");
    var option4 = document.getElementById("d");

    option1.addEventListener("change",function(){
        if(option1.checked){
            $("#talkBox").text("回答錯誤，請修正答案");
        }
        option1.checked=false;
        showquestion();
    })
    option2.addEventListener("change",function(){
        if(option2.checked){
            $("#talkBox").text("回答錯誤，請修正答案");
        }
        option2.checked=false;
        showquestion();
    })    
    option3.addEventListener("change",function(){
        if(option3.checked){
            $("#talkBox").text("回答正確");
            option3.checked=false;
            document.getElementById("a").hidden=true;
            document.getElementById("b").hidden=true;
            document.getElementById("c").hidden=true;
            document.getElementById("d").hidden=true;
            $("#talkBox1").text("繼續前進");
            $("#radio1").text("");
            $("#radio2").text("");
            $("#radio3").text("");
            $("#radio4").text("");
            $("#image1").attr("src", "images/image1.png");
            haschecked+=1;
            $("meter").attr("value", haschecked );
            currentImgMain.x = targetImg.x;
            currentImgMain.y = targetImg.y;
        }
    })    
    option4.addEventListener("change",function(){
        if(option4.checked){
            $("#talkBox").text("回答錯誤，請修正答案");
        }
        option4.checked=false;
        showquestion();
    })       
}
//Click Event
$(document).on("keydown", function(event){
    console.log(event.key);
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {
        x:-1,
        y:-1
    };
    targetBlock = {
        x:-1,
        y:-1
    };
    event.preventDefault();
    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    if(targetImg.x <= 750 && targetImg.x >=0 && targetImg.y <= 750 && targetImg.y >=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    if(targetBlock.x != -1 && targetBlock.y != -1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                $("#talkBox").text("");
                $("#talkBox1").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("有山");
                $("#talkBox1").text("明知山有虎，偏向虎山行。");
                break;
            case 2: // Final Stop
                $("#talkBox").text("抵達終點");
                $("#talkBox1").text("Congratulations on completing the task! 恭喜通關！");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: //Enemy
                $("#talkBox").text("士兵");
                $("#talkBox1").text("此路是我開，此樹是我栽。要想由此過，留下買路財！");
                break;
            case 4: // question1
                $("#talkBox").text("問題一：");
                $("#image1").attr("src", questionpicture[0]); 
                showquestion(0);
                $("#radio1").text(answer1[0]);
                $("#radio2").text(answer1[1]);
                $("#radio3").text(answer1[2]);
                $("#radio4").text(answer1[3]);
                selectanswer();
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;               
                break;
            case 5: // question2
                $("#talkBox").text("問題二：");
                $("#image1").attr("src", questionpicture[1]);
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                showquestion(1);
                $("#radio1").text(answer2[0]);
                $("#radio2").text(answer2[1]);
                $("#radio3").text(answer2[2]);
                $("#radio4").text(answer2[3]);
                selectanswer();
                break;
            case 6: // question3
                $("#talkBox").text("問題三：");
                $("#image1").attr("src", questionpicture[2]);
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                showquestion(2);
                $("#radio1").text(answer3[0]);
                $("#radio2").text(answer3[1]);
                $("#radio3").text(answer3[2]);
                $("#radio4").text(answer3[3]);
                selectanswer();
                break;
            case 7: // question4
                $("#talkBox").text("問題四：");
                $("#image1").attr("src", questionpicture[3]);
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                showquestion(3);
                $("#radio1").text(answer4[0]);
                $("#radio2").text(answer4[1]);
                $("#radio3").text(answer4[2]);
                $("#radio4").text(answer4[3]);
                selectanswer();
                break;
            case 8: // question5
                $("#talkBox").text("問題五：");
                $("#image1").attr("src", questionpicture[4]);
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                showquestion(4);
                $("#radio1").text(answer5[0]);
                $("#radio2").text(answer5[1]);
                $("#radio3").text(answer5[2]);
                $("#radio4").text(answer5[3]);
                selectanswer();
                break;
        }
    }else{
        $("#talkBox").text("邊界");
    }

    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);

});