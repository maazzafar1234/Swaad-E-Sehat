# Dynamic Payment Options Feature

## Overview

This feature allows administrators to dynamically enable or disable payment methods (Cash on Delivery and Online Payment) without code changes. Settings are stored in the database and take effect immediately.

## Architecture

### Database Layer

**Table:** `settings`
- `id` - Primary key
- `setting_key` - Unique key for the setting (VARCHAR)
- `setting_value` - Value stored as string (VARCHAR)
- `description` - Human-readable description (TEXT)
- `created_at` - Timestamp of creation
- `updated_at` - Timestamp of last update

**Default Settings:**
```sql
cod_enabled = 'false'
online_payment_enabled = 'true'
```

### Backend Layer

#### Routes

**Public Endpoint:**
- `GET /payment/api/payment-settings`
  - Returns current payment method availability
  - Rate limited: 100 requests per 15 minutes per IP
  - No authentication required

**Admin Endpoint:**
- `POST /payment/api/admin/payment-settings`
  - Updates payment method settings
  - Requires admin authentication
  - Rate limited: 20 requests per 15 minutes per IP
  - Validates that at least one payment method is enabled

#### Order Creation Validation

The `CreateOrder.js` controller now includes:
1. Database lookup of current payment settings
2. Validation that the requested payment method is enabled
3. Rejection of invalid payment method requests with 400 error

#### Security Features

1. **Rate Limiting:** All payment-related endpoints are rate-limited
2. **Authentication:** Admin endpoints require valid admin session
3. **Validation:** Both frontend and backend validate settings
4. **Transaction Safety:** All database operations use transactions

### Frontend Layer

#### Checkout Page (`CheckoutPage.jsx`)

**New Features:**
- Fetches payment settings on component mount
- Displays loading state while fetching settings
- Shows disabled payment options with:
  - Greyed out appearance
  - Red ❌ icon
  - "Not Available" message
  - Disabled radio button

**State Management:**
```javascript
const [paymentSettings, setPaymentSettings] = useState({
  cod_enabled: false,
  online_payment_enabled: true
});
```

**Auto-selection:**
- If only one payment method is enabled, it's automatically selected
- If both are enabled, defaults to online payment

#### Admin Settings Page (`AdminSettingPage.jsx`)

**New Section:** "Payment Methods"

**Features:**
- Toggle switches for COD and Online Payment
- Real-time validation (at least one must be enabled)
- Loading state indicator
- Success/error toast notifications
- Save button with loading state

## User Experience

### For Customers

When a payment method is **disabled**:
- ✅ Option is visible but clearly marked as unavailable
- ✅ Red ❌ icon indicates it's disabled
- ✅ Text changes to "Not Available"
- ✅ Cannot select or click the option
- ✅ Clear visual distinction from enabled options

When a payment method is **enabled**:
- ✅ Option appears normal with appropriate icon
- ✅ Can be selected with radio button
- ✅ Shows descriptive text
- ✅ Processes normally when selected

### For Administrators

**Enabling/Disabling Payment Methods:**
1. Navigate to Admin Dashboard → Settings
2. Scroll to "Payment Methods" section
3. Toggle desired payment methods
4. Click "Save Payment Settings"
5. Changes take effect immediately site-wide

**Validation:**
- Cannot disable both payment methods
- Warning message if attempting to disable all methods
- Settings persist in database

## API Documentation

### GET /payment/api/payment-settings

**Description:** Fetch current payment method settings

**Authentication:** None required (public endpoint)

**Rate Limit:** 100 requests per 15 minutes

**Response:**
```json
{
  "success": true,
  "data": {
    "cod_enabled": false,
    "online_payment_enabled": true
  }
}
```

### POST /payment/api/admin/payment-settings

**Description:** Update payment method settings

**Authentication:** Admin session required

**Rate Limit:** 20 requests per 15 minutes

**Request Body:**
```json
{
  "cod_enabled": true,
  "online_payment_enabled": true
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Payment settings updated successfully",
  "data": {
    "cod_enabled": true,
    "online_payment_enabled": true
  }
}
```

**Error Response (validation failed):**
```json
{
  "success": false,
  "message": "At least one payment method must be enabled"
}
```

## Migration Instructions

### Step 1: Run Database Migration

```bash
mysql -u username -p database_name < Backend/migrations/create_settings_table.sql
```

Or execute manually:
```sql
CREATE TABLE IF NOT EXISTS settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO settings (setting_key, setting_value, description) 
VALUES 
    ('cod_enabled', 'false', 'Enable or disable Cash on Delivery payment option'),
    ('online_payment_enabled', 'true', 'Enable or disable Online Payment option')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);
```

### Step 2: Deploy Backend Changes

Deploy the updated backend code including:
- `Backend/Controller/PaymentSettings.js`
- `Backend/Controller/CreateOrder.js` (updated with validation)
- `Backend/Server.js` (updated with new route)

### Step 3: Deploy Frontend Changes

Deploy the updated frontend build including:
- `src/pages/CheckoutPage.jsx`
- `src/pages/admin/AdminSettingPage.jsx`

### Step 4: Verify Deployment

1. Check that settings table exists in database
2. Verify default values are present
3. Test fetching settings: `GET /payment/api/payment-settings`
4. Test admin settings page functionality

## Troubleshooting

### Issue: Settings not loading on checkout page

**Solution:**
- Check browser console for errors
- Verify API endpoint is accessible
- Check CORS settings if frontend/backend on different domains

### Issue: Cannot save payment settings

**Solution:**
- Verify admin authentication is valid
- Check that at least one payment method is enabled
- Review server logs for database errors
- Verify rate limit hasn't been exceeded

### Issue: COD option shows as enabled but won't process order

**Solution:**
- Check database settings table for correct value
- Clear browser cache
- Verify backend validation is checking settings correctly

## Future Enhancements

Potential improvements for this feature:

1. **Additional Payment Methods:** Extend to support more payment gateways
2. **Scheduled Availability:** Enable/disable methods on a schedule
3. **Regional Availability:** Different payment methods for different regions
4. **Payment Method Limits:** Set minimum/maximum order amounts per method
5. **Analytics Dashboard:** Track payment method usage statistics

## Support

For issues or questions:
1. Check the TESTING.md file for comprehensive test cases
2. Review server logs for error details
3. Verify database migration was successful
4. Check CodeQL security scan results
