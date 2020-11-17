import React from "react";
import axios from "axios";
import ReactTable from "react-table-v6";
import 'react-table-v6/react-table.css';

export default class PersonList extends React.Component {
    state = {
        isButtonClicked: false,
        persons: [],
        columns: [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Employee ID', accessor: 'id' },
            { Header: "Employee Email", accessor: "email" },
            { Header: "Employee Address", id: 'addressCity', accessor: obj => JSON.stringify(obj.address) }
        ]
    }
    componentDidMount() { }

    fetchData() {
        axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
            this.setState({ persons: res.data });
        });
    }

    render() {
       // console.log(this.state.persons);

        const fetchHandler = (event) => {
            this.fetchData();
            this.setState({ isButtonClicked: true });
        };

        return (
            <>
                {
                    this.state.isButtonClicked ?
                        <button onClick={fetchHandler}>Reload Data</button> :
                        <button onClick={fetchHandler}>Fetch the data</button>
                }
                {
                    this.state.isButtonClicked ?
                        <ReactTable data={this.state.persons} columns={this.state.columns} /> :
                        <></>
                }
            </>
        );

    }
}
