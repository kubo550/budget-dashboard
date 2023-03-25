import {Expense} from "../pages/Dashboard";
import {toConcurrency} from "./BudgetItem";
import moment from "moment/moment";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/20/solid";
import {Link, useFetcher} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBudgetById} from "../helpers/fetchData";

interface ExpenseItemProps {
    expense: Expense;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({expense}) => {

    const [bugetName, setBugetName] = useState('');

    const {Form} = useFetcher();
    useEffect(() => {
        (async () => {
            const budget = await getBudgetById(expense.budgetId);
            setBugetName(budget.name);
        })()
    }, [expense.budgetId]);

    return (
        <tr key={expense.id}>
            <td>{expense.name}</td>
            <td>{toConcurrency(expense.amount)}</td>
            <td>{moment(expense.createdAt).format('YYYY/MM/DD HH:mm')}</td>
            <td>
                <Link to={`/budget/${expense.budgetId}`}>
                    {bugetName}
                </Link>
            </td>
            <td style={{display: 'flex'}}>
                <Link to={`/expense/${expense.id}`}>
                    <ArrowTopRightOnSquareIcon width={20}/>
                </Link>

                <Form method="post">
                    <input type="hidden" value={expense.id} name="id"  />
                    <button type="submit" name="_action" value="deleteExpense">
                        <TrashIcon width={20}/>
                    </button>
                </Form>
            </td>

        </tr>
    )
        ;
}