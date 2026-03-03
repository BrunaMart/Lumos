 // Load reactions from localStorage when the page loads
    document.addEventListener('DOMContentLoaded', () => {
      for (let tipId = 1; tipId <= 10; tipId++) {
        ['❤️', '😂', '😍'].forEach(emoji => {
          const count = localStorage.getItem(`reaction-${tipId}-${emoji}`) || 0;
          document.getElementById(`count-${tipId}-${emoji}`).textContent = count;
        });
      }
    });

    // Function to add a reaction and save it
    function addReaction(tipId, emoji) {
      const countElement = document.getElementById(`count-${tipId}-${emoji}`);
      let count = parseInt(countElement.textContent) || 0;
      count++;
      countElement.textContent = count;

      // Save to localStorage
      localStorage.setItem(`reaction-${tipId}-${emoji}`, count);
    }

      // Initialize Bootstrap popovers
    document.addEventListener('DOMContentLoaded', () => {
      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
      const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    });