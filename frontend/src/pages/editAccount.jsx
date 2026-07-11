import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editAccount, getAccount } from "../services/accountsService";



function EditAccount() {

    const { id } = useParams();
    const [accountName, setAccountName] = useState("");
    const [accountType, setAccountType] = useState("");
    const [accountBalance, setAccountBalance] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const account = await getAccount(id);

                setAccountName(account.account_name);
                setAccountType(account.account_type);
                setAccountBalance(account.balance);
            } catch (error) {
                alert(error.response?.data?.message || "Failed to load account");
            }
        }
        fetchAccount();
    }, [id])

    const handleEditAccount = async (e) => {
        e.preventDefault();
        try {
            await editAccount(id, {
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
            <h1>Edit account details</h1>
            <form onSubmit={handleEditAccount}>
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
                <button type="submit">update account</button>
            </form>

        </div>
    )
}
export default EditAccount;