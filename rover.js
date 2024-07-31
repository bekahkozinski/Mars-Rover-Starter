class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }
  receiveMessage(messageObject) {
    let extractedMessage = messageObject.name;
    let returnedMessageObject = {
      message: extractedMessage,
      results: [
        {
          completed: false,
        },
      ],
    };
    for (let i = 0; i < messageObject.commands.length; i++) {
      let currentCommandType = messageObject.commands[i].commandType;
      if (currentCommandType === "STATUS_CHECK") {
        returnedMessageObject.results[i] = {
          completed: true,
          roverStatus: {
            position: this.position,
            mode: this.mode,
            generatorWatts: this.generatorWatts,
          },
        };
      }
      if (currentCommandType === "MODE_CHANGE") {
        returnedMessageObject.results[i] = {
          completed: true,
        };
        this.mode = messageObject.commands[i].value;
      }
      if (currentCommandType === "MOVE" && this.mode === "LOW_POWER") {
        returnedMessageObject.results[i] = {
          completed: false,
        }
      }
      if (currentCommandType === "MOVE" && this.mode === "NORMAL") {
        returnedMessageObject.results[i] = {
          completed: true,
        };
        this.position = messageObject.commands[i].value;
      }
    }
    return returnedMessageObject;
  }
}

module.exports = Rover;
