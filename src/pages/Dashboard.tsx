import {ActionFunctionArgs, redirect, useFetcher, useLoaderData} from "react-router-dom";
import {fetchData, saveData} from "../helpers/FetchData";
import {Intro} from "../components/Intro";
import {toast} from "react-toastify";
import {AddBudgetForm} from "../components/AddBudgetForm";
import {v4 as uuidv4} from 'uuid';
import moment from "moment";
import {AddExpenseForm} from "../components/AddExpenseForm";

export type Budget = { id: string, name: string, amount: number, createdAt: string, color: string }

export function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

async function addBudget(budget: { name: string, amount: number }) {

    const newBudget = {
        id: uuidv4(),
        name: budget.name,
        amount: budget.amount,
        createdAt: moment().format(),
        color: generateRandomColor()
    }

    const budgets = await fetchData('budgets');
    await saveData('budgets', [...budgets, newBudget])
}

const addExpense = async (expense: { budgetId: string, name: string, amount: number }) => {
    const newExpense = {
        id: uuidv4(),
        name: expense.name,
        amount: expense.amount,
        createdAt: moment().format(),
        budgetId: expense.budgetId
    }

    const expenses = await fetchData('expenses') || [];
    await saveData('expenses', [...expenses, newExpense])

}

export const dashboardLoader = async () => {
    const username = await fetchData('username');
    const budgets = await fetchData('budgets');

    return {
        username,
        budgets
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

            return redirect('/');

        } catch (e) {
            console.error(e);
            toast.error('Something went wrong');

        }
    }

}


export const Dashboard: React.FC = () => {
    const {username, budgets} = useLoaderData() as { username: string, budgets: Budget[] };
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