const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  // TEST 7
  test("constructor sets position and default values for mode and generatorWatts", function () {
    let positionTest = 4500;
    let rover = new Rover(positionTest);
    expect(rover.position).toBe(positionTest);
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
  });
  // TEST 8
  test("response returned by receiveMessage contains the name of the message", function () {
    let commandTest = [new Command("commandType", 12000)];
    let responseTest = "Zeke";
    let messageTest = new Message(responseTest, commandTest);
    let roverTest = new Rover(4500);
    let response = roverTest.receiveMessage(messageTest);
    expect(response.message).toBe(responseTest);
  });
  // TEST 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commandTest = [
      new Command("STATUS_CHECK", 12000),
      new Command("MODE_CHANGE", 13000),
    ];
    let messageTest = new Message("name", commandTest);
    let roverTest = new Rover(4500);
    let response = roverTest.receiveMessage(messageTest);
    expect(response.results.length).toBe(2);
  });
  // TEST 10
  test("responds correctly to the status check command", function () {
    let commandTest = [new Command("STATUS_CHECK", 12000)];
    let messageTest = new Message("name", commandTest);
    let roverTest = new Rover(4500);
    let expectRoverStatus = {
      position: 4500,
      mode: "NORMAL",
      generatorWatts: 110,
    };
    let response = roverTest.receiveMessage(messageTest);
    expect(response.results[0].roverStatus).toStrictEqual(expectRoverStatus);
  });
  // TEST 11
  test("responds correctly to the mode change command", function () {
    let commandTest = [new Command("MODE_CHANGE", "LOW_POWER")];
    let messageTest = new Message("name", commandTest);
    let roverTest = new Rover(4500);
    let expectResultObject = {
      completed: true,
    };
    let response = roverTest.receiveMessage(messageTest);
    expect(response.results[0]).toStrictEqual(expectResultObject);
  });
  // TEST 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let commandTest = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("MOVE", 12000),
    ];
    let messageTest = new Message("name", commandTest);
    let roverTest = new Rover(4500);
    let expectResultObject = {
      completed: false,
    };
    let response = roverTest.receiveMessage(messageTest);
    expect(response.results[1]).toStrictEqual(expectResultObject);
    expect(roverTest.position).toBe(4500);
  });
  // TEST 13
  test("responds with the position for the move command", function () {
    let commandTest = [new Command("MOVE", 6000)];
    let messageTest = new Message("name", commandTest);
    let roverTest = new Rover(4500);
    let expectResultObject = {
      completed: true,
    };
    let response = roverTest.receiveMessage(messageTest);
    expect(response.results[0]).toStrictEqual(expectResultObject);
    expect(roverTest.position).toBe(6000);
  });
});
