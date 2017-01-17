var mountNode = document.getElementById("page");

const page = React.createElement(
  Grid,
  null,
  React.createElement(
    PageHeader,
    null,
    React.createElement(
      Grid,
      null,
      React.createElement(
        Row,
        null,
        React.createElement(
          Col,
          { xs: 3 },
          React.createElement(
            "a",
            { href: "/" },
            React.createElement(Image, { className: "img-responsive", height: "150", src: "/img/Bassai-001.png", circle: true })
          )
        ),
        React.createElement(
          Col,
          { xs: 9, className: "text-center" },
          "\u041A\u043B\u0443\u0431 \u041A\u0451\u043A\u0443\u0441\u0438\u043D \u043A\u0430\u0440\u0430\u0442\u044D-\u0434\u043E"
        )
      )
    )
  ),
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
  ),
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
          "Table heading"
        ),
        React.createElement(
          "th",
          null,
          "Table heading"
        ),
        React.createElement(
          "th",
          null,
          "Table heading"
        ),
        React.createElement(
          "th",
          null,
          "Table heading"
        ),
        React.createElement(
          "th",
          null,
          "Table heading"
        ),
        React.createElement(
          "th",
          null,
          "Table heading"
        )
      )
    ),
    React.createElement(
      "tbody",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          "1"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        )
      ),
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          "2"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        )
      ),
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          "3"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        ),
        React.createElement(
          "td",
          null,
          "Table cell"
        )
      )
    )
  )
);

UserRow2.render(page, mountNode);