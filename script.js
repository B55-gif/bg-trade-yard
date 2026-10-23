const products = [
  {id:"amazon",name:"Amazon",category:"Shopping",filter:"shopping",value:"$100",price:"Quote on request",label:"POPULAR",logo:"amazon",mark:"amazon",colors:["#f3a847","#d88122"],description:"A sample shopping gift card listing. Brand and regional restrictions must be verified before any trade."},
  {id:"apple",name:"Apple",category:"Shopping",filter:"shopping",value:"$50",price:"Quote on request",label:"FEATURED",logo:"Apple",mark:"Apple",colors:["#5f6875","#313844"],description:"A sample Apple gift card listing. Eligibility and region can affect acceptance."},
  {id:"steam",name:"Steam",category:"Gaming",filter:"gaming",value:"$100",price:"Quote on request",label:"GAMING",logo:"STEAM",mark:"Steam",colors:["#315477","#172b40"],description:"A sample gaming gift card listing. Confirm currency, region, and balance before any transaction."},
  {id:"playstation",name:"PlayStation",category:"Gaming",filter:"gaming",value:"$50",price:"Quote on request",label:"GAMING",logo:"PS",mark:"PlayStation",colors:["#315bd4","#16378f"],description:"A sample PlayStation gift card listing. Regional restrictions may apply."},
  {id:"googleplay",name:"Google Play",category:"Entertainment",filter:"entertainment",value:"$25",price:"Quote on request",label:"DIGITAL",logo:"Google Play",mark:"Google Play",colors:["#4d9b73","#277052"],description:"A sample Google Play gift card listing. Check the issuing region and current terms."},
  {id:"xbox",name:"Xbox",category:"Gaming",filter:"gaming",value:"$50",price:"Quote on request",label:"GAMING",logo:"XBOX",mark:"Xbox",colors:["#48a56a","#1b6b43"],description:"A sample Xbox gift card listing. Confirm product type and regional eligibility."},
  {id:"spotify",name:"Spotify",category:"Entertainment",filter:"entertainment",value:"$30",price:"Quote on request",label:"DIGITAL",logo:"Spotify",mark:"Spotify",colors:["#4dbb8b","#147c56"],description:"A sample entertainment gift card listing. Availability can vary by country."},
  {id:"nike",name:"Nike",category:"Shopping",filter:"shopping",value:"$75",price:"Quote on request",label:"SHOPPING",logo:"NIKE",mark:"Nike",colors:["#6d7077","#30343a"],description:"A sample retail gift card listing. Check the card's eligible region and terms."}
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const dialog = document.getElementById("productDialog");
const dialogContent = document.getElementById("dialogContent");
let activeFilter = "all";

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  })[char]);
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = products.filter(product => {
    const matchesFilter = activeFilter === "all" || product.filter === activeFilter;
    const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });
  productGrid.innerHTML = visible.map(product => `
    <article class="product-card">
      <div class="product-visual" style="background:linear-gradient(135deg,${product.colors[0]},${product.colors[1]})">
        <span class="product-label">${escapeHTML(product.label)}</span>
        <span class="product-logo">${escapeHTML(product.logo)}</span>
      </div>
      <div class="product-body">
        <span class="product-category">${escapeHTML(product.category)}</span>
        <h3 class="product-name">${escapeHTML(product.name)}</h3>
        <div class="product-meta"><span>Example value</span><strong class="product-price">${escapeHTML(product.value)}</strong></div>
        <button class="product-action" type="button" data-product="${escapeHTML(product.id)}">View details →</button>
      </div>
    </article>`).join("");
  emptyState.classList.toggle("hidden", visible.length !== 0);
}

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach(item => item.classList.toggle("active", item === button));
    renderProducts();
  });
});
searchInput.addEventListener("input", renderProducts);

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-product]");
  if (!button) return;
  const product = products.find(item => item.id === button.dataset.product);
  if (!product) return;
  dialogContent.innerHTML = `
    <p class="eyebrow">${escapeHTML(product.category)} • SAMPLE LISTING</p>
    <h2 class="dialog-brand">${escapeHTML(product.name)} Gift Card</h2>
    <p>${escapeHTML(product.description)}</p>
    <p><strong>Illustrative face value:</strong> ${escapeHTML(product.value)}</p>
    <p class="dialog-note">Pricing is not live. This prototype has no inventory, payment processing, or verified sellers.</p>
    <div class="dialog-warning">Never send a gift card claim code, PIN, password, or banking credentials in a public inquiry.</div>
    <a class="button button-gold dialog-cta" href="#trade-form" id="dialogTradeLink">Make an inquiry →</a>`;
  if (typeof dialog.showModal === "function") dialog.showModal();
  const link = document.getElementById("dialogTradeLink");
  link?.addEventListener("click", () => {
    const brand = document.getElementById("brandSelect");
    const option = [...brand.options].find(item => item.text.toLowerCase() === product.name.toLowerCase());
    brand.value = option ? option.value : "Other";
    dialog.close();
  });
});
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

const amountInput = document.getElementById("cardAmount");
const rateRange = document.getElementById("rateRange");
const rateLabel = document.getElementById("rateLabel");
const estimatedValue = document.getElementById("estimatedValue");
function updateEstimate() {
  const amount = Math.min(10000, Math.max(0, Number(amountInput.value) || 0));
  const rate = Number(rateRange.value);
  rateLabel.textContent = `${rate}%`;
  estimatedValue.textContent = new Intl.NumberFormat("en-US", {style:"currency", currency:"USD"}).format(amount * rate / 100);
}
amountInput.addEventListener("input", updateEstimate);
rateRange.addEventListener("input", updateEstimate);

document.getElementById("tradeForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const safe = key => escapeHTML(data.get(key) || "");
  const message = document.getElementById("formMessage");
  message.innerHTML = `<strong>Demo inquiry reviewed — nothing was sent.</strong><br>
    Type: ${safe("tradeType") === "sell" ? "Sell a gift card" : "Buy a gift card"}<br>
    Brand: ${safe("brand")}<br>
    Face value: ${safe("faceValue")} ${safe("currency")}<br>
    Name: ${safe("contactName")}<br>
    Email: ${safe("contactEmail")}<br><br>
    This information stays in this page session and has not been sent to BG TRADE YARD. To receive real inquiries, a secure backend or trusted form service must be connected before launch.`;
  message.classList.remove("hidden");
  message.scrollIntoView({behavior:"smooth", block:"nearest"});
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
updateEstimate();
