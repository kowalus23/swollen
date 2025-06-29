# Order System Documentation

## Overview

The order system allows customers to place orders for products through the website. When an order is submitted, it:

1. Validates the order data
2. Saves the order to Supabase database
3. Sends a notification email to the admin
4. Sends a confirmation email to the customer

## Components

### Frontend (`src/components/ProductCard/ProductCard.tsx`)

- **Product Selection**: Users can select a product and size
- **Address Form**: Collects delivery information (email, phone, address)
- **Order Submission**: Makes POST request to `/api/order`
- **Loading States**: Shows loading spinner during submission
- **Success/Error Messages**: Displays appropriate feedback to user

### Backend (`src/app/api/order/route.js`)

- **Validation**: Validates all required fields and email format
- **Database Insertion**: Saves order to `product_orders` table
- **Email Notifications**: Sends emails via Brevo API
- **Error Handling**: Returns appropriate error messages

### Email System (`src/app/api/send-email/route.js`)

- **Brevo Integration**: Uses Brevo API for sending emails
- **HTML Templates**: Beautiful email templates for notifications
- **Error Handling**: Graceful handling of email sending failures

## Database Schema

The `product_orders` table should have the following structure:

```sql
CREATE TABLE product_orders (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(150) NOT NULL,
  product_size VARCHAR(10) NOT NULL,
  address_city VARCHAR(100) NOT NULL,
  address_postal_code VARCHAR(10) NOT NULL,
  address_street VARCHAR(200) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_name, product_size, contact_email)
);
```

## Environment Variables Required

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Configuration (Brevo)
NEXT_PUBLIC_BREVO_API_KEY=your_brevo_api_key
NEXT_PUBLIC_MAIL_FROM_EMAIL=your_from_email@example.com
NEXT_PUBLIC_MAIL_FROM_NAME=KVX
```

## API Endpoints

### POST `/api/order`

**Request Body:**

```json
{
	"productName": "Product Name",
	"productSize": "M",
	"addressCity": "Warsaw",
	"addressPostalCode": "00-000",
	"addressStreet": "Street Name 1",
	"contactEmail": "customer@example.com",
	"contactPhone": "+48123456789"
}
```

**Success Response (201):**

```json
{
	"order": {
		"id": 1,
		"product_name": "Product Name",
		"product_size": "M"
		// ... other fields
	}
}
```

**Error Responses:**

- `400`: Validation errors (missing fields, invalid email)
- `409`: Duplicate order (same product, size, and email)
- `500`: Server errors

## Email Templates

### Admin Notification Email

- **Subject**: "Zamówienie na produkt"
- **Recipient**: Admin email (from environment variables)
- **Content**: Order details with customer information

### Customer Confirmation Email

- **Subject**: "Potwierdzenie zamówienia - KVX"
- **Recipient**: Customer email
- **Content**: Order confirmation with next steps

## Features

### ✅ Implemented

- [x] Product selection with size options
- [x] Address form validation
- [x] Database storage in Supabase
- [x] Email notifications (admin + customer)
- [x] Loading states and error handling
- [x] Duplicate order prevention
- [x] Beautiful email templates
- [x] Form validation and error messages

### 🔄 Order Flow

1. User selects product and size
2. User fills in delivery information
3. User clicks "ZAMÓW" button
4. Frontend validates form data
5. Frontend sends POST request to `/api/order`
6. Backend validates data
7. Backend saves order to database
8. Backend sends notification email to admin
9. Backend sends confirmation email to customer
10. Frontend shows success message
11. Modal closes automatically after 2 seconds

## Testing

To test the order system:

1. Ensure all environment variables are set
2. Start the development server: `npm run dev`
3. Navigate to the shop page
4. Select a product and size
5. Fill in the delivery form
6. Submit the order
7. Check that:
   - Success message appears
   - Order is saved in Supabase
   - Admin receives notification email
   - Customer receives confirmation email

## Troubleshooting

### Common Issues

1. **"All fields are required"**: Make sure all form fields are filled
2. **"Invalid email format"**: Check email format (must include @ and domain)
3. **"You have already ordered that product"**: Duplicate order prevention working
4. **Email sending fails**: Check Brevo API key and email configuration
5. **Database errors**: Verify Supabase connection and table schema

### Debug Steps

1. Check browser console for frontend errors
2. Check server logs for backend errors
3. Verify environment variables are set correctly
4. Test Supabase connection
5. Test Brevo API key
6. Check email templates and recipients
