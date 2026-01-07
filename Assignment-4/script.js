document.addEventListener('DOMContentLoaded', function() {

let serviceButtons = document.querySelectorAll('.service-btn');
let cartTable = document.querySelector('.box-cart table');
let totalAmountEl = document.querySelector('.total strong');
let confirmMsg = document.getElementById('confirm-msg');
let bookBtn = document.querySelector('.btn-book');
let fullNameInput = document.getElementById('fullName');
let emailInput= document.getElementById('email');
let phoneInput = document.getElementById('phone');

let cart = [];
let totalAmount = 0;

//add and remove item
serviceButtons.forEach(function(btn) {
  btn.addEventListener("click", function() {
  let name = btn.dataset.name;
   let price = Number(btn.dataset.price);

   let index = cart.findIndex(function(item) {
    return item.name === name;
   });

if(index === -1) {
  cart.push({name: name, price: price});
  totalAmount = totalAmount + price;
  btn.classList.remove('btn-add');
  btn.classList.add('btn-remove');
  btn.innerHTML = 'Remove item <ion-icon name="remove-circle-outline"></ion-icon>';
}
else{
  totalAmount = totalAmount - cart[index].price;
  cart.splice(index, 1);
  btn.classList.remove('btn-remove');
  btn.classList.add('btn-add');
  btn.innerHTML = 'Add item <ion-icon name="add-circle-outline"></ion-icon>';
}

renderCart();
  });
});

//render cart for table updation . 

function renderCart() {
  let oldRows = document.querySelectorAll('.cart-item, .empty-cart');
  oldRows.forEach(function(row) {
    row.remove();
  });

if(cart.length === 0) {
  let emptyRow = document.createElement('tr');
  emptyRow.className = 'empty-cart';
  emptyRow.innerHTML = '<td colspan="3" style="text-align:center; padding:15px; color:#888;">No items added</td>';
  cartTable.appendChild(emptyRow);
}

cart.forEach(function(item, i) {
  let row = document.createElement('tr');
  row.className = 'cart-item';
  row.innerHTML = "<td>" + (i + 1) + "</td>" +
  "<td>" + item.name + "</td>" +"<td>₹" + item.price.toFixed(2) + "</td>";
  cartTable.appendChild(row);
});

totalAmountEl.innerText = "₹" + totalAmount.toFixed(2);
} 

//book now section
bookBtn.addEventListener('click', function() {
let fullName = fullNameInput.value.trim();
let email = emailInput.value.trim();
let phone = phoneInput.value.trim();

if(cart.length === 0) {
 confirmMsg.style.color = "red";
 confirmMsg.innerText = "Add the items to the cart to book!";
  return;
}

if(fullName === "" || email === "" || phone === "") {
  confirmMsg.style.color = "red"; 
  confirmMsg.innerText = "Please fill all fields.";
  return;
} 
if(phone.length < 10) {
 confirmMsg.style.color = "red";
 confirmMsg.innerText = "Invalid phone number.";
  return;
}

confirmMsg.style.color = "green";
confirmMsg.innerText = "Email has been sent successfully!";

//send email using emailjs 
emailjs.send("service_abox8t8", "template_uq3ktbm", {
   admin_email: "krishprajapat9977@gmail.com",
   to_name: fullName,
    to_email: email,
   phone: phone,
  services: cart.map(function(item) {
    return item.name;
  }).join(", "),
  total_amount: "₹" + totalAmount.toFixed(2)
}); 
cart = [];
totalAmount = 0;
renderCart();
 fullNameInput.value = "";
 emailInput.value = "";
 phoneInput.value = "";
  serviceButtons.forEach(function(btn) {
  btn.classList.remove('btn-remove');
  btn.classList.add('btn-add');
  btn.innerHTML = 'Add item <ion-icon name="add-circle-outline"></ion-icon>';
});
});

renderCart();
});
