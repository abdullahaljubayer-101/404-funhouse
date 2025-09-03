# 404 Funhouse

A whimsical, in-browser API testing tool for developers who enjoy debugging with a sense of humor. The **404 Funhouse** provides a straightforward interface to send API requests, inspect responses, and run quick-and-dirty tests directly in your browser. No fuss, just fun.

Visit The Website: [404 Funhouse](https://abdullahaljubayer-101.github.io/404-funhouse/)

## Features

* **HTTP Method Support:** Easily select from `GET`, `POST`, `PUT`, and `DELETE` methods.
* **Custom Headers & Body:** Add any number of custom headers, including Authorization tokens. For `POST` and `PUT` requests, a dedicated panel allows for entering a JSON body.
* **Real-time Response Display:** Get immediate feedback with a color-coded JSON viewer. The viewer is designed to handle very long responses with both horizontal and vertical scrolling, ensuring the UI remains clean and functional.
* **Quick Assertions:** Built-in test cases allow you to check:
    * The HTTP status code.
    * Whether the response body matches an expected JSON output.
    * The size of a top-level array in the response.
* **Intuitive UI:** The three-panel layout keeps everything you need in one view, from request parameters to test results.

## How to Use

The **404 Funhouse** is a single HTML file, which makes it incredibly simple to use and host.

1.  **Open the Tool:** Just visit the website at: [404 Funhouse](https://abdullahaljubayer-101.github.io/404-funhouse/)
2.  **Enter Your Request:**
    * Select your HTTP method from the dropdown.
    * Type or paste the API URL.
    * Add any required headers (e.g., `Authorization: Bearer <your-token>`) and a JSON request body if needed.
3.  **Send & View:**
    * Click the **Send** button. The response will appear in the middle panel, along with the status code and response time.
4.  **Run Tests:**
    * In the right-hand panel, check the box next to the tests you want to run.
    * Fill in the expected values (e.g., `200` for a status code, or a full JSON object).
    * Click **Run Tests** to see the results.

## Contributing

The **404 Funhouse** is a simple project. If you have an idea for a feature or a bug fix, feel free to open an issue or submit a pull request!
