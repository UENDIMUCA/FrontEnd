$(document).ready(function () {
    // Function to fetch and display orders
    function loadOrders() {
        $.ajax({
            url: '../BackEnd/server.php',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response && response.length > 0) {
                    displayOrders(response);
                } else {
                    // Handle no orders or error case
                    console.log('No orders found.');
                }
            },
            error: function (xhr, status, error) {
                console.error('Error fetching orders:', error);
            }
        });
    }

    // Function to display orders in the table
    function displayOrders(orders) {
        var ordersTableBody = $("#ordersTbl tbody");
        ordersTableBody.empty();

        $.each(orders, function (index, order) {
            const newRowHtml = `<tr>
                <td>${order.fullname}</td>
                <td>${order.email}</td>
                <td>${order.phone}</td>
                <td>${order.book}</td>
                <td onclick="detectTextLanguage('${order.description}')">${order.description}</td>
                <td>
                    <button class="editBtn" data-order-id="${order.id}">Edit</button>
                    <button class="removeBtn" data-order-id="${order.id}">Remove</button>
                </td>
            </tr>`;
            ordersTableBody.append(newRowHtml);
        });
    }

    // Load orders when the page is ready
    loadOrders();

    // Attach click event for "Remove" button
    $("#ordersTbl tbody").on('click', ".removeBtn", function () {
        const orderId = $(this).data('order-id');

        // Show confirmation modal or directly remove the order
        const confirmation = confirm("Are you sure you want to remove this order?");
        if (confirmation) {
            // Call a function to handle order removal
            removeOrder(orderId);
        }
    });

    // Function to remove an order
    function removeOrder(orderId) {
        $.ajax({
            url: `../BackEnd/server.php?id=${orderId}`,
            type: 'DELETE',
            dataType: 'json',
            success: function (response) {
                // If deletion is successful, reload orders
                loadOrders();
                alert('Order removed successfully');
            },
            error: function (xhr, status, error) {
                console.error('Error removing order:', error);
                alert('Error removing order. Please try again.');
            }
        });
    }

    // Function to handle editing an order
    function editOrder(orderId, newData) {
        $.ajax({
            url: `../BackEnd/server.php?id=${orderId}`,
            type: 'PUT',
            data: newData,
            dataType: 'json',
            success: function (response) {
                // If editing is successful, reload orders
                loadOrders();
                alert('Order updated successfully');
            },
            error: function (xhr, status, error) {
                console.error('Error updating order:', error);
                alert('Error updating order. Please try again.');
            }
        });
    }

    // Attach click event for "Edit" button
    $("#ordersTbl tbody").on('click', ".editBtn", function () {
        const orderId = $(this).data('order-id');

        // Get the order details from the table row
        const fullname = $(this).closest('tr').find('td:eq(0)').text();
        const email = $(this).closest('tr').find('td:eq(1)').text();
        const phone = $(this).closest('tr').find('td:eq(2)').text();
        const book = $(this).closest('tr').find('td:eq(3)').text();
        const description = $(this).closest('tr').find('td:eq(4)').text();

        // Prompt user to edit order details
        const newFullname = prompt("Enter new fullname:", fullname);
        const newEmail = prompt("Enter new email:", email);
        const newPhone = prompt("Enter new phone:", phone);
        const newBook = prompt("Enter new book:", book);
        const newDescription = prompt("Enter new description:", description);

        // Construct updated order data
        const newData = {
            fullname: newFullname,
            email: newEmail,
            phone: newPhone,
            book: newBook,
            description: newDescription
        };

        // Call function to edit the order
        editOrder(orderId, newData);
    });
});
