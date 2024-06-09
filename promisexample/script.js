// Function that returns a Promise
function fetchData() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            var value = Math.floor(Math.random() * 10) + 1;
            if (value >= 5) {
                resolve(value);
            } else {
                reject(value);
            }
        }, 1000);
    });
}

// Function to run the command
function runCommand() {
    fetchData()
        .then(function(value) {
            console.log("Accepted ");
        })
        .catch(function(value) {
            console.log("Rejected ");
        });
}


function walkthedog(callback){
    setTimeout(function(){
        console.log("walking the dog");
        callback();
    },3000);
    
}
function dothedishes (callback  ){
    setTimeout(function(){
        console.log("doing the dishes");
        callback(); 
    },2000);
    
}
function dosothing (callback){
    setTimeout(function(){
        console.log("doing nothing");
        callback();
    },1000);
    
}
walkthedog(()=> {
    dothedishes(()=> {
        dosothing(()=> {
            console.log("done");
        })
    })
})


