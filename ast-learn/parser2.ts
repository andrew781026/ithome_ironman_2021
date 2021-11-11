/**
 * 課程名稱 : practical-abstract-syntax-trees
 * 課程連結 : https://www.newline.co/courses/practical-abstract-syntax-trees/traversing-an-ast
 */
import {parse} from '@babel/parser';

const code = "2 + (4 * 10)";

const ast = parse(code);

// 完整的 AST
// console.log(ast, '\n-----------------------------');

// 取出特定的 body 資訊
const [statement] = ast.program.body; // statement = ast.program.body[0]
console.log('body[0]=', statement, '\n-----------------------------');

// 顯示所有的 AST Detail 的資訊
if (
  statement.type === 'ExpressionStatement' &&   // 讓 statement.expression 能過關
  statement.expression.type === 'BinaryExpression' &&   // 讓 statement.expression.left - operator - right 能過關
  statement.expression.left.type === 'NumericLiteral' &&  // 讓 statement.expression.left.value 能過關
  statement.expression.right.type === 'BinaryExpression' &&   // 讓 statement.expression.right.left - operator - right 能過關
  statement.expression.right.left.type === 'NumericLiteral' && // 讓 statement.expression.right.left.value 能過關
  statement.expression.right.right.type === 'NumericLiteral'   // 讓 statement.expression.right.right.value 能過關
){

  console.log('2=', statement.expression.left.value);
  console.log('+=', statement.expression.operator);
  console.log('4=', statement.expression.right.left.value);
  console.log('*=', statement.expression.right.operator);
  console.log('10=', statement.expression.right.right.value);
}

// ts-node 時 , 如果遇到 cannot find name console , 需要安裝  @types/node ( npm i --save-dev  @types/node )
// https://stackoverflow.com/questions/42105984/cannot-find-name-console-what-could-be-the-reason-for-this/42106036
