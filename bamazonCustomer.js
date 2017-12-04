var mysql = require("mysql");
var inquirer = require("inquirer");
var clear = require('clear');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Diya2008",
  database: "bamazon_db"
});

productlist=[]

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  clear()
  selectProducts();
});


function selectProducts()
{
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      productinfo=(res);
      
      for (var i = 0; i < productinfo.length; i++) {
        productlist.push(productinfo[i].product_name);
      }
     
     // clear()
      inquirer
      .prompt([
        // Here we create a basic text prompt.
        {
            type: "list",
            message: "Which product do you want to select?",
            choices: productlist,
            name: "productchoice"
        },
        {
            type: "list",
            message: "What quantity do you need?",
            choices: ["1","2","3","4","5","6","7","8","9","10"],
            name: "productquantity"
        }
    ])
    .then(function(inquirerResponse) {
        checkavailability(inquirerResponse.productchoice,inquirerResponse.productquantity)
      });
      
    });
}

function checkavailability(product,quantity) {
    
    console.log("Check table to make sure product is available...\n");
    console.log(product)
    console.log(quantity)
    var product = product
    var quantity = quantity
    
    var sql = 'SELECT "available",price,stock_quantity FROM products WHERE product_name = ' + mysql.escape(product)+
    'AND stock_quantity>='+mysql.escape(quantity);
    var query = connection.query(sql,
      function(err, res) {
        if (err) throw err;  
        if (res.length > 0)
        {
            totalPrice = quantity * res[0].price
            remainingQuantity = res[0].stock_quantity - quantity
            console.log("Your order will be placed now")
            console.log("The total price of your product is: "+totalPrice)
            updateQuantity(product,remainingQuantity)
        } 
        else {
        console.log("your order cannot be placed as quantity is not available")
        inquirer
        .prompt([
          // Here we create a basic text prompt.
          {
              type: "list",
              message: "Do you want to order more?",
              choices: ["yes","no"],
              name: "nextchoice"
          }
      ])
      .then(function(inquirerResponse) {
          switch(inquirerResponse.nextchoice) {
              case "yes":
                  selectProducts()
                  break;
              case "no":
                  console.log("Thanks for shopping with bamazon")
                  process.exit();
                  break;
          }
        }); 
    }   
}
    )}



function updateQuantity(product,remainingQuantity) {

var sql = 'UPDATE products SET stock_quantity='+ mysql.escape(remainingQuantity)+' WHERE product_name='+mysql.escape(product);

var query = connection.query(sql,
    function(err, res) {
      if (err) throw err; 
      inquirer
      .prompt([
        // Here we create a basic text prompt.
        {
            type: "list",
            message: "Do you want to order more?",
            choices: ["yes","no"],
            name: "nextchoice"
        }
    ])
    .then(function(inquirerResponse) {
        switch(inquirerResponse.nextchoice) {
            case "yes":
                selectProducts()
                break;
            case "no":
                console.log("Thanks for shopping with bamazon")
                process.exit();
                break;
        }
      }); 
        
  }   
  )
}