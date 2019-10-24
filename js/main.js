/*
* TODO:
*  pratesti logika su UP ir DOWN
*
* */
const height = [0, 17, 38, 59, 80];
var elevators = {
  lift1: {
    direction: "",
    position: 0,
    job: [],
    call: true,
  },
  lift2: {
    direction: "",
    position: 0,
    job: [],
    call: true,
  }
};
var i;
var lenght;
var upDown;
$('.button').click(function () {
  i = this.id <= 5 ? this.id - 1 : this.id - 5;
  upDown = $(this).text();
  whitchElevatorIsCloser(i, upDown);
});

$('.lift1-button').click(function () {
  if($(this).text() == "CLOSE"){
    $('.lift1').css('background-color', 'red');
    $('.lift1-button').css('display', 'none');
  }
  else {
    elevators.lift1.job.push($(this).text()-1);
  }
  if(elevators.lift1.call && elevators.lift1.job.length > 0)
    elevatorOne();
});

$('.lift2-button').click(function () {
  if($(this).text() == "CLOSE"){
    $('.lift2').css('background-color', 'red');
    $('.lift2-button').css('display', 'none');
  }
  else {
    elevators.lift2.job.push($(this).text()-1);
  }
  if(elevators.lift2.call && elevators.lift2.job.length > 0)
    elevatorTwo();
});

function whitchElevatorIsCloser(i, upDown) {

  if( $('.lift1').is(':animated') ) {
    console.log(elevators.lift1.direction);
    $('.lift1').stop();
    lenght = parseFloat($('.lift1').css('margin-bottom')) / parseFloat(window.innerHeight) * 100;
    if(elevators.lift1.direction == upDown){
      if(height[i] > lenght)
        elevators.lift1.job.push(i);
    }
    $('.lift1').animate({'marginBottom': height[elevators.lift1.job[0]] + 'vh'}, Math.abs(elevators.lift1.job[0] - elevators.lift1.position) * 1300, function () {
      elevators.lift1.position = elevators.lift1.job[0];
      //console.log(elevators.lift1.job);
      if(elevators.lift1.job[0] == 4)
        elevators.lift1.direction = "DOWN";
      $('.lift1-button').eq(elevators.lift1.job[0]).css('background-color', 'green');
      elevators.lift1.job.shift();
      $('.lift1').css('background-color', 'green');
      $('.lift1-button').css('display', 'block');
      setTimeout(waitFirstElevator, 5000);
    });

  }

  else if(elevators.lift1.direction == "UP" && elevators.lift1.position < i)
    elevators.lift1.job.push(i);
  else if(elevators.lift2.direction == "UP" && elevators.lift2.position < i)
    elevators.lift2.job.push(i);
  else if(elevators.lift1.direction == "DOWN" && elevators.lift1.position > i)
    elevators.lift1.job.push(i);
  else if(elevators.lift2.direction == "DOWN" && elevators.lift2.position > i)
    elevators.lift2.job.push(i);
   if(elevators.lift1.position == i){
    if(elevators.lift1.position > i)
      elevators.lift1.direction = "DOWN";
    else
      elevators.lift1.direction = "UP";
    elevators.lift1.job.push(i)
  }
  else if(elevators.lift2.position == i){
    if(elevators.lift2.position > i)
      elevators.lift2.direction = "DOWN";
    else
      elevators.lift2.direction = "UP";
    elevators.lift2.job.push(i)
  }
  else if (elevators.lift1.direction == ""){
    if(elevators.lift1.position == elevators.lift2.position || Math.abs(elevators.lift1.position - i) == Math.abs(elevators.lift2.position - i)){
      if(elevators.lift1.position > i)
        elevators.lift1.direction = "DOWN";
      else
        elevators.lift1.direction = "UP";
      elevators.lift1.job.push(i);
    }
    else if(Math.abs(elevators.lift1.position - i) < Math.abs(elevators.lift2.position - i)){
      if(elevators.lift1.position > i)
        elevators.lift1.direction = "DOWN";
      else
        elevators.lift1.direction = "UP";
      elevators.lift1.job.push(i);
    }
    else{
      if(elevators.lift2.position > i)
        elevators.lift2.direction = "DOWN";
      else
        elevators.lift2.direction = "UP";
      elevators.lift2.job.push(i);
    }
  }
  else if(elevators.lift2.direction == ""){
    if(elevators.lift2.position > i)
      elevators.lift2.direction = "DOWN";
    else
      elevators.lift2.direction = "UP";
    elevators.lift2.job.push(i);
  }


  if(elevators.lift1.call && elevators.lift1.job.length > 0){
    elevatorOne();
  }
  if(elevators.lift2.call && elevators.lift2.job. length > 0) {
    elevatorTwo()
  }
}

