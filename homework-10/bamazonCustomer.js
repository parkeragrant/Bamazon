var inquirer = require('inquirer');
var mysql = require('mysql');
var cTable = require('console.table');
var inventory = [];
var itemArrFinder = 0;
var availStockQuantity = 0;
var orderTotal = 0;
var itemSalesTotal = 0;

var connection = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    database: 'bamazon_DB',
    user: 'root',
    password: 'root'

});

connection.connect(function (err) {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);

    queryFunction();



})

function queryFunction() {

    connection.query('SELECT * FROM products', function (err, res, fields) {
        if (err) {
            console.log('error in query: ' + err.stack);
        }

        inventory = res;


        console.log('\n---------------------------------------------------------------------\n')
        console.table(inventory);


        beginShopping();




    });
};

function beginShopping() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: '\nPlease enter the item_id for the item you wish to purchase.',
                name: 'item_id'
            }
        ])
        .then(function (itemAnswer) {
            itemArrFinder = parseInt(itemAnswer.item_id - 1);

            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: '\nHow many would like to buy?',
                        name: 'quantity'
                    }
                ])
                .then(function (quantityAnswer) {



                    availStockQuantity = parseInt(inventory[itemArrFinder].stock_quantity);


                    if (quantityAnswer.quantity > availStockQuantity) {
                        console.log("Sorry we don't have enough inventory to cover your order.")
                    } else {



                        availStockQuantity = parseInt(availStockQuantity - quantityAnswer.quantity);
                        connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?',
                            [availStockQuantity, itemArrFinder + 1],
                            function (err, result) {
                                if (err) throw err;

                                connection.query('UPDATE products SET product_sales = ? WHERE item_id = ?',
                                    [itemSalesTotal, itemArrFinder + 1],
                                    function (err, result) {
                                        if (err) throw err;
                                        connection.end();
                                    })

                            })

                        orderTotal = parseFloat(quantityAnswer.quantity * inventory[itemArrFinder].price);

                        itemSalesTotal = parseFloat(orderTotal + inventory[itemArrFinder].product_sales);

                        console.log('\n---------------------------------------------------------------------\n')

                        console.log('Your total is: $' + orderTotal + '\n');




                    };

                })

        })
};
