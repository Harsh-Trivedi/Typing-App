const quotedisplay = $(".quote-display");
let Quotelength = 0;
let ResetFlag = false ;
let StopTimer = true; 


function UpdateTime() {
    if(!StopTimer){
        const timer = $("#timer");
        const currentTime = timer.text();
        const newtime = eval(parseInt(currentTime)  + 1);
        $("#timer").text(newtime);
    }   
}

function LoadQuote() {
    $.ajax({
        type: "GET",
        url: "https://api.quotable.io/random",
        dataType: "json",
        success: function (response) {
                quotedisplay.empty();
                const qoute  = response.content;
                $("#author").text(" -"+response.author);
                Quotelength =  qoute.length;       
                const qoutechar = qoute.split("");
                qoutechar.forEach(element => {
                    let charSpan = "<span>"+element+"</span>";
                    quotedisplay.append(charSpan);
                });
                StopTimer = false;
           
        },
        error: function(err){
            console.log(err);
                quotedisplay.empty();
                const qoute  = "E.D.I.T.H.  -  Even Death I Am The HERO";
                $("#author").text(" - Tony Stark");
                Quotelength =  qoute.length;            
                const qoutechar = qoute.split("");
                qoutechar.forEach(element => {
                    let charSpan = "<span>"+element+"</span>";
                    quotedisplay.append(charSpan);
                });
                StopTimer = false;
        }
    });
    $("#quoteInput").val("");
    $("#timer").text("0");
    
}

LoadQuote();
setInterval(UpdateTime,1000);
$("#quoteInput").keyup(function (e) { 
    debugger;
    const charSpan = $("span");
    [].forEach.call(charSpan, function(el) {
        el.classList.remove("success","failure");
    });
    const input = $("#quoteInput").val();
    const qoutechar = input.split("");
    ResetFlag = true;
    qoutechar.forEach((element,index) => {
        
        if(charSpan[index]){
            charSpan[index].classList.remove("success","failure");
            if (charSpan[index].innerHTML == element) {
                charSpan[index].classList.add("success");
                
            } else {
                charSpan[index].classList.add("failure");
                ResetFlag = false;
            }
        }
    


    });
    if(qoutechar.length>=Quotelength && ResetFlag == true){
        const seconds = $("#timer").text();
        const greetings = "Congratulation you have done it in "+seconds+" seconds.";
        StopTimer = true;
        Notiflix.Report.Success(seconds,greetings,"Reset",LoadQuote);
        
    }
});
