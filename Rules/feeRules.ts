export const feeRules: any = {
  "Amazon Device Accessories": {
    label: "亚马逊设备配件",
    percentage: (totalPrice: number) => totalPrice * 0.45,
    minimumFee: 0.3,
  },
  "Amazon Explore": {
    label: "亚马逊探索",
    percentage: (totalPrice: number) => totalPrice * 0.3,
    minimumFee: 2.0,
  },
  "Automotive and Powersports": {
    label: "汽车和动力运动",
    percentage: (totalPrice: number) => totalPrice * 0.12,
    minimumFee: 0.3,
    id: 8565,
    parentId: 26445,
    name: "Automotive",
    level: 1,
    child: null,
    cateId: 15684181,
    pathById: "15684181",
    rootCateId: 15684181,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Automotive",
    pathByName: "Automotive",
  },
  "Baby Products": {
    label: "婴儿用品",
    percentage: (totalPrice: number) =>
      totalPrice <= 10 ? totalPrice * 0.08 : totalPrice * 0.15,
    minimumFee: 0.3,
    id: 8621,
    parentId: 26445,
    name: "Baby",
    level: 1,
    child: null,
    cateId: 165796011,
    pathById: "165796011",
    rootCateId: 165796011,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Baby",
    pathByName: "Baby",
  },
  "Backpacks, Handbags, and Luggage": {
    label: "背包、手提包和行李",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
  },
  "Base Equipment Power Tools": {
    label: "基础设备电动工具",
    percentage: (totalPrice: number) => totalPrice * 0.12,
    minimumFee: 0.3,
  },
  "Beauty, Health and Personal Care": {
    label: "美容、健康和个人护理",
    percentage: (totalPrice: number) =>
      totalPrice <= 10 ? totalPrice * 0.08 : totalPrice * 0.15,
    minimumFee: 0.3,
    id: [8604, 8618],
    parentId: 26445,
    name: ["Health & Household", "Beauty & Personal Care"],
    level: 1,
    child: null,
    cateId: [3760901, 3760911],
    pathById: ["3760901", "3760911"],
    rootCateId: [3760901, 3760911],
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: ["Health & Household", "Beauty & Personal Care"],
    pathByName: ["Health & Household", "Beauty & Personal Care"],
  },
  "Business, Industrial, and Scientific Supplies": {
    label: "商业、工业和科学用品",
    percentage: (totalPrice: number) => totalPrice * 0.12,
    minimumFee: 0.3,
    id: 8562,
    parentId: 26445,
    name: "Industrial & Scientific",
    level: 1,
    child: null,
    cateId: 16310091,
    pathById: "16310091",
    rootCateId: 16310091,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Industrial & Scientific",
    pathByName: "Industrial & Scientific",
  },
  "Clothing and Accessories": {
    label: "服装和配件",
    percentage: (totalPrice: number) => {
      if (totalPrice <= 15) return totalPrice * 0.05;
      if (totalPrice <= 20) return totalPrice * 0.1;
      return totalPrice * 0.17;
    },
    minimumFee: 0.3,
    id: 8617,
    parentId: 26445,
    name: "Clothing, Shoes & Jewelry",
    level: 1,
    child: null,
    cateId: 7141123011,
    pathById: "7141123011",
    rootCateId: 7141123011,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Clothing, Shoes & Jewelry",
    pathByName: "Clothing, Shoes & Jewelry",
  },
  "Compact Appliances": {
    label: "紧凑型电器",
    percentage: (totalPrice: number) => {
      if (totalPrice <= 300) return totalPrice * 0.15;
      return 300 * 0.15 + (totalPrice - 300) * 0.08;
    },
    minimumFee: 0.3,
  },
  "Electronics Accessories": {
    label: "电子产品配件",
    percentage: (totalPrice: number) => {
      if (totalPrice <= 100) return totalPrice * 0.15;
      return 100 * 0.15 + (totalPrice - 100) * 0.08;
    },
    minimumFee: 0.3,
    id: 8623,
    parentId: 26445,
    name: "Computers & Accessories",
    level: 1,
    child: null,
    cateId: 541966,
    pathById: "541966",
    rootCateId: 541966,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:07",
    rootCateName: "Computers & Accessories",
    pathByName: "Computers & Accessories",
  },
  Computers: {
    label: "计算机",
    percentage: (totalPrice: number) => totalPrice * 0.08,
    minimumFee: 0.3,
  },
  "Consumer Electronics": {
    label: "消费电子产品",
    percentage: (totalPrice: number) => totalPrice * 0.08,
    minimumFee: 0.3,
    id: 8616,
    parentId: 26445,
    name: "Electronics",
    level: 1,
    child: null,
    cateId: 172282,
    pathById: "172282",
    rootCateId: 172282,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Electronics",
    pathByName: "Electronics",
  },
  "Everything Else": {
    label: "其他产品",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
  },
  Eyewear: {
    label: "眼镜",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
  },
  "Fine Art": {
    label: "美术作品",
    percentage: (totalPrice: number) => {
      if (totalPrice <= 100) return totalPrice * 0.2;
      if (totalPrice <= 1000) return 100 * 0.2 + (totalPrice - 100) * 0.15;
      if (totalPrice <= 5000)
        return 100 * 0.2 + 900 * 0.15 + (totalPrice - 1000) * 0.1;
      return 100 * 0.2 + 900 * 0.15 + 4000 * 0.1 + (totalPrice - 5000) * 0.05;
    },
    minimumFee: null,
  },
  Footwear: {
    label: "鞋类",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
  },
  "Full-Size Appliances": {
    label: "全尺寸电器",
    percentage: (totalPrice: number) => totalPrice * 0.08,
    minimumFee: 0.3,
  },
  Furniture: {
    label: "家具",
    percentage: (totalPrice: number) => {
      if (totalPrice <= 200) return totalPrice * 0.15;
      return 200 * 0.15 + (totalPrice - 200) * 0.1;
    },
    minimumFee: 0.3,
  },
  "Gift Cards": {
    label: "礼品卡",
    percentage: (totalPrice: number) => totalPrice * 0.2,
    minimumFee: null,
  },
  "Grocery and Gourmet": {
    label: "食品和美食",
    percentage: (totalPrice: number) => {
      if (totalPrice <= 15) return totalPrice * 0.08;
      return totalPrice * 0.15;
    },
    minimumFee: null,
    id: 8612,
    parentId: 26445,
    name: "Grocery & Gourmet Food",
    level: 1,
    child: null,
    cateId: 16310101,
    pathById: "16310101",
    rootCateId: 16310101,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Grocery & Gourmet Food",
    pathByName: "Grocery & Gourmet Food",
  },
  "Home and Kitchen": {
    label: "家居和厨房",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
    id: 8608,
    parentId: 26445,
    name: "Home & Kitchen",
    level: 1,
    child: null,
    cateId: 1055398,
    pathById: "1055398",
    rootCateId: 1055398,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Home & Kitchen",
    pathByName: "Home & Kitchen",
  },
  Jewelry: {
    label: "珠宝",
    percentage: (totalPrice: number) => {
      if (totalPrice <= 250) return totalPrice * 0.2;
      return 250 * 0.2 + (totalPrice - 250) * 0.05;
    },
    minimumFee: 0.3,
  },
  "Lawn and Garden": {
    label: "园艺和草坪",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
    id: 8619,
    parentId: 26445,
    name: "Patio, Lawn & Garden",
    level: 1,
    child: null,
    cateId: 2972638011,
    pathById: "2972638011",
    rootCateId: 2972638011,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Patio, Lawn & Garden",
    pathByName: "Patio, Lawn & Garden",
  },
  "Lawn Mowers and Snow Throwers": {
    label: "割草机和雪铲",
    percentage: (totalPrice: number) => {
      if (totalPrice <= 500) return totalPrice * 0.15;
      return 500 * 0.15 + (totalPrice - 500) * 0.08;
    },
    minimumFee: 0.3,
  },
  Mattresses: {
    label: "床垫",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
  },
  "Media - Books, DVD, Music, Software, Video": {
    label: "媒体 - 书籍、DVD、音乐、软件、视频",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: null,
  },
  "Musical Instruments and AV Production": {
    label: "乐器和音频制作",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
    id: 8609,
    parentId: 26445,
    name: "Musical Instruments",
    level: 1,
    child: null,
    cateId: 11091801,
    pathById: "11091801",
    rootCateId: 11091801,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:06",
    rootCateName: "Musical Instruments",
    pathByName: "Musical Instruments",
  },
  "Office Products": {
    label: "办公产品",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
    id: 8607,
    parentId: 26445,
    name: "Office Products",
    level: 1,
    child: null,
    cateId: 1064954,
    pathById: "1064954",
    rootCateId: 1064954,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Office Products",
    pathByName: "Office Products",
  },
  "Pet Products": {
    label: "宠物产品",
    percentage: (totalPrice: number) =>
      totalPrice <= 10 ? totalPrice * 0.15 : totalPrice * 0.22, // veterinary diets
    minimumFee: 0.3,
    id: 8599,
    parentId: 26445,
    name: "Pet Supplies",
    level: 1,
    child: null,
    cateId: 2619533011,
    pathById: "2619533011",
    rootCateId: 2619533011,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Pet Supplies",
    pathByName: "Pet Supplies",
  },
  "Sports and Outdoors": {
    label: "运动和户外",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
    id: 8611,
    parentId: 26445,
    name: "Sports & Outdoors",
    level: 1,
    child: null,
    cateId: 3375251,
    pathById: "3375251",
    rootCateId: 3375251,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Sports & Outdoors",
    pathByName: "Sports & Outdoors",
  },
  Tires: {
    label: "轮胎",
    percentage: (totalPrice: number) => totalPrice * 0.1,
    minimumFee: 0.3,
  },
  "Tools and Home Improvement": {
    label: "工具和家居改善",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
    id: 8563,
    parentId: 26445,
    name: "Tools & Home Improvement",
    level: 1,
    child: null,
    cateId: 228013,
    pathById: "228013",
    rootCateId: 228013,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Tools & Home Improvement",
    pathByName: "Tools & Home Improvement",
  },
  "Toys and Games": {
    label: "玩具和游戏",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
    id: 8534,
    parentId: 26445,
    name: "Toys & Games",
    level: 1,
    child: null,
    cateId: 165793011,
    pathById: "165793011",
    rootCateId: 165793011,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Toys & Games",
    pathByName: "Toys & Games",
  },
  "Video Game Consoles": {
    label: "视频游戏机",
    percentage: (totalPrice: number) => totalPrice * 0.08,
    minimumFee: 0.3,
    id: 8529,
    parentId: 26445,
    name: "Video Games",
    level: 1,
    child: null,
    cateId: 468642,
    pathById: "468642",
    rootCateId: 468642,
    hasChildren: 1,
    storageTime: "2024-10-07 16:19:08",
    rootCateName: "Video Games",
    pathByName: "Video Games",
  },
  "Video Games and Gaming Accessories": {
    label: "视频游戏和游戏配件",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
  },
  Watches: {
    label: "手表",
    percentage: (totalPrice: number) => {
      if (totalPrice <= 500) return totalPrice * 0.2;
      return 500 * 0.2 + (totalPrice - 500) * 0.1;
    },
    minimumFee: 0.3,
  },
};

export const sortedFeeRules = Object.keys(feeRules)
  .sort()
  .reduce((acc: any, key: string) => {
    acc[key] = feeRules[key];
    return acc;
  }, {});

export function FindFeeKey(rootCateId?: number) {
  return Object.keys(sortedFeeRules).find((item) => {
    if (!sortedFeeRules[item].rootCateId && !rootCateId) return;
    if (
      Array.isArray(sortedFeeRules[item].rootCateId) &&
      sortedFeeRules[item].rootCateId.includes(rootCateId)
    ) {
      return item;
    }
    if (sortedFeeRules[item].rootCateId === rootCateId) {
      return item;
    }
  });
}

export const optionsFeeRules = Object.keys(sortedFeeRules).map((key) => {
  return {
    label: feeRules[key].label,
    value: key,
  };
});
