// JavaScript for interactivity can be added here
console.log("Video Streaming Website Loaded");

// Performance optimization: Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Error handling class
class VideoPlayerError extends Error {
  constructor(message, type) {
    super(message);
    this.name = "VideoPlayerError";
    this.type = type;
  }
}

// Main application class
class AniDox {
  constructor() {
    this.initializeElements();
    this.setupEventListeners();
    this.setupFeaturedSlider();
    this.setupSearchOverlay();
    this.setupDropdowns();
    this.loadUserPreferences();
    this.setupWatchHistory();
  }

  initializeElements() {
    // Header elements
    this.header = document.querySelector("header");
    this.searchTrigger = document.querySelector(".search-trigger");
    this.searchOverlay = document.querySelector(".search-overlay");
    this.searchInput = document.querySelector(".search-bar input");
    this.closeSearch = document.querySelector(".close-search");

    // Featured slider elements
    this.featuredSlider = document.querySelector(".featured-slider");
    this.featuredItems = document.querySelectorAll(".featured-item");
    this.navDots = document.querySelectorAll(".nav-dot");

    // Dropdowns
    this.dropdowns = document.querySelectorAll(".dropdown");
  }

  setupEventListeners() {
    // Search overlay
    this.searchTrigger?.addEventListener("click", () =>
      this.openSearchOverlay()
    );
    this.closeSearch?.addEventListener("click", () =>
      this.closeSearchOverlay()
    );
    this.searchInput?.addEventListener(
      "input",
      debounce((e) => this.handleSearch(e), 300)
    );

    // Header scroll effect
    window.addEventListener("scroll", () => this.handleHeaderScroll());

    // Close overlay on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeSearchOverlay();
    });
  }

  setupFeaturedSlider() {
    if (!this.featuredSlider) return;

    let currentSlide = 0;
    const totalSlides = this.featuredItems.length;

    // Auto advance slides
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      this.updateSlider(currentSlide);
    }, 5000);

    // Navigation dots
    this.navDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        this.updateSlider(currentSlide);
      });
    });
  }

  updateSlider(index) {
    // Remove active class from all items
    this.featuredItems.forEach((item) => item.classList.remove("active"));
    this.navDots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current item
    this.featuredItems[index].classList.add("active");
    this.navDots[index].classList.add("active");
  }

  setupSearchOverlay() {
    // Initialize search functionality
    this.searchResults = [];
    this.isSearching = false;
  }

  openSearchOverlay() {
    this.searchOverlay.classList.add("active");
    this.searchInput.focus();
    document.body.style.overflow = "hidden";
  }

  closeSearchOverlay() {
    this.searchOverlay.classList.remove("active");
    this.searchInput.value = "";
    document.body.style.overflow = "";
  }

  async handleSearch(event) {
    const query = event.target.value.toLowerCase();
    if (query.length < 2) return;

    this.isSearching = true;
    try {
      // Simulate API call
      const results = await this.searchAnime(query);
      this.displaySearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      this.isSearching = false;
    }
  }

  async searchAnime(query) {
    // Simulate API call to search anime
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          [
            { title: "Demon Slayer", type: "TV", episodes: 26 },
            { title: "Attack on Titan", type: "TV", episodes: 87 },
            { title: "Jujutsu Kaisen", type: "TV", episodes: 24 },
          ].filter((anime) => anime.title.toLowerCase().includes(query))
        );
      }, 300);
    });
  }

  displaySearchResults(results) {
    // Implementation for displaying search results
  }

  setupDropdowns() {
    this.dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector("a");
      const content = dropdown.querySelector(".dropdown-content");

      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        dropdown.classList.toggle("active");
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove("active");
        }
      });
    });
  }

  handleHeaderScroll() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      this.header.classList.add("scrolled");
    } else {
      this.header.classList.remove("scrolled");
    }
  }

  loadUserPreferences() {
    const preferences = JSON.parse(
      localStorage.getItem("userPreferences") || "{}"
    );
    // Apply user preferences (theme, volume, etc.)
  }

  setupWatchHistory() {
    this.watchHistory = JSON.parse(
      localStorage.getItem("watchHistory") || "[]"
    );

    // Update watch history when video is played
    document.querySelectorAll("video").forEach((video) => {
      video.addEventListener(
        "timeupdate",
        debounce(() => {
          this.updateWatchHistory(video);
        }, 1000)
      );
    });
  }

  updateWatchHistory(video) {
    const currentVideo = {
      id: video.dataset.id,
      title: video.dataset.title,
      timestamp: video.currentTime,
      duration: video.duration,
      lastWatched: new Date().toISOString(),
    };

    this.watchHistory = [
      currentVideo,
      ...this.watchHistory.filter((v) => v.id !== currentVideo.id),
    ].slice(0, 20); // Keep last 20 items

    localStorage.setItem("watchHistory", JSON.stringify(this.watchHistory));
  }
}

