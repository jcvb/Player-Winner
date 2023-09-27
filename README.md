# Encrypted Instructions Decoder

![App](https://i.ibb.co/dtC4F7R/Screenshot-2023-09-26-at-7-23-19-p-m.png)

This project consists of a competitive game between two players across several rounds. At the end of each round, each player obtains a score, and the accumulated score along with the difference (lead) are observed. The winner of the game is the player who achieves the greatest lead at the end of any round during the game.

## Technologies Utilized

The following technologies and libraries were employed in the development of this application:

- **[ESLint](https://eslint.org/)**: A static code analysis tool for identifying problematic patterns found in JavaScript code.

- **[eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)**: This package provides Airbnb's .eslintrc as an extensible shared config, enforcing a strict and clean code standard.

- **[Prettier](https://prettier.io/)**: An opinionated code formatter, ensuring that all outputted code conforms to a consistent style.

- **[Vitest](https://github.com/vitest-dev/vitest)**: A modern, powerful, and extensible test runner, designed for Vite projects.

- **[jsdom](https://github.com/jsdom/jsdom)**: A simulation of a web browser's environment allows us to test JavaScript code server-side, or in isolation from a browser.

- **[@testing-library](https://testing-library.com/)**: A family of libraries that allows for easy and clean testing of UI components.

- **[Shade UI Library](https://ui.shade.cn.com/)**: A comprehensive library of pre-designed components, aiding in swift and consistent UI


## Demo

A live demo of the application can be found at [https://player-winner.vercel.app/](https://player-winner.vercel.app/).

## Game Example

Consider a game of 5 rounds. Here's a scorecard for the rounds:

| Round | Player 1 | Player 2 |
|-------|----------|----------|
| 1     | 140      | 82       |
| 2     | 89       | 134      |
| 3     | 90       | 110      |
| 4     | 112      | 106      |
| 5     | 88       | 90       |

At the end of each round, the accumulated scores and the current leader along with the lead are observed. In this example, Player 1 would be the winner as they obtained the maximum lead (58) at the end of the first round.

## Program Input

The input to the program is a text file with the following structure:

- The first line contains an integer (≤ 10000) indicating the number of rounds.
- Each subsequent line contains the scores of the two players for each round.

Example input file content:

```txt
5
140 82
89 134
90 110
112 106
88 90
```

## Program Output

The output of the program is a text file with a single line containing two integers. The first integer is 1 or 2, indicating the winner, and the second integer is the lead with which the winner won.

Example output file content:
```txt
1 58
```


## Getting Started

### Prerequisites

- Node.js
- npm or Yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jcvb/Player-Winner.git
cd encrypted-instructions-decoder
```

# Available Scripts

In the project directory, you can run several commands to aid in the development, building, and testing of your application.

### `dev`

```bash
npm run dev
```
This command runs the app in development mode via Vite. Your project will reload automatically if you make edits, and you will see any lint errors in the console.

### `dev`

```bash
npm run build
```

This command first invokes the TypeScript compiler (tsc) to check for type errors and then uses Vite to build a production version of your app.

### `lint`

```bash 
npm run lint
```

This command runs ESLint on your project to catch and fix problems in your code. It checks all TypeScript (ts, tsx) files, reports any unused eslint-disable directives, and ensures that there are no warnings.

### `preview`

```bash
npm run preview
```

This command serves the production-built app for previewing purposes. It's a way to review the built project before deploying it.

### `prettier`
  
```bash
npm run prettier
```

This command runs Prettier to format all the files in your project, ensuring coding style consistency.

### `test`

```bash 
npm run test
```

This command runs your tests using Vitest, a test runner configured for use with Vite.

### `coverage`
  
```bash 
npm run coverage
```

This command runs your tests and collects coverage information, reporting which parts of your codebase are tested.

# FileUploader Component Functionality

The `FileUploader` component provides an interface for users to submit information either by uploading a file or entering the details manually in a text area. 

## Features

- **Upload Mode Toggle**: A switch to toggle between file upload and manual entry modes.
- **File Input**: An input field for users to select and upload a file.
- **Text Area**: A text area for users to manually enter the details.
- **Submit**: A button to submit the information for processing.
- **Reset**: A button to reset all fields, clearing any entered or uploaded information.

## Usage

1. **Toggling Upload Mode**:
    - By default, the file upload mode is selected.
    - Users can toggle to manual entry mode by flipping the switch next to "Enter manually" label.

2. **Uploading a File**:
    - In file upload mode, users can click on the file input field to select a file from their device.
    - After selecting a file, users can click the "Decrypt" button to submit the file for processing.

3. **Entering Details Manually**:
    - In manual entry mode, users can type or paste the information into the text area.
    - After entering the information, users can click the "Decrypt" button to submit the text for processing.

4. **Resetting the Form**:
    - Users can click the "Reset" button to clear all fields, reverting the form to its initial state.

5. **Error Handling**:
    - Any error occurring during file reading or text processing will be displayed on the UI.

6. **Processing**:
    - Upon submission, the content from the file or text area is processed.
    - It reads the instructions from the content, performs certain checks, and generates an output file named 'output.txt', which is then automatically downloaded to the user's device.

## Code Structure

- **State Management**:
    - `useState` hooks are used to manage the state of the component.
    - There are state variables for toggling the upload mode (`checked`), storing the uploaded file (`file`), storing the manually entered text (`text`), and storing any error message (`error`).

- **Event Handlers**:
    - Event handlers are defined for toggling the upload mode, handling file input change, handling text area input change, handling form submission, and resetting the form.

- **File and Text Processing**:
    - The `handleFileSubmit` and `handleTextSubmit` functions handle the file and text processing respectively, extracting the content and passing it to the `processContent` function.
    - The `processContent` function further processes the content, performing the necessary checks and generating the output file.

- **UI Components**:
    - The UI is structured using various components such as `Button`, `Switch`, `Label`, `Input`, `Textarea`, and `Card` components to organize the interface into a clear, user-friendly form.

## Example

```jsx
import FileUploader from './FileUploader';  // adjust the import path according to your file structure

function App() {
  return (
    <div className="App">
      <FileUploader />
    </div>
  );
}

export default App;
```





