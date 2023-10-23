import { Button, Container } from "react-bootstrap";
import { reloadDynamo } from "../util/fetchers";




function Adminpage() {
    return <Container>
        <Container>
            Admin panel
        </Container>
        <Container>
            <Button onClick={cb}>
                Run update
            </Button>
        </Container>


    </Container>
}

const cb: React.MouseEventHandler = (event) => {
    console.log('click');
    reloadDynamo();

}

export default Adminpage;