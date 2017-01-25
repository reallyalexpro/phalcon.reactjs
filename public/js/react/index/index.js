"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spinner = function (_React$Component) {
    _inherits(Spinner, _React$Component);

    function Spinner() {
        _classCallCheck(this, Spinner);

        return _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).apply(this, arguments));
    }

    _createClass(Spinner, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "wait" },
                React.createElement("i", { className: "fa fa-spinner fa-pulse" })
            );
        }
    }]);

    return Spinner;
}(React.Component);

var UserRow = function (_React$Component2) {
    _inherits(UserRow, _React$Component2);

    function UserRow() {
        _classCallCheck(this, UserRow);

        return _possibleConstructorReturn(this, (UserRow.__proto__ || Object.getPrototypeOf(UserRow)).apply(this, arguments));
    }

    _createClass(UserRow, [{
        key: "render",
        value: function render() {
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
    }]);

    return UserRow;
}(React.Component);

var TableAdvanced = function (_React$Component3) {
    _inherits(TableAdvanced, _React$Component3);

    function TableAdvanced(props) {
        _classCallCheck(this, TableAdvanced);

        var _this3 = _possibleConstructorReturn(this, (TableAdvanced.__proto__ || Object.getPrototypeOf(TableAdvanced)).call(this, props));

        _this3.handleSelect = _this3.handleSelect.bind(_this3);
        _this3.open = _this3.open.bind(_this3);
        _this3.close = _this3.close.bind(_this3);
        _this3.state = { page: 1, users: [], total: 0, loading: false, showModal: false };
        return _this3;
    }

    _createClass(TableAdvanced, [{
        key: "handleSelect",
        value: function handleSelect(eventKey) {
            this.load(eventKey);
            this.setState({
                page: eventKey
            });
        }
    }, {
        key: "load",
        value: function load(page) {
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
    }, {
        key: "close",
        value: function close() {
            this.setState({ showModal: false });
        }
    }, {
        key: "open",
        value: function open() {
            this.setState({ showModal: true });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.load(this.state.page);
        }
    }, {
        key: "render",
        value: function render() {
            var rows = this.state.users.map(function (user) {
                return React.createElement(UserRow, { user: user });
            });

            var spinner = null;
            if (this.state.loading) {
                spinner = React.createElement(Spinner, null);
            }

            var popover = React.createElement(
                Popover,
                { id: "modal-popover", title: "popover" },
                "very popover. such engagement"
            );
            var tooltip = React.createElement(
                Tooltip,
                { id: "modal-tooltip" },
                "wow."
            );

            return React.createElement(
                "div",
                null,
                React.createElement(
                    Table,
                    { responsive: true, className: "dataTable" },
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
                    ),
                    spinner
                ),
                React.createElement(Pagination, {
                    prev: true,
                    next: true,
                    first: true,
                    last: true,
                    ellipsis: true,
                    boundaryLinks: true,
                    items: this.state.total,
                    maxButtons: 3,
                    activePage: this.state.page,
                    onSelect: this.handleSelect }),
                React.createElement("br", null),
                React.createElement(
                    Button,
                    {
                        bsStyle: "primary",
                        bsSize: "large",
                        onClick: this.open
                    },
                    "Launch demo modal"
                ),
                React.createElement(
                    Modal,
                    { show: this.state.showModal, onHide: this.close },
                    React.createElement(
                        ModalHeader,
                        { closeButton: true },
                        React.createElement(
                            ModalTitle,
                            null,
                            "Modal heading"
                        )
                    ),
                    React.createElement(
                        ModalBody,
                        null,
                        React.createElement(
                            "h4",
                            null,
                            "Text in a modal"
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Duis mollis, est non commodo luctus, nisi erat porttitor ligula."
                        ),
                        React.createElement(
                            "h4",
                            null,
                            "Popover in a modal"
                        ),
                        React.createElement(
                            "p",
                            null,
                            "there is a ",
                            React.createElement(
                                OverlayTrigger,
                                { overlay: popover },
                                React.createElement(
                                    "a",
                                    { href: "#" },
                                    "popover"
                                )
                            ),
                            " here"
                        ),
                        React.createElement(
                            "h4",
                            null,
                            "Tooltips in a modal"
                        ),
                        React.createElement(
                            "p",
                            null,
                            "there is a ",
                            React.createElement(
                                OverlayTrigger,
                                { overlay: tooltip },
                                React.createElement(
                                    "a",
                                    { href: "#" },
                                    "tooltip"
                                )
                            ),
                            " here"
                        ),
                        React.createElement("hr", null),
                        React.createElement(
                            "h4",
                            null,
                            "Overflowing text to show scroll behavior"
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla."
                        )
                    ),
                    React.createElement(
                        ModalFooter,
                        null,
                        React.createElement(
                            Button,
                            { onClick: this.close },
                            "Close"
                        )
                    )
                )
            );
        }
    }]);

    return TableAdvanced;
}(React.Component);

var form = React.createElement(
    Form,
    { horizontal: true },
    React.createElement(
        FormGroup,
        { controlId: "formHorizontalEmail" },
        React.createElement(
            Col,
            { componentClass: ControlLabel, sm: 2 },
            "Email"
        ),
        React.createElement(
            Col,
            { sm: 10 },
            React.createElement(FormControl, { type: "email", placeholder: "Email", required: true })
        )
    ),
    React.createElement(
        FormGroup,
        { controlId: "formHorizontalPassword" },
        React.createElement(
            Col,
            { componentClass: ControlLabel, sm: 2 },
            "Password"
        ),
        React.createElement(
            Col,
            { sm: 10 },
            React.createElement(FormControl, { type: "password", placeholder: "Password" })
        )
    ),
    React.createElement(
        FormGroup,
        null,
        React.createElement(
            Col,
            { smOffset: 2, sm: 10 },
            React.createElement(
                Checkbox,
                null,
                "Remember me"
            )
        )
    ),
    React.createElement(
        FormGroup,
        null,
        React.createElement(
            Col,
            { smOffset: 2, sm: 10 },
            React.createElement(
                Button,
                { type: "submit" },
                "Sign in"
            )
        )
    )
);

var Form2 = function (_React$Component4) {
    _inherits(Form2, _React$Component4);

    function Form2() {
        _classCallCheck(this, Form2);

        return _possibleConstructorReturn(this, (Form2.__proto__ || Object.getPrototypeOf(Form2)).apply(this, arguments));
    }

    _createClass(Form2, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                form
            );
        }
    }]);

    return Form2;
}(React.Component);