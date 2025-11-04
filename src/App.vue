<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <nav class="navbar">
      <div class="nav-brand">
        <div class="logo">💰</div>
        <span class="brand-name">币学AI</span>
      </div>
      <div class="nav-links">
        <a @click="currentView = 'home'" :class="{'active': currentView === 'home'}">首页</a>
        <a @click="currentView = 'learn'" :class="{'active': currentView === 'learn'}">学习中心</a>
        <a @click="currentView = 'simulate'" :class="{'active': currentView === 'simulate'}">模拟交易</a>
        <a @click="currentView = 'market'" :class="{'active': currentView === 'market'}">市场数据</a>
      </div>
      <div class="nav-right">
        <div class="search-box">
          <input type="text" placeholder="搜索课程..." class="search-input">
          <button class="search-btn">🔍</button>
        </div>
        <button @click="connectWallet" class="wallet-btn">
          {{ walletAddress ? `已连接: ${shortenAddress(walletAddress)}` : '连接钱包' }}
        </button>
      </div>
    </nav>

    <!-- 页面内容 -->
    <div class="main-content">
      <!-- 首页 -->
      <div v-if="currentView === 'home'" class="page home-page">
        
        <!-- 英雄区域 - 修复布局 -->
        <section class="hero-section">
          <div class="hero-container">
            <div class="hero-content">
              <div class="hero-left">
                <h1>开启您的数字货币投资学习之旅</h1>
                <p class="hero-subtitle">AI驱动的智能教育平台，让每个人都能轻松掌握区块链投资知识</p>
                <div class="hero-buttons">
                  <button @click="currentView = 'learn'" class="btn btn-primary">开始学习</button>
                  <button @click="currentView = 'simulate'" class="btn btn-secondary">体验模拟交易</button>
                </div>
                <div class="hero-stats">
                  <div class="stat-item">
                    <div class="stat-number">10,000+</div>
                    <div class="stat-label">活跃学员</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-number">50+</div>
                    <div class="stat-label">精品课程</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-number">99%</div>
                    <div class="stat-label">满意度</div>
                  </div>
                </div>
              </div>
              <div class="hero-right">
                <div class="hero-features">
                  <div class="feature-card">
                    <div class="feature-icon">📈</div>
                    <div class="feature-text">
                      <h4>实时行情分析</h4>
                      <p>专业K线图表技术指标</p>
                    </div>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">🤖</div>
                    <div class="feature-text">
                      <h4>AI智能助手</h4>
                      <p>24小时在线答疑解惑</p>
                    </div>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">🎓</div>
                    <div class="feature-text">
                      <h4>专业课程体系</h4>
                      <p>系统化学习路径</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 功能特色 -->
        <section class="features-section">
          <div class="container">
            <h2 class="section-title">为什么选择币学AI？</h2>
            <div class="features-grid">
              <div class="feature-card" v-for="feature in features" :key="feature.id">
                <div class="feature-icon">{{ feature.icon }}</div>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 推荐课程 -->
        <section class="courses-section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">热门推荐课程</h2>
              <a @click="currentView = 'learn'" class="view-all">查看全部 →</a>
            </div>
            <div class="courses-grid">
              <div class="course-card" v-for="course in featuredCourses" :key="course.id">
                <div class="course-image">
                  <div class="course-level" :class="course.level">{{ course.levelText }}</div>
                </div>
                <div class="course-content">
                  <h3>{{ course.title }}</h3>
                  <p>{{ course.description }}</p>
                  <div class="course-meta">
                    <span class="rating">⭐ {{ course.rating }}</span>
                    <span class="students">👥 {{ course.students }}</span>
                  </div>
                  <div class="course-footer">
                    <div class="price">{{ course.price }}</div>
                    <button @click="startCourse(course)" class="btn-enroll">立即学习</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- 学习中心页面 -->
      <div v-if="currentView === 'learn'" class="page learn-page">
        <div class="container">
          <div class="page-header">
            <h1>学习中心</h1>
            <p>系统化学习路径，从入门到精通</p>
          </div>

          <!-- 学习路径 -->
          <section class="learning-paths">
            <h2 class="section-title">学习路径</h2>
            <div class="paths-grid">
              <div class="path-card" v-for="path in learningPaths" :key="path.id">
                <div class="path-header">
                  <div class="path-icon">{{ path.icon }}</div>
                  <h3>{{ path.title }}</h3>
                </div>
                <p class="path-description">{{ path.description }}</p>
                <div class="path-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{width: path.progress + '%'}"></div>
                  </div>
                  <span class="progress-text">{{ path.progress }}% 完成</span>
                </div>
                <button class="btn-continue" @click="continueLearning(path)">继续学习</button>
              </div>
            </div>
          </section>

          <!-- 课程分类 -->
          <section class="course-categories">
            <h2 class="section-title">课程分类</h2>
            <div class="categories-grid">
              <div class="category-card" v-for="category in courseCategories" :key="category.id">
                <div class="category-icon">{{ category.icon }}</div>
                <h3>{{ category.name }}</h3>
                <p>{{ category.courseCount }} 门课程</p>
              </div>
            </div>
          </section>

          <!-- 我的学习进度 -->
          <section class="my-progress">
            <h2 class="section-title">我的学习进度</h2>
            <div class="progress-stats">
              <div class="progress-item">
                <div class="progress-number">{{ completedCourses }}</div>
                <div class="progress-label">已完成课程</div>
              </div>
              <div class="progress-item">
                <div class="progress-number">{{ studyHours }}h</div>
                <div class="progress-label">学习时长</div>
              </div>
              <div class="progress-item">
                <div class="progress-number">{{ certificates }}</div>
                <div class="progress-label">获得证书</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- 模拟交易页面 -->
      <div v-if="currentView === 'simulate'" class="page simulate-page">
        <div class="container">
          <div class="page-header">
            <h1>模拟交易</h1>
            <p>零风险体验真实交易环境</p>
          </div>

          <!-- 交易账户概览 -->
          <section class="trading-overview">
            <div class="account-card">
              <div class="account-info">
                <h3>模拟账户余额</h3>
                <div class="balance">¥{{ accountBalance.toLocaleString() }}</div>
                <div class="profit" :class="profitClass">
                  {{ profitLoss >= 0 ? '+' : '' }}{{ profitLoss }}%
                </div>
              </div>
              <div class="account-actions">
                <button class="btn-trading" @click="openTradingPanel">开始交易</button>
                <button class="btn-reset" @click="resetAccount">重置账户</button>
              </div>
            </div>
          </section>

          <!-- 交易对选择 -->
          <section class="trading-pairs">
            <h2 class="section-title">热门交易对</h2>
            <div class="pairs-grid">
              <div class="pair-card" v-for="pair in tradingPairs" :key="pair.symbol">
                <div class="pair-info">
                  <div class="pair-name">{{ pair.name }}</div>
                  <div class="pair-price">¥{{ pair.price }}</div>
                  <div class="pair-change" :class="pair.change >= 0 ? 'positive' : 'negative'">
                    {{ pair.change >= 0 ? '+' : '' }}{{ pair.change }}%
                  </div>
                </div>
                <button class="btn-trade" @click="selectPair(pair)">交易</button>
              </div>
            </div>
          </section>

          <!-- 交易历史 -->
          <section class="trading-history">
            <h2 class="section-title">交易历史</h2>
            <div class="history-table">
              <div class="table-header">
                <div>交易对</div>
                <div>类型</div>
                <div>价格</div>
                <div>数量</div>
                <div>时间</div>
              </div>
              <div class="table-row" v-for="trade in recentTrades" :key="trade.id">
                <div>{{ trade.pair }}</div>
                <div :class="trade.type">{{ trade.type === 'buy' ? '买入' : '卖出' }}</div>
                <div>¥{{ trade.price }}</div>
                <div>{{ trade.amount }}</div>
                <div>{{ trade.time }}</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- 市场数据页面 -->
      <div v-if="currentView === 'market'" class="page market-page">
        <div class="container">
          <div class="page-header">
            <h1>市场数据</h1>
            <p>实时行情与深度分析</p>
          </div>

          <!-- 市场概览 -->
          <section class="market-overview">
            <div class="market-stats">
              <div class="stat-card">
                <div class="stat-title">总市值</div>
                <div class="stat-value">¥{{ totalMarketCap }}万亿</div>
                <div class="stat-change positive">+2.5%</div>
              </div>
              <div class="stat-card">
                <div class="stat-title">24h交易量</div>
                <div class="stat-value">¥{{ dailyVolume }}亿</div>
                <div class="stat-change positive">+15.3%</div>
              </div>
              <div class="stat-card">
                <div class="stat-title">BTC主导率</div>
                <div class="stat-value">{{ btcDominance }}%</div>
                <div class="stat-change negative">-0.8%</div>
              </div>
            </div>
          </section>

          <!-- 加密货币列表 -->
          <section class="crypto-list">
            <h2 class="section-title">加密货币行情</h2>
            <div class="crypto-table">
              <div class="table-header">
                <div>名称</div>
                <div>价格</div>
                <div>24h涨跌</div>
                <div>市值</div>
                <div>交易量</div>
              </div>
              <div class="table-row" v-for="crypto in cryptocurrencies" :key="crypto.symbol">
                <div class="crypto-info">
                  <div class="crypto-icon">{{ crypto.icon }}</div>
                  <div class="crypto-name">
                    <div>{{ crypto.name }}</div>
                    <div class="crypto-symbol">{{ crypto.symbol }}</div>
                  </div>
                </div>
                <div>¥{{ crypto.price }}</div>
                <div :class="crypto.change >= 0 ? 'positive' : 'negative'">
                  {{ crypto.change >= 0 ? '+' : '' }}{{ crypto.change }}%
                </div>
                <div>¥{{ crypto.marketCap }}</div>
                <div>¥{{ crypto.volume }}</div>
              </div>
            </div>
          </section>

          <!-- 技术指标 -->
          <section class="technical-indicators">
            <h2 class="section-title">技术指标</h2>
            <div class="indicators-grid">
              <div class="indicator-card">
                <h3>RSI (相对强弱指数)</h3>
                <div class="indicator-value" :class="getRSIClass(rsiValue)">{{ rsiValue }}</div>
                <p>{{ rsiValue > 70 ? '超买区域' : rsiValue < 30 ? '超卖区域' : '正常区域' }}</p>
              </div>
              <div class="indicator-card">
                <h3>MACD</h3>
                <div class="indicator-value" :class="macdValue >= 0 ? 'positive' : 'negative'">
                  {{ macdValue }}
                </div>
                <p>{{ macdValue >= 0 ? '看涨信号' : '看跌信号' }}</p>
              </div>
              <div class="indicator-card">
                <h3>布林带</h3>
                <div class="indicator-status">{{ bollingerBand }}</div>
                <p>{{ bollingerBand === '扩张' ? '波动性增加' : '波动性减少' }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- AI智能助手悬浮按钮 -->
    <div class="ai-assistant" @click="toggleAssistant">
      <div class="assistant-icon">🤖</div>
    </div>

    <!-- AI助手聊天面板 -->
    <div class="ai-panel" v-if="showAssistant">
      <div class="panel-header">
        <h3>AI智能助手</h3>
        <button class="close-btn" @click="showAssistant = false">×</button>
      </div>
      <div class="chat-messages">
        <div v-for="msg in chatMessages" :key="msg.id" :class="['message', msg.sender]">
          {{ msg.text }}
        </div>
      </div>
      <div class="chat-input">
        <input v-model="userInput" placeholder="输入您的问题...">
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentView: 'home',
      walletAddress: '',
      userInput: '',
      showAssistant: false,
      chatMessages: [
        { id: 1, sender: 'bot', text: '你好！我是币学AI助手，可以帮你解答数字货币投资的问题。' }
      ],
      features: [
        { id: 1, icon: '🎯', title: '个性化学习路径', description: '基于AI算法为每位学员定制专属学习计划' },
        { id: 2, icon: '🛡️', title: '零风险模拟交易', description: '真实市场环境，虚拟资金练习，无亏损风险' },
        { id: 3, icon: '🔗', title: '区块链证书认证', description: '学习成果上链存证，获得不可篡改的NFT证书' },
        { id: 4, icon: '📱', title: '多终端支持', description: '支持Web、移动端，随时随地学习交易' }
      ],
      featuredCourses: [
        { 
          id: 1, 
          title: '比特币从入门到精通', 
          description: '全面掌握比特币原理、交易和投资策略',
          level: 'beginner',
          levelText: '初级',
          rating: 4.9,
          students: '2.5k',
          price: '免费'
        },
        { 
          id: 2, 
          title: '以太坊与智能合约开发', 
          description: '学习以太坊核心技术和智能合约编写',
          level: 'intermediate',
          levelText: '中级',
          rating: 4.8,
          students: '1.8k',
          price: '¥299'
        },
        { 
          id: 3, 
          title: 'DeFi实战指南', 
          description: '深入理解去中心化金融应用和投资机会',
          level: 'advanced',
          levelText: '进阶',
          rating: 4.7,
          students: '1.2k',
          price: '¥199'
        }
      ],
      // 学习中心数据
      learningPaths: [
        { id: 1, icon: '🔰', title: '新手入门', description: '从零开始学习区块链基础知识', progress: 25 },
        { id: 2, icon: '💹', title: '交易进阶', description: '掌握技术分析和交易策略', progress: 60 },
        { id: 3, icon: '⚡', title: 'DeFi专家', description: '深入去中心化金融生态', progress: 10 },
        { id: 4, icon: '🔐', title: '安全防护', description: '学习数字资产安全管理', progress: 0 }
      ],
      courseCategories: [
        { id: 1, icon: '💰', name: '比特币', courseCount: 12 },
        { id: 2, icon: '⚡', name: '以太坊', courseCount: 15 },
        { id: 3, icon: '🔄', name: 'DeFi', courseCount: 8 },
        { id: 4, icon: '🎨', name: 'NFT', courseCount: 6 },
        { id: 5, icon: '🔐', name: '安全', courseCount: 5 },
        { id: 6, icon: '📊', name: '交易分析', courseCount: 10 }
      ],
      completedCourses: 8,
      studyHours: 42,
      certificates: 3,
      // 模拟交易数据
      accountBalance: 50000,
      profitLoss: 12.5,
      tradingPairs: [
        { symbol: 'BTCUSDT', name: 'BTC/USDT', price: '328,456', change: 2.3 },
        { symbol: 'ETHUSDT', name: 'ETH/USDT', price: '24,567', change: -1.2 },
        { symbol: 'BNBUSDT', name: 'BNB/USDT', price: '3,245', change: 5.6 },
        { symbol: 'ADAUSDT', name: 'ADA/USDT', price: '3.45', change: 0.8 }
      ],
      recentTrades: [
        { id: 1, pair: 'BTC/USDT', type: 'buy', price: '325,000', amount: '0.1', time: '10:30' },
        { id: 2, pair: 'ETH/USDT', type: 'sell', price: '24,800', amount: '2', time: '09:15' },
        { id: 3, pair: 'BNB/USDT', type: 'buy', price: '3,200', amount: '5', time: '昨天' }
      ],
      // 市场数据
      totalMarketCap: '12.5',
      dailyVolume: '856',
      btcDominance: '42.3',
      cryptocurrencies: [
        { symbol: 'BTC', icon: '₿', name: 'Bitcoin', price: '328,456', change: 2.3, marketCap: '6.4万亿', volume: '1,245亿' },
        { symbol: 'ETH', icon: 'Ξ', name: 'Ethereum', price: '24,567', change: -1.2, marketCap: '2.9万亿', volume: '856亿' },
        { symbol: 'BNB', icon: '⎈', name: 'Binance Coin', price: '3,245', change: 5.6, marketCap: '5,200亿', volume: '123亿' },
        { symbol: 'ADA', icon: 'A', name: 'Cardano', price: '3.45', change: 0.8, marketCap: '1,150亿', volume: '45亿' }
      ],
      rsiValue: 65,
      macdValue: 0.25,
      bollingerBand: '扩张'
    };
  },
  computed: {
    profitClass() {
      return this.profitLoss >= 0 ? 'positive' : 'negative';
    }
  },
  methods: {
    connectWallet() {
      this.walletAddress = '0x742...d35E1';
    },
    shortenAddress(address) {
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    },
    toggleAssistant() {
      this.showAssistant = !this.showAssistant;
    },
    sendMessage() {
      if (!this.userInput.trim()) return;

      this.chatMessages.push({
        id: Date.now(),
        sender: 'user',
        text: this.userInput
      });

      const botResponse = this.getBotResponse(this.userInput);
      setTimeout(() => {
        this.chatMessages.push({
          id: Date.now() + 1,
          sender: 'bot',
          text: botResponse
        });
      }, 500);

      this.userInput = '';
    },
    getBotResponse(input) {
      const responses = {
        '新手': '欢迎新同学！建议从"比特币基础知识"课程开始学习。',
        '比特币': '比特币是第一个成功的数字货币，采用工作量证明机制。',
        '以太坊': '以太坊允许智能合约功能，支持去中心化应用。',
        '模拟交易': '点击顶部导航的"模拟交易"可以进入模拟环境。',
        'default': '我理解您的问题了。建议系统学习相关课程来建立完整的知识体系。'
      };

      for (let [key, value] of Object.entries(responses)) {
        if (input.includes(key)) {
          return value;
        }
      }
      return responses.default;
    },
    startCourse(course) {
      alert(`开始学习: ${course.title}`);
    },
    // 学习中心方法
    continueLearning(path) {
      alert(`继续学习: ${path.title}`);
    },
    // 模拟交易方法
    openTradingPanel() {
      alert('打开交易面板');
    },
    resetAccount() {
      this.accountBalance = 50000;
      this.profitLoss = 0;
      alert('账户已重置');
    },
    selectPair(pair) {
      alert(`选择交易对: ${pair.name}`);
    },
    // 市场数据方法
    getRSIClass(value) {
      if (value > 70) return 'overbought';
      if (value < 30) return 'oversold';
      return 'normal';
    }
  }
};
</script>

