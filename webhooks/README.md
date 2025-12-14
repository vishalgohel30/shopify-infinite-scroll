# GDPR Webhooks Server

This server handles mandatory Shopify GDPR compliance webhooks for Infinite Scroll Pro.

## Why This Exists

Shopify requires all apps to handle three GDPR webhooks:
1. `customers/data_request` - Customer requests their data
2. `customers/redact` - Customer requests data deletion
3. `shop/redact` - Shop data deletion after uninstall

Even if your app doesn't store customer data, you must provide webhook endpoints.

## Quick Start

### Local Testing

```bash
cd webhooks
npm install
npm start
```

Server runs on `http://localhost:3000`

### Environment Variables

Create a `.env` file:

```env
PORT=3000
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret_from_shopify
NODE_ENV=production
```

## Deployment Options

### Option 1: Vercel (Recommended - Free & Easy)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Create `vercel.json` in `/webhooks`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/server.js"
       }
     ]
   }
   ```

3. Deploy:
   ```bash
   cd webhooks
   vercel --prod
   ```

4. Get deployment URL: `https://your-project.vercel.app`

5. Add webhook secret in Vercel dashboard under Environment Variables

### Option 2: Railway (Easy Deployment)

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Deploy:
   ```bash
   cd webhooks
   railway login
   railway init
   railway up
   ```

3. Set environment variables:
   ```bash
   railway variables set SHOPIFY_WEBHOOK_SECRET=your_secret
   ```

### Option 3: Heroku

1. Create `Procfile`:
   ```
   web: node server.js
   ```

2. Deploy:
   ```bash
   cd webhooks
   heroku create infinite-scroll-webhooks
   heroku config:set SHOPIFY_WEBHOOK_SECRET=your_secret
   git push heroku main
   ```

### Option 4: AWS Lambda (Serverless)

Create `lambda.js`:

```javascript
const serverless = require('serverless-http');
const app = require('./server');

module.exports.handler = serverless(app);
```

Deploy with Serverless Framework or AWS SAM.

### Option 5: Cloudflare Workers

Convert Express app to Cloudflare Workers format using `@cloudflare/workers-web-api`.

## Configure Shopify Webhooks

Once deployed, add webhook URLs to `shopify.app.toml`:

```toml
[[webhooks.subscriptions]]
topics = ["customers/data_request"]
uri = "https://your-deployed-url.com/webhooks/customers/data_request"

[[webhooks.subscriptions]]
topics = ["customers/redact"]
uri = "https://your-deployed-url.com/webhooks/customers/redact"

[[webhooks.subscriptions]]
topics = ["shop/redact"]
uri = "https://your-deployed-url.com/webhooks/shop/redact"

[[webhooks.subscriptions]]
topics = ["app/uninstalled"]
uri = "https://your-deployed-url.com/webhooks/app/uninstalled"
```

## Testing Webhooks

### 1. Test Locally with ngrok

```bash
# Terminal 1: Start server
cd webhooks
npm start

# Terminal 2: Start ngrok
ngrok http 3000
```

Use ngrok URL in Shopify Partner Dashboard for testing.

### 2. Test with curl

```bash
curl -X POST http://localhost:3000/webhooks/customers/data_request \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Shop-Domain: test-store.myshopify.com" \
  -H "X-Shopify-Hmac-Sha256: test_hmac" \
  -d '{
    "customer": {
      "id": 123456789,
      "email": "customer@example.com"
    }
  }'
```

### 3. Test in Shopify Partner Dashboard

1. Go to Apps → Your App → Test on Development Store
2. Trigger GDPR webhooks from store settings
3. Check server logs

## Security

### HMAC Verification

All webhooks are verified using Shopify's HMAC signature:

```javascript
const hmacHeader = req.get('X-Shopify-Hmac-Sha256');
const hash = crypto
  .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
  .update(JSON.stringify(req.body), 'utf8')
  .digest('base64');

if (hash !== hmacHeader) {
  return res.status(401).send('Unauthorized');
}
```

### Best Practices

- ✅ Always verify HMAC signatures
- ✅ Use HTTPS in production
- ✅ Set webhook secret as environment variable
- ✅ Log all webhook activity
- ✅ Respond within 5 seconds (Shopify timeout)
- ✅ Return 200 status even if no action taken

## Monitoring

### Health Check

```bash
curl https://your-deployed-url.com/health
```

Response:
```json
{
  "status": "healthy",
  "service": "Infinite Scroll Pro Webhooks",
  "timestamp": "2025-12-12T10:30:00.000Z"
}
```

### Logging

All webhooks are logged to console with:
- Timestamp
- Webhook topic
- Shop domain
- Request data

In production, integrate with:
- Logtail
- Papertrail
- CloudWatch (if using AWS)
- Vercel Logs (if using Vercel)

## Troubleshooting

### Webhook Not Receiving Requests

1. Check webhook URL is publicly accessible
2. Verify HTTPS is enabled
3. Check firewall settings
4. Test with curl or Postman

### HMAC Verification Fails

1. Ensure webhook secret matches Shopify Partner Dashboard
2. Verify raw body is used (no parsing before verification)
3. Check encoding (UTF-8)

### Timeout Errors

1. Respond within 5 seconds
2. Move heavy processing to background jobs
3. Return 200 immediately, process asynchronously

## Cost Estimates

| Platform | Free Tier | Cost Beyond Free |
|----------|-----------|------------------|
| **Vercel** | 100GB bandwidth/month | $20/month |
| **Railway** | $5 credit/month | $0.000463/GB-hour |
| **Heroku** | Eco ($5/month) | $7/month for Basic |
| **AWS Lambda** | 1M requests/month | $0.20 per 1M requests |
| **Cloudflare Workers** | 100k requests/day | $5/month for 10M requests |

**Recommendation**: Start with Vercel (easiest) or Railway (generous free tier).

## Support

For webhook issues:
- Check server logs
- Test with ngrok locally
- Verify Shopify Partner Dashboard configuration
- Contact Shopify Partner Support if webhooks aren't firing
