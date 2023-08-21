import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.exactImports",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const text = document.getText();
        const newText = exactImports(text);
        const fullRange = new vscode.Range(
          document.positionAt(0),
          document.positionAt(text.length)
        );
        editor.edit(editBuilder => {
          editBuilder.replace(fullRange, newText);
        });
      }
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}

function exactImports(text: string): string {
  // Regular expression to match the Material-UI and lodash import statements
  const importRegex =
    /import\s+{([^}]+)}\s+from\s+'((@material-ui\/[^']+)|lodash)';/g;

  // Function to transform each matched import statement
  const replacer = (match: string, p1: string, p2: string) => {
    // If the import is not from Material-UI or lodash, return the original match
    if (!p2.startsWith("@material-ui") && !p2.startsWith("lodash")) {
      return match;
    }
    const imports = p1.split(",").map(s => s.trim());
    return imports.map(imp => `import ${imp} from '${p2}/${imp}';`).join("\n");
  };

  // Replace the matched import statements with the transformed ones
  return text.replace(importRegex, replacer);
}
