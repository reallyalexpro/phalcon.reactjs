class Spinner extends React.Component {
    render() {
        return (
            <div className="wait">
                <i className="fa fa-spinner fa-pulse"/>
            </div>
        );
    }
}

class UserRow extends React.Component {
    render() {
        return (
            <tr key={this.props.user.id}>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.username}</td>
            </tr>
        )
    }
}

const form = (
    <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
                Email
            </Col>
            <Col sm={10}>
                <FormControl type="email" placeholder="Email" required/>
            </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
                Password
            </Col>
            <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
            </Col>
        </FormGroup>

        <FormGroup>
            <Col smOffset={2} sm={10}>
                <Checkbox>Remember me</Checkbox>
            </Col>
        </FormGroup>

        <FormGroup>
            <Col smOffset={2} sm={10}>
                <Button type="submit">
                    Sign in
                </Button>
            </Col>
        </FormGroup>
    </Form>
);

const modal = (
    <div>
        <Button
            bsStyle="primary"
            bsSize="large"

        >
            Launch demo modal
        </Button>

        <Modal>
            <ModalHeader closeButton>
                <ModalTitle>Modal heading</ModalTitle>
            </ModalHeader>
            <ModalBody>
                {form}
            </ModalBody>
            <ModalFooter>
                <Button>Close</Button>
            </ModalFooter>
        </Modal>
    </div>
);

class TableAdvanced extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        /*this.open = this.open.bind(this);
        this.close = this.close.bind(this);*/
        
        var users = props.users ? props.users : [];
        if(users) {
            var totalPages = Math.round(users.length / 4);
            users = users.slice(0, 4);
            this.state = {page: 1, users: users, total: totalPages, loading: false};
        } else {
            this.state = {page: 1, loading: true}
        }
    }

    handleSelect(eventKey) {
        this.load(eventKey);
        this.setState({
            page: eventKey
        });
    }

    load(page) {
        this.setState({
            loading: true
        });
        this.serverRequest = $.get(this.props.url + page, function (users) {
            this.setState({
                users: users.items,
                total: users.total_pages,
                loading: false

            });
        }.bind(this));
    }

    /*close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }*/

    componentDidMount() {
        this.load(this.state.page);
    }

    render() {
        let rows = this.state.users.map(
            (user) => <UserRow user={user} key={user.id} />
        );

        let spinner = null;
        if (this.state.loading) {
            spinner = <Spinner key="spinner" />;
        }

        /*const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip">
                wow.
            </Tooltip>
        );*/

        return (
            <div>
                <Table responsive className="dataTable" key="dataTable">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                    {spinner}
                </Table>

                <Pagination key="Pagination"
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={this.state.total}
                    maxButtons={3}
                    activePage={this.state.page}
                    onSelect={this.handleSelect}/>
            </div>
        )
    }
}

class Ready extends React.Component {

}