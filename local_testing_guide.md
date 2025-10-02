# How to Run the Website Locally

1.  **Navigate to the project directory:**
    ```sh
    cd "C:\Users\Mitsu\Desktop\odltree frontend mockup\oldtree-inventory"
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Run the development server:**
    ```sh
    npm run dev
    ```
4.  **Open the website in your browser at the address provided (usually `http://localhost:5173/`).**

# Manual Tests

Here are a few manual tests you can perform to check the core functionalities of the application:

1.  **Test Stock Adjustment:**
    *   Go to the **Inventory** page.
    *   Click the **Adjust Stock** button on any product row.
    *   In the modal, select **Sale** as the operation type and enter a negative number (e.g., -2).
    *   Click **Submit**.
    *   Verify that the stock quantity for that product has been updated in the table.
    *   Go to the **Reports** page and check if a new movement log has been created for the sale.

2.  **Test Search and Filter:**
    *   Go to the **Inventory** page.
    *   In the search bar, type the name of a product (e.g., "T-Shirt").
    *   Verify that the table updates to show only the products that match the search term.
    *   Select a channel from the filter dropdown (e.g., "Website").
    *   Verify that the table updates to show only the products in that channel.

3.  **Test Low Stock Alerts:**
    *   Go to the **Dashboard** page.
    *   Check the **Low Stock Alerts** card to see the number of items with low stock.
    *   Verify that the **Low Stock Alerts** table shows the correct products.
    *   Go to the **Inventory** page and adjust the stock of a product to be below the low stock threshold (default is 5).
    *   Go back to the **Dashboard** and verify that the **Low Stock Alerts** have been updated.
