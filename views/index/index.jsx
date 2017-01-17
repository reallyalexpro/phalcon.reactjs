let mountNode = document.getElementById("page");

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
      this.state = {page: 1, users: [], total: 0, loading: false};
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
      this.serverRequest = $.get("/index/getusers/" + page, function (users) {
          this.setState({
              users: users.items,
              total: users.total_pages,
              loading: false

          });
      }.bind(this));
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
            <Table responsive>
              <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
              </tr>
              </thead>
              <tbody>
              {rows}
              </tbody>
            </Table>

            {spinner}

            <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={this.state.total}
                maxButtons={5}
                activePage={this.state.page}
                onSelect={this.handleSelect} />
          </div>
      )
  }
}

class Page extends React.Component {
    render() {
      return (
        <Grid>
          <Navbar className="menu" collapseOnSelect>
            <NavbarHeader>
              <NavbarToggle />
              <div className="clearfix"/>
            </NavbarHeader>
            <NavbarCollapse>
              <Nav>
                <NavDropdown eventKey={3} title="About" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} href="/about">About</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3} disabled="true">Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
                <MenuItem eventKey={2} href="/products">Products</MenuItem>
              </Nav>
              <Nav pullRight>
                <MenuItem eventKey={2} href="/contacts">Contacts</MenuItem>
              </Nav>
            </NavbarCollapse>
          </Navbar>

          <TableAdvanced/>

        </Grid>
      )
    }
}
ReactDOM.render(<Page/>, mountNode);