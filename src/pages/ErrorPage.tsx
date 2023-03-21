import {Link, useRouteError, useNavigate} from "react-router-dom";
import {ArrowLeftIcon, HomeIcon} from "@heroicons/react/24/solid";

export const ErrorPage = () => {

    const error = useRouteError() as any;
    console.log('error', error)

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="error">
            <h1>Something went wrong</h1>
            <p>
                {error?.message || error?.statusText || 'Something went wrong'}
            </p>

            <div className="flex-md">

                <button onClick={goBack} className="btn btn--dark">
                   <ArrowLeftIcon width={20} /> Go back
                </button>

                <Link to={'/'}>
                    <button className="btn btn--dark">
                       <HomeIcon width={20} /> Go Home
                    </button>
                </Link>

            </div>


        </div>
    );
}