import {Budget} from "../pages/Dashboard";
import {calculateSpendingByBudgetId} from "../helpers/fetchData";
import {useEffect, useState} from "react";

interface BudgetItemProps {
    budget: Budget;
}

export function toConcurrency(value: number) {
    return value.toLocaleString(undefined, {
        currency: 'USD',
        style: 'currency',
    })
        .replace('US', '')
}

export const BudgetItem: React.FC<BudgetItemProps> = ({budget}) => {

    const [spents, setSpents] = useState(0);
    const [loading, setLoading] = useState(true);
    const [_, setError] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                const spents = await calculateSpendingByBudgetId(budget.id);
                setSpents(spents);
                setError('')
            } catch (error) {
                setError('Error while loading data');
            } finally {
                setLoading(false);
            }
        })()
    }, [budget.id]);

    const isUnderBudget = spents > budget.amount;

    return (
        <div className="budget">
            <div className="progress-text">
                <h3>{budget.name}</h3>
                <p>{toConcurrency(budget.amount)} Budgeted</p>
            </div>

            <progress value={spents} max={budget.amount}/>

            <div className="progress-text">
                {
                    loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <small>{toConcurrency(spents)} spent</small>
                            <small style={{color: isUnderBudget ? 'red' : ''}}>{toConcurrency(budget.amount - spents)} remaining</small>
                        </>
                    )
                }
            </div>
        </div>
    );
}