const parse = (x) => {
  const tokens = x.split("");

  const createNode = (type, value) => ({
    type,
    value,
    children: [],
  });

  const scanValue = (i) => {
    let value = "";
    let n = 0;
    let token = tokens[i];

    while (!token.match(/[\)\s]/)) {
      value += token;
      n++;
      token = tokens[i + n];
    }

    return [value, n];
  };

  const traverse = (node, i) => {
    if (i >= tokens.length) {
      return;
    }

    const token = tokens[i];

    let offset = 0;
    let child;

    switch (token) {
      case "(":
        child = createNode("expression");
        node.children.push(child);
        traverse(child, i + 1);
        return;
      case "+":
      case "-":
      case "*":
      case "/":
        child = createNode("operation", token);
        node.children.push(child);
        traverse(child, i + 1);
        return;
    }

    if (!Number.isNaN(Number.parseInt(token))) {
      const [value, n] = scanValue(i);
      const child = createNode("number", value);

      offset = n;
      node.children.push(child);
    }

    traverse(node, i + offset + 1);
  };

  const root = createNode("program");

  traverse(root, 0);

  return root;
};

const evaluate = (tree) => {
  let result = null;
  let operator = "";

  const runOp = (node) => {
    switch (operator) {
      case "+":
        return result + node.value;
      case "-":
        return result - node.value;
      case "*":
        return result * node.value;
      case "/":
        return result / node.value;
    }
  };

  const traverse = (node) => {
    switch (node.type) {
      case "program":
      case "expression":
        for (const child of node.children) {
          traverse(child);
        }

        break;

      case "operation":
        operator = node.value;

        for (const child of node.children) {
          traverse(child);
        }

        break;

      case "number":
        if (result === null) {
          result = node.value;
        } else {
          result = runOp(node);
        }

        break;
    }
  };

  traverse(tree);

  return result;
};

const run = (program) => evaluate(parse(program));

export default run;
