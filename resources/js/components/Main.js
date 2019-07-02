import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Card, Form } from "react-bootstrap";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            items: [
                {
                    id: "",
                    name: "",
                    body: ""
                }
            ]
        };
    }

    componentDidMount() {
        axios
            .get("/api/item")
            .then(res => {
                this.setState({ items: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const styles = {
            card: {
                marginTop: "20px"
            },
            header: {
                textAlign: "center",
                marginTop: "20px"
            }
        };

        let RenderItems;

        if (this.state.items == 0) {
            RenderItems = "コメントなし";
        } else {
            RenderItems = this.state.items.map(item => (
                <Card key={item.id} className="text-center" style={styles.card}>
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.body}</Card.Text>
                    </Card.Body>
                </Card>
            ));
        }
        return (
            <div className="container">
                <h4 style={styles.header}>React + Laravel(API) + 掲示板</h4>
                <div className="page-header">{RenderItems}</div>
                <div className="panel panel-default" style={styles.card}>
                    <div className="pannel-heading">コメントを入力</div>
                    <div className="pannel-body">
                        <Form
                            onSubmit={e => {
                                this.handleSubmit(e);
                            }}
                        >
                            <div className="form-group">
                                <label htmlFor="name">NAME</label>
                                <input
                                    className="form-control"
                                    id="name"
                                    type="text"
                                    placeholder="名無しの権兵衛"
                                    onChange={e => this.handleNameChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">COMMENT</label>
                                <textarea
                                    className="form-control"
                                    id="body"
                                    placeholder="コメントを書いてね"
                                    onChange={e => this.handleBodyChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <div className="control-label">
                                    <input type="submit" value="投稿" />
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleBodyChange(e) {
        this.setState({ body: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.body == "") {
            return;
        }
        console.log(this.state);
        axios
            .post("api/item", this.state)
            .then(res => {
                this.setState({ items: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }
}

if (document.getElementById("example")) {
    ReactDOM.render(<Main />, document.getElementById("example"));
}
