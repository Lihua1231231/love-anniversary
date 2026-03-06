export interface MenuItem {
  id: string;
  name: string;
  category: string;
  image: string;
  fakePrice: number;
  description?: string;
  locked?: boolean; // 待解锁菜品
}

export const categories = ['全部', '家常炒菜', '蒸菜', '面/粉', '待解锁'];

const img = (id: string) => `${id}?w=400&h=300&fit=crop&auto=format&q=80`;

// 真实菜品数据 —— 基于聊天记录提取
export const menuItems: MenuItem[] = [
  // ===== 家常炒菜 =====
  {
    id: '1',
    name: '辣椒炒肉',
    category: '家常炒菜',
    image: img('https://images.unsplash.com/photo-1516684669134-de6f7c473a2a'),
    fakePrice: 38,
    description: '湖南人的灵魂菜',
  },
  {
    id: '2',
    name: '红烧肉',
    category: '家常炒菜',
    image: img('https://images.unsplash.com/photo-1527578054032-8d8f044e013d'),
    fakePrice: 58,
    description: '软烂入味，看家本领',
  },
  {
    id: '3',
    name: '香菜炒牛肉',
    category: '家常炒菜',
    image: img('https://images.unsplash.com/photo-1688084403060-3594a4b8ff8d'),
    fakePrice: 48,
    description: '因为你爱吃香菜',
  },
  {
    id: '4',
    name: '香菜拌牛肉',
    category: '家常炒菜',
    image: img('https://images.unsplash.com/photo-1532636875304-0c89119d9b4d'),
    fakePrice: 42,
    description: '凉拌版本，清爽开胃',
  },
  {
    id: '5',
    name: '金钱蛋',
    category: '家常炒菜',
    image: img('https://images.unsplash.com/photo-1753198674530-21e539ac4303'),
    fakePrice: 22,
    description: '外酥里嫩小煎蛋',
  },
  {
    id: '6',
    name: '蛋炒饭',
    category: '家常炒菜',
    image: img('https://images.unsplash.com/photo-1512058564366-18510be2db19'),
    fakePrice: 18,
    description: '粒粒分明的幸福',
  },

  // ===== 蒸菜 =====
  {
    id: '7',
    name: '粉蒸肉',
    category: '蒸菜',
    image: img('https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2'),
    fakePrice: 52,
    description: '湖南浏阳传统味道',
  },
  {
    id: '8',
    name: '粉蒸排骨',
    category: '蒸菜',
    image: img('https://images.unsplash.com/photo-1543826173-1beeb97525d8'),
    fakePrice: 56,
    description: '排骨配米粉，入口即化',
  },

  // ===== 面/粉 =====
  {
    id: '9',
    name: '芝士火鸡面',
    category: '面/粉',
    image: img('https://images.unsplash.com/photo-1569718212165-3a8278d5f624'),
    fakePrice: 28,
    description: '又辣又香芝士拉丝',
  },
  {
    id: '10',
    name: '螺蛳粉',
    category: '面/粉',
    image: img('https://images.unsplash.com/photo-1631709497146-a239ef373cf1'),
    fakePrice: 25,
    description: '臭臭的但超好吃',
  },

  // ===== 待解锁 =====
  {
    id: '11',
    name: '酸辣土豆丝',
    category: '待解锁',
    image: img('https://images.unsplash.com/photo-1679279726946-a158b8bcaa23'),
    fakePrice: 22,
    description: '你说喜欢吃的，我正在学！',
    locked: true,
  },
  {
    id: '12',
    name: '小炒黄牛肉',
    category: '待解锁',
    image: img('https://images.unsplash.com/photo-1655091273851-7bdc2e578a88'),
    fakePrice: 68,
    description: '你的最爱，努力解锁中...',
    locked: true,
  },
];
