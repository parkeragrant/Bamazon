var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

var queryType = '';
var availStockQuantity = 0;
var product = '';
var department = '';
var price = 0;
var stockQuantity = 0;
var addArr = [];

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
    // console.log('connected as id ' + connection.threadId);

    queryFunction();

})

function queryFunction() {

    connection.query('SELECT * FROM products', function (err, res, fields) {
        if (err) {
            console.log('error in query: ' + err.stack);
        }
        inventory = res;



    });
};



inquirer
    .prompt([
        {
            type: 'checkbox',
            message: 'Menu Options',
            choices:
                [
                    'View Products for Sale',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product',
                ],
            name: 'menuSelect'
        }
    ])
    .then(function (menuAnswer) {
        queryType = (menuAnswer.menuSelect).toString();

        switch (queryType) {
            case 'View Products for Sale':

                console.log('\n---------------------------------------------------------------------\n')
                console.table(inventory);

                connection.end();

                break;
            case 'View Low Inventory':

                connection.query('SELECT * FROM products WHERE stock_quantity <= 45', function (err, res, fields) {
                    if (err) {
                        console.log('error in query: ' + err.stack);
                    }
                    inventory = res;

                    console.log('\n---------------------------------------------------------------------\n')
                    console.table(inventory);
                    connection.end();

                });

                break;
            case 'Add to Inventory':

                console.log('\n---------------------------------------------------------------------\n')
                console.table(inventory);

                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'Please enter the item_id of the item you want to add more of.',
                            name: 'InvItemID'
                        },
                        {
                            type: 'input',
                            message: 'How many would you like to add?',
                            name: 'InvItemQuant'
                        }
                    ])
                    .then(function (inventoryAnswer) {
                        availStockQuantity = parseInt(inventory[inventoryAnswer.InvItemID - 1].stock_quantity);

                        availStockQuantity = parseInt(availStockQuantity + parseInt(inventoryAnswer.InvItemQuant));


                        connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?',
                            [availStockQuantity, inventoryAnswer.InvItemID],
                            function (err, result) {
                                if (err) throw err;
                                connection.end();
                            });

                    });

                break;
            case 'Add New Product':

                console.log('\n---------------------------------------------------------------------\n')
                console.table(inventory);

                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'Enter the product name.',
                            name: 'product'
                        },
                        {
                            type: 'input',
                            message: 'Enter the department name.',
                            name: 'department'
                        },
                        {
                            type: 'input',
                            message: 'Enter the desired price.',
                            name: 'price'
                        },
                        {
                            type: 'input',
                            message: 'Enter the starting stock quantity.',
                            name: 'stock'
                        }
                    ])
                    .then(function (addAnswer) {

                        product = (addAnswer.product);
                        department = (addAnswer.department).toString();
                        price = (addAnswer.price);
                        stockQuantity = (addAnswer.stock);

                        console.log(product);
                        console.log(department);
                        console.log(price);
                        console.log(stockQuantity);

                        addArr = [product, department, price, stockQuantity];

                        // console.log(addArr);


                        connection.query(
                            'INSERT INTO products SET ?', {
                                product_name: product,
                                department_name: department,
                                price: price,
                                stock_quantity: stockQuantity
                            },
                            function (err) {
                                if (err) throw err;

                                console.log('\n---------------------------------------------------------------------\n')
                                console.log('Your product was created successfully!');
                                connection.end();

                            }


                        );

                    });

                break;


        }

    })