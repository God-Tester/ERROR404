const app = Vue.createApp({
  data() {
    return {
      searchQuery: "",
      logs: [
        { id: 1, rfid: "88697684", status: 1, date: "Nov 6, 2025 1:00 PM" },
        { id: 2, rfid: "09780647", status: 0, date: "Nov 6, 2025 1:10 PM" },
        { id: 3, rfid: "75834600", status: 1, date: "Nov 6, 2025 1:15 PM" },
      ],
    };
  },

  computed: {
    filteredLogs() {
      return this.logs.filter((log) =>
        log.rfid.includes(this.searchQuery.trim())
      );
    },
  },

  methods: {
    saveData() {
      // Save the logs into local storage
      localStorage.setItem("rfidLogs", JSON.stringify(this.logs));
    },
    loadData() {
      // Load the saved logs from local storage
      const saved = localStorage.getItem("rfidLogs");
      if (saved) this.logs = JSON.parse(saved);
    },
    autoRefresh() {
      // Automatically refresh every 5 seconds
      setInterval(() => {
        this.loadData();
      }, 5000);
    },
  },

  mounted() {
    // Load data when the page starts
    this.loadData();
    this.autoRefresh();
  },
});

app.mount("#app");

