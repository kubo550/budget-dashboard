import {  useFetcher} from "react-router-dom";
import {CurrencyDollarIcon} from "@heroicons/react/24/solid";
import {useEffect, useRef} from "react";

export const AddBudgetForm: React.FC = () => {
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
                Add a new budget
            </h2>

            <fetcher.Form ref={formRef} method="post" className="grid-sm">
                <label htmlFor="name">Budget name</label>
                <input type="hidden" name="_action" value="createBudgets" />
                <input
                    ref={inputRef}
                    type="text"
                    name="name"
                    id={"name"}
                    placeholder="Enter budget name"
                    aria-label="Enter budget name"
                    autoComplete="given-name"
                    required
                />
                <label htmlFor="amount">Budget amount</label>
                <input
                    type="number"
                    name="amount"
                    id={"amount"}
                    placeholder="Enter budget amount"
                    aria-label="Enter budget amount"
                    autoComplete="given-name"
                    required
                    inputMode="decimal"
                />

                <button type="submit" className="btn btn--dark" disabled={isSubmitting }>
                    {isSubmitting ? 'Adding...' : 'Add budget'}
                     <CurrencyDollarIcon width={20}/>
                </button>
            </fetcher.Form>


        </div>
    );
}