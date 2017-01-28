var inquirer = require('inquirer');
var mysql = require("mysql");

var idnumberArray = [];

// Connecting mySQL............
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "Bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

// ....................................

connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("");
    console.log("There are " + res.length + " Items for Sale")
    console.log("");
    for (var i = 0; i < res.length; i++) {
        console.log("*********************  Item " + [i] + "  *********************");
        console.log("Item ID: " + res[i].item_id);
        console.log("Product: " + res[i].product_name);
        console.log("Price: $" + res[i].price);
        console.log("Quantity in Stock: " + res[i].stock_quantity);
        console.log("****************************************************")
        idnumberArray.push(res[i].item_id);
    }
    console.log(idnumberArray);
    checkstore();
});





function noidea() {
    console.log("That ID doesn't exist, please try again.");
    checkstore();
};

function checkstore() {
    inquirer.prompt([{
            type: "input",
            name: "idnumber",
            message: "What is the ID of the product you would like to buy?"
        }, {
            type: "input",
            name: "quantity",
            message: "How many would you like buy?",
        }

    ]).then(function(answer) {
      	var n = idnumberArray;
        console.log(idnumberArray);
        var k = (n).indexOf((answer.idnumber));
        console.log(k);

// MIKE ^^^^its this part here???? What do I do?

       
        // if (123 == "123") { console.log("yes!") } else(console.log("no"))

    });
}
















// inquirer.prompt([/* Pass your questions in here */]).then(function (answers) {
//     // Use user feedback for... whatever!! 
// });
