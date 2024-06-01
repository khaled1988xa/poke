let count =0;
document.getElementById("pressthebutton").addEventListener("click",function(){
    count++;
    document.getElementById("result").innerHTML = `You have pressed the button ${count} times`;
});



document.getElementById("add").addEventListener("click",function(){
    let input1 = parseInt(document.getElementById("input").value);
    let input2 = parseInt(document.getElementById("input2").value);
    document.getElementById("calcResult").innerHTML = `The sum of the two numbers is ${input1+input2}`;
});
document.getElementById("sub").addEventListener("click",function(){
    let input1 = parseInt(document.getElementById("input").value);
    let input2 = parseInt(document.getElementById("input2").value);
    document.getElementById("calcResult").innerHTML = `The sub of the two numbers is ${input1-input2}`;
});
document.getElementById("multi").addEventListener("click",function(){
    let input1 = parseInt(document.getElementById("input").value);
    let input2 = parseInt(document.getElementById("input2").value);
    document.getElementById("calcResult").innerHTML = `The multi of the two numbers is ${input1*input2}`;
});
document.getElementById("div").addEventListener("click",function(){
    let input1 = parseInt(document.getElementById("input").value);
    let input2 = parseInt(document.getElementById("input2").value);
    document.getElementById("calcResult").innerHTML = `The div of the two numbers is ${input1/input2}`;
});
  let text1 =document.getElementById("text"); 
document.getElementById("submit").addEventListener("click",function(){
 
   document.getElementById("Ergebnis").innerHTML = document.getElementById("Ergebnis").innerHTML  +" "+  text1.value;
   document.getElementById("text").value = "";
});
document.getElementById("clear").addEventListener("click",function(){
  //let leng =Ergebnis.length;
  let textresult =Ergebnis.substring(textresult.length - 1);
  document.getElementById("Ergebnis").innerHTML = Ergebnis-textresult;


});
