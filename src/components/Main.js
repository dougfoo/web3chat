import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Message</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.messageText.value
          const likes = this.messageLikes.value
          this.props.createMessage(name, likes)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="messageText"
              type="text"
              ref={(input) => { this.messageText = input }}
              className="form-control"
              placeholder="Message"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="messageLikes"
              type="text"
              ref={(input) => { this.messageLikes = input }}
              className="form-control"
              placeholder="Likes"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Message</button>
        </form>
        <p>&nbsp;</p>
        <h2>Like Message</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Message</th>
              <th scope="col">Likes</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="messageList">
            { this.props.messages.map((message, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{message.id.toString()}</th>
                  <td>{message.message}</td>
                  <td>{message.likes.toString()} Likes</td>
                  <td>
                     <button
                        name={message.id.toString()}
                        value={(message.likes +1).toString()}
                        onClick={(event) => {
                          this.props.likeMessage(event.target.name, event.target.value)
                        }}
                      >
                        Like
                      </button>
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
