import {Budget} from "../pages/Dashboard";
import {Form, useFetcher} from "react-router-dom";
import {useEffect, useRef} from "react";

interface AddExpenseFormProps {
    budgets: Budget[];
}

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({budgets}) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === 'submitting';

    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (isSubmitting && formRef.current) {
                formRef.current.reset();
                inputRef.current?.focus();
            }
        };
    }, [isSubmitting]);


    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Add a new expense
                {budgets.length === 1 && (
                    <>
                        <span className="accent"> to {budgets[0].name}</span> {" "}
                        budget
                    </>
                )}
            </h2>

            <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                <div className="expense-inputs">
                    <div className="grid-sm">


                        <label htmlFor="name">Expense name</label>
                        <input type="hidden" name="_action" value="createExpense"/>

                        <input
                            ref={inputRef}
                            type="text"
                            name="name"
                            id={"name"}
                            placeholder="Enter expense name"
                            aria-label="Enter expense name"
                            autoComplete="given-name"
                            required
                        />
                        <label htmlFor="amount">Expense amount</label>
                        <input
                            type="number"
                            name="amount"
                            id={"amount"}
                            placeholder="Enter expense amount"
                            aria-label="Enter expense amount"
                            autoComplete="given-name"
                            required
                            inputMode="decimal"
                        />
                        <label htmlFor="budget">Budget</label>
                        {
                            budgets.length > 0 && (
                                <select name="budget" id="budget">
                                    {budgets.map(budget => (
                                        <option key={budget.id} value={budget.id}>{budget.name}</option>
                                    ))}
                                </select>
                            )

                        }

                        <button type="submit" className="btn btn--dark">
                            Add expense
                        </button>
                    </div>
                </div>
            </fetcher.Form>


        </div>
    );
}