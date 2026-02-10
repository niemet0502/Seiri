# Tracking Module

This module implements a tracking system that allows users to track progress towards financial or other numerical goals.

## Features

- Create, read, update, and delete tracking entries
- Track balance updates with automatic history recording
- View complete history of balance changes
- Soft delete functionality

## Entities

### Tracking
- `id`: Primary key
- `title`: Required - The name/title of what you're tracking
- `description`: Optional - Additional details
- `dueDate`: Optional - Target completion date
- `target`: Required - The goal amount
- `balance`: Current amount (default: 0)
- `createdAt`: Auto-generated creation timestamp
- `isDeleted`: Soft delete flag
- Relations:
  - `user`: Many-to-one relationship with User
  - `history`: One-to-many relationship with TrackingHistory

### TrackingHistory
- `id`: Primary key
- `amount`: The amount added to balance
- `date`: Auto-generated timestamp
- Relations:
  - `tracking`: Many-to-one relationship with Tracking

## API Endpoints

All endpoints require authentication via the AuthMiddleware.

### Create Tracking
**POST** `/tracking`

Request body:
```json
{
  "title": "Save for vacation",
  "description": "Saving money for summer vacation",
  "dueDate": "2026-12-31",
  "target": 5000,
  "balance": 1000
}
```

### Get All Trackings
**GET** `/tracking`

Returns all trackings for the authenticated user.

### Get Single Tracking
**GET** `/tracking/:id`

Returns a specific tracking with its history.

### Get Tracking History
**GET** `/tracking/:id/history`

Returns the complete history of balance updates for a tracking.

### Update Tracking
**PATCH** `/tracking/:id`

Request body (all fields optional):
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "dueDate": "2027-01-01",
  "target": 6000
}
```

### Update Balance
**PATCH** `/tracking/:id/balance`

This endpoint automatically creates a history entry when updating the balance.

Request body:
```json
{
  "amount": 500
}
```

The amount will be added to the current balance, and a history record will be created.

### Delete Tracking
**DELETE** `/tracking/:id`

Soft deletes a tracking (sets `isDeleted` to true).

## Usage Example

1. Create a tracking goal:
```bash
POST /tracking
{
  "title": "Emergency Fund",
  "target": 10000,
  "balance": 0
}
```

2. Add money to the balance:
```bash
PATCH /tracking/1/balance
{
  "amount": 500
}
```

3. View the history:
```bash
GET /tracking/1/history
```

This will show all balance updates with timestamps.
