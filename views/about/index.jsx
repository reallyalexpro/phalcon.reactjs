let mountNode = document.getElementById("page");

const page = (
    <Grid>

        <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>

                </Navbar.Brand>
                <Navbar.Toggle />
                <div className="clearfix"/>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <MenuItem eventKey={1} href="/about">О клубе</MenuItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1} href="/about">About</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3} disabled="true">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <MenuItem eventKey={1} href="/about">About</MenuItem>
                    <MenuItem eventKey={2} href="/contacts">Contacts</MenuItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    </Grid>
);

ReactDOM.render(page, mountNode);