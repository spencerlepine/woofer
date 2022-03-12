/* Usage:
  > put in constants folder
  > create index.js somewhere
  > run this code with "node index.js"
  ```
  const apiSchemaToMarkdown = require('./apiSchemaToMarkdown');

  apiSchemaToMarkdown();
  ```
*/

const Joi = require('joi')
const fs = require('fs');

const schema = require('./dbSchema')(Joi);
const ENDPOINT_ROUTES = require('./endpointRoutes')
const {
  BODY_KEYS,
  OPT_KEYS,
  PARAM_KEYS,
  RESPONSE_KEYS
} = require('./endpointRoutes');

const isMethodKey = (key) => {
  return ['GET', 'POST', 'DELETE', 'PUT'].includes(key)
}

const iterateEndpointRoutes = (pathObj, pathUrls) => {
  Object.keys(pathObj).forEach((key) => {
    const newUrlPaths = [...pathUrls]

    if (pathObj["URL"]) {
      newUrlPaths.push(pathObj["URL"])
    }

    if (isMethodKey(key)) {
      const urlPath = newUrlPaths.join('/')
      const endpointObj = pathObj[key];
      endpointToMarkdown(urlPath, endpointObj, key)
    } else if (key !== "URL" && typeof pathObj[key] === "object") {
      iterateEndpointRoutes(pathObj[key], newUrlPaths);
    }
  });
}

const printEndpoint = (urlPathStr, endpointObj, methodStr) => {
  console.log(`\n${methodStr} ${urlPathStr}\n`, endpointObj)
}

const saveTextToFile = (text) => {
  fs.appendFile('api.md', text, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      // Get the file contents after the append operation
      console.log("API Endpoint written to file");
    }
  });
}

const endpointToMarkdown = (urlPathStr, endpointObj, methodStr) => {
  const rowEntryStr = (colOne, colTwo, paddingChar = " ") => {
    const paddingSpace = 15;

    try {
      const str = `| ${colOne.padEnd(paddingSpace, paddingChar)} | ${colTwo.padEnd(paddingSpace, paddingChar)} |`;
      return str;
    } catch {
      return
    }
  }
  const tableBreak = rowEntryStr('', '', '-');

  let endpointLines = [`\n\`${methodStr} ${urlPathStr}\``];
  const {
    [BODY_KEYS]: bodyKeys,
    [OPT_KEYS]: optionalBodyKeys,
    [PARAM_KEYS]: paramKeys,
    [RESPONSE_KEYS]: resKeys,
  } = endpointObj

  const addKeysTable = (keys, tableTitle) => {
    if (keys) {
      endpointLines.push(`\n**${tableTitle}**\n`);
      endpointLines.push(rowEntryStr("Key", "Type"));
      endpointLines.push(tableBreak);

      keys.forEach((key) => {
        const rowStr = rowEntryStr(key, getDataType(key));
        if (rowStr) {
          endpointLines.push(rowStr);
        }
      });

      endpointLines.push('\n');
    }
  }
  addKeysTable(paramKeys, 'Params')
  addKeysTable(bodyKeys, 'Body')
  addKeysTable(optionalBodyKeys, 'Body (optional)')
  addKeysTable(resKeys, 'Response')

  saveTextToFile(endpointLines.join('\n'));
}

const getDataType = (key) => {
  try {
    const joiDataType = schema.validate({ [key]: null }).error.details[0].type;
    if (typeof joiDataType === 'string') {
      return joiDataType.split('.')[0]
    }
    return `${joiDataType}`
  } catch {
    return 'unknown'
  }
}

module.exports = () => {
  iterateEndpointRoutes(ENDPOINT_ROUTES, [])
  if (fs.existsSync('api.md')) {
    fs.writeFile('api.md', "", (err) => {
      if (err) {
        console.log(err);
      }
    })
  }
}
