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
  },
  "Baby Products": {
    label: "婴儿用品",
    percentage: (totalPrice: number) =>
      totalPrice <= 10 ? totalPrice * 0.08 : totalPrice * 0.15,
    minimumFee: 0.3,
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
  },
  "Business, Industrial, and Scientific Supplies": {
    label: "商业、工业和科学用品",
    percentage: (totalPrice: number) => totalPrice * 0.12,
    minimumFee: 0.3,
  },
  "Clothing and Accessories": {
    label: "服装和配件",
    percentage: (totalPrice: number) => {
      if (totalPrice <= 15) return totalPrice * 0.05;
      if (totalPrice <= 20) return totalPrice * 0.1;
      return totalPrice * 0.17;
    },
    minimumFee: 0.3,
  },
  "Compact Appliances": {
    label: "紧凑型电器",
    percentage: (totalPrice: number) => {
      if (totalPrice <= 300) return totalPrice * 0.15;
      return 300 * 0.15 + (totalPrice - 300) * 0.08;
    },
    minimumFee: 0.3,
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
  },
  "Electronics Accessories": {
    label: "电子产品配件",
    percentage: (totalPrice: number) => {
      if (totalPrice <= 100) return totalPrice * 0.15;
      return 100 * 0.15 + (totalPrice - 100) * 0.08;
    },
    minimumFee: 0.3,
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
  },
  "Home and Kitchen": {
    label: "家居和厨房",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
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
  },
  "Office Products": {
    label: "办公产品",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
  },
  "Pet Products": {
    label: "宠物产品",
    percentage: (totalPrice: number) =>
      totalPrice <= 10 ? totalPrice * 0.15 : totalPrice * 0.22, // veterinary diets
    minimumFee: 0.3,
  },
  "Sports and Outdoors": {
    label: "运动和户外",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
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
  },
  "Toys and Games": {
    label: "玩具和游戏",
    percentage: (totalPrice: number) => totalPrice * 0.15,
    minimumFee: 0.3,
  },
  "Video Game Consoles": {
    label: "视频游戏机",
    percentage: (totalPrice: number) => totalPrice * 0.08,
    minimumFee: 0.3,
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
