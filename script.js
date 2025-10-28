async function verifyTicket() {
  const ticketID = document.getElementById("ticketID").value.trim();
  const result = document.getElementById("result");

  if (!ticketID) {
    result.textContent = "Please enter a Ticket ID.";
    result.style.color = "red";
    return;
  }

  result.textContent = "Checking...";
  result.style.color = "black";

  const url =
    "https://script.google.com/macros/s/AKfycbzF-ydT-ghoqEmAWzdCuaitKplVFkYUwuKTM0GlxqbxOtqI9BlDogHUnYskQWTexbJU/exec";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketID }),
    });

    const text = await response.text();

    if (text.includes("VALID")) {
      result.textContent = "✅ Ticket is VALID!";
      result.style.color = "green";
    } else if (text.includes("ALREADY USED")) {
      result.textContent = "⚠️ Ticket has ALREADY been used!";
      result.style.color = "orange";
    } else if (text.includes("INVALID")) {
      result.textContent = "❌ INVALID Ticket!";
      result.style.color = "red";
    } else {
      result.textContent = "Error verifying ticket.";
      result.style.color = "red";
      console.log(text);
    }
  } catch (error) {
    result.textContent = "Error verifying ticket.";
    result.style.color = "red";
    console.error(error);
  }
}
