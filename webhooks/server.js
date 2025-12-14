/**
 * GDPR Compliance Webhooks Server
 *
 * This server handles mandatory Shopify GDPR webhooks:
 * - customers/data_request
 * - customers/redact
 * - shop/redact
 *
 * Deploy this to a serverless platform (Vercel, AWS Lambda, Cloudflare Workers)
 * or a traditional server (Heroku, DigitalOcean, etc.)
 */

const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

/**
 * Verify webhook authenticity
 * Shopify signs all webhooks with HMAC
 */
function verifyWebhook(req) {
  const hmacHeader = req.get('X-Shopify-Hmac-Sha256');
  const body = JSON.stringify(req.body);

  // Get from environment variable (set this in your hosting platform)
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET || 'your_webhook_secret_here';

  const hash = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('base64');

  return hash === hmacHeader;
}

/**
 * Log webhook for debugging
 */
function logWebhook(topic, shopDomain, data) {
  console.log({
    timestamp: new Date().toISOString(),
    topic,
    shop: shopDomain,
    data: JSON.stringify(data, null, 2)
  });
}

/**
 * GDPR: Customer Data Request
 *
 * Triggered when a customer requests their data
 * Since we don't store customer data, we return empty response
 */
app.post('/webhooks/customers/data_request', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }

  const shopDomain = req.get('X-Shopify-Shop-Domain');
  const { customer, orders_requested } = req.body;

  logWebhook('customers/data_request', shopDomain, req.body);

  // Since we don't store any customer data, we have nothing to return
  console.log(`Data request for customer ${customer?.email || customer?.id}`);
  console.log('No customer data stored by Infinite Scroll Pro');

  // Respond with 200 to acknowledge receipt
  res.status(200).json({
    message: 'No customer data stored',
    customer_id: customer?.id,
    data: {}
  });
});

/**
 * GDPR: Customer Data Erasure
 *
 * Triggered when a customer requests data deletion
 * Since we don't store customer data, we just acknowledge
 */
app.post('/webhooks/customers/redact', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }

  const shopDomain = req.get('X-Shopify-Shop-Domain');
  const { customer, orders_to_redact } = req.body;

  logWebhook('customers/redact', shopDomain, req.body);

  // Since we don't store any customer data, nothing to delete
  console.log(`Redaction request for customer ${customer?.email || customer?.id}`);
  console.log('No customer data to redact');

  // Respond with 200 to acknowledge receipt
  res.status(200).json({
    message: 'No customer data to redact',
    customer_id: customer?.id
  });
});

/**
 * GDPR: Shop Data Erasure
 *
 * Triggered 48 hours after merchant uninstalls the app
 * Clean up any shop-specific data here
 */
app.post('/webhooks/shop/redact', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }

  const shopDomain = req.get('X-Shopify-Shop-Domain');
  const { shop_id, shop_domain } = req.body;

  logWebhook('shop/redact', shopDomain, req.body);

  // Clean up any shop data if you store any
  // Since this is a theme extension, typically no shop data is stored
  console.log(`Shop deletion request for ${shop_domain}`);
  console.log('No shop data to redact');

  // Respond with 200 to acknowledge receipt
  res.status(200).json({
    message: 'No shop data to redact',
    shop_id: shop_id
  });
});

/**
 * Optional: App Uninstall Webhook
 *
 * Triggered when merchant uninstalls the app
 * Use this for cleanup or tracking
 */
app.post('/webhooks/app/uninstalled', (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }

  const shopDomain = req.get('X-Shopify-Shop-Domain');

  logWebhook('app/uninstalled', shopDomain, req.body);

  console.log(`App uninstalled from ${shopDomain}`);

  // Optional: Send notification, update metrics, etc.

  res.status(200).json({ message: 'Uninstall acknowledged' });
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'Infinite Scroll Pro Webhooks',
    timestamp: new Date().toISOString()
  });
});

/**
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.status(200).json({
    service: 'Infinite Scroll Pro GDPR Webhooks',
    version: '1.0.0',
    endpoints: [
      'POST /webhooks/customers/data_request',
      'POST /webhooks/customers/redact',
      'POST /webhooks/shop/redact',
      'POST /webhooks/app/uninstalled',
      'GET /health'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`GDPR Webhooks server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
