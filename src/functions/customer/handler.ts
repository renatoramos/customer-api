import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {middyfy} from '@libs/lambda';
import customersService from '../../service'
import {Logger} from "tslog";
import {v4} from "uuid";

const log: Logger = new Logger({name: "customer", type: "json"});

export const getAllCustomers = middyfy(async (): Promise<APIGatewayProxyResult> => {
    log.info("getAllCustomers")
    try {
        const customers = await customersService.getAllCustomers();
        log.info("getAllCustomers return " + JSON.stringify(customers));
        return {statusCode: customers.length > 0 ? 200 : 204, body: JSON.stringify(customers)}
    } catch (e) {
        log.error("getAllCustomers error: " + e)
        return {statusCode: 500, body: JSON.stringify({message: "Internal Error"})}
    }
})

export const searchCustomers = middyfy(async (event: APIGatewayProxyEvent):  Promise<APIGatewayProxyResult> => {
    log.info("searchCustomers")
    try {
        const customers = await customersService.searchCustomers(event.queryStringParameters.text);
        log.info("searchCustomers return " + JSON.stringify(customers));
        return {statusCode: customers.length > 0 ? 200 : 204, body: JSON.stringify(customers)}
    } catch (e) {
        log.error("searchCustomers error: " + e)
        return {statusCode: 500, body: JSON.stringify({message: "Internal Error"})}
    }
})

export const createCustomer = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    log.info("createCustomer")
    try {
        const customer = await customersService.createCustomer({
            id: v4(),
            customerName: event.body.customerName,
            customerSurname: event.body.customerSurname,
            document: event.body.document,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: true
        })
        log.info("createCustomer return " + JSON.stringify(customer))
        return {statusCode: 201, body: JSON.stringify(customer)}
    } catch (e) {
        log.error("createCustomer error: " + e)
        return {statusCode: 500, body: JSON.stringify({message: "Internal Error"})}
    }
})

export const getCustomer = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        log.info("getCustomer")
        const customer = await customersService.getCustomer(event.pathParameters.id)
        if (customer == null){
            return {statusCode: 404, body: JSON.stringify({message: `Customer ${event.pathParameters.id} not found!`})}
        }
        log.info("getCustomer return" + JSON.stringify(customer))
        return {statusCode: 200, body: JSON.stringify(customer)}
    } catch (e) {
        log.error("getCustomer error: " + e)
        return {statusCode: 500, body: JSON.stringify({message: "Internal Error"})}
    }
})

export const updateCustomer = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        log.info("updateCustomer")
        if (await customersService.getCustomer(event.pathParameters.id) == null){
            return {statusCode: 404, body: JSON.stringify({message: `Customer ${event.pathParameters.id} not found!`})}
        }
        const customer = await customersService.updateCustomer(event.pathParameters.id, {
            customerName: event.body.customerName,
            customerSurname: event.body.customerSurname,
            document: event.body.document,
            status: event.body.status,
            updatedAt: new Date().toISOString(),
        })
        log.info("updateCustomer return " + JSON.stringify(customer))
        return {statusCode: 200, body: JSON.stringify(customer)}
    } catch (e) {
        log.error("updateCustomer error: " + e)
        return {statusCode: 500, body: JSON.stringify({message: "Internal Error"})}
    }
})

export const deleteCustomer = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        log.info("deleteCustomer")
        if (await customersService.getCustomer(event.pathParameters.id) == null){
            return {statusCode: 404, body: JSON.stringify({message: `Customer ${event.pathParameters.id} not found!`})}
        }
        const customer = await customersService.deleteCustomer(event.pathParameters.id)
        log.info("deleteCustomer return " + JSON.stringify(customer))
        return {statusCode: 200, body: JSON.stringify({"message": `Customer ${event.pathParameters.id} deleted!`})}
    } catch (e) {
        log.error("deleteCustomer error: " + e)
        return {statusCode: 500, body: JSON.stringify({message: "Internal Error"})}
    }
})