<style>
/* 重置样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

/* 导航栏 */
.navbar {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo {
  font-size: 2rem;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1890ff;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s;
  cursor: pointer;
}

.nav-links a:hover,
.nav-links a.active {
  background: #1890ff;
  color: white;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-box {
  display: flex;
  background: #f5f5f5;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e8e8e8;
}

.search-input {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  outline: none;
  width: 200px;
}

.search-btn {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.wallet-btn {
  background: #1890ff;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.wallet-btn:hover {
  background: #096dd9;
}

/* 主要内容 */
.main-content {
  margin-top: 80px;
  width: 100%;
}

.page {
  width: 100%;
}

/* 容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 页面头部 */
.page-header {
  text-align: center;
  padding: 3rem 0;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.page-header p {
  font-size: 1.2rem;
  color: #666;
}

/* 英雄区域 - 修复白色文字问题 */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  width: 100%;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
  width: 100%;
}

.hero-left {
  flex: 1;
  max-width: 600px;
}

.hero-left h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: white; /* 确保文字为白色 */
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  color: white; /* 确保文字为白色 */
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
}

.hero-stats {
  display: flex;
  gap: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: white; /* 确保文字为白色 */
}

.stat-label {
  opacity: 0.8;
  font-size: 0.9rem;
  color: white; /* 确保文字为白色 */
}

.hero-right {
  flex: 1;
  max-width: 400px;
}

.hero-features {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feature-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.2);
}

.feature-icon {
  font-size: 2rem;
}

.feature-text h4 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: black ; /* 确保文字为hei色 */
}

