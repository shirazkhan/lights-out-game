import React, {Component} from 'react'
import "./Cell.css"

class Cell extends Component {

  render() {
    return (
      <td className={this.props.on === true ? "Cell Cell-on" : "Cell Cell-off"} onClick={() => this.props.toggle(this.props.id,this.props.coords)}>
      </td>
    )
  }
}


export default Cell