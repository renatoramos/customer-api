import dynamoDBClient from "../models";
import CustomerServerice from "./customersService"

const customerService = new CustomerServerice(dynamoDBClient());

export default customerService;