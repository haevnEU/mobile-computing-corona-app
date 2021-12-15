import React from "react";
import useServerDataController from "../api/RkiServerDataController";

class CityView extends React.Component{
    data = null;

    async loadData(){
        console.log("Button pressed")
        this.data = await useServerDataController(6, 51);
        this.forceUpdate();
    }

    render(){
        let data = this.data;
        if(this.data != null) {
            console.log("Render");
            return <div>
                <div>
                    <table>
                        <tbody>
                        <tr>STATE</tr>
                        <tr>
                            <td>Name</td>
                            <td>{data.state.name}({data.state.id})</td>
                        </tr>
                        <tr>
                            <td>Citizen amount</td>
                            <td>{data.state.citizen}</td>
                        </tr>
                        <tr>
                            <td>Cases7</td>
                            <td>{data.state.cases7}</td>
                        </tr>
                        <tr>
                            <td>Cases7/100k</td>
                            <td>{data.state.cases7_per_100k}</td>
                        </tr>
                        <tr>
                            <td>Death</td>
                            <td>{data.state.death}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        }else return<div>
                <h1>Please wait for data</h1>
            <button onClick={() => this.loadData()}>Load data</button>
            </div>
    }
}

export {CityView};