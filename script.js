"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // === Tab Navigation ===
  const tabs = document.querySelectorAll(".tab__button");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      tabs.forEach(b => b.classList.remove("tab__button--active"));
      btn.classList.add("tab__button--active");
      contents.forEach(c => c.classList.remove("tab-content--active"));
      document.getElementById(`tab-${target}`).classList.add("tab-content--active");
      // Simpan tab aktif
      localStorage.setItem("activeTab", target);
    });
  });

  // Pulihkan tab aktif dari sesi lepas
  const savedTab = localStorage.getItem("activeTab");
  if (savedTab) {
    const btn = document.querySelector(`[data-tab="${savedTab}"]`);
    if (btn) btn.click();
  }

  // === Learning Tracks dengan localStorage ===
  const tracks = [
    {
      id: "system-logic",
      title: "System Logic",
      items: ["Pasang WSL2 & Ubuntu", "Guna htop pantau proses", "Skrip bash arkib log", "Urus servis dengan PM2", "Fahami permission fail"]
    },
    {
      id: "vanilla-craft",
      title: "Vanilla Craft",
      items: ["Bina halaman HTML5 semantik", "CSS Layout (Flexbox/Grid)", "Vanilla JS DOM manipulation", "Service Worker untuk offline", "PWA Manifest & installable"]
    },
    {
      id: "agentic-ai",
      title: "Agentic AI",
      items: ["Pasang Ollama & tarik model", "Bina skrip Python chat API", "Ejen baca fail log tempatan", "RAG dengan LanceDB", "Protokol MCP asas"]
    },
    {
      id: "analysis-fix",
      title: "Analysis & Fix",
      items: ["Kenal pasti bug dengan console.log", "Guna Chrome DevTools debugger", "RCA: teknik 5 Whys", "Suntik dan baiki memory leak", "Tulis laporan RCA"]
    }
  ];

  const container = document.getElementById("tracks-container");
  const progress = JSON.parse(localStorage.getItem("trackProgress") || "{}");

  tracks.forEach(track => {
    const card = document.createElement("div");
    card.className = "track-card";
    card.innerHTML = `<h3>${track.title}</h3>`;
    track.items.forEach((item, idx) => {
      const key = `${track.id}-${idx}`;
      const checked = progress[key] ? "checked" : "";
      const div = document.createElement("div");
      div.className = "track-item";
      div.innerHTML = `
        <input type="checkbox" id="${key}" ${checked}>
        <label for="${key}">${item}</label>
      `;
      card.appendChild(div);
    });
    container.appendChild(card);
  });

  // Event delegation untuk checkbox
  container.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      progress[e.target.id] = e.target.checked;
      localStorage.setItem("trackProgress", JSON.stringify(progress));
    }
  });

  // === Log Book ===
  const logForm = document.getElementById("log-form");
  const logInput = document.getElementById("log-input");
  const logEntriesDiv = document.getElementById("log-entries");

  const loadLogEntries = () => {
    const entries = JSON.parse(localStorage.getItem("logEntries") || "[]");
    logEntriesDiv.innerHTML = "";
    entries.reverse().forEach(entry => {
      const div = document.createElement("div");
      div.className = "log-entry";
      div.innerHTML = `
        <div>
          <div class="date">${entry.date}</div>
          <div class="content">${escapeHtml(entry.content)}</div>
        </div>
        <button class="delete-btn" data-id="${entry.id}">🗑️</button>
      `;
      logEntriesDiv.appendChild(div);
    });
  };

  const saveLogEntry = (content) => {
    const entries = JSON.parse(localStorage.getItem("logEntries") || "[]");
    const newEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      date: new Date().toISOString().slice(0, 10),
      content
    };
    entries.push(newEntry);
    localStorage.setItem("logEntries", JSON.stringify(entries));
    loadLogEntries();
  };

  logForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = logInput.value.trim();
    if (!content) return;
    saveLogEntry(content);
    logInput.value = "";
  });

  logEntriesDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.dataset.id;
      let entries = JSON.parse(localStorage.getItem("logEntries") || "[]");
      entries = entries.filter(entry => entry.id !== id);
      localStorage.setItem("logEntries", JSON.stringify(entries));
      loadLogEntries();
    }
  });

  loadLogEntries();

  // === Terminal Playground ===
  const termOutput = document.getElementById("terminal-output");
  const termInput = document.getElementById("terminal-input");
  const term = document.getElementById("terminal");

  const commands = {
    help: `Arahan yang ada: help, clear, date, whoami, ls, htop (simulasi), node -v, fetch, uname`,
    date: new Date().toString(),
    whoami: "architect",
    ls: "SKILL.md  DESIGN.md  STRUCTURE.md  ARCHITECTURE.md  API_SPEC.md  RULES.md\npublic/  agent-lab/  logs/",
    "node -v": "v20.11.0 (simulasi)",
    fetch: "Mengambil data dari http://localhost:8000... (API tidak tersedia dalam simulasi)",
    uname: "Linux blueprint 5.15.0 WSL2 x86_64",
    htop: "Simulasi output htop:\nPID   CPU%   MEM%   COMMAND\n1123  0.0    0.4    /usr/bin/pm2\n1456  2.1    1.2    /usr/bin/python agent.py\n(Itu sahaja, bukan htop sebenar)"
  };

  const appendOutput = (text) => {
    termOutput.textContent += text + "\n";
    term.scrollTop = term.scrollHeight;
  };

  termInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = termInput.value.trim();
      appendOutput(`$ ${cmd}`);
      if (cmd === "clear") {
        termOutput.textContent = "";
      } else if (commands[cmd]) {
        appendOutput(commands[cmd]);
      } else {
        appendOutput(`command not found: ${cmd}. Taip "help" untuk bantuan.`);
      }
      termInput.value = "";
    }
  });

  // Fokus pada input terminal bila tab playground dibuka
  document.querySelector('[data-tab="playground"]').addEventListener("click", () => {
    setTimeout(() => termInput.focus(), 50);
  });

  // Fungsi kecil untuk elak XSS
  function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // Daftar Service Worker (optional, akan gagal jika bukan localhost/https)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => console.log("SW registration failed (expected on file://)"));
  }
});
