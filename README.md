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
- **Local Database**: Structured storage of the cart in the browser to keep your cart even after closing the web page.

### API Example
- `GET /api/sales`: Retrieves the list of sales.
- `POST /api/sales`: Adds a new sale.
- `PUT /api/sales/:id`: Modifies an existing sale.
- `DELETE /api/sales/:id`: Deletes a sale.
