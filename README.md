# Exact Imports Extension for Visual Studio Code

## Overview

The "Exact Imports" extension for Visual Studio Code helps developers automatically reformat import statements for Material-UI and lodash. Instead of using grouped import statements, the extension transforms them into individual import lines for better readability and maintainability.

### Before:

```
import { Skeleton, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { startCase, capitalize } from 'lodash';
```

### After:

```
import Skeleton from '@material-ui/lab/Skeleton';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import startCase from 'lodash/startCase';
import capitalize from 'lodash/capitalize';
```

### Features

**Transform Imports:** Automatically converts grouped import statements into individual lines.

**Selective Formatting:** Applies only to Material-UI and lodash imports, preserving other import formats.

### Usage

**Install the Extension:** Search for "Exact Imports" in the Visual Studio Code Extensions Marketplace and install it.

**Open a TypeScript or JavaScript File:** The extension works on .ts and .js files.

**Run the Command:** Press Cmd+Shift+P (or Ctrl+Shift+P on Windows/Linux) to open the Command Palette, and type "Exact Imports" to run the command. Alternatively, use the keybinding Ctrl+F9.

### Configuration

No additional configuration is required. The extension works out of the box for Material-UI and lodash imports.

### Feedback and Support

If you encounter any issues or have suggestions for improvements, please [file an issue on GitHub](https://github.com/livingkurt/Exact-Import/issues)
.

### License

This extension is released under the MIT License. See the LICENSE file for more details.
