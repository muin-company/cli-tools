export type OutputFormat = 'ts-interface' | 'ts-type' | 'zod' | 'python-typed' | 'python-pydantic';

export interface TypeOutput {
  code: string;
  format: OutputFormat;
}

export interface ConversionOptions {
  format: OutputFormat;
  optional?: boolean;
  readonly?: boolean;
  exact?: boolean;
}

interface TypeInfo {
  type: string;
  isArray: boolean;
  isOptional: boolean;
  nested?: { [key: string]: TypeInfo };
}

export function convertJSON(jsonString: string, options: ConversionOptions): string {
  const data = JSON.parse(jsonString);
  const schema = inferSchema(data, options);
  
  switch (options.format) {
    case 'ts-interface':
      return generateTSInterface(schema, options);
    case 'ts-type':
      return generateTSType(schema, options);
    case 'zod':
      return generateZod(schema, options);
    case 'python-typed':
      return generatePythonTyped(schema, options);
    case 'python-pydantic':
      return generatePythonPydantic(schema, options);
    default:
      throw new Error(`Unknown format: ${options.format}`);
  }
}

function inferSchema(data: any, options: ConversionOptions): { [key: string]: TypeInfo } {
  const schema: { [key: string]: TypeInfo } = {};
  
  for (const [key, value] of Object.entries(data)) {
    schema[key] = inferType(value, options);
  }
  
  return schema;
}

function inferType(value: any, options: ConversionOptions): TypeInfo {
  if (value === null) {
    return { type: 'null', isArray: false, isOptional: true };
  }
  
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return { type: 'any', isArray: true, isOptional: false };
    }
    
    const elementType = inferType(value[0], options);
    return { ...elementType, isArray: true };
  }
  
  if (typeof value === 'object') {
    return {
      type: 'object',
      isArray: false,
      isOptional: false,
      nested: inferSchema(value, options),
    };
  }
  
  if (typeof value === 'string') {
    // Date detection
    if (isISODate(value)) {
      return { type: 'Date', isArray: false, isOptional: false };
    }
    
    // Exact types (string literals)
    if (options.exact) {
      return { type: `"${value}"`, isArray: false, isOptional: false };
    }
    
    return { type: 'string', isArray: false, isOptional: false };
  }
  
  if (typeof value === 'number') {
    return { type: 'number', isArray: false, isOptional: false };
  }
  
  if (typeof value === 'boolean') {
    return { type: 'boolean', isArray: false, isOptional: false };
  }
  
  return { type: 'any', isArray: false, isOptional: false };
}

function isISODate(str: string): boolean {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
  return isoDateRegex.test(str);
}

function generateTSInterface(schema: { [key: string]: TypeInfo }, options: ConversionOptions): string {
  const lines: string[] = [];
  const interfaces: string[] = [];
  
  function generateInterface(name: string, fields: { [key: string]: TypeInfo }, indent = 0): string {
    const indentStr = '  '.repeat(indent);
    let result = `${indentStr}interface ${name} {\n`;
    
    for (const [key, info] of Object.entries(fields)) {
      const readonly = options.readonly ? 'readonly ' : '';
      const optional = options.optional || info.isOptional ? '?' : '';
      const arrayBracket = info.isArray ? '[]' : '';
      
      let typeStr = info.type;
      
      if (info.nested) {
        const nestedName = capitalize(key);
        interfaces.push(generateInterface(nestedName, info.nested, indent));
        typeStr = nestedName;
      }
      
      result += `${indentStr}  ${readonly}${key}${optional}: ${typeStr}${arrayBracket};\n`;
    }
    
    result += `${indentStr}}`;
    return result;
  }
  
  interfaces.push(generateInterface('Root', schema));
  
  return interfaces.join('\n\n') + '\n';
}

function generateTSType(schema: { [key: string]: TypeInfo }, options: ConversionOptions): string {
  const lines: string[] = [];
  const types: string[] = [];
  
  function generateType(name: string, fields: { [key: string]: TypeInfo }, indent = 0): string {
    const indentStr = '  '.repeat(indent);
    let result = `${indentStr}type ${name} = {\n`;
    
    for (const [key, info] of Object.entries(fields)) {
      const readonly = options.readonly ? 'readonly ' : '';
      const optional = options.optional || info.isOptional ? '?' : '';
      const arrayBracket = info.isArray ? '[]' : '';
      
      let typeStr = info.type;
      
      if (info.nested) {
        const nestedName = capitalize(key);
        types.push(generateType(nestedName, info.nested, indent));
        typeStr = nestedName;
      }
      
      result += `${indentStr}  ${readonly}${key}${optional}: ${typeStr}${arrayBracket};\n`;
    }
    
    result += `${indentStr}};`;
    return result;
  }
  
  types.push(generateType('Root', schema));
  
  return types.join('\n\n') + '\n';
}

