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

class TableAdvanced extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.state = {page: 1, users: [], total: 0, loading: false, showModal: false};
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

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    componentDidMount() {
        this.load(this.state.page);
    }

    render() {
        let rows = this.state.users.map(
            (user) => <UserRow user={user}/>
        );

        let spinner = null;
        if (this.state.loading) {
            spinner = <Spinner />;
        }

        return (
            <div>
                <Table responsive className="dataTable">
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

                <Pagination
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

                <br/>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >
                    Launch demo modal
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <ModalHeader closeButton>
                        <ModalTitle>Modal heading</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <h4>Text in a modal</h4>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                        <hr />

                        <h4>Overflowing text to show scroll behavior</h4>
                        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.close}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
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

ReactDOM.render(<TableAdvanced url="/index/getusers/"/>, document.getElementById("table"));
ReactDOM.render(form, document.getElementById("form"));