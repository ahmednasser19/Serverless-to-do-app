const AWS = require('aws-sdk')

const getTodos = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient()

    let todos;

    try {
        const results = await dynamodb.scan({ TableName: "TodoApiTable" }).promise()
        todos = results.Items
    } catch (error) {
        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(todos),
    };
};

module.exports = {
    handler: getTodos
}
