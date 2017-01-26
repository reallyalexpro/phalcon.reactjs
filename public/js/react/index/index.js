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

var modal = React.createElement(
    "div",
    null,
    React.createElement(
        Button,
        {
            bsStyle: "primary",
            bsSize: "large"

        },
        "Launch demo modal"
    ),
    React.createElement(
        Modal,
        null,
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
            form
        ),
        React.createElement(
            ModalFooter,
            null,
            React.createElement(
                Button,
                null,
                "Close"
            )
        )
    )
);

var TableAdvanced = function (_React$Component3) {
    _inherits(TableAdvanced, _React$Component3);

    function TableAdvanced(props) {
        _classCallCheck(this, TableAdvanced);

        var _this3 = _possibleConstructorReturn(this, (TableAdvanced.__proto__ || Object.getPrototypeOf(TableAdvanced)).call(this, props));

        _this3.handleSelect = _this3.handleSelect.bind(_this3);
        /*this.open = this.open.bind(this);
        this.close = this.close.bind(this);*/
        _this3.state = { page: 1, users: [], total: 0, loading: false, showModal: false };
        _this3.state = { page: 1, users: [], total: 0, loading: false };
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

        /*close() {
            this.setState({ showModal: false });
        }
         open() {
            this.setState({ showModal: true });
        }*/

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
                    onSelect: this.handleSelect })
            );
        }
    }]);

    return TableAdvanced;
}(React.Component);

var Ready = function (_React$Component4) {
    _inherits(Ready, _React$Component4);

    function Ready() {
        _classCallCheck(this, Ready);

        return _possibleConstructorReturn(this, (Ready.__proto__ || Object.getPrototypeOf(Ready)).apply(this, arguments));
    }

    return Ready;
}(React.Component);