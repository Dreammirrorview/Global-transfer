# Global Bank Nigeria - Deployment Guide

**Version:** 1.0
**Last Updated:** January 15, 2024

---

## 🚀 Deployment Overview

This guide provides comprehensive instructions for deploying Global Bank Nigeria's banking system in various environments, from development to production.

---

## 📋 Prerequisites

### Development Environment
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (Python, Node.js, PHP, or Apache)
- Code editor (VS Code, Sublime Text, etc.)
- Git (for version control)

### Production Environment
- Web server (Apache, Nginx, or cloud hosting)
- SSL/TLS certificate (HTTPS required)
- Domain name and DNS configuration
- Backend server (Node.js, Python, Java, .NET)
- Database (PostgreSQL, MySQL, Oracle, or MongoDB)
- Core banking system or payment processor integration

---

## 🔧 Development Deployment

### Method 1: Python HTTP Server

```bash
# Navigate to project directory
cd /path/to/global-bank-nigeria

# Start server on port 8000
python -m http.server 8000

# Or specify custom port
python -m http.server 3000
```

**Access:** http://localhost:8000

### Method 2: Node.js HTTP Server

```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Navigate to project directory
cd /path/to/global-bank-nigeria

# Start server
http-server -p 8000

# Or with CORS enabled
http-server -p 8000 --cors
```

**Access:** http://localhost:8000

### Method 3: PHP Built-in Server

```bash
# Navigate to project directory
cd /path/to/global-bank-nigeria

# Start PHP server
php -S localhost:8000
```

**Access:** http://localhost:8000

### Method 4: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

**Access:** http://localhost:5500

---

## 🌐 Production Deployment

### Option 1: Static Hosting (Demo/Prototype)

#### Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

**Steps:**
1. Create Netlify account at https://app.netlify.com
2. Drag and drop the project folder or connect to Git repository
3. Configure build settings (not required for static files)
4. Deploy and get public URL

#### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**Steps:**
1. Create Vercel account at https://vercel.com
2. Import project from Git or upload files
3. Configure deployment settings
4. Deploy and get public URL

#### GitHub Pages

```bash
# Create gh-pages branch
git checkout -b gh-pages

# Add and commit files
git add .
git commit -m "Initial deployment"

# Push to GitHub
git push origin gh-pages
```

**Steps:**
1. Create GitHub repository
2. Push project files to repository
3. Go to repository Settings → Pages
4. Select source branch (gh-pages)
5. Access at: `https://username.github.io/repository-name`

---

### Option 2: Traditional Web Server (Apache/Nginx)

#### Apache Deployment

