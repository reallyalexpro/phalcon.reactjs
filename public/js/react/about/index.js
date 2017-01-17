let mountNode = document.getElementById("page");

const page = React.createElement(
    Grid,
    null,
    React.createElement(
        Navbar,
        { collapseOnSelect: true },
        React.createElement(
            Navbar.Header,
            null,
            React.createElement(Navbar.Brand, null),
            React.createElement(Navbar.Toggle, null),
            React.createElement("div", { className: "clearfix" })
        ),
        React.createElement(
            Navbar.Collapse,
            null,
            React.createElement(
                Nav,
                null,
                React.createElement(
                    MenuItem,
                    { eventKey: 1, href: "/about" },
                    "\u041E \u043A\u043B\u0443\u0431\u0435"
                ),
                React.createElement(
                    NavDropdown,
                    { eventKey: 3, title: "Dropdown", id: "basic-nav-dropdown" },
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
                )
            ),
            React.createElement(
                Nav,
                { pullRight: true },
                React.createElement(
                    MenuItem,
                    { eventKey: 1, href: "/about" },
                    "About"
                ),
                React.createElement(
                    MenuItem,
                    { eventKey: 2, href: "/contacts" },
                    "Contacts"
                )
            )
        )
    )
);

ReactDOM.render(page, mountNode);