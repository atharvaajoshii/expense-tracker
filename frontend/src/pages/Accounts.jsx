import React, { useEffect, useState } from 'react'
import { deleteAccount, getAccounts } from "../services/accountsService"
import { Link, useNavigate, useParams } from 'react-router-dom'


function Accounts() {
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        fetchAccounts();
    }, [])

    const fetchAccounts = async () => {
        try {
            const result = await getAccounts();
            setAccounts(result)
        } catch (error) {
            console.error("Failed to fetch accounts:", error);
        } finally {
            setLoading(false)
        }
    }
    const addAccount = () => {
        navigate("/add-account")
    }

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }
    const handleDelete = async (accountId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this account?"
        );

        if (!confirmed) return;

        try {
            await deleteAccount(accountId);
            fetchAccounts();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete account");
        }
    };


    return (
        <div>
            <h1>Accounts</h1>
            <button onClick={addAccount}>add bank account</button>
            <div className="accounts">
                {accounts.length === 0 ? (
                    <div>
                        <p>No accounts yet</p>
                        <Link to="/add-account">Add one</Link>
                    </div>
                ) : (
                    accounts.map((account) => (
                        <div key={account.account_id}>
                            <h3>{account.account_type}</h3>
                            <h4>{account.account_name}</h4>
                            <span>{account.balance}</span>
                            <Link to={`/edit/${account.account_id}`}>edit </Link>
                            <button onClick={() => handleDelete(account.account_id)}>
                                Delete
                            </button>
                        </div>
                    ))
                )}
                <Link to="/profile">back</Link>
            </div>
        </div>
    )
}

export default Accounts