import {Budget, Expense} from "../pages/Dashboard";
import {v4 as uuidv4} from "uuid";
import moment from "moment/moment";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchData
    = async <T extends object>(key: string) => {
    const data = localStorage.getItem(key) || '';
    try {
        const parsed = JSON.parse(data) as unknown as Promise<T>;
        console.log(key, ': ',parsed)
        return parsed;
    } catch (e) {
        console.log(e)
        return null;
    }
}


export function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export async function addBudget(budget: { name: string, amount: number }) {

    const newBudget = {
        id: uuidv4(),
        name: budget.name,
        amount: budget.amount,
        createdAt: moment().format(),
        color: generateRandomColor()
    }

    const budgets = await fetchData<Budget[]>('budgets') || [];
    await saveData('budgets', [...budgets, newBudget]);
}

export async function removeBudget(budgetId: string) {
    const budgets = await fetchData('budgets') as Budget[];
    await saveData('budgets', budgets.filter((budget) => budget.id !== budgetId));
}

export const removeItem = async (key: string) => {
    localStorage.removeItem(key);
}

export const saveData = async (key: string, data: any) => {
    // await wait(700)
    localStorage.setItem(key, JSON.stringify(data));
}

export const calculateSpendingByBudgetId = async (budgetId: string) => {
    const expenses = (await fetchData('expenses') || []) as Expense[];
    const filteredSpendings = expenses.filter((spending) => spending.budgetId === budgetId);
    return filteredSpendings.reduce((acc, spending) => acc + spending.amount, 0);
}

export const getBudgetById = async (budgetId: string): Promise<Budget> => {
    const budgets = (await fetchData('budgets') || []) as any[];
    return budgets.find((budget) => budget.id === budgetId) || {};
}