function generateZod(schema: { [key: string]: TypeInfo }, options: ConversionOptions): string {
  const schemas: string[] = [];
  
  schemas.push("import { z } from 'zod';\n");
  
  function generateSchema(name: string, fields: { [key: string]: TypeInfo }): string {
    const schemaName = `${name.toLowerCase()}Schema`;
    let result = `const ${schemaName} = z.object({\n`;
    
    for (const [key, info] of Object.entries(fields)) {
      let zodType = '';
      
      if (info.nested) {
        const nestedName = capitalize(key);
        schemas.push(generateSchema(nestedName, info.nested));
        zodType = `${nestedName.toLowerCase()}Schema`;
      } else {
        switch (info.type) {
          case 'string':
            zodType = 'z.string()';
            break;
          case 'number':
            zodType = 'z.number()';
            break;
          case 'boolean':
            zodType = 'z.boolean()';
            break;
          case 'Date':
            zodType = 'z.string().datetime()';
            break;
          case 'null':
            zodType = 'z.null()';
            break;
          default:
            if (info.type.startsWith('"')) {
              zodType = `z.literal(${info.type})`;
            } else {
              zodType = 'z.any()';
            }
        }
      }
      
      if (info.isArray) {
        zodType = `z.array(${zodType})`;
      }
      
      if (options.optional || info.isOptional) {
        zodType += '.optional()';
      }
      
      result += `  ${key}: ${zodType},\n`;
    }
    
    result += '});\n\n';
    result += `type ${name} = z.infer<typeof ${schemaName}>;`;
    
    return result;
  }
  
  schemas.push(generateSchema('Root', schema));
  
  return schemas.join('\n\n') + '\n';
}

function generatePythonTyped(schema: { [key: string]: TypeInfo }, options: ConversionOptions): string {
  const classes: string[] = [];
  
  classes.push('from typing import TypedDict, Optional, List\n');
  
  function generateClass(name: string, fields: { [key: string]: TypeInfo }): string {
    let result = `class ${name}(TypedDict):\n`;
    
    for (const [key, info] of Object.entries(fields)) {
      let pyType = '';
      
      if (info.nested) {
        const nestedName = capitalize(key);
        classes.push(generateClass(nestedName, info.nested));
        pyType = nestedName;
      } else {
        switch (info.type) {
          case 'string':
            pyType = 'str';
            break;
          case 'number':
            pyType = 'float';
            break;
          case 'boolean':
            pyType = 'bool';
            break;
          case 'Date':
            pyType = 'str';  // ISO date string
            break;
          case 'null':
            pyType = 'None';
            break;
          default:
            if (info.type.startsWith('"')) {
              pyType = 'str';  // Literal types
            } else {
              pyType = 'Any';
            }
        }
      }
      
      if (info.isArray) {
        pyType = `List[${pyType}]`;
      }
      
      if (options.optional || info.isOptional) {
        pyType = `Optional[${pyType}]`;
      }
      
      result += `    ${key}: ${pyType}\n`;
    }
    
    return result;
  }
  
  classes.push(generateClass('Root', schema));
  
  return classes.join('\n\n') + '\n';
}

function generatePythonPydantic(schema: { [key: string]: TypeInfo }, options: ConversionOptions): string {
  const classes: string[] = [];
  
  classes.push('from pydantic import BaseModel');
  classes.push('from typing import Optional, List');
  classes.push('from datetime import datetime\n');
  
  function generateClass(name: string, fields: { [key: string]: TypeInfo }): string {
    let result = `class ${name}(BaseModel):\n`;
    
    for (const [key, info] of Object.entries(fields)) {
      let pyType = '';
      
      if (info.nested) {
        const nestedName = capitalize(key);
        classes.push(generateClass(nestedName, info.nested));
        pyType = nestedName;
      } else {
        switch (info.type) {
          case 'string':
            pyType = 'str';
            break;
          case 'number':
            pyType = 'float';
            break;
          case 'boolean':
            pyType = 'bool';
            break;
          case 'Date':
            pyType = 'datetime';
            break;
          case 'null':
            pyType = 'None';
            break;
          default:
            if (info.type.startsWith('"')) {
              pyType = 'str';
            } else {
              pyType = 'Any';
            }
        }
      }
      
      if (info.isArray) {
        pyType = `List[${pyType}]`;
      }
      
      if (options.optional || info.isOptional) {
        pyType = `Optional[${pyType}]`;
        result += `    ${key}: ${pyType} = None\n`;
      } else {
        result += `    ${key}: ${pyType}\n`;
      }
    }
    
    return result;
  }
  
  classes.push(generateClass('Root', schema));
  
  return classes.join('\n\n') + '\n';
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
