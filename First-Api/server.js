var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients = [
    {
        "id":"234KAKk",
        "text":"Eggs"
    },
    
    {
        "id":"234KAK",
        "text":"Milk"
    },
    
    {
        "id":"234KAK",
        "text":"Beacon"
    },

    {
        "id":"234KAK",
        "text":"Water"

    },

    
];

// app.get('/', function(request, response) {
//     response.send('My First API!');
// });
app.get('/ingredients', function(request, response) {
    response.send(ingredients);
});

app.post('/ingredients', function(request, response) {
    var ingredient = request.body;
    if (!ingredient || ingredient.text ==+ "") {
        response.status(500).send({error: "Your ingredient must have a test"});

    }else {
        ingredients.push(ingredient);
        response.status(200).send(ingredient);
    }

});

app.put('/ingredients/:ingredientId', function(request, response) {

    var newText = request.body.text;

    if (!newText || newText === "") { 
        response.status(500).send({error:"You must provide ingredient text"})
    } else {
        var objectFound = false;
        for (var x = 0; x < ingredients.length; x++) {
            var ing = ingredients[x];
 
            if(ing.id === request.params.ingredientId) {
               ingredients[x].text = newText;
               objectFound = true;
               break;
            }
        
    }
    if (!objectFound) {
        response.status(500).send({error:"Ingredient id not found"});

    } else {
        response.send(ingredients);


    }
   
    }

});

app.delete('/ingredients/:ingredientId', function(request, response)   {
    const ingredientId = parseInt(request.params.id);
    ingredients = ingredients.filter((ingredient => ingredient.id !== ingredientId));
    response.json({ message: "ingredient has been successfully deleted"});


});




// app.get('/file', function(request, response) {
//     response.send('Access granted into the server');

// });

app.listen(3000, function() {
    console.log("First API running on port 3000!");
});
