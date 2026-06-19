document
  .getElementById("submission-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const statusDiv = document.getElementById("form-status");
    statusDiv.innerText = "Submitting...";

    // Get the raw text value from your HTML input field
    const userInputValue = document.getElementById("user-message").value;

    // CONSTRUCT THE PAYLOAD USING YOUR COLUMN ID
    const formData = {
      fldl0xHMXhdBhCyDn: userInputValue, // <-- Put your column ID here as the key
    };

    // Your Vercel canonical production URL
    const PROXY_URL = "https://airtable-proxy-olive.vercel.app/api/submit";

    try {
      const response = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        statusDiv.innerText = "Success! Data saved to Airtable.";
        document.getElementById("submission-form").reset();
      } else {
        const errData = await response.json();
        statusDiv.innerText = `Submission failed: ${errData.error || response.statusText}`;
      }
    } catch (error) {
      statusDiv.innerText = "Error connecting to backend submission script.";
      console.error(error);
    }
  });
