import type { ChatData } from '../types';

// ===== REAL DATA from chat analysis =====

// Daily message counts (real data from 2026-01-08 to 2026-03-06)
export const dailyCounts: { date: string; count: number }[] = [
  { date: '1.8', count: 194 }, { date: '1.9', count: 853 }, { date: '1.10', count: 1690 },
  { date: '1.11', count: 1021 }, { date: '1.12', count: 1391 }, { date: '1.13', count: 1980 },
  { date: '1.14', count: 1583 }, { date: '1.15', count: 1715 }, { date: '1.16', count: 2184 },
  { date: '1.17', count: 1617 }, { date: '1.18', count: 1963 }, { date: '1.19', count: 831 },
  { date: '1.20', count: 542 }, { date: '1.21', count: 1066 }, { date: '1.22', count: 1046 },
  { date: '1.23', count: 741 }, { date: '1.24', count: 446 }, { date: '1.25', count: 1059 },
  { date: '1.26', count: 811 }, { date: '1.27', count: 655 }, { date: '1.28', count: 984 },
  { date: '1.29', count: 1010 }, { date: '1.30', count: 1050 }, { date: '1.31', count: 1336 },
  { date: '2.1', count: 1076 }, { date: '2.2', count: 1103 }, { date: '2.3', count: 1005 },
  { date: '2.4', count: 902 }, { date: '2.5', count: 919 }, { date: '2.6', count: 560 },
  { date: '2.7', count: 948 }, { date: '2.8', count: 732 }, { date: '2.9', count: 627 },
  { date: '2.10', count: 319 }, { date: '2.11', count: 986 }, { date: '2.12', count: 1180 },
  { date: '2.13', count: 855 }, { date: '2.14', count: 983 }, { date: '2.15', count: 694 },
  { date: '2.16', count: 1215 }, { date: '2.17', count: 921 }, { date: '2.18', count: 693 },
  { date: '2.19', count: 593 }, { date: '2.20', count: 771 }, { date: '2.21', count: 508 },
  { date: '2.22', count: 535 }, { date: '2.23', count: 726 }, { date: '2.24', count: 565 },
  { date: '2.25', count: 566 }, { date: '2.26', count: 554 }, { date: '2.27', count: 778 },
  { date: '2.28', count: 620 }, { date: '3.1', count: 1288 }, { date: '3.2', count: 451 },
  { date: '3.3', count: 710 }, { date: '3.4', count: 638 }, { date: '3.5', count: 713 },
  { date: '3.6', count: 492 },
];

// Hour distribution (real data)
export const hourDistribution: { hour: number; count: number }[] = [
  { hour: 0, count: 10608 }, { hour: 1, count: 5320 }, { hour: 2, count: 1416 },
  { hour: 3, count: 195 }, { hour: 4, count: 4 }, { hour: 5, count: 5 },
  { hour: 6, count: 4 }, { hour: 7, count: 87 }, { hour: 8, count: 1192 },
  { hour: 9, count: 1187 }, { hour: 10, count: 2355 }, { hour: 11, count: 2146 },
  { hour: 12, count: 3207 }, { hour: 13, count: 1502 }, { hour: 14, count: 1895 },
  { hour: 15, count: 1725 }, { hour: 16, count: 1461 }, { hour: 17, count: 2129 },
  { hour: 18, count: 2790 }, { hour: 19, count: 2129 }, { hour: 20, count: 2267 },
  { hour: 21, count: 1846 }, { hour: 22, count: 3271 }, { hour: 23, count: 5253 },
];

