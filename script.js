// Visit Counter
let visitCount = localStorage.getItem("visitCount") || 0;
visitCount++;
localStorage.setItem("visitCount", visitCount);
document.getElementById("visitCount").innerText = visitCount;

// Clipboard Post Button
document.getElementById("postBtn").addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    document.getElementById("videoInput").value = text;
  } catch (err) {
    alert("Clipboard থেকে পড়া যাচ্ছে না!");
  }
});

// Generate Button → Backend Call
document.getElementById("generateBtn").addEventListener("click", async () => {
  const videoId = document.getElementById("videoInput").value;
  if (!videoId) return alert("ভিডিও URL বা ID দিন!");

  const res = await fetch(`/api/video?id=${videoId}`);
  const data = await res.json();

  if (data.error) {
    alert("Error: " + data.error);
    return;
  }

  // Populate UI
  document.getElementById("thumbnail").src = data.thumbnail;
  document.getElementById("uploadTime").innerText = "Uploaded: " + data.uploadTime;
  document.getElementById("views").innerText = data.views;
  document.getElementById("likes").innerText = data.likes;
  document.getElementById("dislikes").innerText = data.dislikes;
  document.getElementById("comments").innerText = data.comments;
  document.getElementById("videoTitle").innerText = data.title;
  document.getElementById("audienceType").innerText = data.audience;
  document.getElementById("category").innerText = data.category;
  document.getElementById("license").innerText = data.license;
});

// Copy Title
document.getElementById("copyTitle").addEventListener("click", () => {
  const title = document.getElementById("videoTitle").innerText;
  navigator.clipboard.writeText(title);
  alert("Title copied!");
});

// Download Thumbnail
document.getElementById("downloadBtn").addEventListener("click", () => {
  const imgUrl = document.getElementById("thumbnail").src;
  const a = document.createElement("a");
  a.href = imgUrl;
  a.download = "thumbnail.jpg";
  a.click();
});

