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

    document.getElementById('bodyform').style = 'backdrop-filter: blur(10px); background-color: rgba(255, 255, 255, 0.3);';
    document.getElementById('output').style.display = 'block';
    document.getElementById('btnenviar').style.display = 'none';
    document.getElementById('decobtn').style.display = 'block';
    document.getElementById('decoh').style.display = 'block';
    document.getElementById('containerform').style.display = 'none';
    document.getElementById('replacedp').style.display = 'block';
    document.getElementById('middle').style.display = 'block';



    var timeleft = 35;
    var downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            window.location.replace("file:///home/tomas/huellacarbono/index.html");
        } else {
        document.getElementById("countdown").innerHTML = timeleft;
        }
        timeleft -= 1;
    }, 1000);


    let obj;

    let serverurl;

    fetch('https://54.94.99.97/api/v1/data/', {  
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dict)
    }) 
    .then(res => res.json())
    .then(data => obj = data)
    .then(function(data) {
        //console.log(obj);
        serverurl = data.objectURL;
        console.log(serverurl);
        let qrcode = new QRCode("output", {
            text: serverurl,
            width: 177,
            height: 177,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        document.getElementById('replacedp').style.display = 'none';
        document.getElementById('middle').style.display = 'none';
        document.getElementById('decooutput').style.display = 'block';
        document.getElementById('countdown').style.display = 'block';
    });

    /*setTimeout(function(){
        window.location.replace("file:///home/tomas/huellacarbono/index.html");
    }, 30000);*/

});
