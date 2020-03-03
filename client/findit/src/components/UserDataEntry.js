import React from 'react';

class UserDataEntry extends React.Component {

    constructor(props){
        super(props);
        this.descriptiveTerms = [];
        this.state = {
            searchWord: "",
            zipcode: "",
            day: "",
            month: "",
            desc: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitForm(this.state);
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        let optionArray = [];
        for (let i = 1; i <= 31; i++){
            optionArray.push(<option value={i.toString()}> {i} </option>)
        }
        return (
            <div>
                <h1>Welcome To find it</h1>
            <form onSubmit={this.handleSubmit} >
                <label>
                    Please enter the key search word(bike, car, etc)
                    <input type="text" name="searchWord" value={this.state.searchWord} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Approximate zipcode where item was stolen.
                    <input type="text" name="zipcode" value={this.state.zipcode} onChange={this.handleChange}/>
            </label>
                <br/>
                <label>
                    Please enter the approximate date it was stolen.
                    <select value={this.state.month} name="month" onChange={this.handleChange}>
                        <option value="Jan"> Jan </option>
                        <option value="Feb"> Feb </option>
                        <option value="Mar"> Mar </option>
                        <option value="Apr"> Apr </option>
                        <option value="May"> May </option>
                        <option value="Jun"> Jun </option>
                        <option value="Jul"> Jul </option>
                        <option value="Aug"> Aug </option>
                        <option value="Sep"> Sep </option>
                        <option value="Oct"> Oct </option>
                        <option value="Nov"> Nov </option>
                        <option value="Dec"> Dec </option>
                    </select>
                    <select value={this.state.day} name="day" onChange={this.handleChange}>
                        {optionArray}
                    </select>
                    <br/>

                </label>
                <label>
                    Please enter descriptive terms separated by commas:
                    <input type="text" name="desc" value={this.state.desc} onChange={this.handleChange}/>
                </label>
                <br/>
                <input type="submit" value={"Submit"} />
            </form>
            </div>

        )
    }
}
export default UserDataEntry