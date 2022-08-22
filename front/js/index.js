let btnShow = document.querySelector('button');

btnShow.addEventListener('click', function (e) {
    e.preventDefault();

    let selectedvic = document.querySelector('input[name="vehicle"]:checked').value;
    let selecteddis = document.querySelector('input[name="distance"]:checked').value;

    //DA

    if (document.querySelector('input[id="fridgeid"]:checked'))
        var famount = 1
    else 
        var famount = 0

    if (document.querySelector('input[id="washingMachineid"]:checked'))
        var wmamount = 1
    else 
        var wmamount = 0

    if (document.querySelector('input[id="dishWasherid"]:checked'))
        var dwamount = 1
    else 
        var dwamount = 0

    if (document.querySelector('input[id="clothesDryerid"]:checked'))
        var cdamount = 1
    else 
        var cdamount = 0


    if (document.querySelector('input[id="tvid"]:checked'))
        var tvamount = 2
    else 
        var tvamount = 0

    if (document.querySelector('input[id="pcid"]:checked'))
        var pcamount = 2
    else 
        var pcamount = 0


    if (document.querySelector('input[id="stereoid"]:checked'))
        var stamount = 1
    else 
        var stamount = 0


    let fridge = document.querySelector('input[id="fridgeid"]').value;
    let washingMachine = document.querySelector('input[id="washingMachineid"]').value;
    let dishWasher = document.querySelector('input[id="dishWasherid"]').value;
    let clothesDryer = document.querySelector('input[id="clothesDryerid"]').value;
    let tv = document.querySelector('input[id="tvid"]').value;
    let pc = document.querySelector('input[id="pcid"]').value;
    let stereo = document.querySelector('input[id="stereoid"]').value;
    
    //END DA

    let selectednut = document.querySelector('input[name="nutrition"]:checked').value;
    let selectedtre = document.querySelector('input[name="plantedTrees"]:checked').value;
    

    const dict = {
        "vehicle" : selectedvic,
        "distance" : selecteddis,
        "domesticAppliances" :
            [   
                {
                    "name" : fridge,
                    "amount" : famount
                },
                {
                    "name" : washingMachine,
                    "amount" : wmamount
                },
                {
                    "name" : dishWasher,
                    "amount" : dwamount
                },
                {
                    "name" : clothesDryer,
                    "amount" : cdamount
                },
                {
                    "name" : tv,
                    "amount" : tvamount
                },
                {
                    "name" : pc,
                    "amount" : pcamount
                },
                {
                    "name" : stereo,
                    "amount" : stamount
                }
            ],
    
        "nutrition" : selectednut,
        "plantedTrees" : selectedtre
    }

    console.log(dict);

    /*
    const requeriments = {
        method : 'POST',
        mode : 'no-cors',
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body : JSON.stringify(dict)
    };

    setTimeout(function(){
        window.location.replace("file:///home/tomas/huellacarbono/index.html");
    }, 7000);*/


});