// Authentication System
class AuthSystem {
  constructor() {
    this.isLoggedIn = false;
    this.user = null;
    this.setupAuth();
  }

  setupAuth() {
    const token = localStorage.getItem("authToken");
    if (token) {
      this.validateToken(token);
    }
  }

  async validateToken(token) {
    // Simulate token validation
    this.isLoggedIn = true;
    this.user = { name: "User", avatar: "U" };
    this.updateUI();
  }

  updateUI() {
    const header = document.querySelector("header");
    const userProfile = document.createElement("div");
    userProfile.className = "user-profile";
    userProfile.innerHTML = `
      <div class="user-avatar">${this.user.avatar}</div>
      <span>${this.user.name}</span>
    `;
    header.appendChild(userProfile);
  }
}

// Enhanced Video Player Class
class VideoPlayer {
  constructor(videoElement) {
    this.video = videoElement;
    this.initializePlayer();
    this.setupKeyboardControls();
    this.setupQualitySelector();
    this.setupErrorHandling();
  }

  initializePlayer() {
    // Add quality options
    this.qualities = ["1080p", "720p", "480p", "360p"];
    this.currentQuality = "720p";

    // Create quality menu
    const qualityMenu = document.createElement("div");
    qualityMenu.className = "quality-menu";
    this.qualities.forEach((quality) => {
      const option = document.createElement("button");
      option.textContent = quality;
      option.onclick = () => this.changeQuality(quality);
      qualityMenu.appendChild(option);
    });

    this.video.parentElement.appendChild(qualityMenu);
  }

  setupKeyboardControls() {
    document.addEventListener("keydown", (e) => {
      switch (e.key.toLowerCase()) {
        case " ":
          this.togglePlay();
          break;
        case "f":
          this.toggleFullscreen();
          break;
        case "m":
          this.toggleMute();
          break;
        case "arrowright":
          this.seek(10);
          break;
        case "arrowleft":
          this.seek(-10);
          break;
        case "arrowup":
          this.changeVolume(0.1);
          break;
        case "arrowdown":
          this.changeVolume(-0.1);
          break;
      }
    });
  }

  setupQualitySelector() {
    // Quality change handler
    this.video.addEventListener("canplay", () => {
      console.log(`Video loaded in ${this.currentQuality}`);
    });
  }

  setupErrorHandling() {
    this.video.addEventListener("error", (e) => {
      console.error("Video Error:", e);
      // Show user-friendly error message
      const errorOverlay = document.createElement("div");
      errorOverlay.className = "video-error-overlay";
      errorOverlay.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          <p>Sorry, there was an error playing this video. Please try again.</p>
          <button onclick="location.reload()">Retry</button>
        </div>
      `;
      this.video.parentElement.appendChild(errorOverlay);
    });
  }

  togglePlay() {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
  }

  seek(seconds) {
    this.video.currentTime += seconds;
  }

  changeVolume(delta) {
    const newVolume = Math.max(0, Math.min(1, this.video.volume + delta));
    this.video.volume = newVolume;
  }

  changeQuality(quality) {
    this.currentQuality = quality;
    const currentTime = this.video.currentTime;
    // Simulate quality change by reloading video
    this.video.src = this.video.src.replace(/\d{3,4}p/, quality);
    this.video.currentTime = currentTime;
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  try {
    window.aniDox = new AniDox();
    window.authSystem = new AuthSystem();
    const videoElements = document.querySelectorAll("video");
    videoElements.forEach((video) => new VideoPlayer(video));
  } catch (error) {
    console.error("Initialization Error:", error);
  }
});
