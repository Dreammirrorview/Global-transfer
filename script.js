// Global Bank Nigeria - Banking System JavaScript

// State Management
let currentState = {
    currentUser: null,
    isAdmin: false,
    accounts: [],
    transactions: [],
    internationalTransfers: [],
    exchangeRates: {
        USD_NGN: 1550,
        EUR_NGN: 1680,
        GBP_NGN: 1950
    },
    transferFees: {
        base: 5.00,
        percentage: 0.5
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeAccounts();
    initializeSampleTransactions();
    initializeSampleTransfers();
    setupEventListeners();
    updateUI();
});

// Initialize Sample Accounts
function initializeAccounts() {
    for (let i = 1; i <= 10; i++) {
        currentState.accounts.push({
            accountNumber: `GBN-2024-00${i}`,
            serialNumber: `SN-${2024}-00${i}`,
            accountName: `Customer ${i}`,
            ngnBalance: Math.floor(Math.random() * 10000000),
            usdBalance: Math.floor(Math.random() * 10000),
            eurBalance: Math.floor(Math.random() * 5000),
            status: 'active'
        });
    }
}

// Initialize Sample Transactions
function initializeSampleTransactions() {
    const transactions = [
        { id: 'TXN001', date: '2024-01-15', description: 'Wire Transfer to USA', type: 'sent', amount: 5000, currency: 'USD', status: 'completed' },
        { id: 'TXN002', date: '2024-01-14', description: 'Received from UK', type: 'received', amount: 3000, currency: 'GBP', status: 'completed' },
        { id: 'TXN003', date: '2024-01-13', description: 'Local Transfer', type: 'sent', amount: 150000, currency: 'NGN', status: 'completed' },
        { id: 'TXN004', date: '2024-01-12', description: 'Salary Credit', type: 'received', amount: 500000, currency: 'NGN', status: 'completed' },
        { id: 'TXN005', date: '2024-01-11', description: 'Transfer to Germany', type: 'sent', amount: 2000, currency: 'EUR', status: 'pending' }
    ];
    
    currentState.transactions = transactions;
}

// Initialize Sample International Transfers
function initializeSampleTransfers() {
    const transfers = [
        {
            id: 'INT001',
            date: '2024-01-15 10:30',
            sender: 'GBN-2024-001',
            recipientName: 'John Smith',
            bankName: 'Chase Bank',
            accountNumber: '1234567890',
            swiftCode: 'CHASUS33',
            amount: 5000,
            currency: 'USD',
            country: 'US',
            recipientPhone: '+1 555 123 4567',
            status: 'completed'
        },
        {
            id: 'INT002',
            date: '2024-01-14 14:45',
            sender: 'GBN-2024-002',
            recipientName: 'Emma Johnson',
            bankName: 'HSBC UK',
            accountNumber: 'GB29NWBK60161331926819',
            swiftCode: 'HBUKGB4B',
            amount: 3000,
            currency: 'GBP',
            country: 'UK',
            recipientPhone: '+44 7700 900077',
            status: 'completed'
        },
        {
            id: 'INT003',
            date: '2024-01-13 09:15',
            sender: 'GBN-2024-003',
            recipientName: 'Hans Mueller',
            bankName: 'Deutsche Bank',
            accountNumber: 'DE89370400440532013000',
            swiftCode: 'DEUTDEFF',
            amount: 2000,
            currency: 'EUR',
            country: 'DE',
            recipientPhone: '+49 151 12345678',
            status: 'pending'
        }
    ];
    
    currentState.internationalTransfers = transfers;
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
    
    // Login Form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Signup Form
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    
    // Forgot Password Form
    document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
    
    // Admin Login Form
    document.getElementById('adminLoginForm').addEventListener('submit', handleAdminLogin);
    
    // Transfer Form
    document.getElementById('transferForm').addEventListener('submit', handleTransfer);
    
    // Profile Form
    document.getElementById('profileForm').addEventListener('submit', handleProfileUpdate);
    
    // Edit Balance Form
    document.getElementById('editBalanceForm').addEventListener('submit', handleEditBalance);
    
    // Exchange Rate Form
    document.getElementById('exchangeRateForm').addEventListener('submit', handleExchangeRateUpdate);
    
    // Transfer Fee Form
    document.getElementById('transferFeeForm').addEventListener('submit', handleTransferFeeUpdate);
    
    // Transfer Amount Input
    document.getElementById('transferAmount').addEventListener('input', updateTransferPreview);
}

// Show Section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(`${sectionId}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation (in real system, this would be server-side)
    if (username && password) {
        currentState.currentUser = {
            username: username,
            accountNumber: 'GBN-2024-001',
            name: 'John Doe'
        };
        currentState.isAdmin = false;
        
        showSection('customer-dashboard');
        updateDashboardUI();
        showNotification('Login successful!', 'success');
    } else {
        showNotification('Please enter valid credentials', 'error');
    }
}

