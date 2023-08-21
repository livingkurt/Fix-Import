"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
function activate(context) {
    let disposable = vscode.commands.registerCommand("extension.fixImports", () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();
            const newText = fixImports(text);
            const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
            editor.edit(editBuilder => {
                editBuilder.replace(fullRange, newText);
            });
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
function fixImports(text) {
    // Regular expression to match the Material-UI and lodash import statements
    const importRegex = /import\s+{([^}]+)}\s+from\s+'((@material-ui\/[^']+)|lodash)';/g;
    // Function to transform each matched import statement
    const replacer = (match, p1, p2) => {
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
// function fixImports(text: string) {
//   return text.replace(
//     /import\s*{([^}]+)}\s*from\s*['"]([^'"]+)['"];/g,
//     (match, imports, from) => {
//       const parts = imports.split(",").map(s => s.trim());
//       return parts
//         .map(part => `import ${part} from '${from}/${part}';`)
//         .join("\n");
//     }
//   );
// }
//# sourceMappingURL=extension.js.map