**Installation (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install apache2
```

**Configuration:**
```apache
# Create virtual host file
sudo nano /etc/apache2/sites-available/globalbank.conf

# Add configuration
<VirtualHost *:80>
    ServerName globalbankng.com
    ServerAdmin admin@globalbankng.com
    DocumentRoot /var/www/global-bank-nigeria
    
    <Directory /var/www/global-bank-nigeria>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

**Enable Site:**
```bash
sudo a2ensite globalbank.conf
sudo systemctl reload apache2
```

**HTTPS Configuration:**
```bash
# Install Certbot for Let's Encrypt
sudo apt install certbot python3-certbot-apache

# Obtain SSL certificate
sudo certbot --apache -d globalbankng.com
```

#### Nginx Deployment

**Installation (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nginx
```

**Configuration:**
```nginx
# Create server block file
sudo nano /etc/nginx/sites-available/globalbank

# Add configuration
server {
    listen 80;
    server_name globalbankng.com www.globalbankng.com;
    
    root /var/www/global-bank-nigeria;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    location /documents/ {
        autoindex on;
    }
    
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
}
```

**Enable Site:**
```bash
sudo ln -s /etc/nginx/sites-available/globalbank /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**HTTPS Configuration:**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d globalbankng.com
```

---

### Option 3: Cloud Deployment

#### AWS Deployment

**S3 Static Website Hosting:**

```bash
# Install AWS CLI
pip install awscli

# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://globalbankng.com

# Sync files
aws s3 sync ./ s3://globalbankng.com --delete

# Enable static website hosting
aws s3 website s3://globalbankng.com --index-document index.html
```

**CloudFront Distribution:**

```bash
# Create CloudFront distribution
aws cloudfront create-distribution \
  --distribution-config file://distribution-config.json
```

**Route 53 DNS:**

```bash
# Create hosted zone
aws route53 create-hosted-zone \
  --name globalbankng.com \
  --caller-reference 2024-01-15

# Add A record
aws route53 change-resource-record-sets \
  --hosted-zone-id ZXXXXXXXXXXX \
  --change-batch file://record-set.json
```

#### Azure Deployment

**Azure Storage Static Website:**

```bash
# Install Azure CLI
az login

# Create resource group
az group create \
  --name globalbank-rg \
  --location eastus

# Create storage account
az storage account create \
  --name globalbankstorage \
  --resource-group globalbank-rg \
  --location eastus \
  --sku Standard_LRS \
  --kind StorageV2

# Enable static website
az storage blob service-properties update \
  --account-name globalbankstorage \
  --static-website \
  --index-document index.html

# Upload files
az storage blob upload-batch \
  --account-name globalbankstorage \
  --source ./ \
  --destination '$web'
```

#### Google Cloud Deployment

**Cloud Storage Bucket:**

```bash
# Install gcloud CLI
gcloud init

# Create bucket
gsutil mb -p project-id gs://globalbankng.com

# Enable static website
gsutil web set -m index.html -e 404.html gs://globalbankng.com

# Upload files
gsutil -m rsync -r ./ gs://globalbankng.com

# Make public
gsutil iam ch allUsers:objectViewer gs://globalbankng.com
```

---

## 🔐 Security Configuration

### SSL/TLS Setup

**Using Let's Encrypt (Free):**

```bash
# Install Certbot
sudo apt install certbot

# For Apache
sudo certbot --apache

# For Nginx
sudo certbot --nginx

# Auto-renewal
sudo certbot renew --dry-run
```

**Commercial SSL:**
1. Purchase SSL certificate from provider
2. Generate CSR (Certificate Signing Request)
3. Submit CSR to SSL provider
4. Download certificate files
5. Install certificate on server
6. Configure web server

### Security Headers

**Apache (.htaccess):**
```apache
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Content-Security-Policy "default-src 'self'"
    Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>
```

**Nginx:**
```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Content-Security-Policy "default-src 'self'";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
```

### Firewall Configuration

```bash
# UFW (Ubuntu)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# iptables
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

---

## 🗄️ Backend Integration

### Database Setup

**PostgreSQL:**
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb globalbank

# Create user
sudo -u postgres createuser -P gbn_user

# Grant privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE globalbank TO gbn_user;"
```

**MySQL:**
```bash
# Install MySQL
sudo apt install mysql-server

# Create database
mysql -u root -p
CREATE DATABASE globalbank;
CREATE USER 'gbn_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON globalbank.* TO 'gbn_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### API Development

**Node.js/Express Example:**
```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// API Routes
app.get('/api/accounts', async (req, res) => {
    // Fetch accounts from database
    const accounts = await db.getAccounts();
    res.json(accounts);
});

app.post('/api/transfers', async (req, res) => {
    // Process transfer
    const result = await db.processTransfer(req.body);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

---

## 📊 Monitoring and Logging

### Application Monitoring

**Set up Uptime Monitoring:**
- UptimeRobot (free)
- Pingdom
- StatusCake
- New Relic

**Error Tracking:**
- Sentry
- Rollbar
- Bugsnag

### Log Management

**Access Logs (Apache):**
```bash
tail -f /var/log/apache2/access.log
```

**Error Logs (Nginx):**
```bash
tail -f /var/log/nginx/error.log
```

**Application Logs:**
```bash
# Create log directory
mkdir -p /var/log/globalbank

# Set permissions
chown www-data:www-data /var/log/globalbank

# Configure log rotation
sudo nano /etc/logrotate.d/globalbank
```

---

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Server
      uses: easingthemes/ssh-deploy@v2.1.5
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
        REMOTE_USER: ${{ secrets.REMOTE_USER }}
        TARGET: /var/www/global-bank-nigeria
```

### GitLab CI/CD

Create `.gitlab-ci.yml`:

```yaml
deploy:
  stage: deploy
  script:
    - apt-get update -qq
    - apt-get install -y rsync
    - rsync -avz --delete ./ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
  only:
    - main
```

---

## 🧪 Testing Before Production

### Pre-Deployment Checklist

- [ ] All features tested in development
- [ ] Responsive design verified on mobile/tablet
- [ ] Cross-browser compatibility tested
- [ ] Security vulnerabilities scanned
- [ ] Performance optimized (minification, compression)
- [ ] SEO meta tags configured
- [ ] Analytics tracking configured
- [ ] Error handling tested
- [ ] Backup procedures in place
- [ ] Monitoring configured

### Performance Testing

**Lighthouse CI:**
```bash
npm install -g @lhci/cli
lhci autorun
```

**Load Testing:**
```bash
# Using Apache Bench
ab -n 1000 -c 10 https://globalbankng.com/
```

---

## 📱 Post-Deployment Tasks

### Search Engine Optimization

```html
<!-- Add to index.html head -->
<meta name="description" content="Global Bank Nigeria - International banking solutions">
<meta name="keywords" content="banking, Nigeria, international transfers, money transfer">
<meta name="author" content="Olawale Abdul-Ganiyu">

<!-- Open Graph -->
<meta property="og:title" content="Global Bank Nigeria">
<meta property="og:description" content="International banking solutions">
<meta property="og:type" content="website">
<meta property="og:url" content="https://globalbankng.com">

<!-- Sitemap -->
Submit sitemap.xml to Google Search Console and Bing Webmaster Tools
```

### Analytics Integration

**Google Analytics:**
```html
<!-- Add to index.html before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXX-X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXXX-X');
</script>
```

---

## 🆘 Troubleshooting

### Common Issues

**Issue: 404 Errors**
- Check file permissions
- Verify DocumentRoot configuration
- Check .htaccess rules

**Issue: SSL Certificate Errors**
- Verify certificate installation
- Check certificate expiration
- Ensure domain matches certificate

**Issue: Slow Performance**
- Enable caching
- Optimize images
- Use CDN
- Minify CSS/JS

**Issue: Database Connection Errors**
- Verify database credentials
- Check database server status
- Test connection string
- Check firewall rules

---

## 📞 Support

For deployment assistance:
- **Email:** support@globalbankng.com
- **Documentation:** www.globalbankng.com/docs
- **Community:** forum.globalbankng.com

---

**© 2024 Global Bank Nigeria Limited**
**Owner: Olawale Abdul-Ganiyu**

---

*This deployment guide covers all major deployment scenarios. For specific requirements or custom deployments, consult with your technical team or cloud provider.*