// Word cloud (real frequency data from chat)
export const wordCloudData = [
  { text: '哈哈哈', value: 7406 },
  { text: '嗯嗯', value: 1674 },
  { text: '好的', value: 732 },
  { text: '开心', value: 572 },
  { text: '笑死', value: 528 },
  { text: '我们', value: 469 },
  { text: '嘿嘿', value: 390 },
  { text: '好看', value: 325 },
  { text: '好吃', value: 310 },
  { text: '吃饭', value: 255 },
  { text: '下班', value: 237 },
  { text: '睡觉', value: 233 },
  { text: '一起', value: 220 },
  { text: '没事', value: 208 },
  { text: '可爱', value: 182 },
  { text: '加油', value: 149 },
  { text: '晚安', value: 111 },
  { text: '抱抱', value: 102 },
  { text: '嘻嘻', value: 94 },
  { text: '想你', value: 78 },
  { text: '辛苦', value: 78 },
  { text: '喜欢你', value: 77 },
  { text: '真好', value: 66 },
  { text: '等你', value: 65 },
  { text: '想吃', value: 64 },
  { text: '宝宝', value: 63 },
  { text: '幸福', value: 48 },
  { text: '快乐', value: 44 },
  { text: '陪你', value: 36 },
  { text: '好喜欢', value: 34 },
];

// Message type breakdown (real data)
export const messageTypeData = [
  { name: '文字', value: 39576, color: '#FF69B4' },
  { name: '表情', value: 6684, color: '#FFB6C1' },
  { name: '图片/贴纸', value: 6018, color: '#F8E8EE' },
  { name: '语音', value: 1698, color: '#FADADD' },
  { name: '视频', value: 18, color: '#D4AF37' },
];

export const totalMessages = 53994;

// Peak hour: 0:00 (midnight) - they are night owls!
export const peakHour = 0;

// ===== WEEKLY HEATMAP DATA (day_of_week x hour) =====
// Each row: [hour0, hour1, ..., hour23], rows: Mon(0) to Sun(6)
export const weeklyHeatmap: number[][] = [
  [1905,883,7,0,0,0,0,1,231,248,256,155,340,161,171,179,134,286,279,384,306,330,306,612],   // Mon
  [1167,507,195,0,0,0,0,4,316,196,413,169,498,185,176,245,228,210,236,270,378,270,487,564], // Tue
  [1636,988,271,8,2,3,0,12,214,181,216,212,552,231,272,188,137,254,420,193,257,194,352,651], // Wed
  [1566,507,0,10,2,2,4,51,185,98,402,416,626,174,198,331,224,397,463,262,335,363,483,852],   // Thu
  [1612,849,362,0,0,0,0,16,163,181,333,278,539,211,375,181,298,363,600,414,331,237,264,709], // Fri
  [1466,920,208,0,0,0,0,0,20,121,501,499,429,238,344,298,188,454,393,383,299,257,419,744],   // Sat
  [1279,683,378,178,0,0,0,3,69,165,237,422,234,308,367,310,257,173,411,233,375,202,971,1141],// Sun
];
export const weekDayLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

// ===== LOVE CURVE (weekly message counts) =====
export const weeklyCounts: { week: string; count: number; label?: string }[] = [
  { week: '第1周', count: 3768, label: '1.8 相遇' },
  { week: '第2周', count: 12479 },
  { week: '第3周', count: 5747 },
  { week: '第4周', count: 6951 },
  { week: '第5周', count: 6182, label: '2.10 在一起' },
  { week: '第6周', count: 5656 },
  { week: '第7周', count: 5256 },
  { week: '第8周', count: 5122 },
  { week: '第9周', count: 3015, label: '至今' },
];

// ===== NICKNAMES =====
export const nicknameData: { name: string; count: number; emoji: string }[] = [
  { name: '金涛', count: 74, emoji: '💛' },
  { name: '女朋友', count: 72, emoji: '💕' },
  { name: '向金涛', count: 65, emoji: '✨' },
  { name: '宝宝', count: 61, emoji: '🍼' },
  { name: '男朋友', count: 50, emoji: '💙' },
  { name: '公主', count: 42, emoji: '👑' },
  { name: '猪', count: 36, emoji: '🐷' },
  { name: '小宝', count: 29, emoji: '🌟' },
  { name: '姐姐', count: 28, emoji: '🌸' },
  { name: '小朋友', count: 18, emoji: '🧸' },
  { name: '猪猪', count: 8, emoji: '🐽' },
  { name: '笨蛋', count: 8, emoji: '😜' },
  { name: '涛涛', count: 5, emoji: '🌊' },
  { name: '王子', count: 5, emoji: '🤴' },
];

