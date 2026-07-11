import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { createAccount } from "../services/accountsService";

function AddAccount() {
    const [accountName, setAccountName] = useState("");
    const [accountType, setAccountType] = useState("");
    const [accountBalance, setAccountBalance] = useState("");
    const navigate = useNavigate();

    const handleAddAccount = async (e) => {
        e.preventDefault();
        console.log({
            accountName,
            accountType,
            accountBalance,
        });
        try {
            await createAccount({
                account_name: accountName,
                account_type: accountType,
                balance: Number(accountBalance),
            });
            navigate("/accounts")

        } catch (error) {
            alert(error.response?.data?.message || "failed")
        }
    }

    return (
        <div>
            <h1>Add bank Account</h1>
            <form onSubmit={handleAddAccount}>
                <label>Account Name</label>
                <input type="text" name="accountName" placeholder="Eg. HDFC Savings" value={accountName}
                    onChange={(e) => setAccountName(e.target.value)} required />
                <br /><br />

                <label>Account Type</label>
                <select value={accountType} onChange={(e) => setAccountType(e.target.value)} required>
                    <option value="">Select Type</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Wallet">Wallet</option>
                </select><br /><br />

                <label>Account balance</label>
                <input type="number" name="accountName" placeholder="Eg. HDFC Savings" value={accountBalance}
                    onChange={(e) => setAccountBalance(e.target.value)} required />
                <br /><br />
                <br /><br />
                <button type="submit">add account</button>
            </form>
        </div>
    );
}

export default AddAccount;