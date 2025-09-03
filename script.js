document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send-btn");
  const urlInput = document.getElementById("url");
  const methodSelect = document.getElementById("method");
  const bodyTextarea = document.getElementById("body-textarea");
  const authTokenInput = document.getElementById("auth-token");
  const statusCodeSpan = document.getElementById("status-code");
  const responseTimeSpan = document.getElementById("response-time");
  const responseBodyPre = document.getElementById("response-body");
  const headersContainer = document.getElementById("headers-container");
  const addHeaderBtn = document.getElementById("add-header-btn");
  const messageBox = document.getElementById("message-box");
  const messageText = document.getElementById("message-text");
  const closeMessageBtn = document.getElementById("close-message-btn");

  // Test Assertion Elements
  const testStatusCodeCheckbox = document.getElementById("test-status-code");
  const expectedStatusCodeInput = document.getElementById(
    "expected-status-code"
  );
  const testExpectedOutputCheckbox = document.getElementById(
    "test-expected-output"
  );
  const expectedOutputTextarea = document.getElementById(
    "expected-output-textarea"
  );
  const testArraySizeCheckbox = document.getElementById("test-array-size");
  const expectedArraySizeInput = document.getElementById("expected-array-size");
  const runTestsBtn = document.getElementById("run-tests-btn");
  const testResultsList = document.getElementById("test-results-list");

  let lastApiResponse = { status: null, body: null };

  // --- UI Functions ---
  const showMessage = (text, type = "info") => {
    let bgColor = "";
    if (type === "success") {
      bgColor = "bg-green-600";
    } else if (type === "error") {
      bgColor = "bg-red-600";
    } else {
      bgColor = "bg-blue-600";
    }
    messageBox.className = `fixed inset-x-0 top-0 mt-4 mx-auto p-4 rounded-lg shadow-lg text-white font-medium text-center z-50 transition-transform transform translate-y-0 opacity-100 ${bgColor}`;
    messageText.textContent = text;
    setTimeout(() => {
      hideMessage();
    }, 5000);
  };

  const hideMessage = () => {
    messageBox.className = `fixed inset-x-0 top-0 mt-4 mx-auto p-4 rounded-lg shadow-lg text-white font-medium text-center z-50 transition-transform transform -translate-y-full opacity-0`;
  };

  closeMessageBtn.addEventListener("click", hideMessage);

  // --- Header Management ---
  window.removeHeader = (button) => {
    button.parentElement.remove();
  };

  addHeaderBtn.addEventListener("click", () => {
    const headerDiv = document.createElement("div");
    headerDiv.className = "flex gap-2 items-center";
    headerDiv.innerHTML = `
                    <input type="text" placeholder="Key" class="w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400">
                    <input type="text" placeholder="Value" class="w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400">
                    <button onclick="removeHeader(this)" class="text-gray-400 hover:text-red-500 transition-colors duration-200"><i class="fas fa-times"></i></button>
                `;
    headersContainer.appendChild(headerDiv);
  });

  // --- JSON Formatting & Colorization ---
  const formatAndColorizeJson = (json) => {
    try {
      const parsed = JSON.parse(json);
      const formatted = JSON.stringify(parsed, null, 2);

      const colored = formatted.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
          let cls = "json-punctuation";
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = "json-key";
            } else {
              cls = "json-string";
            }
          } else if (/true|false/.test(match)) {
            cls = "json-boolean";
          } else if (/null/.test(match)) {
            cls = "json-null";
          } else {
            cls = "json-number";
          }
          return `<span class="${cls}">${match}</span>`;
        }
      );
      return colored;
    } catch (e) {
      return `<span class="text-red-500">Invalid JSON</span>`;
    }
  };

  bodyTextarea.addEventListener("input", () => {
    const jsonText = bodyTextarea.value;
    if (jsonText.trim() === "") {
      bodyTextarea.style.backgroundColor = "";
      bodyTextarea.style.color = "";
      bodyTextarea.classList.remove("json-editor");
    } else {
      bodyTextarea.classList.add("json-editor");
    }
  });

  // --- Enter key submission ---
  urlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendBtn.click();
    }
  });

  bodyTextarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });

  // --- Test Assertion Logic ---
  runTestsBtn.addEventListener("click", () => {
    testResultsList.innerHTML = "";
    const apiResponse = lastApiResponse;

    if (!apiResponse.body) {
      showMessage(
        "No API response to test. Please send a request first.",
        "error"
      );
      return;
    }

    let testsPassed = 0;
    let testsTotal = 0;

    const addTestResult = (testName, isPassed, message) => {
      const li = document.createElement("li");
      li.className = `flex items-center space-x-2 ${
        isPassed ? "text-green-500" : "text-red-500"
      }`;
      li.innerHTML = `
                        <i class="fas ${
                          isPassed ? "fa-check-circle" : "fa-times-circle"
                        }"></i>
                        <span>${testName}</span>
                    `;
      if (!isPassed && message) {
        li.innerHTML += `<p class="ml-6 text-sm italic text-gray-400">${message}</p>`;
      }
      testResultsList.appendChild(li);
      testsTotal++;
      if (isPassed) testsPassed++;
    };

    // Test 1: Status Code
    if (testStatusCodeCheckbox.checked) {
      const expectedCode = parseInt(expectedStatusCodeInput.value);
      const isPassed = apiResponse.status === expectedCode;
      const message = isPassed
        ? null
        : `Expected ${expectedCode}, but got ${apiResponse.status}`;
      addTestResult("Status Code Test", isPassed, message);
    }

    // Test 2: Expected Output
    if (testExpectedOutputCheckbox.checked) {
      try {
        const expectedOutput = JSON.parse(expectedOutputTextarea.value);
        const isPassed =
          JSON.stringify(apiResponse.body) === JSON.stringify(expectedOutput);
        const message = isPassed
          ? null
          : "Response body does not match expected output.";
        addTestResult("Expected Output Test", isPassed, message);
      } catch (e) {
        addTestResult(
          "Expected Output Test",
          false,
          "Invalid JSON in Expected Output field."
        );
      }
    }

    // Test 3: Array Size
    if (testArraySizeCheckbox.checked) {
      const expectedSize = parseInt(expectedArraySizeInput.value);
      let isPassed = false;
      let message = "";

      if (Array.isArray(apiResponse.body)) {
        isPassed = apiResponse.body.length === expectedSize;
        message = isPassed
          ? null
          : `Expected array size of ${expectedSize}, but got ${apiResponse.body.length}`;
      } else {
        message = `Response body is not a top-level array.`;
      }

      addTestResult("Array Size Test", isPassed, message);
    }
  });

  // --- Core Logic ---
  sendBtn.addEventListener("click", async () => {
    const url = urlInput.value.trim();
    const method = methodSelect.value;
    const body = bodyTextarea.value.trim();
    const token = authTokenInput.value.trim();

    if (!url) {
      showMessage("Please enter a valid API URL.", "error");
      return;
    }

    try {
      const startTime = performance.now();

      const headers = {};
      if (token) {
        headers["Authorization"] = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;
      }
      document
        .querySelectorAll("#headers-container > div:not(:first-child)")
        .forEach((div) => {
          const key = div.querySelector("input:nth-child(1)").value.trim();
          const value = div.querySelector("input:nth-child(2)").value.trim();
          if (key && value) {
            headers[key] = value;
          }
        });

      const requestOptions = { method, headers };

      if (method === "POST" || method === "PUT") {
        if (body) {
          try {
            requestOptions.body = JSON.stringify(JSON.parse(body));
            headers["Content-Type"] = "application/json";
          } catch (e) {
            showMessage("Invalid JSON in request body.", "error");
            responseBodyPre.textContent = "Invalid JSON in request body.";
            return;
          }
        }
      }

      responseBodyPre.textContent = "Loading...";
      statusCodeSpan.textContent = "Status: Fetching...";
      responseTimeSpan.textContent = "Time: N/A";

      const response = await fetch(url, requestOptions);

      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);

      statusCodeSpan.textContent = `Status: ${response.status} ${response.statusText}`;
      responseTimeSpan.textContent = `Time: ${duration}ms`;

      const responseBodyText = await response.text();
      try {
        const parsedJson = JSON.parse(responseBodyText);
        responseBodyPre.innerHTML = formatAndColorizeJson(responseBodyText);
        lastApiResponse.body = parsedJson;
      } catch (e) {
        responseBodyPre.textContent = responseBodyText;
        lastApiResponse.body = responseBodyText;
      }
      lastApiResponse.status = response.status;

      if (response.ok) {
        statusCodeSpan.className = "font-semibold text-green-500";
      } else if (response.status >= 400 && response.status < 500) {
        statusCodeSpan.className = "font-semibold text-orange-500";
      } else if (response.status >= 500) {
        statusCodeSpan.className = "font-semibold text-red-500";
      } else {
        statusCodeSpan.className = "font-semibold text-gray-500";
      }

      if (
        testStatusCodeCheckbox.checked ||
        testExpectedOutputCheckbox.checked ||
        testArraySizeCheckbox.checked
      ) {
        runTestsBtn.click();
      }
    } catch (error) {
      showMessage("Network error or API is not running.", "error");
      responseBodyPre.textContent = `Error: ${error.message}. Check if the API is running and the URL is correct.`;
      statusCodeSpan.textContent = "Status: Error";
      responseTimeSpan.textContent = "Time: N/A";
      lastApiResponse = { status: 0, body: null };
      console.error("Fetch error:", error);
    }
  });
});
