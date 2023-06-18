# Dynamic Web TWAIN React Advanced

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It utilizes the SDK [Dynamic Web TWAIN](https://www.dynamsoft.com/Products/WebTWAIN_Overview.aspx) to provide the following functionalities

- Scan documents from physical or virtual scanners
- Scan and Save all images as multipage pdf file
- Scan and Save image as an individual 1-page PDF file
- Remove Blank Images
- Remove All Images

## Usage

Environment: Node.js v16.20.0

1. Apply for a [30-day free trial license](https://www.dynamsoft.com/customer/license/trialLicense?product=dwt) of Dynamic Web TWAIN.

2. Update the license key in `src\Dwt.js` file:

   ```
   Dynamsoft.DWT.ProductKey = "LICENSE-KEY";
   ```

3. Install the dependencies:

   ```
   npm install --force
   ```

4. Run the application as follows:

   ```
   npm start
   ```
