import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.exactImports",
    () => {
      exactImportsCommand();
    }
  );

  context.subscriptions.push(disposable);

  vscode.workspace.onWillSaveTextDocument(
    (e: vscode.TextDocumentWillSaveEvent) => {
      const exactImportsOnSave = vscode.workspace
        .getConfiguration("exactImports")
        .get("exactImportsOnSave");
      if (exactImportsOnSave) {
        e.waitUntil(exactImportsCommand());
      }
    }
  );
}

function exactImportsCommand(): Thenable<boolean> {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const text = document.getText();
    const newText = exactImports(text);
    const fullRange = new vscode.Range(
      document.positionAt(0),
      document.positionAt(text.length)
    );
    return editor.edit(editBuilder => {
      editBuilder.replace(fullRange, newText);
    });
  }
  return Promise.resolve(false);
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

// function exactImports(text: string): string {
//   // Regular expression to match Material-UI v4, v5, and lodash import statements
//   const importRegex = /import\s+{([^}]+)}\s+from\s+'((@material-ui\/core|@material-ui\/lab|@mui\/material|@mui\/lab|lodash)[^']*)';/g;

//   // Function to transform each matched import statement
//   const replacer = (match: string, p1: string, p2: string) => {
//     const imports = p1.split(",").map(s => s.trim());

//     // Handle MUI v5 imports
//     if (p2.startsWith("@mui/material") || p2.startsWith("@mui/lab")) {
//       return imports
//         .map(imp => `import ${imp} from '${p2}/${imp}';`)
//         .join("\n");
//     }

//     // Handle MUI v4 and lodash imports
//     if (p2.startsWith("@material-ui") || p2.startsWith("lodash")) {
//       return imports
//         .map(imp => `import ${imp} from '${p2}/${imp}';`)
//         .join("\n");
//     }

//     // If the import is not from Material-UI or lodash, return the original match
//     return match;
//   };

//   // Replace the matched import statements with the transformed ones
//   return text.replace(importRegex, replacer);
// }
