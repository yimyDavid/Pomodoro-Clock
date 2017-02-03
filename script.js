$(document).ready(function(){
   var al = 0;
    var diff;
    var start = 4.72;
 var canvas = document.getElementById('pomodoro'),
     context = canvas.getContext('2d'),
     FONT_HEIGHT = 26,
     MARGIN = 35,
     HAND_TRUNCATION = canvas.width/25,
     HOUR_HAND_TRUNCATION = canvas.width/10,
     NUMERAL_SPACING = 20,
     RADIUS = canvas.width/2 - MARGIN,
     HAND_RADIUS = RADIUS + NUMERAL_SPACING;
  
  var countDownRunning = false;
  var breakRunning = false;
  var elapseRunning = true;
  /* selectors */
  var breakArrowUp = $(".b-inc");
  var breakArrowDown = $(".b-dec");
  var elapseArrowUp = $(".e-inc");
  var elapseArrowDown = $(".e-dec");
  var breakValue = $(".break-value");
  var elapseValue = $(".elapse-value");
  var currentText = $(".current-clock");
  var breakCounter = parseInt(breakValue.text());
  var elapseCounter = parseInt(elapseValue.text());
  
  /* Variables to set the time of both break and session*/
  var dateTime = new Date();
  var breakTime = new Date();
  var hour, minute;
  var bHour, bMinute;
  hour = bHour = minute = bMinute = 0;
  
  // Hold the actual countdown number in minutes.
  var canvasElapse;
  var breakElapseTime;
  //set the elapse time
  function setWorkTime(){
    var value = parseInt(elapseValue.text());
    while(value > 60){
      hour++;
      value -= 60;
    }
    
    minute = value;
    dateTime.setHours(hour);
    dateTime.setMinutes(minute);
    dateTime.setSeconds(0);
   
  }
  //calculateBreakTime
  function setBreakTime(){
    var bValue = parseInt(breakValue.text());
    while(bValue > 60){
      bHour++;
      bValue -= 60;
    }
    
    bMinute = bValue;
    breakTime.setHours(bHour);
    breakTime.setMinutes(bMinute);
    breakTime.setSeconds(0);
  }
   
 function resetVariables(){
   al = 0;
   diff = 0;
   context.clearRect(0,0,canvas.width, canvas.height);
   // elapsetime
   minute = 0;
   hour = 0;
   // breaktime
   bMinute = 0;
   bHour = 0;
 }

 // This is just to show the main screen and values 
 // before the timer start.
 function drawFirstCircle(){
   /* draws first circle  before starting
   * the countdown.
  */
  context.beginPath();
  context.lineWidth = 7;
  context.strokeStyle = "#A9BCD0";
  context.arc(canvas.width/2, canvas.height/2,RADIUS, 0, Math.PI*2, false);
  context.stroke(); 
 }
  
  breakArrowUp.click(function(){
    breakCounter++;
    breakValue.text(breakCounter);
  });
  
  breakArrowDown.click(function(){
    if(breakValue.text() > 1)
       breakCounter--;
    breakValue.text(breakCounter);
  });
  
  elapseArrowUp.click(function(){
    elapseCounter++;
    elapseValue.text(elapseCounter);
  });
  
  elapseArrowDown.click(function(){
    if(elapseValue.text() > 1)
       elapseCounter--;
    elapseValue.text(elapseCounter);
  });
  
  var loop;       //elapse loop controller
  var breakLoop;  //break loop controller
  var startButton = $(".play"),
      pauseButton = $(".pause");
  
 
  
  function setText(text){
    currentText.text(text);
  }
  // This function is used when the clock finish its current
  // countdown so this function is run.
  function continueBreak(){
    setBreakTime();
    setText("Break!");
    console.log(currentText.text());
    breakElapseTime = parseInt(breakValue.text()) * 60;
    breakLoop = setInterval(drawBreakClock, 1000);
  }
  
  function continuePlay(){
    setWorkTime()
    setText("work!");
    canvasElapse = parseInt(elapseValue.text()) * 60;
    loop = setInterval(drawClock, 1000);
  }
  
  // start clock by pressing the button play
  function startElapse(){
      setText("Work!");
      canvasElapse = parseInt(elapseValue.text()) * 60;
    
      loop = setInterval(drawClock, 1000);
  
      startButton.addClass("hide");
      pauseButton.removeClass("hide");  
   }
  
  function startBreak(){
    setText("Break!")
    breakElapseTime = parseInt(breakValue.text()) * 60;
     //drawBreakClock();
    breakLoop = setInterval(drawBreakClock, 1000);
    startButton.addClass("hide");
    pauseButton.removeClass("hide");
  }
  
  // this checks which clock is running and continues accordingly
   startButton.click(function(){
    if(countDownRunning === false){
      setWorkTime();
      countDownRunning = true; //the clock is running
      startElapse();
    }else if(elapseRunning === true && countDownRunning === true){
      
      startElapse();
    }else if(breakRunning === true && countDownRunning === true){
      startBreak();
    }
  });
  
  function clearIntervals(){
    clearInterval(loop);
    clearInterval(breakLoop);
  }
  
  function showHidePlayPause(){
     startButton.removeClass("hide");
     pauseButton.addClass("hide");
  }
  
  pauseButton.click(function(){
     countDownRunning = true;
      showHidePlayPause()
      clearIntervals()
  });
  
  var resetButton = $(".reset");
    
  resetButton.click(function(){
    setText("");
    breakRunning = false;
    elapseRunning = true;
    clearIntervals()
    showHidePlayPause()
    resetVariables();  
    drawFirstCircle();
    countDownRunning = false;
  });
  
  //this draws the circle for the break
  function drawCircleBreak(start, end){
    context.beginPath();
    context.fillStyle = "#8D99AE";
    context.textWeight = "bold";
    context.strokeStyle = "#5A7D7C";
    context.textAlign = 'center';
    context.font = FONT_HEIGHT + 'px Arial';
    var time = breakTime.getHours() + "h " + breakTime.getMinutes() + "m " + breakTime.getSeconds() + "s";
    context.fillText(time, canvas.width/2, canvas.height/2-40,RADIUS, 0, Math.PI*2, false);
    
     context.arc(canvas.width/2, canvas.height/2,RADIUS, start, end, false);
    context.stroke();
  } //break
  
  
  function drawCircle(start, end){
   context.beginPath();
    //context.lineWidth = 16;
    context.fillStyle = "#8D99AE";
    context.textWeight = "bold";
    context.strokeStyle = "#E74E5D";
    context.textAlign = 'center';
    context.font = FONT_HEIGHT + 'px Arial';
    var time = dateTime.getHours() + "h " + dateTime.getMinutes() + "m " + dateTime.getSeconds() + "s";
           
    context.fillText(time, canvas.width/2, canvas.height/2-40,RADIUS, 0, Math.PI*2, false);
    context.arc(canvas.width/2, canvas.height/2,RADIUS, start, end, false);
    context.stroke();
  }
  
  drawFirstCircle();
  
  function drawClock(){
    
    var angle = 0;
    diff = ((al/canvasElapse) * Math.PI*2*10);
    context.clearRect(0,0, canvas.width, canvas.height); 
    context.beginPath();
    context.lineWidth = 7;
    context.strokeStyle = "#A9BCD0";
    angle = Math.PI/(canvasElapse/2)*(al-60);
    context.arc(canvas.width/2, canvas.height/2,RADIUS, 0, Math.PI*2, false);
    context.stroke();
    
    
    al++;
    if(al > canvasElapse){
      dateTime.setSeconds(0);
      //dateTime.setMinutes(0);
      al = 0;
      clearTimeout(loop);
      
      //start break
      elapseRunning = false;
      breakRunning = true;
      continueBreak();
    }
    drawCircle(start, diff/10+start);
    dateTime.setSeconds(dateTime.getSeconds() -1);
  }
  
  
   function drawBreakClock(){   
    var angle = 0;
    diff = ((al/breakElapseTime) * Math.PI*2*10);   
    context.clearRect(0,0, canvas.width, canvas.height); 
   
    context.beginPath();
    context.lineWidth = 7;
    context.strokeStyle = "#A9BCD0";
    angle = Math.PI/(breakElapseTime/2)*(al-60);
    context.arc(canvas.width/2, canvas.height/2,RADIUS, 0, Math.PI*2, false);
    context.stroke();

    console.log("drclBr " + al );
    al++;
    if(al > breakElapseTime){
      breakTime.setSeconds(0);
      al = 0;
      //dateTime.setMinutes(0);
      clearTimeout(breakLoop);
    
      elapseRunning = true;
      breakRunning = false;
      continuePlay()
    }
    drawCircleBreak(start, diff/10+start); 
    breakTime.setSeconds(breakTime.getSeconds() -1);
  }

});