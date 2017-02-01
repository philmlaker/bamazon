var inquirer = require('inquirer');
var mysql = require("mysql");
var res = res;
var lowstockArray = [];

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
commands();

function commands() {
    inquirer.prompt([{
            type: "list",
            name: "command",
            message: "What is the ID of the product you would like to buy?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }

    ]).then(function(answer) {


        switch (answer.command) {
            case "View Products for Sale":
                viewproducts();
                break;
            case "View Low Inventory":
                lowinventory();
                break;
            case "Add to Inventory":
                addinventory();
                break;
            case "Add New Product":
                statement;
                break;

        };
    });
};


function viewproducts() {
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
            console.log("****************************************************");
            // idnumberArray.push(res[i].item_id);
        }
        // console.log(idnumberArray);
        commands();


    });
};

function lowinventory() {
    lowstockArray;
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        res = res;
        for (var i = 0; i < res.length; i++) {

            if (5 > res[i].stock_quantity) {
                lowstockArray.push(res[i].item_id);

            };

            // idnumberArray.push(res[i].item_id);
        };
        // console.log(idnumberArray);
        console.log(lowstockArray);
        for (var i = 0; i < lowstockArray.length; i++) {
            connection.query("SELECT * from products WHERE item_id = " + lowstockArray[i] + " ;",
                function(err, res) {
                    if (err) throw err;
                    console.log("***************************************************");
                    console.log("Item ID: " + res[0].item_id);
                    console.log("Product: " + res[0].product_name);
                    console.log("Price: $" + res[0].price);
                    console.log("Quantity in Stock: " + res[0].stock_quantity);
                    console.log("****************************************************")

                });

        };
            commands();
    });

};


function addinventory() {
    lowstockArray;
    inquirer.prompt([{
            type: "input",
            name: "idnumber",
            message: "What is the ID of the product your would like to stock?",
        }, {
            type: "input",
            name: "numbertoAdd",
            message: "How many would you like to add?",
        }

    ]).then(function(answer) {

        var k = lowstockArray.indexOf(parseInt(answer.idnumber));

        if (k > -1) {

            var quantitystock = res[0].stock_quantity;

            console.log(quantitystock);
                    // console.log(quantitystock);
            // var newquantity = quantitystock - parseInt(answer.quantity);


            // connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?;", [answer.numbertoAdd, answer.idnumber], function(err, res) {
            //     if (err) throw err;
            //         console.log("Win!")
    
            // })

        }
    });
};


// function findid(number) {

//     connection.query("SELECT * from products WHERE item_id = " + number + " ;",
//         function(err, res) {
//             console.log("Item ID: " + res[0].item_id);
//             console.log("Product: " + res[0].product_name);
//         });

// }





// connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     res = res;
//     console.log("");
//     console.log("There are " + res.length + " Items for Sale")
//     console.log("");
//     for (var i = 0; i < res.length; i++) {
//         console.log("*********************  Item " + [i] + "  *********************");
//         console.log("Item ID: " + res[i].item_id);
//         console.log("Product: " + res[i].product_name);
//         console.log("Price: $" + res[i].price);
//         console.log("Quantity in Stock: " + res[i].stock_quantity);
//         console.log("****************************************************")
//         idnumberArray.push(res[i].item_id);
//     }
//     console.log(idnumberArray);
//     checkstore();
// });
