import { Page } from '@playwright/test';
import { HelperMethods } from '../helpers/helperMethodsUI';

/**
 * TransactionsPage Class
 * 
 * Page Object Model (POM) for the Transactions page of SecureBank application.
 * This class encapsulates all locators and methods related to transaction operations
 * including creating new transactions (Deposit, Withdrawal, Transfer) and validating
 * transaction details in the transactions table.
 * 
 * @class TransactionsPage
 * @example
 * const transactionsPage = new TransactionsPage(page);
 * await transactionsPage.createNewTransaction('Withdrawal', 'Primary Savings', '1000', 'ATM withdrawal');
 */
export default class TransactionsPage {
    private page: Page;
    private helper: HelperMethods;

    /**
     * Constructor - Initializes the TransactionsPage with Playwright page object
     * @param {Page} page - Playwright page instance
     */
    constructor(page: Page) {
        this.page = page;
        this.helper = new HelperMethods(page);
    }

    /**
     * Getter method to return all locators used on the Transactions page
     * Organized into logical sections for better maintainability
     * 
     * @returns {Object} Object containing all page element locators
     */
    get transactionsPageElements() {
        return {
            // Navigation & Header Elements
            transactionsNavLink: this.page.getByRole('link', { name: 'Transactions' }),
            secureBankTitle: this.page.getByText('SecureBank').nth(0),
            
            // Quick Actions Section
            newTransactionButton: this.page.getByTestId('quick-new-transaction'),
            
            // Transaction Modal Elements
            transactionModal: this.page.locator('[role="dialog"]').filter({ hasText: 'New Transaction' }),
            modalTitle: this.page.getByText('New Transaction'),
            modalCloseButton: this.page.getByRole('button', { name: '×' }),
            
            // Transaction Form Fields
            transactionTypeSelect: this.page.getByTestId('transaction-type-select'),
            fromAccountSelect: this.page.getByTestId('from-account-select'),
            amountInput: this.page.getByTestId('transaction-amount-input'),
            descriptionInput: this.page.getByTestId('transaction-description-input'),
            emailNotificationCheckbox: this.page.getByText('Send email notification'),
            
            // Form Buttons
            submitTransactionButton: this.page.getByTestId('submit-transaction-button'),
            cancelButton: this.page.getByRole('button', { name: 'Cancel' }),
            
            // Transaction Table Elements
            transactionsTable: this.page.getByRole('table'),
            transactionsTBody: this.page.getByTestId('transactions-tbody'),
            transactionIdColumn: this.page.getByRole('columnheader', { name: 'Transaction ID' }),
            dateTimeColumn: this.page.getByRole('columnheader', { name: 'Date & Time' }),
            typeColumn: this.page.getByRole('columnheader', { name: 'Type' }),
            accountColumn: this.page.getByRole('columnheader', { name: 'Account' }),
            amountColumn: this.page.getByRole('columnheader', { name: 'Amount' }),
            balanceAfterColumn: this.page.getByRole('columnheader', { name: 'Balance After' }),
            descriptionColumn: this.page.getByRole('columnheader', { name: 'Description' }),
            
            // Transaction Type Options (in dropdown)
            depositOption: this.page.getByRole('option', { name: 'Deposit' }),
            withdrawalOption: this.page.getByRole('option', { name: 'Withdrawal' }),
            transferOption: this.page.getByRole('option', { name: 'Transfer' }),
            
            // Filter Section
            accountFilter: this.page.getByLabel('Account:'),
            typeFilter: this.page.getByLabel('Type:'),
            applyFilterButton: this.page.getByRole('button', { name: 'Apply' }),
            resetFilterButton: this.page.getByRole('button', { name: 'Reset' })
        };
    }

    /**
     * Navigate to Transactions page by clicking the Transactions navigation link
     * @returns {Promise<void>}
     */
    async navigateToTransactions(): Promise<void> {
        await this.helper.clickElement(this.transactionsPageElements.transactionsNavLink, 'Clicked Transactions navigation link');
        await this.helper.waitForElementToBeVisible(this.transactionsPageElements.transactionsTable);
    }

    /**
     * Validate that SecureBank title is visible on the page (confirms successful login)
     * @returns {Promise<void>}
     */
    async validateSecureBankTitleVisible(): Promise<void> {
        await this.helper.validate(this.transactionsPageElements.secureBankTitle, '✓ SecureBank title is visible');
    }

    /**
     * Click the "New Transaction" button to open the transaction creation modal
     * @returns {Promise<void>}
     */
    async clickNewTransactionButton(): Promise<void> {
        await this.helper.clickElement(this.transactionsPageElements.newTransactionButton, 'Clicked New Transaction button');
        await this.helper.waitForElementToBeVisible(this.transactionsPageElements.transactionModal);
    }

