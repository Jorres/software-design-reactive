import { ExtractDocumentTypeFromTypedRxJsonSchema, RxJsonSchema, toTypedRxJsonSchema } from "rxdb";

export const commoditiesSchemaLiteral = {
    "title": "commodities",
    "version": 0,
    "description": "describes a warehouse",
    "primaryKey": "name",
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "price": {
            "type": "number"
        },
        "quantity": {
            "type": "number"
        },
    },
    "required": [
        "name",
        "price",
        "quantity"
    ]
  } as const;

const schemaTyped = toTypedRxJsonSchema(commoditiesSchemaLiteral);

export type commoditiesDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;
export const commoditiesSchema: RxJsonSchema<commoditiesDocType> = commoditiesSchemaLiteral;
