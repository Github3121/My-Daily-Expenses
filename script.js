// JavaScript Logic for Expense Tracking
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbyQobs5r1zJ5_AzHKr-7wxBRisCPu-2o4CUPWo-9Jvtg_LijYr4XWXipZDPbVdIsg8cuQ/exec";

      document.getElementById("expenseForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const form = e.target;
        const msg = document.getElementById("msg");

        const data = new FormData(form);

        fetch(scriptURL, { method: "POST", body: data })
          .then((res) => res.text())
          .then(() => {
            msg.style.color = "green";
            msg.textContent = "✅ Data submitted successfully!";
            form.reset();
          })
          .catch((err) => {
            msg.style.display = "";
            msg.style.color = "red";
            msg.textContent = "❌ Error submitting data!";
            console.error(err);
          });
      });
      