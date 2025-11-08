import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

/**
 * Performance Monitoring Utility
 * Tracks Core Web Vitals and custom app metrics
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      webVitals: {},
      customMetrics: {},
      pokemonMetrics: {},
      cacheMetrics: {}
    };

    this.initWebVitals();
  }

  /**
   * Initialize Web Vitals tracking
   */
  initWebVitals() {
    try {
      // Core Web Vitals
      getCLS(this.handleWebVital.bind(this));
      getFID(this.handleWebVital.bind(this));
      getFCP(this.handleWebVital.bind(this));
      getLCP(this.handleWebVital.bind(this));
      getTTFB(this.handleWebVital.bind(this));
    } catch (error) {
      console.warn('Web Vitals tracking failed:', error);
    }
  }

  /**
   * Handle Web Vital measurements
   */
  handleWebVital(metric) {
    this.metrics.webVitals[metric.name] = {
      value: metric.value,
      rating: this.getRating(metric.name, metric.value),
      timestamp: Date.now()
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Web Vital ${metric.name}:`, {
        value: metric.value,
        rating: this.getRating(metric.name, metric.value),
        delta: metric.delta
      });
    }

    // Send to analytics service (placeholder)
    this.sendToAnalytics('web_vital', {
      name: metric.name,
      value: metric.value,
      rating: this.getRating(metric.name, metric.value)
    });
  }

  /**
   * Get performance rating based on metric value
   */
  getRating(metricName, value) {
    const thresholds = {
      CLS: { good: 0.1, poor: 0.25 },
      FID: { good: 100, poor: 300 },
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[metricName];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Track Pokemon fetch performance
   */
  trackPokemonFetch(pokemonId, startTime, success = true, fromCache = false) {
    const duration = Date.now() - startTime;

    this.metrics.pokemonMetrics[pokemonId] = {
      fetchTime: duration,
      success,
      fromCache,
      timestamp: Date.now()
    };

    // Update cache metrics
    if (fromCache) {
      this.metrics.cacheMetrics.hits = (this.metrics.cacheMetrics.hits || 0) + 1;
    } else {
      this.metrics.cacheMetrics.misses = (this.metrics.cacheMetrics.misses || 0) + 1;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`Pokemon ${pokemonId} fetch:`, {
        duration: `${duration}ms`,
        success,
        fromCache,
        cacheHitRate: this.getCacheHitRate()
      });
    }

    this.sendToAnalytics('pokemon_fetch', {
      pokemonId,
      duration,
      success,
      fromCache
    });
  }

  /**
   * Track image load performance
   */
  trackImageLoad(imageUrl, startTime, success = true) {
    const duration = Date.now() - startTime;

    this.metrics.customMetrics.imageLoadTime = {
      url: imageUrl,
      duration,
      success,
      timestamp: Date.now()
    };

    if (process.env.NODE_ENV === 'development') {
      console.log(`Image load (${imageUrl}): ${duration}ms`);
    }

    this.sendToAnalytics('image_load', {
      url: imageUrl,
      duration,
      success
    });
  }

  /**
   * Track game round load time
   */
  trackGameRoundLoad(startTime) {
    const duration = Date.now() - startTime;

    this.metrics.customMetrics.gameRoundLoadTime = {
      duration,
      timestamp: Date.now()
    };

    if (process.env.NODE_ENV === 'development') {
      console.log(`Game round load time: ${duration}ms`);
    }

    this.sendToAnalytics('game_round_load', { duration });
  }

  /**
   * Track API response time
   */
  trackApiResponse(endpoint, startTime, success = true, statusCode = null) {
    const duration = Date.now() - startTime;

    this.metrics.customMetrics.apiResponseTime = {
      endpoint,
      duration,
      success,
      statusCode,
      timestamp: Date.now()
    };

    if (process.env.NODE_ENV === 'development') {
      console.log(`API ${endpoint}: ${duration}ms (${statusCode})`);
    }

    this.sendToAnalytics('api_response', {
      endpoint,
      duration,
      success,
      statusCode
    });
  }

  /**
   * Track user interaction
   */
  trackUserInteraction(action, details = {}) {
    const metric = {
      action,
      details,
      timestamp: Date.now()
    };

    this.metrics.customMetrics.userInteraction = metric;

    if (process.env.NODE_ENV === 'development') {
      console.log(`User interaction: ${action}`, details);
    }

    this.sendToAnalytics('user_interaction', metric);
  }

  /**
   * Get cache hit rate
   */
  getCacheHitRate() {
    const hits = this.metrics.cacheMetrics.hits || 0;
    const misses = this.metrics.cacheMetrics.misses || 0;
    const total = hits + misses;

    return total > 0 ? (hits / total) * 100 : 0;
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary() {
    return {
      webVitals: this.metrics.webVitals,
      cacheHitRate: this.getCacheHitRate(),
      averagePokemonFetchTime: this.getAveragePokemonFetchTime(),
      totalApiCalls: this.getTotalApiCalls(),
      lastUpdated: Date.now()
    };
  }

  /**
   * Get average Pokemon fetch time
   */
  getAveragePokemonFetchTime() {
    const pokemonMetrics = Object.values(this.metrics.pokemonMetrics);
    if (pokemonMetrics.length === 0) return 0;

    const total = pokemonMetrics.reduce((sum, metric) => sum + metric.fetchTime, 0);
    return total / pokemonMetrics.length;
  }

  /**
   * Get total API calls
   */
  getTotalApiCalls() {
    return Object.keys(this.metrics.pokemonMetrics).length;
  }

  /**
   * Send data to analytics service (placeholder)
   */
  sendToAnalytics(eventType, data) {
    // Placeholder for analytics integration
    // In production, this would send to services like:
    // - Google Analytics 4
    // - Mixpanel
    // - Sentry
    // - DataDog
    // - Custom analytics endpoint

    if (process.env.NODE_ENV === 'production') {
      // Example: Send to analytics service
      // analytics.track(eventType, data);
      console.log(`Analytics: ${eventType}`, data);
    }
  }

  /**
   * Export metrics for debugging
   */
  exportMetrics() {
    return { ...this.metrics };
  }

  /**
   * Clear old metrics (keep last 100 entries per type)
   */
  clearOldMetrics() {
    const maxEntries = 100;

    // Keep only recent entries for each metric type
    Object.keys(this.metrics).forEach(category => {
      const categoryMetrics = this.metrics[category];
      if (typeof categoryMetrics === 'object' && !Array.isArray(categoryMetrics)) {
        const entries = Object.entries(categoryMetrics);
        if (entries.length > maxEntries) {
          // Sort by timestamp and keep most recent
          const sorted = entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
          const recent = sorted.slice(0, maxEntries);
          this.metrics[category] = Object.fromEntries(recent);
        }
      }
    });
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;