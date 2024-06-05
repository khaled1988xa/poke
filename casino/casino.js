let money = 100;
document.getElementById("money").innerHTML = money;

function gamble() {
  let Einsatz = parseInt(document.getElementById("wager").value);
  let color ;
  if (money>0){ 
   
            let randomValue = Math.random(); 
            console.log("Random number:", randomValue); 
            const redRadioButton =document.getElementById("colorRed");
            const blackRadioButton =document.getElementById("colorBlack");
            if (randomValue<0.48)
              {
                 color ="red" ;
                console.log("color is red ")
              }
              else if (randomValue>0.52){
                 color = "black";
                console.log("color is black ")
              }
              else {
                 color ="green";
                console.log("color is green ")
              }
            if(redRadioButton.checked&&color=="red"){
              console.log(color);      
              money=money+(Einsatz*2);
                    document.getElementById("money").innerHTML = money;
                    document.getElementById("result").innerHTML = "You won " + Einsatz + "€";
            }
            else if (blackRadioButton.checked&&color=="black"){
                    money = money + (Einsatz*2);
                    document.getElementById("money").innerHTML = money;
                    document.getElementById("result").innerHTML = "You won " + Einsatz + "€";
            }
            else  {
                    money=money-Einsatz;
                    document.getElementById("money").innerHTML = money;
                    document.getElementById("result").innerHTML = "You lose " + Einsatz + "€";
            }
  
  
}
else {
  document.getElementById("result").innerHTML = "you have no money left";
  
}
}
