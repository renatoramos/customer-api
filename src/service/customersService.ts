import { DocumentClient } from "aws-sdk/clients/dynamodb";

import Customer from "../models/Customer";

export default class CustomersServerice {

    private Tablename: string = "CustomerTable";

    constructor(private docClient: DocumentClient) { }

    async getAllCustomers(): Promise<Customer[]> {
        const customers = await this.docClient.scan({
            TableName: this.Tablename}).promise()
        return customers.Items as Customer[];
    }

    async searchCustomers(text): Promise<Customer[]> {
        const customers = await this.docClient.scan({
            TableName: this.Tablename,
            FilterExpression: "contains (customerName, :text) OR contains (customerSurname, :text) OR contains (document, :text)",
            ExpressionAttributeValues: {":text": text}}).promise()
        return customers.Items as Customer[];
    }

    async createCustomer(customer: Customer): Promise<Customer> {
        await this.docClient.put({
            TableName: this.Tablename,
            Item: customer
        }).promise()
        return customer as Customer;

    }

    async getCustomer(id: string): Promise<any> {
        const customer = await this.docClient.get({
            TableName: this.Tablename,
            Key: {
                id: id
            }}).promise()
        if (!customer.Item) {
            return null
        }
        return customer.Item as Customer;

    }

    async updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer> {
        const updated = await this.docClient
            .update({
                TableName: this.Tablename,
                Key: { id: id },
                UpdateExpression:
                    "set #customerName = :customerName ," +
                    " #customerSurname = :customerSurname ," +
                    " #document = :document ," +
                    " #updatedAt = :updatedAt ," +
                    " #status = :status",

                ExpressionAttributeNames: {
                    "#customerName": "customerName",
                    "#customerSurname": "customerSurname",
                    "#document": "document",
                    "#updatedAt": "updatedAt",
                    "#status": "status",
                },
                ExpressionAttributeValues: {
                    ":customerName": customer.customerName,
                    ":customerSurname": customer.customerSurname,
                    ":document": customer.document,
                    ":updatedAt": customer.updatedAt,
                    ":status": customer.status,
                },
                ReturnValues: "ALL_NEW",
            })
            .promise();

        return updated.Attributes as Customer;
    }

    async deleteCustomer(id: string): Promise<any> {
        return await this.docClient.delete({
            TableName: this.Tablename,
            Key: {
                id: id
            }
        }).promise()

    }
}