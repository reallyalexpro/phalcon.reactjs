let mountNode = document.getElementById("page");

class Spinner extends React.Component {
    render() {
        return React.createElement(
            "div",
            { className: "wait" },
            React.createElement("i", { className: "fa fa-spinner fa-pulse" })
        );
    }
}

class UserRow extends React.Component {
    render() {
        return React.createElement(
            "tr",
            { key: this.props.user.id },
            React.createElement(
                "td",
                null,
                this.props.user.id
            ),
            React.createElement(
                "td",
                null,
                this.props.user.username
            )
        );
    }
}

class TableAdvanced extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = { page: 1, users: [], total: 0, loading: false };
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
        let rows = this.state.users.map(user => React.createElement(UserRow, { user: user }));

        let spinner = null;
        if (this.state.loading) {
            spinner = React.createElement(Spinner, null);
        }

        return React.createElement(
            "div",
            null,
            React.createElement(
                Table,
                { responsive: true },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "#"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Username"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    rows
                )
            ),
            spinner,
            React.createElement(Pagination, {
                prev: true,
                next: true,
                first: true,
                last: true,
                ellipsis: true,
                boundaryLinks: true,
                items: this.state.total,
                maxButtons: 5,
                activePage: this.state.page,
                onSelect: this.handleSelect })
        );
    }
}

class Page extends React.Component {
    render() {
        return React.createElement(
            Grid,
            null,
            React.createElement(
                Navbar,
                { className: "menu", collapseOnSelect: true },
                React.createElement(
                    NavbarHeader,
                    null,
                    React.createElement(NavbarToggle, null),
                    React.createElement("div", { className: "clearfix" })
                ),
                React.createElement(
                    NavbarCollapse,
                    null,
                    React.createElement(
                        Nav,
                        null,
                        React.createElement(
                            NavDropdown,
                            { eventKey: 3, title: "About", id: "basic-nav-dropdown" },
                            React.createElement(
                                MenuItem,
                                { eventKey: 3.1, href: "/about" },
                                "About"
                            ),
                            React.createElement(
                                MenuItem,
                                { eventKey: 3.2 },
                                "Another action"
                            ),
                            React.createElement(
                                MenuItem,
                                { eventKey: 3.3, disabled: "true" },
                                "Something else here"
                            ),
                            React.createElement(MenuItem, { divider: true }),
                            React.createElement(
                                MenuItem,
                                { eventKey: 3.3 },
                                "Separated link"
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 2, href: "/products" },
                            "Products"
                        )
                    ),
                    React.createElement(
                        Nav,
                        { pullRight: true },
                        React.createElement(
                            MenuItem,
                            { eventKey: 2, href: "/contacts" },
                            "Contacts"
                        )
                    )
                )
            ),
            React.createElement(TableAdvanced, null)
        );
    }
}
ReactDOM.render(React.createElement(Page, null), mountNode);