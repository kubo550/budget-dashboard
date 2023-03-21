import {Form, NavLink} from "react-router-dom";
import logo from '../assets/logomark.svg';
import {TrashIcon} from "@heroicons/react/24/solid";

interface NavProps {
    username: string | null;
}

export const Nav: React.FC<NavProps> = ({username}) => {

    return (
        <nav>
            <NavLink to={'/'}
                     aria-label={'Go to home'}
            >
                <img src={logo} alt={'logo'}/>
                <span>
                    HomeBudget
                </span>
            </NavLink>

            {
                username ? (
                    <Form method="post" action="/logout" onSubmit={e => {
                        if (!window.confirm('Are you sure you want to logout?')) {
                            e.preventDefault();
                        }
                    }}>
                        <button type={'submit'} className="btn btn--warning">
                            <span>
                                Delete account
                            </span>
                            <TrashIcon width={20}/>
                        </button>

                    </Form>
                ) : (
                    <NavLink to={'/login'}
                             aria-label={'Go to login'}
                    >
                        <span>
                            Login
                        </span>
                    </NavLink>

                )
            }
        </nav>
    );
}