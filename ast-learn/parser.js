const {parse} = require('@babel/parser');

const code = "2 + (4 * 10)";

const ast = parse(code);

// 完整的 AST
console.log(ast , '\n-----------------------------');

// 取出特定的 body 資訊
console.log(ast.program.body[0]);

/**

Node {
  type: 'File',
  start: 0,
  end: 12,
  loc: SourceLocation {
    start: Position { line: 1, column: 0 },
    end: Position { line: 1, column: 12 },
    filename: undefined,
    identifierName: undefined
  },
  errors: [],
  program: Node {
    type: 'Program',
    start: 0,
    end: 12,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    sourceType: 'script',
    interpreter: null,
    body: [ [Node] ],
    directives: []
  },
  comments: []
}

 */