.feature-text p {
  opacity: 0.8;
  font-size: 0.9rem;
  color: black; /* 确保文字为hei色 */
}

/* 功能特色 */
.features-section {
  padding: 4rem 0;
  background: white;
  width: 100%;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background: #f8f9fa;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.3rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* 课程区域 */
.courses-section {
  padding: 4rem 0;
  background: #f8f9fa;
  width: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.view-all {
  color: #1890ff;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.course-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.course-card:hover {
  transform: translateY(-5px);
}

.course-image {
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.course-level {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
}

.course-level.beginner {
  background: #52c41a;
}

.course-level.intermediate {
  background: #faad14;
}

.course-level.advanced {
  background: #ff4d4f;
}

.course-content {
  padding: 1.5rem;
}

.course-content h3 {
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1.2rem;
}

.course-content p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #999;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff4d4f;
}

.btn-enroll {
  background: #1890ff;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-enroll:hover {
  background: #096dd9;
}

/* 学习中心样式 */
.learning-paths {
  padding: 2rem 0;
}

.paths-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.path-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.path-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.path-icon {
  font-size: 2rem;
}

.path-header h3 {
  color: #333;
  font-size: 1.3rem;
}

.path-description {
  color: #666;
  margin-bottom: 1.5rem;
}

.path-progress {
  margin-bottom: 1.5rem;
}

.progress-bar {
  background: #f0f0f0;
  border-radius: 10px;
  height: 8px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.progress-fill {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: #666;
}

.btn-continue {
  background: #1890ff;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  font-weight: 500;
}

.btn-continue:hover {
  background: #096dd9;
}

.course-categories {
  padding: 2rem 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.category-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.category-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.category-card p {
  color: #666;
}

.my-progress {
  padding: 2rem 0;
}

.progress-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.progress-item {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.progress-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1890ff;
  margin-bottom: 0.5rem;
}

.progress-label {
  color: #666;
  font-size: 1.1rem;
}

/* 模拟交易样式 */
.trading-overview {
  padding: 2rem 0;
}

.account-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.account-info h3 {
  color: #666;
  margin-bottom: 0.5rem;
}

.balance {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.profit {
  font-size: 1.2rem;
  font-weight: 500;
}

.profit.positive {
  color: #52c41a;
}

.profit.negative {
  color: #ff4d4f;
}

.account-actions {
  display: flex;
  gap: 1rem;
}

.btn-trading {
  background: #1890ff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.btn-reset {
  background: #f5f5f5;
  color: #666;
  border: 1px solid #e8e8e8;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.trading-pairs {
  padding: 2rem 0;
}

.pairs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.pair-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pair-info {
  flex: 1;
}

.pair-name {
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.pair-price {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.pair-change {
  font-weight: 500;
}

.pair-change.positive {
  color: #52c41a;
}

.pair-change.negative {
  color: #ff4d4f;
}

.btn-trade {
  background: #1890ff;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.trading-history {
  padding: 2rem 0;
}

.history-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background: #f8f9fa;
  padding: 1rem;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e8e8e8;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row .buy {
  color: #52c41a;
  font-weight: 500;
}

.table-row .sell {
  color: #ff4d4f;
  font-weight: 500;
}

/* 市场数据样式 */
.market-overview {
  padding: 2rem 0;
}

.market-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-title {
  color: #666;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.stat-change {
  font-weight: 500;
}

.stat-change.positive {
  color: #52c41a;
}

.stat-change.negative {
  color: #ff4d4f;
}

.crypto-list {
  padding: 2rem 0;
}

.crypto-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.crypto-table .table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
}

.crypto-table .table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  align-items: center;
}

.crypto-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.crypto-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.crypto-name {
  display: flex;
  flex-direction: column;
}

.crypto-symbol {
  color: #666;
  font-size: 0.9rem;
}

.technical-indicators {
  padding: 2rem 0;
}

.indicators-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.indicator-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.indicator-card h3 {
  color: #333;
  margin-bottom: 1rem;
}

.indicator-value {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.indicator-value.overbought {
  color: #ff4d4f;
}

.indicator-value.oversold {
  color: #52c41a;
}

.indicator-value.normal {
  color: #1890ff;
}

.indicator-value.positive {
  color: #52c41a;
}

.indicator-value.negative {
  color: #ff4d4f;
}

.indicator-status {
  font-size: 2rem;
  font-weight: bold;
  color: #1890ff;
  margin-bottom: 0.5rem;
}

/* AI助手 */
.ai-assistant {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #1890ff;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
  z-index: 1001;
  font-size: 1.5rem;
}

.ai-panel {
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  width: 350px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  z-index: 1001;
  overflow: hidden;
}

.panel-header {
  background: #1890ff;
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header h3 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.chat-messages {
  height: 300px;
  padding: 1rem;
  overflow-y: auto;
  background: #fafafa;
}

.message {
  margin-bottom: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  max-width: 80%;
}

.message.user {
  background: #1890ff;
  color: white;
  margin-left: auto;
}

.message.bot {
  background: white;
  border: 1px solid #e8e8e8;
}

.chat-input {
  display: flex;
  border-top: 1px solid #e8e8e8;
  padding: 1rem;
  background: white;
}

.chat-input input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  margin-right: 0.5rem;
}

.chat-input button {
  background: #1890ff;
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .nav-right {
    width: 100%;
    justify-content: center;
  }
  
  .search-input {
    width: 150px;
  }
  
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-left h1 {
    font-size: 2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .paths-grid,
  .categories-grid,
  .pairs-grid,
  .market-stats,
  .indicators-grid {
    grid-template-columns: 1fr;
  }

  .progress-stats {
    grid-template-columns: 1fr;
  }

  .account-card {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .crypto-table .table-header,
  .crypto-table .table-row {
    grid-template-columns: 1fr;
  }
}
</style>
