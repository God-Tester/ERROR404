const { createApp } = Vue;

createApp({
  data() {
    return {
      rfidLogs: [
        { id: 1, rfid: "88697684", status: true, date: "Nov 6, 2025 1:00PM" },
        { id: 2, rfid: "09780647", status: false, date: "Nov 6, 2025 1:10PM" },
        { id: 3, rfid: "75834600", status: true, date: "Nov 6, 2025 1:15PM" }
      ],
      searchQuery: "",
      showToast: false
    };
  },
  computed: {
    filteredLogs() {
      const q = this.searchQuery.toLowerCase();
      return this.rfidLogs.filter(log => log.rfid.toLowerCase().includes(q));
    },
    activeCount() {
      return this.rfidLogs.filter(log => log.status).length;
    },
    inactiveCount() {
      return this.rfidLogs.filter(log => !log.status).length;
    },
    totalCount() {
      return this.rfidLogs.length;
    }
  },
  mounted() {
    this.loadData();
    this.autoRefresh();
    lucide.createIcons();
  },
  updated() {
    lucide.createIcons();
  },
  methods: {
    saveData() {
      localStorage.setItem("rfidLogs", JSON.stringify(this.rfidLogs));
    },
    loadData() {
      const saved = localStorage.getItem("rfidLogs");
      if (saved) this.rfidLogs = JSON.parse(saved);
    },
    autoRefresh() {
      setInterval(() => {
        this.loadData();
        this.showToastMessage();
      }, 10000); // 10 seconds
    },
    addRandomLog() {
      const newLog = {
        id: this.rfidLogs.length + 1,
        rfid: Math.floor(Math.random() * 99999999).toString(),
        status: Math.random() > 0.5,
        date: new Date().toLocaleString()
      };
      this.rfidLogs.push(newLog);
      this.saveData();
    },
    showToastMessage() {
      this.showToast = true;
      setTimeout(() => (this.showToast = false), 1500);
    }
  }
}).mount("#app");
