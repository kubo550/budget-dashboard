import {Expense} from "../pages/Dashboard";
import {ExpenseItem} from "./ExpenseItem";

interface ExpensesProps {
    expenses: Expense[];
}

const tableHeaders = ['Expense', 'Amount', 'Date', 'Budget', 'Action'];

export const Expenses: React.FC<ExpensesProps> = ({expenses}) => {
    return (
        <div className="table">
            <table>
                <thead>
                <tr>
                    {tableHeaders.map((header) => <th key={header}>{header}</th>)}
                </tr>
                </thead>
                <tbody>
                {expenses.map((spending) => <ExpenseItem expense={spending} key={spending.id}/>)}
                </tbody>
            </table>

        </div>
    );
}