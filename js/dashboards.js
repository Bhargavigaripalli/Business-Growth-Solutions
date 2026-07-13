/* Dashboards Interactive Script - Stackly Growth Solutions */

document.addEventListener('DOMContentLoaded', () => {
  initSidebarToggle();
  initSidebarNavigation();
  initNotificationBell();
  initInteractiveCharts();
  initMiniCalendar();
});

/* ==========================================
   1. Mobile Sidebar Toggle
   ========================================== */
function initSidebarToggle() {
  const toggleBtn = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside of it on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
        }
      }
    });
  }
}

/* ==========================================
   2. Sidebar Navigation Interceptors
   ========================================== */
function initSidebarNavigation() {
  const menuItems = document.querySelectorAll('.sidebar-item');
  
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const text = item.textContent.trim().toLowerCase();
      
      if (text.includes('logout')) {
        e.preventDefault();
        alert('Logging out...');
        window.location.href = 'login.html';
      } else if (text.includes('dashboard')) {
        // Stay on current dashboard
        return;
      } else {
        // Every other sidebar item redirects to 404
        e.preventDefault();
        window.location.href = '404.html';
      }
    });
  });
}

/* ==========================================
   3. Notification Bell Handler
   ========================================== */
function initNotificationBell() {
  const bell = document.querySelector('.notification-bell');
  const badge = document.querySelector('.bell-badge');
  
  if (bell && badge) {
    bell.addEventListener('click', () => {
      badge.style.display = 'none';
      alert('You have no new notifications. All items marked as read.');
    });
  }
}

/* ==========================================
   4. Mini Interactive Calendar Generator
   ========================================== */
function initMiniCalendar() {
  const calendarGrid = document.querySelector('.calendar-grid');
  if (!calendarGrid) return;
  
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  
  // Clear pre-existing structure
  calendarGrid.innerHTML = '';
  
  // Append headers
  daysOfWeek.forEach(day => {
    const label = document.createElement('div');
    label.classList.add('calendar-day-label');
    label.textContent = day;
    calendarGrid.appendChild(label);
  });
  
  // Get details for calendar rendering
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Padding cells before first day
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('div');
    calendarGrid.appendChild(emptyCell);
  }
  
  // Populate days
  // We'll mark 3 specific days as meeting days for mock analytics purposes
  const mockMeetingDays = [currentDate + 1, currentDate - 2, currentDate + 4];
  
  for (let day = 1; day <= lastDay; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('calendar-day');
    dayCell.textContent = day;
    
    if (day === currentDate) {
      dayCell.classList.add('active');
    }
    
    if (mockMeetingDays.includes(day) && day !== currentDate) {
      dayCell.classList.add('has-meeting');
    }
    
    dayCell.addEventListener('click', () => {
      const active = calendarGrid.querySelector('.calendar-day.active');
      if (active) active.classList.remove('active');
      dayCell.classList.add('active');
      
      // Update interactive widget state
      if (mockMeetingDays.includes(day)) {
        alert(`Meeting Scheduled for this date (Date: ${day}/${currentMonth + 1}/${currentYear}).`);
      } else {
        alert(`No appointments scheduled on this date.`);
      }
    });
    
    calendarGrid.appendChild(dayCell);
  }
}

/* ==========================================
   5. Interactive SVG Charts Animations & Tooltips
   ========================================== */
function initInteractiveCharts() {
  const svgLinePoints = document.querySelectorAll('.chart-point');
  
  svgLinePoints.forEach(point => {
    point.addEventListener('mouseenter', (e) => {
      const val = point.getAttribute('data-value');
      const month = point.getAttribute('data-month');
      
      // Dynamic inline styling / hover feedback
      point.setAttribute('r', '8');
      
      // Simple tooltip overlay
      let tooltip = document.getElementById('chart-tooltip');
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'chart-tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.padding = '0.5rem 0.75rem';
        tooltip.style.background = 'var(--bg-navy-lighter)';
        tooltip.style.border = 'var(--glass-border)';
        tooltip.style.borderRadius = 'var(--radius-sm)';
        tooltip.style.color = '#fff';
        tooltip.style.fontSize = '0.8rem';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.zIndex = '1000';
        tooltip.style.boxShadow = 'var(--shadow-md)';
        document.body.appendChild(tooltip);
      }
      
      tooltip.innerHTML = `<strong>${month}</strong>: $${val}`;
      tooltip.style.display = 'block';
      
      const rect = point.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX - 40}px`;
      tooltip.style.top = `${rect.top + window.scrollY - 45}px`;
    });
    
    point.addEventListener('mouseleave', () => {
      point.setAttribute('r', '5');
      const tooltip = document.getElementById('chart-tooltip');
      if (tooltip) {
        tooltip.style.display = 'none';
      }
    });
  });
}
