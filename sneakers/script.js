var sidenav = document.querySelector(".sidenav")
//sidenav.style.display="none"//

function shownav() {
    sidenav.style.left = "0"
}
function closenav() {
    sidenav.style.left = "-60%"

}
//cart script//

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item is already in the cart
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        // If it exists, just increase the quantity number
        existingItem.quantity += 1;
    } else {
        // If it's new, add it with quantity 1
        let product = {
            name: name,
            price: price,
            image: image,
            quantity: 1
        };
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " added to cart!");
    
    // Refresh the display immediately if you are on the cart page
    displayCart();
}


function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let table = document.getElementById('cart-content');
    
    if(!table) return; // Exit if we aren't on the cart page

    table.innerHTML = ""; // Clear out old static rows
    let grandTotal = 0;

    cart.forEach((item, index) => {
        let subtotal = item.price * item.quantity;
        grandTotal += subtotal;
        table.innerHTML += `
            <tr>
                <td><a href="#" onclick="removeItem(${index})"><i class="far fa-times-circle"></i></a></td>
                <td><img src="${item.image}" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)"></td>                <td>$${subtotal}</td>
                <td>$${subtotal}</td>
            </tr>`;
    });
    document.getElementById('final-subtotal').innerHTML = "$" + grandTotal;
    document.getElementById('final-total').innerHTML = "$" + grandTotal;
}

// Function to delete an item
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1); // Remove the item at that position
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Redraw the table
}

// Run this automatically when the page loads
window.onload = displayCart;

function updateQuantity(index, newQty) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    
    // Prevent quantity from being less than 1
    if (newQty < 1) {
        newQty = 1;
    }

    cart[index].quantity = parseInt(newQty);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redraw the table to show the new Subtotal
    displayCart();
    
}