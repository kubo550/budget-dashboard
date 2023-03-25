import {ActionFunctionArgs, redirect, useLoaderData} from "react-router-dom";
import {addBudget, fetchData, saveData} from "../helpers/fetchData";
import {Intro} from "../components/Intro";
import {toast} from "react-toastify";
import {AddBudgetForm} from "../components/AddBudgetForm";
import {v4 as uuidv4} from 'uuid';
import moment from "moment";
import {AddExpenseForm} from "../components/AddExpenseForm";
import {BudgetItem} from "../components/BudgetItem";
import {Expenses} from "../components/Expenses";

export type Budget = { id: string, name: string, amount: number, createdAt: string, color: string }


export type Expense = { budgetId: string, name: string, amount: number, id: string, createdAt: string };
const addExpense = async (expense: { budgetId: string, name: string, amount: number }) => {
    const newExpense = {
        id: uuidv4(),
        name: expense.name,
        amount: expense.amount,
        createdAt: moment().format(),
        budgetId: expense.budgetId
    }

    const expenses = await fetchData<Expense[]>('expenses') || [];
    await saveData('expenses', [...expenses, newExpense])

}

export const dashboardLoader = async () => {
    const username = await fetchData('username');
    const budgets = await fetchData('budgets');
    const expenses = await fetchData('expenses') as Expense[];

    console.log('i have expenses', expenses)
    return {
        username,
        budgets,
        expenses
    }
}

export const dashboardAction = async (args: ActionFunctionArgs) => {
    const data = await args.request.formData();

    const _action = data.get('_action');

    if (_action === 'createBudgets') {

        const name = data.get('name');
        const amount = data.get('amount');

        try {
            await addBudget({name: name as string, amount: Number(amount)})
            toast.success('Budget added');

            return redirect('/');

        } catch (e) {
            console.error(e);
            toast.error('Something went wrong');
        }


    } else if (_action === 'createUser') {
        const username = data.get('username');
        try {
            await saveData('username', username as string)
            return toast.success('Welcome to HomeBudget');

        } catch (e) {
            console.error(e);
            toast.error('Something went wrong');
        }
    } else if (_action === 'createExpense') {
        const budgetId = data.get('budget') as string;
        const name = data.get('name') as string;
        const amount = data.get('amount') as string;

        try {
            await addExpense({
                budgetId,
                name,
                amount: +amount
            });

            return toast.success('Expense added');

        } catch (e) {
            console.error(e);
            toast.error('Something went wrong');

        }
    } else if (_action === 'deleteExpense') {
        const id = data.get('id') as string;
        const expenses = await fetchData<Expense[]>('expenses') || [];
        const newExpenses = expenses.filter(expense => expense.id !== id);

        await saveData('expenses', newExpenses);

        toast.success('Expense deleted');
        return redirect('/');

    }
}


export const Dashboard: React.FC = () => {
    const {
        username,
        budgets,
        expenses
    } = useLoaderData() as { username: string, budgets: Budget[], expenses: Expense[] };

    const sortedExpenses = expenses.sort((a, b) => {
        return moment(b.createdAt).diff(moment(a.createdAt))
    });
    return (
        <div>
            {
                username ? (
                    <div className="dashboard">
                        <h1>Welcome back, <span className={"accent"}>{username}</span></h1>
                        <div className="grid-sm">
                            {
                                budgets?.length > 0 ? (
                                    <div className="grid-lg">
                                        <div className="flex-lg">
                                            <AddBudgetForm/>
                                            <AddExpenseForm budgets={budgets}/>
                                        </div>
                                        <h2>My Budgets</h2>

                                        <div className="budgets">
                                            {
                                                budgets.map(budget => (
                                                    <BudgetItem budget={budget} key={budget.id}/>
                                                ))
                                            }
                                        </div>

                                        {
                                            expenses.length > 0 && (
                                                <div className="grid-sm">
                                                    <h2>Recent Expenses</h2>
                                                    <Expenses expenses={sortedExpenses.splice(0, 5)}/>
                                                </div>
                                            )
                                        }

                                    </div>
                                ) : (
                                    <div className="grid-sm">
                                        <p>
                                            Personal finance is the financial management which an individual or a family
                                            unit.
                                        </p>
                                        <p>
                                            Create a budget to get started.
                                        </p>
                                        <AddBudgetForm/>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                ) : (
                    <Intro/>
                )
            }

        </div>
    );
}