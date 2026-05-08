# Transactions Test Suite Documentation

**Version:** 1.0.0  
**Last Updated:** May 8, 2026  
**Test File:** `tests/transactions.spec.ts`  
**Page Object:** `pages/transactionsPage.ts`  
**Test Data:** `test-data/transactions.json`

---

## 📋 Overview

The Transactions test suite validates the functionality of creating and managing financial transactions in the SecureBank application. This suite covers Deposit, Withdrawal, and Transfer transaction types, ensuring that users can successfully create transactions and verify their appearance in the transactions table with correct details.

### Key Features Tested
- ✅ Creating Deposit transactions
- ✅ Creating Withdrawal transactions  
- ✅ Transaction form validation
- ✅ Transaction details verification in table
- ✅ Email notification toggle
- ✅ Balance calculation after transaction
- ⚠️ Negative testing (insufficient funds) - Marked as skip pending error validation

---

## 🧪 Test Cases

### TC01 - Create Deposit Transaction (Traditional Approach)

**Purpose:** Validate that users can create a Deposit transaction and see it reflected in the transactions table.

**Test Data:**
```json
{
  "testId": "TC01",
  "transactionType": "Deposit",
  "fromAccount": "Primary Savings - $5,000.00",
  "amount": "2500",
  "description": "Salary deposit for May 2026",
  "expectedBalanceAfter": "$7,500.00",
  "sendEmailNotification": true
}
```

**Test Steps:**
1. Navigate to bank application and login with admin credentials
2. Click on Transactions navigation link
3. Validate "SecureBank" title is visible
4. Click "New Transaction" button
5. Select "Deposit" from Transaction Type dropdown
6. Select "Primary Savings - $5,000.00" from From Account dropdown
7. Enter amount: "2500"
8. Enter description: "Salary deposit for May 2026"
9. Ensure "Send email notification" checkbox is checked
10. Click "Submit Transaction" button
11. Verify transaction appears in table with type "Deposit"
12. Verify balance after transaction shows "$7,500.00"
13. Verify description shows "Salary deposit for May 2026"

**Expected Result:**
- ✅ Transaction is created successfully
- ✅ Transaction appears in the transactions table
- ✅ Transaction type displays as "Deposit"
- ✅ Balance after transaction is "$7,500.00"
- ✅ Description matches the entered text

**Actual Result:** ✅ Pass (as designed)

---

### TC02 - Create Withdrawal Transaction (Data-Driven Approach)

**Purpose:** Validate that users can create a Withdrawal transaction using data-driven testing approach.

**Test Data:**
```json
{
  "testId": "TC02",
  "transactionType": "Withdrawal",
  "fromAccount": "Primary Savings - $5,000.00",
  "amount": "1000",
  "description": "ATM withdrawal for monthly expenses",
  "expectedBalanceAfter": "$4,000.00",
  "sendEmailNotification": true
}
```

**Test Steps:**
1. Navigate to bank application and login with admin credentials
2. Click on Transactions navigation link
3. Validate "SecureBank" title is visible
4. Create new transaction with test data from JSON
5. Verify transaction details in the transactions table

**Expected Result:**
- ✅ Withdrawal transaction is created successfully
- ✅ Balance after transaction is "$4,000.00"
- ✅ Transaction appears with correct description

**Actual Result:** ✅ Pass (as designed)

---

### TC03 - Create Withdrawal Transaction with Different Account (Data-Driven)

**Purpose:** Validate withdrawal from a different account (Checking Account) to ensure multiple accounts work correctly.

**Test Data:**
```json
{
  "testId": "TC03",
  "transactionType": "Withdrawal",
  "fromAccount": "Checking Account - $2,500.00",
  "amount": "500",
  "description": "Bill payment withdrawal",
  "expectedBalanceAfter": "$2,000.00",
  "sendEmailNotification": false
}
```

**Test Steps:**
1. Navigate to bank application and login with admin credentials
2. Click on Transactions navigation link
3. Create new withdrawal transaction from Checking Account
4. Verify transaction details in the transactions table

