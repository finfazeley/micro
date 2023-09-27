# Database Schema

## Users Table

This table contains information about the users of the system.

| Field     | Type         | Description                  |
|-----------|--------------|------------------------------|
| user_id   | String       | (Primary Key) Unique identifier for the user, can be an email. |
| username  | String       | Username of the user.         |
| password  | String       | Password of the user.         |
| email     | String       | Email address of the user.   |

### Relationships

- One-to-Many with the Cars table through user_id.


## Cars Table

This table contains information about the cars associated with the users.

| Field       | Type          | Description                   |
|-------------|---------------|-------------------------------|
| car_id      | String        | (Primary Key) Unique identifier for the car.|
| user_id     | String        | (Foreign Key) Identifier for the associated user. Links to Users table. |
| make        | String        | Make of the car.              |
| model       | String        | Model of the car.             |
| year        | Integer       | Manufacturing year of the car.|
| mileage     | Integer       | Mileage of the car.           |
| description | Text          | Description of the car.       |
| price       | Decimal       | Price of the car.             |

### Relationships

- Many-to-One with the Users table through user_id.
