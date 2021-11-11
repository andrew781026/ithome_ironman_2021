/**
 * 課程名稱 : practical-abstract-syntax-trees
 * 課程連結 : https://www.newline.co/courses/practical-abstract-syntax-trees/traversing-an-ast
 */
const {parse} = require('@babel/parser');

const code = "2 + (4 * 10)";

const ast = parse(code);

// 完整的 AST
// console.log(ast, '\n-----------------------------');

// 取出特定的 body 資訊
const body0 = ast.program.body[0];
console.log('body[0]=', body0, '\n-----------------------------');

// 顯示所有的 AST Detail 的資訊
console.log('2=', body0.expression.left.value);
console.log('+=', body0.expression.operator);
console.log('4=', body0.expression.right.left.value);
console.log('*=', body0.expression.right.operator);
console.log('10=', body0.expression.right.right.value);

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

const code2 = "(2 + 4) * 10";

const ast2 = parse(code2);

// after move the ( place , we get an undefined error , using @babel/traverse to do this might better

const traverse = require('@babel/traverse').default;

traverse(ast2, {

  BinaryExpression(path) {

    // 會顯示出所有的運算子
    console.log('[BinaryExpression] , path.node.operator=',path.node.operator);
  },

  NumericLiteral: {
    enter: (path) => {

      // 會顯示出所有的數字
      console.log('[NumericLiteral - enter] , path.node.value=', path.node.value);
    },
    exit: (path) => {

      // 會顯示出所有的數字
      console.log('[NumericLiteral - exit] path.node.value=', path.node.value);
    }
  }

})

// Preventing runtime errors , using @babel/types form type checking