**Expected Result:**
- ✅ Withdrawal from Checking Account succeeds
- ✅ Balance after transaction is "$2,000.00"
- ✅ Email notification is not sent (checkbox unchecked)

**Actual Result:** ✅ Pass (as designed)

---

### TC04 - Insufficient Funds Withdrawal (Negative Test - Skipped)

**Purpose:** Verify that the system prevents withdrawals exceeding available balance.

**Status:** ⚠️ **Skipped** - Awaiting error validation mechanism confirmation

**Test Data:**
```json
{
  "testId": "TC04",
  "transactionType": "Withdrawal",
  "fromAccount": "Primary Savings - $5,000.00",
  "amount": "10000",
  "description": "Exceeding available balance",
  "expectedError": "Insufficient funds"
}
```

**Note:** This test is marked as `.skip()` because the exact error validation mechanism needs to be identified from the application. Update this test once error handling is confirmed.

---

## 📊 Test Data Management

### Data Source
All test data is centralized in `test-data/transactions.json` for easy maintenance and updates.

### Data Structure
```typescript
{
  "transactions": [
    {
      "testId": string,              // Test case identifier
      "transactionType": string,     // "Deposit" | "Withdrawal" | "Transfer"
      "fromAccount": string,         // Account name with balance
      "amount": string,              // Transaction amount
      "description": string,         // Transaction description
      "expectedBalanceAfter": string, // Expected balance after transaction
      "sendEmailNotification": boolean // Email notification flag
    }
  ],
  "negativeTests": {
    "invalidAmount": {
      "testId": string,
      "transactionType": string,
      "fromAccount": string,
      "amount": string,
      "description": string,
      "expectedError": string
    }
  }
}
```

### Data-Driven Testing Benefits
- ✅ **Centralized Management:** All test data in one JSON file
- ✅ **Easy Updates:** Modify data without changing test code
- ✅ **Scalability:** Add new test cases by adding JSON entries
- ✅ **Consistency:** Same data structure across all tests

---

## 🏗️ Test Architecture

### Page Object Model (POM)

**File:** `pages/transactionsPage.ts`

**Key Methods:**
1. `navigateToTransactions()` - Navigate to Transactions page
2. `validateSecureBankTitleVisible()` - Verify successful login
3. `clickNewTransactionButton()` - Open transaction modal
4. `selectTransactionType()` - Select Deposit/Withdrawal/Transfer
5. `selectFromAccount()` - Select source account
6. `enterAmount()` - Enter transaction amount
7. `enterDescription()` - Enter transaction description
8. `toggleEmailNotification()` - Toggle email notification checkbox
9. `submitTransaction()` - Submit the transaction
10. `createNewTransaction()` - **Orchestration method** (handles entire flow)
11. `verifyTransactionInTable()` - **Verification method** (validates transaction details)
12. `verifyTransactionTypeVisible()` - Verify transaction type
13. `verifyBalanceAfterVisible()` - Verify balance after transaction
14. `verifyDescriptionVisible()` - Verify transaction description

### Helper Methods Pattern
All UI interactions use the `HelperMethods` class from `helpers/helperMethodsUI.ts`:
- `clickElement()` - Click with wait for actionability
- `fillInput()` - Fill input with clear and type
- `validate()` - Assert element visibility
- `waitForElementToBeVisible()` - Wait for element to appear

---

## 📈 Test Coverage

### Functional Coverage

| Feature | TC01 | TC02 | TC03 | TC04 | Coverage |
|---------|------|------|------|------|----------|
| Create Deposit | ✅ | - | - | - | 100% |
| Create Withdrawal | - | ✅ | ✅ | - | 100% |
| Select Account | ✅ | ✅ | ✅ | ✅ | 100% |
| Enter Amount | ✅ | ✅ | ✅ | ✅ | 100% |
| Enter Description | ✅ | ✅ | ✅ | ✅ | 100% |
| Email Notification | ✅ | ✅ | ✅ | - | 100% |
| Table Verification | ✅ | ✅ | ✅ | - | 100% |
| Insufficient Funds | - | - | - | ⚠️ | Pending |

