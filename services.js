$(document).ready(function () {

  // elements
  const $toggleBtn    = $("#toggleView");
  const $managerView  = $("#managerView");
  const $clientView   = $("#clientView");
  const $form         = $("#servicesForm");
  const $serviceList  = $("#serviceList");
  const $managerList  = $("#managerList");
  const $cartList     = $("#cartList");
  const $checkout     = $("#checkout");
  const $checkoutForm = $("#checkoutForm");

  // data
  let services = JSON.parse(localStorage.getItem("services")) || [];
  let cart     = JSON.parse(localStorage.getItem("cart")) || [];

  renderServices();
  renderCart();

  // toggle views
  $("#toggleView").on("click", function () {
    $managerView.toggleClass("hidden");
    $clientView.toggleClass("hidden");

    const showingClient = !$clientView.hasClass("hidden");
    $toggleBtn.text(showingClient ? "Switch to Manager View" : "Switch to Client View");
  });

  // add service
  $("#servicesForm").on("submit", function (event) {
    event.preventDefault();

    const name = $("#serviceName").val().trim();
    const desc = $("#serviceDescription").val().trim();
    const priceValue = parseFloat($("#servicePrice").val());

    console.log($("#serviceName").val().trim(), $("#serviceDescription").val().trim(), parseFloat($("#servicePrice").val()));

    if (!name || !desc || priceValue <= 0){
      if (!name) $("#serviceName").addClass("is-invalid");
      if (!desc) $("#serviceDescription").addClass("is-invalid");
      if (!priceValue || priceValue <= 0) $("#servicePrice").addClass("is-invalid");
    }

    const newService = {
      id: Date.now(),
      name: name,
      desc: desc,
      price: priceValue.toFixed(2)
    };

    services.push(newService);
    saveServices();
    renderServices();
    this.reset();
  });

  // Local storage validation
  $("#servicesForm").on("submit", function (event) {
  event.preventDefault();

  const name = $("#serviceName").val().trim();
  const desc = $("#serviceDescription").val().trim();
  const priceRaw = $("#servicePrice").val().trim();
  const priceValue = Number(priceRaw);

  // reset invalid states
  $("#serviceName, #serviceDescription, #servicePrice").removeClass("is-invalid");

  // validate
  if (!name) $("#serviceName").addClass("is-invalid");
  if (!desc) $("#serviceDescription").addClass("is-invalid");
  if (!Number.isFinite(priceValue) || priceValue <= 0) $("#servicePrice").addClass("is-invalid");

  if (!name || !desc || !Number.isFinite(priceValue) || priceValue <= 0) {
    return; // ⟵ stop here; do not save
  }

  const newService = {
    id: Date.now(),
    name,
    desc,
    price: priceValue.toFixed(2)
  };

  services.push(newService);
  saveServices();   // writes only to "services"
  renderServices();
  this.reset();
});



  // show services
  function renderServices() {
    $managerList.empty();
    $.each(services, function (index, service) {
      const $li = $(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span><strong>${service.name}</strong> - $${service.price}</span>
          <button class="btn btn-sm btn-danger" data-id="${service.id}">Delete</button>
        </li>
      `);
      $managerList.append($li);
    });

    $serviceList.empty();
    $.each(services, function (index, service) {
      const $card = $(`
        <article class="service-item">
          <div class="service-head">
            <h5>${service.name}</h5>
            <span>$${service.price}</span>
          </div>
          <p>${service.desc}</p>
          <button class="btn btn-sm btn-submit mt-2" data-id="${service.id}">Add to Cart</button>
        </article>
      `);
      $serviceList.append($card);
    });
  }

  // delete service
  $("#managerList").on("click", "button[data-id]", function (event) {
    const id = parseInt($(this).data("id"));
    services = $.grep(services, function (service) {
      return service.id !== id;
    });
    saveServices();
    renderServices();
  });

  // add to cart
  $("#serviceList").on("click", "button[data-id]", function (event) {
    const id = parseInt($(this).data("id"));
    const selectedService = services.find(function (service) {
      return service.id === id;
    });
    if (!selectedService) return;

    cart.push(selectedService);
    saveCart();
    renderCart();
  });

  // show cart
  function renderCart() {
    $cartList.empty();
    $.each(cart, function (index, item) {
      const $li = $(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${item.name} - $${item.price}
          <button class="btn btn-sm btn-outline-danger" data-index="${index}">X</button>
        </li>
      `);
      $cartList.append($li);
    });
    $checkout.toggleClass("hidden", cart.length === 0);
  }

  // remove from cart
  $("#cartList").on("click", "button[data-index]", function (event) {
    const index = parseInt($(this).data("index"));
    cart.splice(index, 1);
    saveCart();
    renderCart();
  });

  // checkout
  $("#checkoutForm").on("submit", function (event) {
    event.preventDefault();
    alert("Thank you for your booking!");
    cart = [];
    saveCart();
    renderCart();
    this.reset();
  });

  // save data
  function saveServices() {
    localStorage.setItem("services", JSON.stringify(services));
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});

//change mode

$("#changeModeBtn").click(function(){
    $("body").toggleClass("dark-mode");

    const isDark = $("body").hasClass("dark-mode");
    
    if (isDark) {
        $("h1").text("Dark Mode");
    } else{
        $("h1").text("Light Mode");
    }
});


