import { Button, Container } from "react-bootstrap";
import { checkUpdateStatus, reloadDynamo } from "../util/fetchers";
import { useEffect, useState } from "react";




function Adminpage() {

    const [INITIAL, READY, KICKED_OFF, IN_PROG] = [1, 2, 3, 4];
    const [updateStatus, setUpdateStatus] = useState(INITIAL);
    const [tick, setTick] = useState(0);


    let mockCount = 0;
    console.log('current state', updateStatus)
    const cb: React.MouseEventHandler = async (event) => {
        console.log('click');
        setUpdateStatus(KICKED_OFF);  // This should trigger a rerender
        reloadDynamo();
    }

    const mocker = () => new Promise((res) => {
        setTimeout(() => {
            mockCount += 1;
            if (mockCount >= 3) {
                console.log('ready')
                res(READY);
            } else {
                res(IN_PROG);
            }
        }, 1000);
    });


    const pollUpdateStatus = async () => {

        const resp = await checkUpdateStatus();
        console.log('Running poll', updateStatus, resp)

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
                }
            }
            setTick(tick + 1);
        } else if (updateStatus === IN_PROG) {
            if ('status' in resp) {
                if (resp.status === 'update_complete') {
                    setUpdateStatus(READY);
                }
            }
            setTick(tick + 1);
        }
        console.log('checked');
    }

    // Poll status would be nice
    if (updateStatus !== READY) {
        pollUpdateStatus();
    }

    return <Container>
        <Container>
            Admin panel
        </Container>
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


    </Container>
}



export default Adminpage;