// Handle Signup
function handleSignup(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('signupFirstName').value;
    const lastName = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const username = document.getElementById('signupUsername').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validation
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // Create new account (in real system, this would be server-side)
    const newAccount = {
        accountNumber: `GBN-2024-0${currentState.accounts.length + 1}`,
        serialNumber: `SN-2024-0${currentState.accounts.length + 1}`,
        accountName: `${firstName} ${lastName}`,
        ngnBalance: 0,
        usdBalance: 0,
        eurBalance: 0,
        status: 'active'
    };
    
    currentState.accounts.push(newAccount);
    
    showNotification('Account created successfully! Please login.', 'success');
    showSection('login');
}

// Handle Forgot Password
function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    
    showNotification('Password reset link sent to your email!', 'success');
    showSection('login');
}

// Handle Admin Login
function handleAdminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Admin credentials (in real system, this would be server-side)
    if (username === 'admin' && password === 'admin123') {
        currentState.currentUser = {
            username: username,
            name: 'Olawale Abdul-Ganiyu'
        };
        currentState.isAdmin = true;
        
        showSection('admin-dashboard');
        updateAdminDashboardUI();
        showNotification('Admin login successful!', 'success');
    } else {
        showNotification('Invalid admin credentials!', 'error');
    }
}

// Show Dashboard Tab
function showDashboardTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.dashboard-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show target tab
    const targetTab = document.getElementById(`${tabId}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Add active class to clicked nav item
    event.target.closest('.nav-item').classList.add('active');
}

// Show Admin Tab
function showAdminTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from nav items
    document.querySelectorAll('.admin-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show target tab
    const targetTab = document.getElementById(`${tabId}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Add active class to clicked nav item
    event.target.closest('.admin-nav-item').classList.add('active');
}

// Update Dashboard UI
function updateDashboardUI() {
    // Update customer name
    document.getElementById('customerName').textContent = currentState.currentUser.name;
    document.getElementById('customerAccount').textContent = `Account: ${currentState.currentUser.accountNumber}`;
    
    // Update recent transactions
    updateRecentTransactions();
    
    // Update transaction table
    updateTransactionTable();
    
    // Update recipients list
    updateRecipientsList();
}

// Update Admin Dashboard UI
function updateAdminDashboardUI() {
    // Update accounts table
    updateAccountsTable();
    
    // Update admin transactions table
    updateAdminTransactionsTable();
    
    // Update international transfers table
    updateInternationalTransfersTable();
    
    // Update statistics
    updateAdminStats();
}

// Update Recent Transactions
function updateRecentTransactions() {
    const recentTransactionsDiv = document.getElementById('recentTransactions');
    recentTransactionsDiv.innerHTML = '';
    
    currentState.transactions.slice(0, 5).forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        
        const iconClass = transaction.type === 'sent' ? 'sent' : 'received';
        const amountClass = transaction.type === 'sent' ? 'negative' : '';
        const sign = transaction.type === 'sent' ? '-' : '+';
        
        transactionItem.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-icon ${iconClass}">
                    ${transaction.type === 'sent' ? '💸' : '💰'}
                </div>
                <div class="transaction-details">
                    <h4>${transaction.description}</h4>
                    <p>${transaction.date}</p>
                </div>
            </div>
            <div class="transaction-amount ${amountClass}">
                ${sign}${transaction.amount.toLocaleString()} ${transaction.currency}
            </div>
        `;
        
        recentTransactionsDiv.appendChild(transactionItem);
    });
}

// Update Transaction Table
function updateTransactionTable() {
    const tbody = document.getElementById('transactionTableBody');
    tbody.innerHTML = '';
    
    currentState.transactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
            <td>${transaction.amount.toLocaleString()} ${transaction.currency}</td>
            <td><span class="status-badge ${transaction.status}">${transaction.status}</span></td>
        `;
        
        tbody.appendChild(row);
    });
}

// Update Recipients List
function updateRecipientsList() {
    const recipientsList = document.getElementById('recipientsList');
    
    // Sample recipients
    const recipients = [
        { name: 'John Smith', bank: 'Chase Bank', account: '1234567890', country: 'United States' },
        { name: 'Emma Johnson', bank: 'HSBC UK', account: 'GB29NWBK60161331926819', country: 'United Kingdom' },
        { name: 'Hans Mueller', bank: 'Deutsche Bank', account: 'DE89370400440532013000', country: 'Germany' }
    ];
    
    recipientsList.innerHTML = '';
    
    recipients.forEach(recipient => {
        const recipientCard = document.createElement('div');
        recipientCard.className = 'recipient-card';
        
        recipientCard.innerHTML = `
            <h4>${recipient.name}</h4>
            <p><strong>Bank:</strong> ${recipient.bank}</p>
            <p><strong>Account:</strong> ${recipient.account}</p>
            <p><strong>Country:</strong> ${recipient.country}</p>
            <div class="recipient-actions">
                <button class="btn btn-sm btn-primary">Send Money</button>
                <button class="btn btn-sm btn-outline">Edit</button>
                <button class="btn btn-sm btn-outline">Delete</button>
            </div>
        `;
        
        recipientsList.appendChild(recipientCard);
    });
}

