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

Connection page, we have the choice between login and register:
![image](https://github.com/user-attachments/assets/40b3360f-1063-461d-9150-f0cc3aafb7aa)



