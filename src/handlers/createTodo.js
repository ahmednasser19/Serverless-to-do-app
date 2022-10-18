const AWS = require('aws-sdk')
const { v4 } = require('uuid')

const createTodo = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient() // Connect to AWS DynamoDB

    const { todo } = JSON.parse(event.body)
    const id = v4()
    const createdAt = new Date().toISOString()

    const newTodo = {
        id,
        todo,
        createdAt,
    }

    // Inserts new data (todo) into the DynamoDB
    await dynamodb.put({
        TableName: "TodoApiTable",
        Item: newTodo
    }).promise()

    // Returns the newly added todo
    return {
        statusCode: 200,
        body: JSON.stringify(newTodo),
    };
};

module.exports = {
    handler: createTodo
}
