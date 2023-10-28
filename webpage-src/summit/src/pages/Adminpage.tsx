import { Button, Container } from "react-bootstrap";
import { checkUpdateStatus, reloadDynamo } from "../util/fetchers";
import { useEffect, useState } from "react";




function Adminpage() {

    const [READY, KICKED_OFF, IN_PROG] = [1, 2, 3];
    const [updateStatus, setUpdateStatus] = useState(READY);
    const [updateTime, setUpdateTime] = useState('');
    const cb: React.MouseEventHandler = (event) => {
        console.log('click');
        setUpdateStatus(KICKED_OFF);
        reloadDynamo(setUpdateTime);
    }


    const checkUpdate = async () => {
        const resp = await checkUpdateStatus();
        if ('status' in resp) {
            if (resp.status === 'update_in_progress') {
                setUpdateStatus(IN_PROG);
            }
        }
    }
    if (updateStatus !== IN_PROG) {
        checkUpdate();
    } 
    // Poll status would be nice
    //pollUpdateStatus();

    return <Container>
        <Container>
            Admin panel
        </Container>
        <Container>
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
                            Load started, awaiting completion
                        </Container>

                    ) : null
            }

        </Container>


    </Container>
}



export default Adminpage;