// ===== CHAT RECORDS / EXTREMES =====
export const chatRecords = {
  longestMessage: {
    content: '我的AI工具因为用太多被限额了...得等到八点四十才能再用，所以我打算待会儿八点二十直接下班好了，带上公司的电脑，回去好好干',
    length: 67,
    date: '2.24',
  },
  latestNight: {
    time: '05:29',
    date: '2.25',
    content: '好累',
  },
  densestWindow: {
    time: '2.27 23:50',
    count: 103,
    description: '10分钟内103条消息',
  },
  avgReplyTime: 14.9,
  longestChatDay: {
    date: '2.14 情人节',
    span: '24小时',
    description: '从0:00聊到23:59，一整天都在聊',
  },
  sweetWordsTotal: {
    '开心': 571,
    '晚安': 111,
    '抱抱': 102,
    '想你': 78,
    '喜欢你': 77,
    '甜': 76,
    '幸福': 48,
    '快乐': 43,
  },
};

// Sweet quotes - real conversations from chat records
export const mockChatData: ChatData = {
  messages: [],
  sweetQuotes: [
    {
      context: '第一次聊天 (1.8)',
      messages: [
        { sender: 'me', content: '你好呀，我叫向金涛，目前在武汉微派做HR实习生' },
        { sender: 'her', content: '你好呀！骆慧敏' },
        { sender: 'me', content: '你的姓氏好少见诶！' },
        { sender: 'her', content: '你的姓氏也是呀，平时不常见到~' },
      ],
    },
    {
      context: '意识到很聊得来 (1.8)',
      messages: [
        { sender: 'her', content: '这次居然没有感受到晕车就到了' },
        { sender: 'her', content: '可能因为一直在聊天哈哈哈哈' },
        { sender: 'me', content: '哈哈哈哈哈是的！好巧啊' },
        { sender: 'me', content: '可以呀！和你聊天很开心' },
      ],
    },
    {
      context: '聊到凌晨 (1.9)',
      messages: [
        { sender: 'me', content: '嗯嗯，能在一起聊天就很开心呀' },
        { sender: 'her', content: '明天周五，根本不想睡啊啊啊啊' },
        { sender: 'me', content: '好呀好呀' },
        { sender: 'her', content: '晚安！' },
        { sender: 'me', content: '晚安！' },
      ],
    },
    {
      context: '你笑起来好可爱 (1.9)',
      messages: [
        { sender: 'me', content: '你笑起来好可爱' },
        { sender: 'me', content: '！' },
        { sender: 'her', content: '我才不可爱' },
        { sender: 'her', content: '我是高冷' },
      ],
    },
    {
      context: '有机会请你吃 (1.10)',
      messages: [
        { sender: 'me', content: '我也会做菜，我会炒辣椒炒肉、炒牛肉、红烧肉、炒鸡' },
        { sender: 'her', content: '好吃吗好吃吗' },
        { sender: 'me', content: '我很喜欢自己做的菜' },
        { sender: 'me', content: '有机会请你吃' },
        { sender: 'her', content: '好呀' },
      ],
    },
    {
      context: '希望我们都幸福 (1.10)',
      messages: [
        { sender: 'her', content: '希望我们都有感知幸福的能力！' },
        { sender: 'me', content: '我觉得我现在就很有感知幸福的能力，因为我现在就很幸福' },
        { sender: 'her', content: '放过你了' },
      ],
    },
    {
      context: '恋爱脑 (1.12)',
      messages: [
        { sender: 'her', content: '男方恋爱脑就好幸福' },
        { sender: 'me', content: '说来惭愧，我一直觉得，谁和我在一起肯定会很幸福！' },
      ],
    },
    {
      context: '你很恰到好处 (1.11)',
      messages: [
        { sender: 'her', content: '怪不得我胖' },
        { sender: 'me', content: '很幸福啦！' },
        { sender: 'me', content: '我觉得你已经很瘦啦，而且也不是特别瘦，就是很恰到好处的样子' },
      ],
    },
  ],
};
