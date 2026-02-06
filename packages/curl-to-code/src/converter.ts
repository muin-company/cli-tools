export type CodeLanguage = 'python' | 'javascript' | 'node' | 'fetch' | 'axios' | 'go' | 'php' | 'ruby';

export interface ConversionOptions {
  language: CodeLanguage;
  errorHandling?: boolean;
  async?: boolean;
  types?: boolean;
}

interface ParsedCurl {
  url: string;
  method: string;
  headers: { [key: string]: string };
  body?: string;
  auth?: { user: string; pass: string };
}

export function convertCurl(curlCommand: string, options: ConversionOptions): string {
  const parsed = parseCurl(curlCommand);
  
  switch (options.language) {
    case 'fetch':
      return generateFetch(parsed, options);
    case 'axios':
      return generateAxios(parsed, options);
    case 'node':
      return generateNode(parsed, options);
    case 'python':
      return generatePython(parsed, options);
    case 'go':
      return generateGo(parsed, options);
    case 'php':
      return generatePHP(parsed, options);
    case 'ruby':
      return generateRuby(parsed, options);
    default:
      throw new Error(`Unknown language: ${options.language}`);
  }
}

function parseCurl(curlCommand: string): ParsedCurl {
  const result: ParsedCurl = {
    url: '',
    method: 'GET',
    headers: {},
  };
  
  // Remove line breaks and extra spaces
  const cleaned = curlCommand.replace(/\\\n/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Extract URL
  const urlMatch = cleaned.match(/curl\s+['"]?([^\s'"]+)['"]?/);
  if (urlMatch) {
    result.url = urlMatch[1];
  }
  
  // Extract method
  const methodMatch = cleaned.match(/-X\s+(\w+)/);
  if (methodMatch) {
    result.method = methodMatch[1].toUpperCase();
  }
  
  // Extract headers
  const headerRegex = /-H\s+['"]([^'"]+)['"]/g;
  let headerMatch;
  while ((headerMatch = headerRegex.exec(cleaned)) !== null) {
    const [key, ...values] = headerMatch[1].split(':');
    result.headers[key.trim()] = values.join(':').trim();
  }
  
  // Extract body data
  const dataMatch = cleaned.match(/(?:-d|--data|--data-raw)\s+['"](.+?)['"]/);
  if (dataMatch) {
    result.body = dataMatch[1];
    if (result.method === 'GET') {
      result.method = 'POST';
    }
  }
  
  // Extract auth
  const authMatch = cleaned.match(/-u\s+['"]?([^:]+):([^\s'"]+)['"]?/);
  if (authMatch) {
    result.auth = { user: authMatch[1], pass: authMatch[2] };
  }
  
  return result;
}

function generateFetch(parsed: ParsedCurl, options: ConversionOptions): string {
  const { url, method, headers, body, auth } = parsed;
  const lines: string[] = [];
  
  if (options.types) {
    lines.push('// TypeScript');
    if (body) {
      lines.push('interface RequestBody {');
      lines.push('  // Define your request body type here');
      lines.push('}');
      lines.push('');
      lines.push('interface ResponseBody {');
      lines.push('  // Define your response type here');
      lines.push('}');
      lines.push('');
    }
  }
  
  if (options.async) {
    lines.push(`async function makeRequest()${options.types ? ': Promise<ResponseBody>' : ''} {`);
  } else {
    lines.push('function makeRequest() {');
  }
  
  if (options.errorHandling) {
    lines.push('  try {');
  }
  
  const indent = options.errorHandling ? '    ' : '  ';
  
  lines.push(`${indent}const response = ${options.async ? 'await ' : ''}fetch('${url}', {`);
  lines.push(`${indent}  method: '${method}',`);
  
  if (Object.keys(headers).length > 0) {
    lines.push(`${indent}  headers: {`);
    for (const [key, value] of Object.entries(headers)) {
      lines.push(`${indent}    '${key}': '${value}',`);
    }
    lines.push(`${indent}  },`);
  }
  
  if (auth) {
    const token = Buffer.from(`${auth.user}:${auth.pass}`).toString('base64');
    lines.push(`${indent}  headers: {`);
    lines.push(`${indent}    'Authorization': 'Basic ${token}',`);
    lines.push(`${indent}  },`);
  }
  
  if (body) {
    lines.push(`${indent}  body: JSON.stringify(${body}),`);
  }
  
  lines.push(`${indent}});`);
  lines.push('');
  
  lines.push(`${indent}if (!response.ok) {`);
  lines.push(`${indent}  throw new Error(\`HTTP error! status: \${response.status}\`);`);
  lines.push(`${indent}}`);
  lines.push('');
  
  lines.push(`${indent}const data = ${options.async ? 'await ' : ''}response.json()${options.types ? ' as ResponseBody' : ''};`);
  lines.push(`${indent}return data;`);
  
  if (options.errorHandling) {
    lines.push('  } catch (error) {');
    lines.push('    console.error(\'Request failed:\', error);');
    lines.push('    throw error;');
    lines.push('  }');
  }
  
  lines.push('}');
  
  if (!options.async) {
    lines.push('');
    lines.push('// Call the function');
    lines.push('makeRequest()');
    lines.push('  .then(data => console.log(data))');
    lines.push('  .catch(error => console.error(error));');
  }
  
  return lines.join('\n') + '\n';
}

function generateAxios(parsed: ParsedCurl, options: ConversionOptions): string {
  const { url, method, headers, body, auth } = parsed;
  const lines: string[] = [];
  
  lines.push("import axios from 'axios';");
  lines.push('');
  
  if (options.types) {
    lines.push('// TypeScript');
    if (body) {
      lines.push('interface RequestBody {');
      lines.push('  // Define your request body type here');
      lines.push('}');
      lines.push('');
      lines.push('interface ResponseBody {');
      lines.push('  // Define your response type here');
      lines.push('}');
      lines.push('');
    }
  }
  
  if (options.async) {
    lines.push(`async function makeRequest()${options.types ? ': Promise<ResponseBody>' : ''} {`);
  } else {
    lines.push('function makeRequest() {');
  }
  
  if (options.errorHandling) {
    lines.push('  try {');
  }
  
  const indent = options.errorHandling ? '    ' : '  ';
  
  lines.push(`${indent}const response = ${options.async ? 'await ' : ''}axios${options.types ? '<ResponseBody>' : ''}({`);
  lines.push(`${indent}  method: '${method.toLowerCase()}',`);
  lines.push(`${indent}  url: '${url}',`);
  
  if (Object.keys(headers).length > 0) {
    lines.push(`${indent}  headers: {`);
    for (const [key, value] of Object.entries(headers)) {
      lines.push(`${indent}    '${key}': '${value}',`);
    }
    lines.push(`${indent}  },`);
  }
  
  if (auth) {
    lines.push(`${indent}  auth: {`);
    lines.push(`${indent}    username: '${auth.user}',`);
    lines.push(`${indent}    password: '${auth.pass}',`);
    lines.push(`${indent}  },`);
  }
  
  if (body) {
    lines.push(`${indent}  data: ${body},`);
  }
  
  lines.push(`${indent}});`);
  lines.push('');
  lines.push(`${indent}return response.data;`);
  
  if (options.errorHandling) {
    lines.push('  } catch (error) {');
    lines.push('    if (axios.isAxiosError(error)) {');
    lines.push('      console.error(\'API error:\', error.response?.data);');
    lines.push('      throw new Error(`Request failed: ${error.response?.status}`);');
    lines.push('    }');
    lines.push('    throw error;');
    lines.push('  }');
  }
  
  lines.push('}');
  
  return lines.join('\n') + '\n';
}

function generateNode(parsed: ParsedCurl, options: ConversionOptions): string {
  const { url, method, headers, body } = parsed;
  const lines: string[] = [];
  
  const urlObj = new URL(url);
  const isHttps = urlObj.protocol === 'https:';
  
  lines.push(`const ${isHttps ? 'https' : 'http'} = require('${isHttps ? 'https' : 'http'}');`);
  lines.push('');
  
  lines.push('const options = {');
  lines.push(`  hostname: '${urlObj.hostname}',`);
  lines.push(`  port: ${urlObj.port || (isHttps ? 443 : 80)},`);
  lines.push(`  path: '${urlObj.pathname}${urlObj.search}',`);
  lines.push(`  method: '${method}',`);
  
  if (Object.keys(headers).length > 0) {
    lines.push('  headers: {');
    for (const [key, value] of Object.entries(headers)) {
      lines.push(`    '${key}': '${value}',`);
    }
    lines.push('  },');
  }
  
  lines.push('};');
  lines.push('');
  
  lines.push(`const req = ${isHttps ? 'https' : 'http'}.request(options, (res) => {`);
  lines.push('  let data = \'\';');
  lines.push('');
  lines.push('  res.on(\'data\', (chunk) => {');
  lines.push('    data += chunk;');
  lines.push('  });');
  lines.push('');
  lines.push('  res.on(\'end\', () => {');
  
  if (options.errorHandling) {
    lines.push('    if (res.statusCode >= 200 && res.statusCode < 300) {');
    lines.push('      console.log(JSON.parse(data));');
    lines.push('    } else {');
    lines.push('      console.error(`HTTP ${res.statusCode}: ${data}`);');
    lines.push('    }');
  } else {
    lines.push('    console.log(JSON.parse(data));');
  }
  
  lines.push('  });');
  lines.push('});');
  lines.push('');
  
  if (options.errorHandling) {
    lines.push('req.on(\'error\', (error) => {');
    lines.push('  console.error(\'Request failed:\', error);');
    lines.push('});');
    lines.push('');
  }
  
  if (body) {
    lines.push(`req.write(JSON.stringify(${body}));`);
  }
  
  lines.push('req.end();');
  
  return lines.join('\n') + '\n';
}

function generatePython(parsed: ParsedCurl, options: ConversionOptions): string {
  const { url, method, headers, body, auth } = parsed;
  const lines: string[] = [];
  
  lines.push('import requests');
  if (body) {
    lines.push('import json');
  }
  lines.push('');
  
  if (options.errorHandling) {
    lines.push('try:');
  }
  
  const indent = options.errorHandling ? '    ' : '';
  
  lines.push(`${indent}response = requests.${method.toLowerCase()}(`);
  lines.push(`${indent}    '${url}',`);
  
  if (Object.keys(headers).length > 0) {
    lines.push(`${indent}    headers={`);
    for (const [key, value] of Object.entries(headers)) {
      lines.push(`${indent}        '${key}': '${value}',`);
    }
    lines.push(`${indent}    },`);
  }
  
  if (auth) {
    lines.push(`${indent}    auth=('${auth.user}', '${auth.pass}'),`);
  }
  
  if (body) {
    lines.push(`${indent}    json=${body},`);
  }
  
  lines.push(`${indent})`);
  lines.push(`${indent}response.raise_for_status()`);
  lines.push(`${indent}data = response.json()`);
  lines.push(`${indent}print(data)`);
  
  if (options.errorHandling) {
    lines.push('except requests.exceptions.RequestException as e:');
    lines.push('    print(f"Request failed: {e}")');
    lines.push('    raise');
  }
  
  return lines.join('\n') + '\n';
}

function generateGo(parsed: ParsedCurl, options: ConversionOptions): string {
  const { url, method, headers, body } = parsed;
  const lines: string[] = [];
  
  lines.push('package main');
  lines.push('');
  lines.push('import (');
  lines.push('    "bytes"');
  lines.push('    "encoding/json"');
  lines.push('    "fmt"');
  lines.push('    "io"');
  lines.push('    "net/http"');
  lines.push(')');
  lines.push('');
  lines.push('func main() {');
  
  if (body) {
    lines.push(`    jsonData := []byte(\`${body}\`)`);
    lines.push(`    req, err := http.NewRequest("${method}", "${url}", bytes.NewBuffer(jsonData))`);
  } else {
    lines.push(`    req, err := http.NewRequest("${method}", "${url}", nil)`);
  }
  
  if (options.errorHandling) {
    lines.push('    if err != nil {');
    lines.push('        panic(err)');
    lines.push('    }');
  }
  
  lines.push('');
  
  if (Object.keys(headers).length > 0) {
    for (const [key, value] of Object.entries(headers)) {
      lines.push(`    req.Header.Set("${key}", "${value}")`);
    }
    lines.push('');
  }
  
  lines.push('    client := &http.Client{}');
  lines.push('    resp, err := client.Do(req)');
  
  if (options.errorHandling) {
    lines.push('    if err != nil {');
    lines.push('        panic(err)');
    lines.push('    }');
  }
  
  lines.push('    defer resp.Body.Close()');
  lines.push('');
  lines.push('    body, _ := io.ReadAll(resp.Body)');
  lines.push('    fmt.Println(string(body))');
  lines.push('}');
  
  return lines.join('\n') + '\n';
}

function generatePHP(parsed: ParsedCurl, options: ConversionOptions): string {
  const { url, method, headers, body } = parsed;
  const lines: string[] = [];
  
  lines.push('<?php');
  lines.push('');
  lines.push('$ch = curl_init();');
  lines.push('');
  lines.push(`curl_setopt($ch, CURLOPT_URL, '${url}');`);
  lines.push('curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);');
  lines.push(`curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${method}');`);
  
  if (Object.keys(headers).length > 0) {
    lines.push('curl_setopt($ch, CURLOPT_HTTPHEADER, [');
    for (const [key, value] of Object.entries(headers)) {
      lines.push(`    '${key}: ${value}',`);
    }
    lines.push(']);');
  }
  
  if (body) {
    lines.push(`curl_setopt($ch, CURLOPT_POSTFIELDS, '${body}');`);
  }
  
  lines.push('');
  lines.push('$response = curl_exec($ch);');
  
  if (options.errorHandling) {
    lines.push('');
    lines.push('if (curl_errno($ch)) {');
    lines.push('    echo \'Error: \' . curl_error($ch);');
    lines.push('} else {');
    lines.push('    $data = json_decode($response, true);');
    lines.push('    print_r($data);');
    lines.push('}');
  } else {
    lines.push('$data = json_decode($response, true);');
    lines.push('print_r($data);');
  }
  
  lines.push('');
  lines.push('curl_close($ch);');
  lines.push('?>');
  
  return lines.join('\n') + '\n';
}

function generateRuby(parsed: ParsedCurl, options: ConversionOptions): string {
  const { url, method, headers, body } = parsed;
  const lines: string[] = [];
  
  lines.push('require \'net/http\'');
  lines.push('require \'json\'');
  lines.push('require \'uri\'');
  lines.push('');
  lines.push(`uri = URI('${url}')`);
  lines.push('');
  lines.push(`req = Net::HTTP::${capitalize(method.toLowerCase())}.new(uri)`);
  
  if (Object.keys(headers).length > 0) {
    for (const [key, value] of Object.entries(headers)) {
      lines.push(`req['${key}'] = '${value}'`);
    }
  }
  
  if (body) {
    lines.push(`req.body = ${body}.to_json`);
  }
  
  lines.push('');
  
  if (options.errorHandling) {
    lines.push('begin');
    lines.push('  res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == \'https\') do |http|');
    lines.push('    http.request(req)');
    lines.push('  end');
    lines.push('');
    lines.push('  data = JSON.parse(res.body)');
    lines.push('  puts data');
    lines.push('rescue StandardError => e');
    lines.push('  puts "Request failed: #{e.message}"');
    lines.push('end');
  } else {
    lines.push('res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == \'https\') do |http|');
    lines.push('  http.request(req)');
    lines.push('end');
    lines.push('');
    lines.push('data = JSON.parse(res.body)');
    lines.push('puts data');
  }
  
  return lines.join('\n') + '\n';
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