// Update Accounts Table
function updateAccountsTable() {
    const tbody = document.getElementById('accountsTableBody');
    tbody.innerHTML = '';
    
    currentState.accounts.forEach(account => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${account.accountNumber}</td>
            <td>${account.serialNumber}</td>
            <td>${account.accountName}</td>
            <td>₦${account.ngnBalance.toLocaleString()}</td>
            <td>$${account.usdBalance.toLocaleString()}</td>
            <td><span class="status-badge ${account.status}">${account.status}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="showEditBalanceModal('${account.accountNumber}')">Edit Balance</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Update Admin Transactions Table
function updateAdminTransactionsTable() {
    const tbody = document.getElementById('adminTransactionsTableBody');
    tbody.innerHTML = '';
    
    currentState.transactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.id}</td>
            <td>GBN-2024-001</td>
            <td>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
            <td>${transaction.amount.toLocaleString()} ${transaction.currency}</td>
            <td><span class="status-badge ${transaction.status}">${transaction.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline">View</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Update International Transfers Table
function updateInternationalTransfersTable() {
    const tbody = document.getElementById('internationalTransfersTableBody');
    tbody.innerHTML = '';
    
    currentState.internationalTransfers.forEach(transfer => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${transfer.date}</td>
            <td>${transfer.sender}</td>
            <td>${transfer.recipientName}</td>
            <td>${transfer.bankName}</td>
            <td>${transfer.amount.toLocaleString()} ${transfer.currency}</td>
            <td>${transfer.swiftCode}</td>
            <td>${transfer.country}</td>
            <td><span class="status-badge ${transfer.status}">${transfer.status}</span></td>
            <td>
                <button class="btn btn-sm btn-primary">Process</button>
                <button class="btn btn-sm btn-outline">View</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Update Admin Stats
function updateAdminStats() {
    document.getElementById('totalAccounts').textContent = currentState.accounts.length;
    
    let totalBalance = 0;
    currentState.accounts.forEach(account => {
        totalBalance += account.usdBalance;
    });
    document.getElementById('totalBalanceAdmin').textContent = `$${totalBalance.toLocaleString()}.00`;
    
    document.getElementById('todayTransfers').textContent = currentState.internationalTransfers.filter(t => 
        t.date.startsWith('2024-01-15')
    ).length;
}

// Handle Transfer
function handleTransfer(e) {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('transferAmount').value);
    const recipientName = document.getElementById('recipientName').value;
    const bankName = document.getElementById('recipientBank').value;
    const accountNumber = document.getElementById('recipientAccount').value;
    const swiftCode = document.getElementById('swiftCode').value;
    const country = document.getElementById('recipientCountry').value;
    const recipientPhone = document.getElementById('recipientPhone').value;
    const sendFromCurrency = document.getElementById('sendFromCurrency').value;
    
    // Create new international transfer
    const newTransfer = {
        id: `INT00${currentState.internationalTransfers.length + 1}`,
        date: new Date().toISOString().slice(0, 16).replace('T', ' '),
        sender: currentState.currentUser.accountNumber,
        recipientName: recipientName,
        bankName: bankName,
        accountNumber: accountNumber,
        swiftCode: swiftCode,
        amount: amount,
        currency: sendFromCurrency,
        country: country,
        recipientPhone: recipientPhone,
        status: 'pending'
    };
    
    currentState.internationalTransfers.push(newTransfer);
    
    // Create transaction record
    const newTransaction = {
        id: `TXN00${currentState.transactions.length + 1}`,
        date: new Date().toISOString().slice(0, 10),
        description: `International transfer to ${recipientName}`,
        type: 'sent',
        amount: amount,
        currency: sendFromCurrency,
        status: 'pending'
    };
    
    currentState.transactions.unshift(newTransaction);
    
    showNotification('Transfer submitted successfully!', 'success');
    document.getElementById('transferForm').reset();
    updateDashboardUI();
}

// Update Transfer Preview
function updateTransferPreview() {
    const amount = parseFloat(document.getElementById('transferAmount').value) || 0;
    const sendFromCurrency = document.getElementById('sendFromCurrency').value;
    
    // Calculate fee
    const fee = currentState.transferFees.base + (amount * currentState.transferFees.percentage / 100);
    
    document.getElementById('transferFee').textContent = `$${fee.toFixed(2)}`;
    
    // Update exchange rate display based on selected currency
    if (sendFromCurrency === 'USD') {
        document.getElementById('exchangeRate').textContent = `1 USD = ${currentState.exchangeRates.USD_NGN} NGN`;
    } else if (sendFromCurrency === 'EUR') {
        document.getElementById('exchangeRate').textContent = `1 EUR = ${currentState.exchangeRates.EUR_NGN} NGN`;
    } else if (sendFromCurrency === 'GBP') {
        document.getElementById('exchangeRate').textContent = `1 GBP = ${currentState.exchangeRates.GBP_NGN} NGN`;
    }
}

// Show Edit Balance Modal
function showEditBalanceModal(accountNumber) {
    const account = currentState.accounts.find(acc => acc.accountNumber === accountNumber);
    
    if (account) {
        document.getElementById('editAccountNumber').value = accountNumber;
        document.getElementById('editAccountNumberDisplay').value = accountNumber;
        document.getElementById('editAccountNameDisplay').value = account.accountName;
        document.getElementById('editAmount').value = '';
        document.getElementById('editDescription').value = '';
        
        openModal('editBalanceModal');
    }
}

// Handle Edit Balance
function handleEditBalance(e) {
    e.preventDefault();
    
    const accountNumber = document.getElementById('editAccountNumber').value;
    const transactionType = document.getElementById('transactionType').value;
    const amount = parseFloat(document.getElementById('editAmount').value);
    const description = document.getElementById('editDescription').value;
    
    const account = currentState.accounts.find(acc => acc.accountNumber === accountNumber);
    
    if (account) {
        if (transactionType === 'credit') {
            account.ngnBalance += amount;
        } else {
            if (account.ngnBalance < amount) {
                showNotification('Insufficient balance!', 'error');
                return;
            }
            account.ngnBalance -= amount;
        }
        
        // Create transaction record
        const newTransaction = {
            id: `TXN00${currentState.transactions.length + 1}`,
            date: new Date().toISOString().slice(0, 10),
            description: description,
            type: transactionType,
            amount: amount,
            currency: 'NGN',
            status: 'completed'
        };
        
        currentState.transactions.unshift(newTransaction);
        
        updateAccountsTable();
        updateAdminTransactionsTable();
        closeModal('editBalanceModal');
        showNotification('Balance updated successfully!', 'success');
    }
}

// Handle Profile Update
function handleProfileUpdate(e) {
    e.preventDefault();
    
    showNotification('Profile updated successfully!', 'success');
}

// Handle Exchange Rate Update
function handleExchangeRateUpdate(e) {
    e.preventDefault();
    
    currentState.exchangeRates.USD_NGN = parseFloat(document.getElementById('usdToNgn').value);
    currentState.exchangeRates.EUR_NGN = parseFloat(document.getElementById('eurToNgn').value);
    currentState.exchangeRates.GBP_NGN = parseFloat(document.getElementById('gbpToNgn').value);
    
    showNotification('Exchange rates updated successfully!', 'success');
}

// Handle Transfer Fee Update
function handleTransferFeeUpdate(e) {
    e.preventDefault();
    
    currentState.transferFees.base = parseFloat(document.getElementById('baseFee').value);
    currentState.transferFees.percentage = parseFloat(document.getElementById('percentageFee').value);
    
    showNotification('Transfer fees updated successfully!', 'success');
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.getElementById('modalOverlay').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.getElementById('modalOverlay').classList.remove('active');
}

// Close modal when clicking overlay
document.getElementById('modalOverlay').addEventListener('click', function() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
    this.classList.remove('active');
});

// Notification System
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Logout Function
function logout() {
    currentState.currentUser = null;
    currentState.isAdmin = false;
    showSection('home');
    showNotification('Logged out successfully!', 'success');
}

// Update UI
function updateUI() {
    // Initialize any UI elements
}

// Generate Unique ID
function generateUniqueId() {
    return 'ID-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Format Currency
function formatCurrency(amount, currency) {
    const formatter = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: currency
    });
    return formatter.format(amount);
}

// Format Date
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-NG', options);
}

// Format DateTime
function formatDateTime(dateTime) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateTime).toLocaleString('en-NG', options);
}

// Validate Email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate Phone Number
function validatePhone(phone) {
    const re = /^\+?[\d\s-()]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Show Add Recipient Modal
function showAddRecipientModal() {
    showNotification('Add Recipient modal would open here', 'info');
}

// Create New Account
function createNewAccount() {
    showNotification('Create Account modal would open here', 'info');
}

// Export Functions (if needed)
window.showSection = showSection;
window.showDashboardTab = showDashboardTab;
window.showAdminTab = showAdminTab;
window.logout = logout;
window.showEditBalanceModal = showEditBalanceModal;
window.closeModal = closeModal;
window.showAddRecipientModal = showAddRecipientModal;
window.createNewAccount = createNewAccount;