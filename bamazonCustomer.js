var inquirer = require('inquirer');
var mysql = require("mysql");
var res = res;

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
    res = res;
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

        // console.log(idnumberArray);

        // console.log(idNumberArray);
        var k = idnumberArray.indexOf(parseInt(answer.idnumber));
        // console.log(k);

        if (k > -1) {
            // console.log("Yep its in there!");
            // (console.log(answer.quantity));
            // (console.log(answer.idnumber));
            connection.query("SELECT * from products WHERE item_id = " + answer.idnumber + " ;",
                function(err, res) {
                    if (err) throw err;
                    if (answer.quantity > res[0].stock_quantity) { console.log("I'm sorry, there aren't enough in stock! ");
                        checkstore();
                        return; };
                    var quantitystock = res[0].stock_quantity;
                    // console.log(quantitystock);
                    var newquantity = quantitystock - parseInt(answer.quantity);
                    // console.log(newquantity);

                    // Updating records: UPDATE[table] SET[column] = '[updated-value]'
                    // WHERE[column] = [value];

                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?;", [newquantity, answer.idnumber], function(err, res) {
                        if (err) throw err;


                        connection.query("SELECT * from products WHERE item_id = " + answer.idnumber + " ;",
                            function(err, res) {
                                var totalcost = answer.quantity * res[0].price;
                                console.log("Your total cost is $" + totalcost);
                                checkstore();
                            });

                    });







                });


        } else {
            console.log("I'm sorry, that ID number cannot be found, please try again.");
            checkstore();


        };



        // for(var i=0; i < res.length; i++){
        //  res;
        // if(answer.idnumber == (res[i]).item_id){

        //  console.log("true");

        // };

        // }


        // if (123 == "123") { console.log("yes!") } else(console.log("no"))

    });


}
















// inquirer.prompt([/* Pass your questions in here */]).then(function (answers) {
//     // Use user feedback for... whatever!! 
// });
