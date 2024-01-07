import { Button, Container } from "react-bootstrap";
import { checkUpdateStatus, reloadDynamo } from "../util/fetchers";
import { useEffect, useState } from "react";
import TournamentsPage from "./Tournamentspage";




const Adminpage = () => {
    // TODO can we generalize this?
    // only inputs are endpoint to UPDATE and endpoint to check completion
    const [INITIAL, READY, KICKED_OFF, IN_PROG] = [1, 2, 3, 4];
    const [updateStatus, setUpdateStatus] = useState(INITIAL);
    const [tick, setTick] = useState(0);
    const delayedTick = () => {
        setTimeout(() => {
            setTick(tick + 1)
        }, 1000)
    };

    const cb: React.MouseEventHandler = async (event) => {
        setUpdateStatus(KICKED_OFF);  // This should trigger a rerender
        reloadDynamo();
    }

    const pollUpdateStatus = async () => {

        const resp = await checkUpdateStatus();

        if (updateStatus === INITIAL) {
            if ('status' in resp) {
                if (resp.status === 'update_in_progress') {
                    setUpdateStatus(IN_PROG);
                }
                else if (resp.status === 'update_complete') {
                    setUpdateStatus(READY);
                }
            } else {
                console.log('Unknown update status. Setting to ready.');
                setUpdateStatus(READY);
            }
        } else if (updateStatus === KICKED_OFF) {
            if ('status' in resp) {
                if (resp.status === 'update_in_progress') {
                    setUpdateStatus(IN_PROG);
                    return;
                }

            }
            delayedTick()
        } else if (updateStatus === IN_PROG) {
            if ('status' in resp) {
                if (resp.status === 'update_complete') {
                    setUpdateStatus(READY);
                    return;
                }
            }
            delayedTick();
        }
    }

    // Poll status would be nice
    if (updateStatus !== READY) {
        pollUpdateStatus();
    }

    return <Container>
        <h1>
            Admin panel
        </h1>
        <Container>
            {
                updateStatus === INITIAL ?
                    (
                        <Container>
                            Checking for current run
                        </Container>

                    )
                    : null
            }
            {
                updateStatus === READY ?
                    (
                        <Button onClick={cb}>
                            Run update
                        </Button>
                    )
                    : null
            }
            {
                updateStatus === KICKED_OFF ?
                    (
                        <Container>
                            Starting load
                        </Container>

                    ) : null
            }
            {
                updateStatus === IN_PROG ?
                    (
                        <Container>
                            Load in progress, awaiting completion
                        </Container>

                    ) : null
            }

        </Container>
        <TournamentsPage isAdminPage={true}/>
    </Container>
}



export default Adminpage;