// Create a simple shop application (JavaScript only)
// You have a R200.00 note which you can spend at the shop, use a variable to capture the total
// and calculate the change by using functions for the calculations.
// There are multiple items that you would like to purchase.
// Each item should be represented with a variable and have a cost.
// Here is the menu
// chips: R20
// coke: R13
// sprite: R12
// stoney: R12
// hot dog: R25
// burger: R50
// fries: R15
// ice cream: R20
// Choose at least 4 items that you would like to purchase. Remember, you only have a R200 note
// and need to calculate the change that you will receive after you have purchased the items.
// Use a function to calculate the result and return the result.
// Use another function to log the result in the console.
// For this challenge you do not need to pass any variables as parameters into the functions, just
// ensure that you use the functions to calculate and display the results and ensure to use the
// correct data types.
// Ensure to follow all best practices that you have practiced up until now.
// For submission, please zip your files and upload it to Google Classroom for grading.
// Good luck and have fun!


// *************************************************************************
// const cashAvailable = 200;
// const chips = 20;
// const coke = 13;
// const sprite = 12;
// const stoney = 12;
// const hotDog = 25;
// const burger = 50;
// const fries = 15;
// const iceCream = 20;

// function calculateTotal() {
//     const total = chips + coke + burger + fries + iceCream;
//     return total;
// }
// console.log(`Total: R${Math.ceil(calculateTotal())}`);

//  function taxedAmount() {
//      const taxedAmount = calculateTotal() * .15;
//       return taxedAmount;
//  }
// console.log(`Tax: R${Math.ceil(taxedAmount())}`);

//  function subTotal() {
//      subtotal = calculateTotal() + taxedAmount();
//      return subtotal;
// }
// console.log(`Total Amount payable: R${Math.ceil(subTotal())}`);


// // const finalTotal = calculateTotal();
// function calculateChange() {
//     const change = cashAvailable - subTotal();
//     return change;

// }

// console.log(`Your change is: R${Math.ceil(calculateChange())}`);




// *****************************************************************************

// Toggle form visibility
document.getElementById('toggleFormBtn').addEventListener('click', function() {
    const productForm = document.getElementById('productForm');

    // Toggle between showing and hiding the form
    if (productForm.style.display === 'none') {
        productForm.style.display = 'block';
    } else {
        productForm.style.display = 'none';
    }
});

// Add product functionality
document.getElementById("addProductBtn").addEventListener("click", function() {
    // Get the form values
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productQuantity = document.getElementById("productQuantity").value;

    if (productName === "" || productPrice === "" || productQuantity === "") {
        alert("Please fill out all fields.");
        return;
    }

    // Create a new row in the cart table
    const cartTable = document.querySelector(".cart-page table.theader");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>
            <div class="cart-info">
                <div>
                    <img src="./assets/default-product.png" alt="${productName}">
                </div>
                <div>
                    <p>${productName}</p>
                    <small>Price: R${productPrice}</small>
                    <br>
                    <a href="javascript:void(0)" onclick="removeItem(this)">Remove Item</a>
                </div>
            </div>
        </td>
        <td><input type="number" value="${productQuantity}" onchange="calculateTotals()"></td>
        <td>R${productPrice}</td>
    `;

    cartTable.appendChild(newRow);

    // Recalculate totals
    calculateTotals();

    // Clear the form
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productQuantity').value = '1';

    // Hide the form after adding the product
    document.getElementById('productForm').style.display = 'none';
});

// *************************************************************************


// Recalculate totals
calculateTotals();

// Clear the form
document.getElementById("productName").value = "";
document.getElementById("productPrice").value = "";
document.getElementById("productQuantity").value = "1";


// Function to remove a product row
function removeItem(link) {
    const row = link.closest("tr");
    row.remove();
    calculateTotals();
}



// *******************************************************************************





document.addEventListener('DOMContentLoaded', () => {
    calculateTotals();

    // Listen for changes in the quantity input fields
    document.querySelectorAll('.cart-page input[type="number"]').forEach(input => {
        input.addEventListener('input', calculateTotals);
    });
});

// Function to calculate totals and update the values in the totals table
function calculateTotals() {
    let total = 0;

    // Get all rows of the cart table
    const rows = document.querySelectorAll('.cart-page table tr');

    rows.forEach(row => {
        const priceElement = row.querySelector('td:last-child');
        const quantityElement = row.querySelector('td input[type="number"]');

        if (priceElement && quantityElement) {
            const price = parseFloat(priceElement.textContent.replace('R', ''));
            const quantity = parseInt(quantityElement.value);

            total += price * quantity;
        }
    });

    // Calculate tax and total payable
    const tax = total * 0.15;
    const totalPayable = total + tax;

    // Update totals in the DOM
    document.getElementById('total').textContent = `R${total.toFixed(2)}`;
    document.getElementById('tax').textContent = `R${tax.toFixed(2)}`;
    document.getElementById('totalPayable').textContent = `R${totalPayable.toFixed(2)}`;
}

// Function to calculate the change based on payment input
function calculateChange() {
    const totalPayable = parseFloat(document.getElementById('totalPayable').textContent.replace('R', ''));
    const payment = parseFloat(document.getElementById('payment').value);

    if (isNaN(payment) || payment < totalPayable) {
        alert('Please enter a valid payment amount greater than or equal to the total payable.');
        return;
    }

    const change = payment - totalPayable;
    document.getElementById('change').textContent = `R${change.toFixed(2)}`;
}