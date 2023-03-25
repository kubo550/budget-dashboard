import {Outlet, useLoaderData} from "react-router-dom";
import bgWave from "../assets/wave.svg";
import {Nav} from "../components/Nav";
import {fetchData} from "../helpers/fetchData";


export const mainLoader = async () => {
    const username = await fetchData('username');
    return {
        username
    }
}
export const Main: React.FC = () => {

    const {username} = useLoaderData() as { username: string };

    return (
        <div className="layout">
            <Nav username={username}/>
            <main>

                <Outlet/>

            </main>
            <img src={bgWave} alt="background wave"/>
        </div>
    );
}