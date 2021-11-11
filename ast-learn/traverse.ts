import {parse} from "@babel/parser";
import traverse from "@babel/traverse";

const code2 = "(2 + 4) * 10";

const ast2 = parse(code2);

traverse(ast2, {

  BinaryExpression(path) {

    // 會顯示出所有的運算子
    console.log('[BinaryExpression] , path.node.operator=', path.node.operator);
  },

  NumericLiteral: {
    enter: (path) => {

      // 會顯示出所有的數字
      console.log('[NumericLiteral - enter] , path.node.value=', path.node.value);
    },
    exit: (path) => {

      // 會顯示出所有的數字
      console.log('[NumericLiteral - exit] path.node.value=', path.node.value);
    },
  }

})

// ts-node 時 , 如果遇到 Could not find a declaration file for module '@babel/traverse' , 需要安裝 @types/babel__traverse ( npm i --save-dev @types/babel__traverse )
