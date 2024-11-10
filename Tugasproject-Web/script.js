// Detail Product
var detailProduct = document.getElementById("detailProduct");
var SmallImg = document.getElementsByClassName("small-img");

    for (var i = 0; i < SmallImg.length; i++) {
        SmallImg[i].onclick = function() {
            detailProduct.src = this.getElementsByTagName("img")[0].src;
        }
    }

// Cart Page
    function updateCartTotals() {
        const cartRows = document.querySelectorAll("tr");
        let subtotal = 0;

        cartRows.forEach(row => {
            const priceElement = row.querySelector("small");
            const quantityInput = row.querySelector("input[type='number']");

            if (priceElement && quantityInput) {
                const price = parseFloat(priceElement.innerText.replace("Price: Rp.", "").replace(/\./g, ""));
                const quantity = parseInt(quantityInput.value);

                subtotal += price * quantity;
            }
        });

        document.getElementById("subtotal").innerText = `Rp.${subtotal.toLocaleString("id-ID")}`;

        const tax = Math.round(subtotal * 0.025);
        document.getElementById("tax").innerText = `Rp.${tax.toLocaleString("id-ID")}`;

        const total = subtotal + tax;
        document.querySelector(".total-price table tr:last-child td:last-child").innerText = `Rp.${total.toLocaleString("id-ID")}`;
    }

    function removeItem(event) {
        const row = event.target.closest("tr");
        if (row) {
            row.remove();
            updateCartTotals(); 
        }
    }

    document.querySelectorAll("input[type='number']").forEach(input => {
        input.addEventListener("change", updateCartTotals);
    });

    document.querySelectorAll("a[href='']").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); 
            removeItem(event); 
        });
    });

    updateCartTotals();


