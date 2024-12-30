# Node and React Project

## Installation
To run the site, navigate to the `...\front_end>` directory and execute the command:

```bash
ng serve
```
On IntelliJ, we have normally set up a shortcut to launch the backend.

## Description

**E-commerce** is a web application developed in Angular to visualize and manage sales for an online store.
The project includes a rich user interface leveraging modern libraries like Highcharts for dynamic charts and AG Grid for interactive tables.
The backend is powered by Node.js to manage REST APIs providing the necessary data for the application.


---

## Features

### Frontend
- **Dynamic Charts:** : Visualize sales by product, date, or other criteria.
- **Interactive Tables:** : AG Grid enables dynamic data manipulation with features like CSV export.
- **Responsive Interface:** : Adapted for desktops, tablets, and mobile devices.

- ### Backend
- **REST API**: Endpoint management to retrieve, add, modify and delete sales data.
- **MongoDB Database**: Structured storage of sales and product information.
- The database contains 2 tables:
   **users**:
  ![image](https://github.com/user-attachments/assets/a5f136d6-6edf-470c-b587-7b12ee957663)

  **sales**:
  ![image](https://github.com/user-attachments/assets/c726ffe0-b42d-4dc8-bb4b-a7dc18a5de64)

- **Local Database**: Structured storage of the cart in the browser to keep your cart even after closing the web page.

### API Example
- `POST /api/register`: Create a new user.
- `GET /api/sales`: Retrieves the list of sales.
- `POST /api/sales`: Adds a new sale.
- `PUT /api/sales/:id`: Modifies an existing sale.
- `DELETE /api/sales/:id`: Deletes a sale.
  
### Screenshot

Connection page, we have the choice between login and register:
You can register, which will create a new user in the database, or directly log in with an existing user using the following credentials
Email:pierre/Password:pierre

![image](https://github.com/user-attachments/assets/40b3360f-1063-461d-9150-f0cc3aafb7aa)




Once logged in, you are redirected to this page, where you can directly click on "Add to Cart" to add the pair of shoes you want to your cart.
![image](https://github.com/user-attachments/assets/7c16be40-626d-4560-abfa-0b9f5b8e129e)





![image](https://github.com/user-attachments/assets/6132c42b-32bf-40ab-a19a-31d955bd13f9)





After clicking the button, you are redirected to this page, where you can select the desired size.





![image](https://github.com/user-attachments/assets/2fdc2420-d136-4366-a6e0-f584cc3e5999)






After selecting the size, you are redirected to your cart, where you have the option to empty the cart, add another pair of shoes by returning to the shop page, or proceed to payment.

Here is the payment page:

![image](https://github.com/user-attachments/assets/34f9e610-96ae-4716-a1ad-0ff252b75edb)





Once the order is paid, it is immediately added to the sales table in the database, and the "Total Sales by Date" chart is automatically updated.

![image](https://github.com/user-attachments/assets/0372b1be-ccfd-4cd2-bf90-0e5d3758161d)





Here is the productgrid page where you can export to csv: 

![image](https://github.com/user-attachments/assets/9a50dfd5-9088-4854-9e87-2bc4a68cdbf9)





