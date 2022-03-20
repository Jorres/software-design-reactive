import { ExtractDocumentTypeFromTypedRxJsonSchema, RxJsonSchema, toTypedRxJsonSchema } from "rxdb";

const userSchemaLiteral = {
    title: "users",
    version: 0,
    description: "describes a list of users of the store",
    primaryKey: "id",
    type: "object",
    properties: {
        id: {
            type: "string",
        },
        email: {
            type: "string",
        },
        lang: {
            type: "string"
        }
    },
    required: ["id", "email", "lang"],
} as const;

const schemaTyped = toTypedRxJsonSchema(userSchemaLiteral);

export type userDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;
export const userSchema: RxJsonSchema<userDocType> = userSchemaLiteral;
