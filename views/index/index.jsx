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
      this.serverRequest = $.get(this.props.url + page, function (users) {
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
                maxButtons={5}
                activePage={this.state.page}
                onSelect={this.handleSelect} />
          </div>
      )
  }
}