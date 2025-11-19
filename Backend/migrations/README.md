# Payment Settings Migration

This migration adds dynamic payment method configuration to the application.

## What it does

- Creates a `settings` table to store application configuration
- Adds two initial settings:
  - `cod_enabled` (default: false) - Controls Cash on Delivery availability
  - `online_payment_enabled` (default: true) - Controls Online Payment availability

## How to apply

Run the SQL migration file against your database:

```bash
mysql -u your_username -p your_database < Backend/migrations/create_settings_table.sql
```

Or copy the contents and execute in your database client.

## Note

After running this migration, you can control payment methods from the Admin Settings page in the application.
