import { Button, Container } from "react-bootstrap";
import { checkUpdateStatus, reloadDynamo } from "../util/fetchers";
import { useEffect, useState } from "react";




function Adminpage() {

    const [INITIAL, READY, KICKED_OFF, IN_PROG] = [1, 2, 3, 4];
    const [updateStatus, setUpdateStatus] = useState(INITIAL);


    let mockCount = 0;

    const cb: React.MouseEventHandler = (event) => {
        console.log('click');
        setUpdateStatus(KICKED_OFF);
        // reloadDynamo();
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

    const checkUpdate = async () => {
        const resp = await checkUpdateStatus();
        if ('status' in resp) {
            if (resp.status === 'update_in_progress') {
                setUpdateStatus(IN_PROG);
            }
        }
    }

    const pollUpdateStatus = async () => {
        const resp = await mocker();
        if (resp === IN_PROG) {
            if (updateStatus !== IN_PROG) {
                setUpdateStatus(IN_PROG);
            }
            pollUpdateStatus();
        } else if (resp === READY) {
            if (updateStatus !== READY) {
                setUpdateStatus(READY);
            }
        }

        console.log('checked');
    }

    // Poll status would be nice
    if (updateStatus === INITIAL) {
        pollUpdateStatus();
    }

    console.log('status', updateStatus);
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
                            Load in progrss, awaiting completion
                        </Container>

                    ) : null
            }

        </Container>


    </Container>
}



export default Adminpage;