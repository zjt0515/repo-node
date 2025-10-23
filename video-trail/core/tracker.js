// 定义统一接口
class VideoTracker {
  constructor(platform) {
    this.platform = platform;
  }

  getVideoTitle() {}
  // 获取当前视频信息
  getVideoInfo() {
    return {
      id: '', // 视频唯一标识（如BV号或视频URL）
      title: '',
      duration: 0,
      currentTime: 0,
      progress: 0 // 百分比
    };
  }

  // 启动追踪
  startTracking() {
    this.interval = setInterval(() => {
      const info = this.getVideoInfo();
      if (info.progress > 0) saveVideoData(this.platform, info);
    }, 3000);
  }

  stopTracking() {
    clearInterval(this.interval);
  }
}

// 导出
export default VideoTracker;
