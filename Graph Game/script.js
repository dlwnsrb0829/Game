var total_money = document.getElementById("total_money")
var multiple = document.getElementById("multiple")
var text_input_money = document.getElementById("input_money")
var insert_box = document.getElementById("insert_box")
var input_btn = document.getElementById("input_btn")
var start_btn = document.getElementById("start_btn")

var table = document.getElementById("result_table");

start_btn.addEventListener('click', start_finish);
input_btn.addEventListener('click', money_input);

var is_start = 0;
var mul = 1.000;
var temp_mul = 0;
var rand = 0;

total_money.innerText = "1000";
var int_total_money = parseInt(total_money);

var input_money = 0;

var count = 1;
var max_mul = 0;
var table_money = 0;
var win_loss = 0;

function start_finish(){
    if(is_start == 0){
        if(parseInt(text_input_money.innerText) < 100){
            alert("최소금액 : 100원")
        }else{
            input_btn.disabled = true;
            // rand = Math.random() * (2-1.1)+1;
            // rand = rand.toFixed(3);
            while(true){
                rand = Math.random() * (2-1.1)+1;
                rand = rand.toFixed(3);
                if(rand >= 1.1){
                    break;
                }
            }
            console.log(rand)
            is_start = 1;
            start_btn.innerText = "STOP!!";
            go = setInterval(function(){
                mul = mul + 0.001;
                multiple.innerText = mul.toFixed(3);
                if(mul.toFixed(3) >= rand){
                    input_btn.disabled = false;
                    stop();
                    loss();
                    write_table(0);
                }
            }, 10);
        }
    }
    else if(is_start == 1){
        input_btn.disabled = false;
        stop();
        win();
        write_table(1);
    }
}

function stop(){
    is_start = 0;
    start_btn.innerText = "START"
    clearInterval(go);
    temp_mul = mul;
    mul = 1.000;
}

function win(){
    total_money.innerText = parseInt(total_money.innerText) + parseInt((parseInt((parseFloat(text_input_money.innerText) * parseFloat(temp_mul.toFixed(3))).toFixed())) * 90 / 100);
    win_loss = "+" + parseInt((parseInt((parseFloat(text_input_money.innerText) * parseFloat(temp_mul.toFixed(3))).toFixed())) * 90 / 100).toFixed();
    // alert("넣은 금액 : " + text_input_money.innerText + "원" + "\n최고 배수 : " + rand + "배" + "\n당첨 배수 : " + temp_mul.toFixed(3) + "배" + "\n획득 금액(90%) : " + parseInt((parseInt((parseFloat(text_input_money.innerText) * parseFloat(temp_mul.toFixed(3))).toFixed())) * 90 / 100) + "원")
    table_money = text_input_money.innerText;
    text_input_money.innerText = "0";
    insert_box.value = 500;
}

function loss(){
    // alert("넣은 금액 : " + text_input_money.innerText + "원" + "\n최고 배수 : " + rand + "배" + "\n잃은 금액 : " + parseInt(text_input_money.innerText));
    win_loss = "-" + text_input_money.innerText;
    table_money = text_input_money.innerText;
    text_input_money.innerText = "0";
    insert_box.value = 500;
}

function money_input(){
    if(parseInt(total_money.innerText)-parseInt(insert_box.value) >= 0){
        input_money = insert_box.value;
        text_input_money.innerText = parseInt(text_input_money.innerText) + parseInt(input_money);
        total_money.innerText = parseInt(total_money.innerText)-parseInt(insert_box.value);
    }else{
        alert("금액을 확인해주세요")
    }
    insert_box.value = 500;
}

function write_table(win){
    if(win == 1){
        table.innerHTML += "<tr style=\"background-color: #6495ED\"><td>" + (count++) + "</td><td>" + rand + "</td><td>" + temp_mul.toFixed(3) + "</td><td>" + table_money + "</td><td>" + win_loss + "</td></tr>";
    }else{
        table.innerHTML += "<tr style=\"background-color: #FA8072\"><td>" + (count++) + "</td><td>" + rand + "</td><td>" + "-" + "</td><td>" + table_money + "</td><td>" + win_loss + "</td></tr>";
    }
}