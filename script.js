// script.js
// script.js

document.querySelectorAll('.pricing-card').forEach(card => {
    const priceElement = card.querySelector('.price');
    const price = parseFloat(priceElement.dataset.price);

    // Function to update pricing display based on currency and units
    function updatePricingDisplay(currency, units) {
        const adjustedPrice = adjustPrice(price, units);
        const convertedPrice = convertCurrency(adjustedPrice, currency);
        const convertedUnits = convertUnits(units);
        priceElement.textContent = `${convertedPrice} ${currency}/${convertedUnits}`;
    }

    // Conversion functions
    function adjustPrice(price, units) {
        if (units === 'lbs') {
            return price * 2.20; // Convert price to pounds if weight is in kilograms
        }
        return price;
    }

    function convertCurrency(price, currency) {
        if (currency === 'USD') {
            return price.toFixed(2);
        } else if (currency === 'INR') {
            return (price * 74.81).toFixed(2);
        } else if (currency === 'GBP') {
            return (price * 0.73).toFixed(2);
        }
    }

    function convertUnits(units) {
        return units === 'kg' ? 'kg' : 'lbs';
    }

    // Event listeners for dropdown changes
    document.getElementById('currency').addEventListener('change', function() {
        updatePricingDisplay(this.value, document.getElementById('units').value);
    });

    document.getElementById('units').addEventListener('change', function() {
        updatePricingDisplay(document.getElementById('currency').value, this.value);
    });

    // Initial pricing display update
    updatePricingDisplay(document.getElementById('currency').value, document.getElementById('units').value);
});
// script.js
document.addEventListener("DOMContentLoaded", function () {
    // Hide CSS spinner
    document.querySelector(".spinner-css").style.display = "none";
    // Hide Spin.js spinner
    document.getElementById("spinner-spinjs").style.display = "none";
    // Show content
    document.getElementById("content").style.display = "block";
});

// Initialize Spin.js spinner
var spinner = new Spinner().spin();
document.getElementById("spinner-spinjs").appendChild(spinner.el);