### Transaction Types Coverage
- ✅ **Deposit:** Covered (TC01)
- ✅ **Withdrawal:** Covered (TC02, TC03)
- ⚠️ **Transfer:** Not yet covered (future enhancement)

### Account Types Coverage
- ✅ **Primary Savings:** Covered (TC01, TC02)
- ✅ **Checking Account:** Covered (TC03)
- ⚠️ **Credit Card:** Not yet covered

---

## 🎓 Learning & Best Practices

### Traditional vs Data-Driven Approach

**TC01 (Traditional Approach):**
- ✅ Explicit, step-by-step code
- ✅ Easy for beginners to understand
- ✅ Clear documentation of each step
- ❌ Code duplication if repeated
- ❌ Harder to maintain multiple similar tests

**TC02 & TC03 (Data-Driven Approach):**
- ✅ Eliminates code duplication
- ✅ Scalable (add tests by adding JSON data)
- ✅ Centralized test data management
- ✅ Maintains test isolation
- ❌ Slightly less explicit in test file
- ✅ More maintainable long-term

### Why Keep Both Approaches?
1. **Learning:** TC01 serves as a teaching example
2. **Flexibility:** Different scenarios benefit from different approaches
3. **Documentation:** Traditional approach documents the complete flow
4. **Migration Path:** Shows team how to evolve from traditional to data-driven

---

## 🚀 Running the Tests

### Command Line Options

```bash
# Run all transactions tests (headless)
npm run transactions

# Run in headed mode (see browser)
npm run transactions:headed

# Run with dev environment
npm run transactions:dev

# Run in debug mode (step through)
npm run transactions:debug

# Run specific test by grep
npx playwright test tests/transactions.spec.ts --grep "TC01"

# Run only data-driven tests
npx playwright test tests/transactions.spec.ts --grep "TC02|TC03"
```

### Environment Variables
- `test_env=dev` - Use dev environment URL
- `test_env=uat` - Use UAT environment URL
- `test_env=prod` - Use production environment URL

---

## 🛠️ Maintenance Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | May 8, 2026 | Initial transactions test suite creation with TC01-TC03 | Automation Team |

---

## 🔮 Future Enhancements

### Planned Test Cases
1. **Transfer Transactions:** Create transfer between accounts
2. **Credit Card Transactions:** Test transactions on credit card accounts
3. **Transaction Filters:** Test account and type filters
4. **Date Range Filters:** Test date filtering
5. **Transaction History:** Verify transaction history pagination
6. **Edit Transaction:** Test transaction editing (if available)
7. **Delete Transaction:** Test transaction deletion (if available)
8. **Bulk Transactions:** Test creating multiple transactions
9. **Transaction Limits:** Test maximum/minimum transaction amounts
10. **Concurrent Transactions:** Test simultaneous transaction creation

### Technical Enhancements
- [ ] Add visual regression testing for transaction modal
- [ ] Add API validation for transaction creation
- [ ] Add performance metrics for transaction submission
- [ ] Add database validation for transaction records
- [ ] Complete negative test scenario (TC04)
- [ ] Add transaction search functionality tests

---

## 📝 Notes

### Important Considerations

1. **Account Balance Prerequisites:** Tests assume accounts have sufficient initial balance
2. **Transaction IDs:** Transaction IDs are auto-generated by the system
3. **Email Notifications:** Email functionality not validated in UI tests
4. **Test Isolation:** Each test run should start with known account balances
5. **Date & Time:** Transaction timestamps are system-generated

### Known Limitations

- ⚠️ TC04 (negative test) is skipped pending error handling validation
- ⚠️ Transfer transaction type not yet tested
- ⚠️ Transaction editing/deletion not covered (if feature exists)
- ⚠️ Email notification delivery not verified (only checkbox interaction)

---

**For questions or updates to this documentation, please refer to the team's test documentation guidelines.**
