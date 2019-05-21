var l1 = 229, l2 = 227, l3 = 231, average = 227;

var tensions = [];

var updateTension = (l) => {
    let ammount = Math.random();
    if(Math.random() >= 0.5){
        if(ammount < 0.3){
            return l * 1.001;
        }
        else if(ammount >= 0.3 && ammount < 0.6){
            return l * 1.002;
        }
        else if(ammount >= 0.6){
            return l * 1.003;
        }
    } else {
        if(ammount < 0.3){
            return l * 0.999;
        }
        else if(ammount >= 0.3 && ammount < 0.6){
            return l * 0.998;
        }
        else if(ammount >= 0.6){
            return l * 0.997;
        }
    } 
};

var randomPowerGenerator = () => {
    l1 = updateTension(l1);    
    l2 = updateTension(l2);    
    l3 = updateTension(l3);
    average = (l1 + l2 + l3) / 3;
};

setInterval( () => {
    randomPowerGenerator();
    let currentData = {L1: l1, L2: l2, L3: l3, Average: average, date: new Date().toString()};
    
    if(tensions.length >= 15){
        tensions.shift();
    }
    tensions.push(currentData);
    
    // console.log(tensions);
}, 1000);

var eventify = (arr, callback) => {
    arr.push = (e) => {
        Array.prototype.push.call(arr, e);
        callback(arr);
    };
};
