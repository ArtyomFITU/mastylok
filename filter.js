function filterProducts(event) {
  event.preventDefault(); // Зупинити відправку форми
  
  var products = document.getElementsByClassName('box_1');
  var selectedFilters = document.querySelectorAll('input[name="filter"]:checked, input[name="viscosity"]:checked, input[name="type"]:checked');
  
  var filters = [];
  
  selectedFilters.forEach(function(checkbox) {
    filters.push(checkbox.value);
  });
  
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var category = product.dataset.category;
    var viscosity = product.dataset.viscosity;
    var type = product.dataset.type;
    
    if (
      filters.length === 0 ||
      filters.includes(category) ||
      filters.includes(viscosity) ||
      filters.includes(type)
    ) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  }
}

var filterForm = document.querySelector('.filter form');
var filterButton = document.getElementById('filterButton');

filterForm.addEventListener('submit', filterProducts);
