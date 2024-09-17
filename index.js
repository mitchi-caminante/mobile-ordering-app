import { menuArray } from '/data.js';

const menuEl = document.getElementById("menu-list");
const orderDetailsEl = document.getElementById("order-details-el");
const totalCostEl = document.getElementById("total-cost");

let orderArray = [];
let totalCost = 0;

// Event listener for clicks
document.addEventListener('click', (e) => {
    if (e.target.dataset.id) {
        handleAddClick(e.target.dataset.id);
    }
});

// Function for handling click on add button
function handleAddClick(itemId) {
    let targetObject = menuArray.find(item => item.id == itemId);

    if (!orderArray.includes(targetObject)) {
        orderArray.push(targetObject);
        targetObject.quantity = 1;
    } else {
        targetObject.quantity++;
    }

    totalCost += targetObject.price;
    totalCostEl.textContent = `$${totalCost.toFixed(2)}`;

    if (orderArray.length > 0) {
        orderDetailsEl.classList.remove('hidden');
    }

    render();
}

// Function for adding menu items to order summary
function addItemsToOrder() {
    let orderSummHtml = `<h2>Your Order</h2>`;

    orderArray.forEach((item) => {
        orderSummHtml += `
            <div class="items-ordered">
                <span>${item.name} (x${item.quantity})</span>
                <span id="item-cost">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });

    orderSummHtml += `
        <div class="total-cost-disp">
            <span>Total: </span>
            <span id="total-cost">$${totalCost.toFixed(2)}</span>
        </div>
        <button class="order-btn" id="order-btn">Place order</button>
    `;

    orderDetailsEl.innerHTML = orderSummHtml;
}

// Function for rendering menu items
function getMenuData() {
    let menuDataHtml = '';

    menuArray.forEach(item => {
        menuDataHtml += `
            <div class="menu-item">
                <div class="item-img">${item.emoji}</div>
                <div class="item-info">
                    <h3 class="item-title">${item.name}</h3>
                    <div class="item-description">${item.ingredients}</div>
                    <div class="item-price">$${item.price}</div>
                </div>
                <button class="add-btn" data-id="${item.id}">
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
        `;
    });

    return menuDataHtml;
}

// Function to handle order submission
function handleOrderSubmit() {
    alert('Thank you for your order!');
    
    // Clear the order
    orderArray = [];
    totalCost = 0;
    totalCostEl.textContent = `$${totalCost.toFixed(2)}`;
    
    // Update the UI
    render();
}

// Function to render the menu and order details
function render() {
    menuEl.innerHTML = getMenuData();
    addItemsToOrder(); // Update the order summary
    const orderSummHeading = document.getElementById("order-summ-heading");
    const orderBtn = document.getElementById("order-btn");
    
    if (orderArray.length > 0) {
        orderSummHeading.textContent = "Your Order";
        if (orderBtn) {
            orderBtn.addEventListener('click', handleOrderSubmit);
        }
    } else {
        orderSummHeading.textContent = "Your order is empty";
        if (orderBtn) {
            orderBtn.removeEventListener('click', handleOrderSubmit);
        }
    }
}

render();
