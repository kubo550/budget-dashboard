import {Form} from "react-router-dom";
import {UserPlusIcon} from "@heroicons/react/24/solid";

import illustration from "../assets/illustration.jpg";

export const Intro: React.FC = () => {
    return (
        <div className="intro">
            <div>
                <h1>
                    Take control of <span className="accent">your finances</span>
                </h1>


                <p>
                    HomeBudget is a simple app that helps you track your expenses and income. Start Your journey today!
                </p>

                <Form method="post" >
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        aria-label="Enter your username"
                        autoComplete="given-name"
                        required
                    />
                    <input type="hidden" name="_action" value="createUser" />
                    <button type="submit" className="btn btn--dark">
                            Get started <UserPlusIcon width={20}/>
                    </button>
                </Form>
            </div>
            <img src={illustration} alt="Person with money" width={600} />

        </div>
    );
}