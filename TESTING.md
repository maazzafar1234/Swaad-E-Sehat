# Testing Guide for Dynamic Payment Options Feature

This document provides instructions for testing the new dynamic payment options feature.

## Prerequisites

1. Run the database migration:
   ```bash
   mysql -u your_username -p your_database < Backend/migrations/create_settings_table.sql
   ```

2. Start the backend server:
   ```bash
   cd Backend
   npm start
   ```

3. Start the frontend:
   ```bash
   npm start
   ```

## Test Cases

### 1. Admin Settings Page - Payment Method Toggles

**Location:** Admin Dashboard → Settings

**Test Steps:**
1. Log in as an admin user
2. Navigate to Settings page
3. Scroll to "Payment Methods" section
4. Observe the two checkboxes:
   - Enable Online Payment (should be checked by default)
   - Enable Cash on Delivery (COD) (should be unchecked by default)

**Expected Results:**
- ✅ Payment Methods section is visible
- ✅ Both toggle switches are functional
- ✅ Current settings match the database defaults

### 2. Enable/Disable COD

**Test Steps:**
1. In Admin Settings, enable COD checkbox
2. Click "Save Payment Settings"
3. Navigate to the checkout page as a customer
4. Check payment options

**Expected Results:**
- ✅ Success message appears after saving
- ✅ COD option is now selectable on checkout page
- ✅ COD appears without ❌ icon
- ✅ Description shows "Pay with cash when your order arrives."

### 3. Disable COD (Default Behavior)

**Test Steps:**
1. In Admin Settings, disable COD checkbox
2. Click "Save Payment Settings"
3. Navigate to the checkout page as a customer
4. Check payment options

**Expected Results:**
- ✅ COD option is visible but greyed out
- ✅ Red ❌ icon appears next to COD option
- ✅ Description changes to "Not Available"
- ✅ Radio button is disabled (cannot be selected)
- ✅ Only Online Payment is selectable

### 4. Disable Online Payment

**Test Steps:**
1. In Admin Settings, enable COD first
2. Disable Online Payment checkbox
3. Click "Save Payment Settings"
4. Navigate to checkout page

**Expected Results:**
- ✅ Online Payment option is greyed out with ❌
- ✅ Description shows "Not Available"
- ✅ COD is the only selectable option
- ✅ Order can be placed with COD

### 5. Try to Disable Both Payment Methods (Validation Test)

**Test Steps:**
1. In Admin Settings, try to uncheck both payment methods
2. Click "Save Payment Settings"

**Expected Results:**
- ✅ Error toast appears: "At least one payment method must be enabled!"
- ✅ Settings are NOT saved
- ✅ Frontend prevents the invalid state

### 6. Backend Validation - Malicious COD Request

**Test Steps:**
1. Disable COD from Admin Settings
2. Using browser dev tools or API client, intercept checkout request
3. Manually change `paymentMethod` to "COD"
4. Submit the modified request

**Expected Results:**
- ✅ Server returns 400 Bad Request
- ✅ Error message: "Cash on Delivery is currently not available"
- ✅ Order is NOT created
- ✅ Database remains unchanged

### 7. Backend Validation - Malicious Online Payment Request

**Test Steps:**
1. Disable Online Payment from Admin Settings (with COD enabled)
2. Using browser dev tools, change `paymentMethod` to "online"
3. Submit the modified request

**Expected Results:**
- ✅ Server returns 400 Bad Request
- ✅ Error message: "Online Payment is currently not available"
- ✅ Order is NOT created

### 8. Rate Limiting Test

**Test Steps:**
1. Make 11+ order creation requests within 15 minutes from the same IP
2. Observe the response

**Expected Results:**
- ✅ First 10 requests succeed
- ✅ 11th request returns 429 Too Many Requests
- ✅ Error message: "Too many order creation attempts from this IP, please try again later."

### 9. UI Loading States

**Test Steps:**
1. Open checkout page
2. Observe payment options section while settings load

**Expected Results:**
- ✅ Shows "Loading payment options..." spinner initially
- ✅ Payment options appear after settings are loaded
- ✅ No console errors

### 10. End-to-End Order Flow with COD Enabled

**Test Steps:**
1. Enable COD in Admin Settings
2. Add items to cart as a customer
3. Proceed to checkout
4. Select COD payment method
5. Fill in shipping details
6. Place order

**Expected Results:**
- ✅ COD option is selectable
- ✅ Order is created successfully
- ✅ Order status shows "cod_pending"
- ✅ Customer receives confirmation

### 11. End-to-End Order Flow with COD Disabled

**Test Steps:**
1. Disable COD in Admin Settings
2. Add items to cart
3. Proceed to checkout
4. Attempt to select COD (should be disabled)
5. Select Online Payment
6. Complete order

**Expected Results:**
- ✅ COD cannot be selected (greyed out with ❌)
- ✅ Online Payment works normally
- ✅ Order is created with online payment method

## Security Considerations

✅ **Rate Limiting:** All payment endpoints are rate-limited
✅ **Input Validation:** Backend validates payment method against settings
✅ **Authentication:** Order creation requires valid user session
✅ **Database Validation:** Prices and stock are verified against database
✅ **Transaction Safety:** Database transactions ensure data consistency

## Notes

- The feature uses database-driven settings, so changes take effect immediately
- No code deployment needed to enable/disable payment methods
- At least one payment method must always be enabled (enforced by validation)
- Settings are cached briefly in the frontend for performance