function elevatorOne(){
  let unique = [...new Set(elevators.lift1.job)];
  elevators.lift1.job = unique;
  elevators.lift1.job.sort();
  if(elevators.lift1.direction == "DOWN"){
    elevators.lift1.job.reverse();
  }
  elevators.lift1.call = false;
  elevators.lift1.job.forEach(function (item, index) {
    $('.lift1-button').eq(item).css('background-color', 'red');
  });
  $('#job1').text(elevators.lift1.job);
  $('.lift1').animate({'marginBottom': height[elevators.lift1.job[0]] + 'vh'}, Math.abs(elevators.lift1.job[0] - elevators.lift1.position) * 1300, function () {
    elevators.lift1.position = elevators.lift1.job[0];
    //console.log(elevators.lift1.job);
    if(elevators.lift1.job[0] == 4)
      elevators.lift1.direction = "DOWN";
    $('.lift1-button').eq(elevators.lift1.job[0]).css('background-color', 'green');
    elevators.lift1.job.shift();
    $('.lift1').css('background-color', 'green');
    $('.lift1-button').css('display', 'block');
    setTimeout(waitFirstElevator, 4000);
  });
}

function waitFirstElevator() {
  $('.lift1').css('background-color', 'red');
  $('.lift1-button').css('display', 'none');
  if(elevators.lift1.job.length >= 1)
    elevatorOne();
  else {
    elevators.lift1.call = true;
    elevators.lift1.direction = "";
    $('#job1').text(elevators.lift1.job);
  }
}
function elevatorTwo(){
  let unique = [...new Set(elevators.lift2.job)];
  elevators.lift2.job = unique;
  elevators.lift2.call = false;
  elevators.lift2.job.sort();
  if(elevators.lift2.direction == "DOWN"){
    elevators.lift2.job.reverse();
  }
  elevators.lift2.job.forEach(function (item, index) {
    $('.lift2-button').eq(item).css('background-color', 'red');
  });

  //console.log(elevators.lift1.job[0]);
  $('.lift2').animate({'marginBottom': height[elevators.lift2.job[0]] + 'vh'}, Math.abs(elevators.lift2.job[0] - elevators.lift2.position) * 1300, function () {
    elevators.lift2.position = elevators.lift2.job[0];
    if(elevators.lift2.job[0] == 4);
    elevators.lift2.direction = "DOWN";
    $('.lift2-button').eq(elevators.lift2.job[0]).css('background-color', 'green');
    elevators.lift2.job.shift();
    $('.lift2').css('background-color', 'green');
    $('.lift2-button').css('display', 'block');
    setTimeout(waitSecondElevator, 4000);
  });
}
function waitSecondElevator() {
  $('.lift2').css('background-color', 'red');
  $('.lift2-button').css('display', 'none');
  if(elevators.lift2.job.length >= 1)
    elevatorTwo();
  else {
    elevators.lift2.call = true;
    elevators.lift2.direction = "";
    $('#job2').text(elevators.lift2.job);
  }
}