    /**
     * Select transaction type from the dropdown (Deposit, Withdrawal, Transfer)
     * @param {string} transactionType - Type of transaction ('Deposit', 'Withdrawal', 'Transfer')
     * @returns {Promise<void>}
     */
    async selectTransactionType(transactionType: 'Deposit' | 'Withdrawal' | 'Transfer'): Promise<void> {
        await this.helper.clickElement(this.transactionsPageElements.transactionTypeSelect, 'Clicked Transaction Type dropdown');
        
        const optionMap = {
            'Deposit': this.transactionsPageElements.depositOption,
            'Withdrawal': this.transactionsPageElements.withdrawalOption,
            'Transfer': this.transactionsPageElements.transferOption
        };
        
        await this.helper.clickElement(optionMap[transactionType], `Selected ${transactionType} transaction type`);
    }

    /**
     * Select the source account for the transaction from the dropdown
     * @param {string} accountName - Name of the account with balance (e.g., 'Primary Savings - $5,000.00')
     * @returns {Promise<void>}
     */
    async selectFromAccount(accountName: string): Promise<void> {
        await this.helper.clickElement(this.transactionsPageElements.fromAccountSelect, 'Clicked From Account dropdown');
        
        // Locate and click the account option by partial text match
        const accountOption = this.page.getByLabel(accountName).getByText(accountName);
        await this.helper.clickElement(accountOption, `Selected account: ${accountName}`);
    }

    /**
     * Enter the transaction amount in the amount input field
     * @param {string} amount - Transaction amount (e.g., '1000', '2500.50')
     * @returns {Promise<void>}
     */
    async enterAmount(amount: string): Promise<void> {
        await this.helper.clickElement(this.transactionsPageElements.amountInput, 'Clicked Amount input field');
        await this.helper.fillInput(this.transactionsPageElements.amountInput, amount, `Entered amount: ${amount}`);
    }

    /**
     * Enter transaction description in the description textarea
     * @param {string} description - Description of the transaction
     * @returns {Promise<void>}
     */
    async enterDescription(description: string): Promise<void> {
        await this.helper.clickElement(this.transactionsPageElements.descriptionInput, 'Clicked Description input field');
        await this.helper.fillInput(this.transactionsPageElements.descriptionInput, description, `Entered description: ${description}`);
    }

    /**
     * Toggle the "Send email notification" checkbox
     * @param {boolean} shouldCheck - True to check, False to uncheck
     * @returns {Promise<void>}
     */
    async toggleEmailNotification(shouldCheck: boolean): Promise<void> {
        const checkbox = this.transactionsPageElements.emailNotificationCheckbox;
        const isChecked = await checkbox.isChecked();
        
        if (shouldCheck && !isChecked) {
            await this.helper.clickElement(checkbox, 'Checked email notification checkbox');
        } else if (!shouldCheck && isChecked) {
            await this.helper.clickElement(checkbox, 'Unchecked email notification checkbox');
        }
    }

    /**
     * Click the "Submit Transaction" button to complete the transaction
     * @returns {Promise<void>}
     */
    async submitTransaction(): Promise<void> {
        await this.helper.clickElement(this.transactionsPageElements.submitTransactionButton, 'Clicked Submit Transaction button');
        // Wait for modal to close after submission
        await this.page.waitForTimeout(1000);
    }

    /**
     * Complete orchestration method to create a new transaction
     * Handles the entire flow: open modal → fill form → submit
     * 
     * @param {string} transactionType - Type of transaction ('Deposit', 'Withdrawal', 'Transfer')
     * @param {string} fromAccount - Source account name with balance
     * @param {string} amount - Transaction amount
     * @param {string} description - Transaction description
     * @param {boolean} sendEmail - Whether to send email notification (default: true)
     * @returns {Promise<void>}
     * 
     * @example
     * await transactionsPage.createNewTransaction('Withdrawal', 'Primary Savings - $5,000.00', '1000', 'ATM withdrawal');
     */
    async createNewTransaction(
        transactionType: 'Deposit' | 'Withdrawal' | 'Transfer',
        fromAccount: string,
        amount: string,
        description: string,
        sendEmail: boolean = true
    ): Promise<void> {
        await this.clickNewTransactionButton();
        await this.selectTransactionType(transactionType);
        await this.selectFromAccount(fromAccount);
        await this.enterAmount(amount);
        await this.enterDescription(description);
        await this.toggleEmailNotification(sendEmail);
        await this.submitTransaction();
    }

    /**
     * Verify that a transaction with specific type is visible in the transactions table
     * @param {string} transactionType - Type to verify ('Deposit', 'Withdrawal', 'Transfer')
     * @returns {Promise<void>}
     */
    async verifyTransactionTypeVisible(transactionType: string): Promise<void> {
        const transactionTypeCell = this.transactionsPageElements.transactionsTBody.getByText(transactionType);
        await this.helper.validate(transactionTypeCell, `✓ Transaction type "${transactionType}" is visible in table`);
    }

