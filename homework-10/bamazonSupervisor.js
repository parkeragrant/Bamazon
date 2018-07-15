var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');


var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'bamazon_DB',
    user: 'root',
    password: 'root'
});

connection.connect(function (err) {
    if (err) {
        console.log('error connecting: ' + err.stack)
        return;
    }



})

function connectionQuery() {
    connection.query(
        'SELECT  departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS product_sales, (product_sales -departments.over_head_costs) AS total_profit FROM departments INNER JOIN products ON products.department_name = departments.department_name GROUP BY departments.department_id, departments.department_name, departments.over_head_costs',
        function (err, res, fields) {
            if (err) throw err;
            var departments = res;
            console.table(departments);




        })

};






inquirer
    .prompt([
        {
            choices: ['View Product Sales by Department', 'Create New Department'],
            type: 'checkbox',
            name: 'menuSelect'
        }
    ])
    .then(function (supervisorAnswer) {
        var queryType = (supervisorAnswer.menuSelect).toString()

        console.log(queryType)

        switch (queryType) {
            case 'Create New Department':

                inquirer
                    .prompt([
                        {
                            message: 'What is the name of the new department?',
                            type: 'input',
                            name: 'newDept'
                        },
                        {
                            message: 'What is the overhead cost for the new department?',
                            type: 'input',
                            name: 'overHead'
                        },

                    ])
                    .then(function (deptAnswer) {
                        var newDeptName = (deptAnswer.newDept);
                        var overHeadAmount = (deptAnswer.overHead);


                        connection.query(
                            'INSERT INTO departments SET ?', {
                                department_name: newDeptName,
                                over_head_costs: overHeadAmount,
                            },
                            function (err) {
                                if (err) throw err;

                                connection.end();

                            }


                        );


                    })


                break;
            case 'View Product Sales by Department':

                connectionQuery();

                connection.end();



                break;
        }
    })

