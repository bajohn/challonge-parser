import { Button, Container } from "react-bootstrap";
import { checkUpdateStatus, reloadDynamo } from "../util/fetchers";
import { useEffect, useState } from "react";
import TournamentsPage from "./Tournamentspage";
import AsyncTaskRunner from "../components/AsyncTaskRunner";


const Adminpage = () => {
    return <Container>
        <h1>
            Admin panel
        </h1>
        <Container>
            <AsyncTaskRunner runUpdate={reloadDynamo} checkType={'challonge-full-reload'}/>
        </Container>
        <TournamentsPage isAdminPage={true}/>
    </Container>
}



export default Adminpage;