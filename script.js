/* DARK MODE */
const toggle=document.getElementById("themeToggle");
toggle.onclick=()=>{
  document.body.classList.toggle("dark");
};

/* SCROLL REVEAL */
window.addEventListener("scroll",()=>{
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight-100){
      el.classList.add("active");
    }
  });
});

/* PRODUCTS */
const products=[
  {name:"UI Kit",category:"design",price:49},
  {name:"JavaScript Course",category:"tech",price:99},
  {name:"React Template",category:"tech",price:79},
  {name:"Logo Pack",category:"design",price:29}
];

const grid=document.getElementById("productGrid");
const search=document.getElementById("search");
const filter=document.getElementById("filter");
const sort=document.getElementById("sort");

let cart=[];

function renderProducts(list){
  grid.innerHTML="";
  list.forEach((p,i)=>{
    grid.innerHTML+=`
      <div class="card">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
      </div>`;
  });
}

function updateProducts(){
  let filtered=[...products];

  if(filter.value!=="all"){
    filtered=filtered.filter(p=>p.category===filter.value);
  }

  if(search.value){
    filtered=filtered.filter(p=>
      p.name.toLowerCase().includes(search.value.toLowerCase()));
  }

  if(sort.value==="low"){
    filtered.sort((a,b)=>a.price-b.price);
  }
  if(sort.value==="high"){
    filtered.sort((a,b)=>b.price-a.price);
  }

  renderProducts(filtered);
}

search.oninput=updateProducts;
filter.onchange=updateProducts;
sort.onchange=updateProducts;

renderProducts(products);

/* CART */
function addToCart(i){
  cart.push(products[i]);
  document.getElementById("cartCount").textContent=cart.length;
  renderCart();
}

function toggleCart(){
  document.getElementById("cartSidebar").classList.toggle("active");
}

function renderCart(){
  const list=document.getElementById("cartItems");
  list.innerHTML="";
  cart.forEach(item=>{
    list.innerHTML+=`<li>${item.name} - $${item.price}</li>`;
  });
}

/* CONTACT */
document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  alert("Message Sent Successfully ✅");
  e.target.reset();
});