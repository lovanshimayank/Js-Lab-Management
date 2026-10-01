// ========================================================
// Main Application Controller (ES6+ Vanilla JavaScript)
// Connects UI with Express REST API via fetch()
// ========================================================

const API_BASE = '/api';

const App = {
  currentTab: 'dashboard',

  // Initialize Application
  init() {
    this.setupNavigation();
    this.setupStudentEvents();
    this.setupExperimentEvents();
    this.setupConceptSubNav();

    // Load initial data
    this.checkDatabaseStatus();
    this.loadDashboardStats();
    this.loadStudents();
    this.loadExperiments();

    // Initialize concepts
    if (window.ConceptsLab) {
      window.ConceptsLab.initDateLab();
      window.ConceptsLab.initClosureCounter();
    }
  },

  // ------------------------------------------------------
  // Navigation & Tab Switching
  // ------------------------------------------------------
  setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = btn.getAttribute('data-tab');
        this.switchTab(targetTab);
      });
    });

    // Also support jump cards from dashboard
    document.querySelectorAll('.concept-badge-card').forEach(card => {
      card.addEventListener('click', () => {
        const targetSub = card.getAttribute('data-target-sub');
        this.switchTab('concepts');
        if (targetSub) {
          this.switchConceptSubTab(targetSub);
        }
      });
    });
  },

  switchTab(tabId) {
    this.currentTab = tabId;

    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    // Update visible tab pane
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `tab-${tabId}`);
    });

    // Refresh data when switching to relevant tabs
    if (tabId === 'dashboard') {
      this.loadDashboardStats();
    } else if (tabId === 'students') {
      this.loadStudents();
    } else if (tabId === 'experiments') {
      this.loadExperiments();
    }
  },

  setupConceptSubNav() {
    const subNavBtns = document.querySelectorAll('.sub-nav-btn');
    subNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const subId = btn.getAttribute('data-sub');
        this.switchConceptSubTab(subId);
      });
    });
  },

  switchConceptSubTab(subId) {
    document.querySelectorAll('.sub-nav-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-sub') === subId);
    });

    document.querySelectorAll('.concept-section').forEach(sec => {
      sec.classList.toggle('active', sec.id === `concept-${subId}`);
    });
  },

  // ------------------------------------------------------
  // Database Status Check
  // ------------------------------------------------------
  async checkDatabaseStatus() {
    try {
      const res = await fetch(`${API_BASE}/status`);
      const data = await res.json();
      const statusEl = document.getElementById('db-status-indicator');
      const dotEl = document.getElementById('db-status-dot');

      if (data.success && data.db) {
        statusEl.textContent = `Database: ${data.db.mode}`;
        if (data.db.connected) {
          dotEl.className = 'dot dot-green';
        } else {
          dotEl.className = 'dot dot-yellow';
        }
      }
    } catch (err) {
      const statusEl = document.getElementById('db-status-indicator');
      if (statusEl) statusEl.textContent = 'Server Offline (Check backend)';
    }
  },

  // ------------------------------------------------------
  // Dashboard Statistics
  // ------------------------------------------------------
  async loadDashboardStats() {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      const json = await res.json();

      if (json.success && json.data) {
        document.getElementById('stat-total-students').textContent = json.data.totalStudents;
        document.getElementById('stat-total-experiments').textContent = json.data.totalExperiments;
        document.getElementById('stat-completed-experiments').textContent = json.data.completedExperiments;
        document.getElementById('stat-pending-experiments').textContent = json.data.pendingExperiments;
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  },

  // ------------------------------------------------------
  // Students Module (REST CRUD)
  // ------------------------------------------------------
  setupStudentEvents() {
    // Form Submission
    const form = document.getElementById('student-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleStudentSubmit();
      });
    }

    // Search input with basic debounce
    const searchInput = document.getElementById('student-search');
    if (searchInput) {
      let timeout = null;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.loadStudents(e.target.value);
        }, 300);
      });
    }
  },

  async loadStudents(query = '') {
    const tbody = document.getElementById('students-table-body');
    if (!tbody) return;

    try {
      const url = query ? `${API_BASE}/students?q=${encodeURIComponent(query)}` : `${API_BASE}/students`;
      const res = await fetch(url);
      const json = await res.json();

      if (!json.success || json.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No students found.</td></tr>`;
        return;
      }

      tbody.innerHTML = json.data.map((student, idx) => `
        <tr>
          <td><strong>${student.student_id}</strong></td>
          <td>${this.escapeHtml(student.name)}</td>
          <td>${this.escapeHtml(student.email)}</td>
          <td><span class="badge badge-tag">${this.escapeHtml(student.course)}</span></td>
          <td>${this.escapeHtml(student.semester)}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="App.deleteStudent(${student.id}, '${this.escapeHtml(student.name)}')">
              Delete
            </button>
          </td>
        </tr>
      `).join('');
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--danger); padding: 1.5rem;">Error loading students: ${err.message}</td></tr>`;
    }
  },

  async handleStudentSubmit() {
    const student_id = document.getElementById('student-id-input').value;
    const name = document.getElementById('student-name-input').value;
    const email = document.getElementById('student-email-input').value;
    const course = document.getElementById('student-course-input').value;
    const semester = document.getElementById('student-semester-input').value;

    const formData = { student_id, name, email, course, semester };

    // Frontend validation
    const validationResult = window.Validation.validateStudentForm(formData);
    if (!validationResult.isValid) {
      const firstError = Object.values(validationResult.errors)[0];
      this.showToast(firstError, 'error');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const json = await res.json();

      if (json.success) {
        this.showToast(json.message, 'success');
        document.getElementById('student-form').reset();
        this.loadStudents();
        this.loadDashboardStats();
      } else {
        this.showToast(json.message, 'error');
      }
    } catch (err) {
      this.showToast(`Request failed: ${err.message}`, 'error');
    }
  },

  async deleteStudent(id, name) {
    if (!confirm(`Are you sure you want to delete student "${name}"?`)) return;

    try {
      const res = await fetch(`${API_BASE}/students/${id}`, {
        method: 'DELETE'
      });
      const json = await res.json();

      if (json.success) {
        this.showToast(json.message, 'success');
        this.loadStudents();
        this.loadDashboardStats();
      } else {
        this.showToast(json.message, 'error');
      }
    } catch (err) {
      this.showToast(`Delete failed: ${err.message}`, 'error');
    }
  },

  // ------------------------------------------------------
  // Experiments Module (REST CRUD)
  // ------------------------------------------------------
  setupExperimentEvents() {
    // Form Submission
    const form = document.getElementById('experiment-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleExperimentSubmit();
      });
    }

    // Filter controls
    const searchInput = document.getElementById('experiment-search');
    const statusFilter = document.getElementById('experiment-status-filter');

    const triggerFilter = () => {
      const query = searchInput ? searchInput.value : '';
      const status = statusFilter ? statusFilter.value : '';
      this.loadExperiments(query, status);
    };

    if (searchInput) searchInput.addEventListener('input', triggerFilter);
    if (statusFilter) statusFilter.addEventListener('change', triggerFilter);
  },

  async loadExperiments(query = '', status = '') {
    const tbody = document.getElementById('experiments-table-body');
    if (!tbody) return;

    try {
      let url = `${API_BASE}/experiments?`;
      if (query) url += `q=${encodeURIComponent(query)}&`;
      if (status) url += `status=${encodeURIComponent(status)}&`;

      const res = await fetch(url);
      const json = await res.json();

      if (!json.success || json.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No experiments found.</td></tr>`;
        return;
      }

      tbody.innerHTML = json.data.map(exp => `
        <tr>
          <td><strong>#${exp.id}</strong></td>
          <td>
            <strong>${this.escapeHtml(exp.experiment_name)}</strong>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${this.escapeHtml(exp.description || '')}</p>
          </td>
          <td><span class="badge badge-tag">${this.escapeHtml(exp.module)}</span></td>
          <td>
            <span class="badge ${exp.status === 'Completed' ? 'badge-completed' : 'badge-pending'}">
              ${exp.status}
            </span>
          </td>
          <td>
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn btn-secondary btn-sm" onclick="App.toggleExperimentStatus(${exp.id}, '${exp.status}')">
                Mark ${exp.status === 'Completed' ? 'Pending' : 'Completed'}
              </button>
              <button class="btn btn-danger btn-sm" onclick="App.deleteExperiment(${exp.id}, '${this.escapeHtml(exp.experiment_name)}')">
                Delete
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--danger); padding: 1.5rem;">Error loading experiments: ${err.message}</td></tr>`;
    }
  },

  async handleExperimentSubmit() {
    const experiment_name = document.getElementById('exp-name-input').value;
    const expModule = document.getElementById('exp-module-input').value;
    const description = document.getElementById('exp-desc-input').value;
    const status = document.getElementById('exp-status-input').value;

    const formData = {
      experiment_name,
      module: expModule,
      description,
      status
    };

    const validation = window.Validation.validateExperimentForm(formData);
    if (!validation.isValid) {
      this.showToast(Object.values(validation.errors)[0], 'error');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/experiments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = await res.json();

      if (json.success) {
        this.showToast(json.message, 'success');
        document.getElementById('experiment-form').reset();
        this.loadExperiments();
        this.loadDashboardStats();
      } else {
        this.showToast(json.message, 'error');
      }
    } catch (err) {
      this.showToast(`Request failed: ${err.message}`, 'error');
    }
  },

  async toggleExperimentStatus(id, currentStatus) {
    const nextStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';

    try {
      const res = await fetch(`${API_BASE}/experiments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      const json = await res.json();

      if (json.success) {
        this.showToast(json.message, 'success');
        this.loadExperiments();
        this.loadDashboardStats();
      } else {
        this.showToast(json.message, 'error');
      }
    } catch (err) {
      this.showToast(`Update failed: ${err.message}`, 'error');
    }
  },

  async deleteExperiment(id, name) {
    if (!confirm(`Are you sure you want to delete experiment "${name}"?`)) return;

    try {
      const res = await fetch(`${API_BASE}/experiments/${id}`, {
        method: 'DELETE'
      });
      const json = await res.json();

      if (json.success) {
        this.showToast(json.message, 'success');
        this.loadExperiments();
        this.loadDashboardStats();
      } else {
        this.showToast(json.message, 'error');
      }
    } catch (err) {
      this.showToast(`Delete failed: ${err.message}`, 'error');
    }
  },

  // ------------------------------------------------------
  // Utilities: Toast Notification & HTML Escaping
  // ------------------------------------------------------
  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✔' : type === 'error' ? '✖' : 'ℹ'}</span>
      <span>${this.escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};

// Start application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.App = App;
