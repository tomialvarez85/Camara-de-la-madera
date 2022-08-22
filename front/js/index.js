let btnShow = document.querySelector('button');

btnShow.addEventListener('click', function (e) {
    e.preventDefault();
    if (document.querySelector('input[name="vehicle"]:checked'))
        var selectedvic = document.querySelector('input[name="vehicle"]:checked').value;
    else
        var selectedvic = 0


    if (document.querySelector('input[name="distance"]:checked'))
        var selecteddis = document.querySelector('input[name="distance"]:checked').value;
    else
        var selecteddis = 0

//DA

    if (document.querySelector('input[id="aaa"]:checked'))
        var famount = 1
    else 
        var famount = 0

    if (document.querySelector('input[id="bbb"]:checked'))
        var wmamount = 1
    else 
        var wmamount = 0

    if (document.querySelector('input[id="ccc"]:checked'))
        var dwamount = 1
    else 
        var dwamount = 0

    if (document.querySelector('input[id="ddd"]:checked'))
        var cdamount = 1
    else 
        var cdamount = 0


    if (document.querySelector('input[id="eee"]:checked'))
        var tvamount = 2
    else 
        var tvamount = 0

    if (document.querySelector('input[id="fff"]:checked'))
        var pcamount = 2
    else 
        var pcamount = 0


    if (document.querySelector('input[id="ggg"]:checked'))
        var stamount = 1
    else 
        var stamount = 0
    


    let fridge = document.querySelector('input[id="aaa"]').value;
    let washingMachine = document.querySelector('input[id="bbb"]').value;
    let dishWasher = document.querySelector('input[id="ccc"]').value;
    let clothesDryer = document.querySelector('input[id="ddd"]').value;
    let tv = document.querySelector('input[id="eee"]').value;
    let pc = document.querySelector('input[id="fff"]').value;
    let stereo = document.querySelector('input[id="ggg"]').value;
    
//END DA

    if (document.querySelector('input[name="nutrition"]:checked'))
        var selectednut = document.querySelector('input[name="nutrition"]:checked').value;
    else
        var selectednut = 0


    if (document.querySelector('input[name="plantedTrees"]:checked'))
        var selectedtre = document.querySelector('input[name="plantedTrees"]:checked').value;
    else
        var selectedtre = 0


    dict = {
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

    var url = 'https://reqres.in/api/users';

    fetch(url, {
    method: 'POST',
    body: JSON.stringify(dict),
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));


});