    /**
     * Verify that a specific balance amount is visible in the transactions table
     * @param {string} balanceAmount - Balance to verify (e.g., '$4,000.00')
     * @returns {Promise<void>}
     */
    async verifyBalanceAfterVisible(balanceAmount: string): Promise<void> {
        const balanceCell = this.page.getByRole('cell', { name: balanceAmount });
        await this.helper.validate(balanceCell, `✓ Balance after transaction "${balanceAmount}" is visible in table`);
    }

    /**
     * Verify that a specific description is visible in the transactions table
     * @param {string} description - Description to verify
     * @returns {Promise<void>}
     */
    async verifyDescriptionVisible(description: string): Promise<void> {
        const descriptionCell = this.page.getByRole('cell', { name: description });
        await this.helper.validate(descriptionCell, `✓ Description "${description}" is visible in table`);
    }

    /**
     * Complete verification method to validate transaction details in the table
     * Verifies transaction type, balance after, and description are all in the SAME ROW
     * 
     * @param {string} transactionType - Expected transaction type
     * @param {string} balanceAfter - Expected balance after transaction
     * @param {string} description - Expected description
     * @returns {Promise<void>}
     * 
     * @example
     * await transactionsPage.verifyTransactionInTable('Withdrawal', '$4,000.00', 'ATM withdrawal');
     */
    async verifyTransactionInTable(
        transactionType: string,
        balanceAfter: string,
        description: string
    ): Promise<void> {
        // Get all rows in the transactions table body
        const rows = await this.transactionsPageElements.transactionsTBody.locator('tr').all();
        
        let transactionFound = false;
        
        // Loop through each row to find the matching transaction
        for (const row of rows) {
            const rowText = await row.innerText();
            
            // Check if this row contains all three values: transaction type, balance, and description
            if (rowText.includes(transactionType) && 
                rowText.includes(balanceAfter) && 
                rowText.includes(description)) {
                
                transactionFound = true;
                
                // Use column indices to get specific cells (more reliable than getByText)
                // Based on table structure: ID | Date | Type | Account | Amount | Balance After | Description
                const typeCell = row.locator('td').nth(2);           // Column 3 - Type
                const balanceCell = row.locator('td').nth(5);        // Column 6 - Balance After
                const descriptionCell = row.locator('td').nth(6);    // Column 7 - Description
                
                // Validate each cell contains the expected text (use validate for text content, not validateValue)
                await this.helper.validate(typeCell, `✓ Transaction type "${transactionType}" found in row`);
                await this.helper.validate(balanceCell, `✓ Balance "${balanceAfter}" found in same row`);
                await this.helper.validate(descriptionCell, `✓ Description "${description}" found in same row`);
                
                // Additional text content verification
                const typeCellText = await typeCell.innerText();
                const balanceCellText = await balanceCell.innerText();
                const descriptionCellText = await descriptionCell.innerText();
                
                if (!typeCellText.includes(transactionType)) {
                    throw new Error(`Type mismatch: Expected "${transactionType}", got "${typeCellText}"`);
                }
                if (!balanceCellText.includes(balanceAfter)) {
                    throw new Error(`Balance mismatch: Expected "${balanceAfter}", got "${balanceCellText}"`);
                }
                if (!descriptionCellText.includes(description)) {
                    throw new Error(`Description mismatch: Expected "${description}", got "${descriptionCellText}"`);
                }
                
                console.log(`✅ Transaction validated successfully in the same row:`);
                console.log(`   Type: ${transactionType}`);
                console.log(`   Balance After: ${balanceAfter}`);
                console.log(`   Description: ${description}`);
                
                break; // Exit loop once transaction is found
            }
        }
        
        // If transaction was not found in any row, throw an error
        if (!transactionFound) {
            throw new Error(
                `❌ Transaction not found in table with matching details:\n` +
                `   Expected Type: ${transactionType}\n` +
                `   Expected Balance: ${balanceAfter}\n` +
                `   Expected Description: ${description}\n` +
                `   Please verify that all three values exist in the same row.`
            );
        }
    }

    /**
     * Get the total count of transactions displayed in the table
     * @returns {Promise<number>} Count of transaction rows
     */
    async getTransactionCount(): Promise<number> {
        const rows = await this.transactionsPageElements.transactionsTBody.locator('tr').count();
        return rows;
    }

    /**
     * Click the Cancel button to close the transaction modal without submitting
     * @returns {Promise<void>}
     */
    async cancelTransaction(): Promise<void> {
        await this.helper.clickElement(this.transactionsPageElements.cancelButton, 'Clicked Cancel button');
    }

    /**
     * Close the transaction modal using the X button
     * @returns {Promise<void>}
     */
    async closeTransactionModal(): Promise<void> {
        await this.helper.clickElement(this.transactionsPageElements.modalCloseButton, 'Clicked modal close button (X)');
    }
}
