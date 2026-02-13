// Local Storage Utilities for Valentine's Day App

export const storage = {
  // Keys
  keys: {
    VALENTINE_ANSWER: 'valentineAnswer',
    VALENTINE_DATE: 'valentineDate',
    CLAW_GAME_COMPLETED: 'clawGameCompleted',
    HEARTS_COLLECTED: 'heartsCollected',
    USER_NAME: 'userName',
    VISIT_COUNT: 'visitCount',
  },

  // Get item from localStorage
  get(key) {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return null;
    }
  },

  // Set item in localStorage
  set(key, value) {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting to localStorage:', error);
      return false;
    }
  },

  // Remove item from localStorage
  remove(key) {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  // Clear all app data
  clear() {
    if (typeof window === 'undefined') return false;
    try {
      Object.values(this.keys).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Check if user has answered
  hasAnswered() {
    return this.get(this.keys.VALENTINE_ANSWER) !== null;
  },

  // Get answer
  getAnswer() {
    return this.get(this.keys.VALENTINE_ANSWER);
  },

  // Set answer
  setAnswer(answer) {
    this.set(this.keys.VALENTINE_ANSWER, answer);
    this.set(this.keys.VALENTINE_DATE, new Date().toISOString());
  },

  // Check if claw game completed
  isClawGameCompleted() {
    return this.get(this.keys.CLAW_GAME_COMPLETED) === true;
  },

  // Set claw game completion
  setClawGameCompleted(heartsCollected) {
    this.set(this.keys.CLAW_GAME_COMPLETED, true);
    this.set(this.keys.HEARTS_COLLECTED, heartsCollected);
  },

  // Get hearts collected
  getHeartsCollected() {
    return this.get(this.keys.HEARTS_COLLECTED) || 0;
  },

  // Increment visit count
  incrementVisitCount() {
    const count = this.get(this.keys.VISIT_COUNT) || 0;
    this.set(this.keys.VISIT_COUNT, count + 1);
    return count + 1;
  },

  // Get visit count
  getVisitCount() {
    return this.get(this.keys.VISIT_COUNT) || 0;
  },

  // Get all stats
  getStats() {
    return {
      hasAnswered: this.hasAnswered(),
      answer: this.getAnswer(),
      clawGameCompleted: this.isClawGameCompleted(),
      heartsCollected: this.getHeartsCollected(),
      visitCount: this.getVisitCount(),
      answerDate: this.get(this.keys.VALENTINE_DATE),
    };
  }
};

export default storage;