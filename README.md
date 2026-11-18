# 🎪 404 Funhouse

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-222?style=flat-square&logo=github)

A lightweight **API testing tool that runs right in your browser**. Send a request, look at the response and run a few quick checks, all without installing anything or creating an account. 🧪

I built it for those moments when I just want to poke an endpoint quickly and opening a full API client feels like too much.

🌐 **Try it:** [abdullahaljubayer-101.github.io/404-funhouse](https://abdullahaljubayer-101.github.io/404-funhouse/)

---

## ✨ Features

- 🔀 **HTTP methods**: `GET`, `POST`, `PUT` and `DELETE`
- 🧾 **Custom headers**: add as many as you need, including `Authorization` tokens
- 📦 **JSON body** editor for `POST` and `PUT` requests
- 🎨 **Color-coded JSON viewer** that scrolls nicely, even for very long responses
- ⏱️ **Status code and response time** shown for every request
- ✅ **Quick tests**:
  - Check the HTTP status code
  - Check if the response matches an expected JSON
  - Check the size of a top-level array
- 🧩 Clean **three-panel layout**: request → response → tests

## 🚀 How to use

1. Open the [live site](https://abdullahaljubayer-101.github.io/404-funhouse/).
2. Pick a method and paste your API URL.
3. Add headers and a JSON body if you need them.
4. Hit **Send** and check the response in the middle panel.
5. In the right panel, tick the tests you want, fill in the expected values and click **Run Tests**.

> 💡 Requests are sent straight from your browser, so the API you're calling needs to allow CORS.

## 💻 Run it locally

It's just static files, so there's nothing to install:

```bash
git clone https://github.com/abdullahaljubayer-101/404-funhouse.git
cd 404-funhouse
open index.html   # or double-click it
```

## 🛠️ Built with

- HTML, CSS and vanilla JavaScript
- Tailwind CSS (CDN)
- Font Awesome icons
- Fetch API + `performance.now()` for timing

## 🤝 Contributing

Got an idea or found a bug? Feel free to open an issue or a pull request. 🙌

---

Made by **Abdullah Al Jubayer** · [GitHub](https://github.com/abdullahaljubayer-101) · [Portfolio](https://abdullahaljubayer.com)
