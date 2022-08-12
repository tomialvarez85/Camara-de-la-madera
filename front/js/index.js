
const selected_vehicle = document

form = {
    "vehicle" : "",
    "distance" : "25",
    "domesticAppliances" :
        [   
            {
                "name" : "fridge",
                "amount" : 2
            },
            {
                "name" : "washingMachine",
                "amount" : 1
            },
            {
                "name" : "dishWasher",
                "amount" : 1
            },
            {
                "name" : "clothesDryer",
                "amount" : 1
            },
            {
                "name" : "tv",
                "amount" : 3
            },
            {
                "name" : "pc",
                "amount" : 2
            },
            {
                "name" : "stereo",
                "amount" : 1
            }
        ],

    "nutrition" : "carnio",
    "plantedTrees" : "75"

}




form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);

    const data = Object.fromEntries(formData);
    console.log(data);

    fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // your expected POST request payload goes here
            title: "My post title",
            body: "My post content."
        })
    })
    .then(res => res.json())
    .then(data => {
    // enter you logic when the fetch is successful
        console.log(data)
    })
    . catch(error => {
    // enter your logic for when there is an error (ex. error toast)
    console.log(error)
    })  

});