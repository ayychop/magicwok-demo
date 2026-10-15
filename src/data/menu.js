// MAGIC WOK menu, scraped 15 Oct 2026 from the shop's own ordering site
// (https://magicwokwycombe.co.uk/order-now, public menu feed). 143 items, 16 categories.
// Names, Chinese labels (zh) and prices are kept exactly as published there, including
// the shop's own spellings and the "@" marker on battered balls (hidden on screen by cleanLabel).
// Prices are GBP, VAT included. To update: edit an entry here, the site reads everything from this file.
//
// Notes:
//  - "Others" is labelled 无中文 ("no Chinese") in their system, a placeholder rather than a real
//    label, so the site does not display it. It is kept here verbatim.
//  - `v: true` marks dishes that are vegetable dishes by name or category. The source feed has no
//    dietary flags, so confirm with the kitchen before relying on these.

export const MENU = [
  {
    id: "appetisers",
    title: "Appetisers",
    zh: "头盘",
    items: [
      {
        name: "Plain Pancake For Crispy Duck",
        zh: "甲皮",
        desc: "",
        price: "2.20"
      },
      {
        name: "Duck Salad",
        zh: "甲才",
        desc: "",
        price: "2.20"
      },
      {
        name: "Munchy Box",
        zh: "优惠餐",
        desc: "Salt & Pepper Chilli Spare Ribs (4), Salt & Pepper Chilli Chicken Wings (4), Salt & Pepper Chilli Chicken, Salt & Pepper Chilli Chips, Salt & Pepper Chilli Chicken Balls (4), Vegetable Spring Rolls (4),Egg Fried Rice, sweet and sour sauce",
        price: "20.00"
      },
      {
        name: "Aromatic Crispy Duck1/2",
        zh: "香酥鸭1/2",
        desc: "Served with Pancakes, Spring Onion, Cucumber & Hoi Sin Sauce",
        price: "16.00"
      },
      {
        name: "Roasted Peking Duck",
        zh: "北京甲",
        desc: "A Whole Duck Split-Roasted & Basted with Soya Sauce & Honey Until the Skin is Crispy. Served with Pancakes, Shredded Cucumber, Spring Onion & Hoi Sin Sauce",
        price: "11.50"
      },
      {
        name: "Special Combination For 2 Persons",
        zh: "招牌拼盘",
        desc: "Honey Ribs, Crispy Spring Rolls, Crispy Wan Tun, Sesame Prawn Toast, Chicken Samosa, Crispy Seaweed",
        price: "11.50"
      },
      {
        name: "Seaweed Combination For 2 Persons",
        zh: "海草拼盘",
        desc: "Salt & Pepper Ribs, Salt & Pepper Chicken, Crispy Spring Rolls, Sesame Prawn Toast     , Crispy Wan Tun, Seaweeds",
        price: "11.50"
      },
      {
        name: "Chicken Dumpling With Sweet & Sour Sauce (6)",
        zh: "鸡饺",
        desc: "",
        price: "6.30"
      },
      {
        name: "Spare Ribs Dry",
        zh: "干骨",
        desc: "",
        price: "8.00"
      },
      {
        name: "Spare Ribs In Honey Sauce",
        zh: "蜜骨",
        desc: "",
        price: "8.00"
      },
      {
        name: "Spare Ribs In Bbq Sauce",
        zh: "BBQ骨",
        desc: "",
        price: "8.00"
      },
      {
        name: "Spare Ribs In Sweet Sour Sauce",
        zh: "古骨",
        desc: "",
        price: "8.00"
      },
      {
        name: "Spare Ribs In Ok Sauce",
        zh: "OK骨",
        desc: "",
        price: "8.00"
      },
      {
        name: "Spare Ribs In Thai Sauce",
        zh: "泰式骨",
        desc: "",
        price: "8.00"
      },
      {
        name: "Spare Ribs In Chilli Sauce",
        zh: "辣骨",
        desc: "",
        price: "8.00"
      },
      {
        name: "Spare Ribs In Capital Sauce",
        zh: "京骨",
        desc: "",
        price: "8.00"
      },
      {
        name: "Vegetarian Spring Roll (4)",
        zh: "斋卷(4)",
        desc: "With Sweet & Sour Sauce",
        price: "4.80",
        v: true
      },
      {
        name: "Thai Vegetable Spring Roll With Sweet And Sour Sauce (10)",
        zh: "泰卷（10）",
        desc: "",
        price: "4.80"
      },
      {
        name: "Satay Chicken On Skewers",
        zh: "串鸡",
        desc: "contain nut",
        price: "7.80"
      },
      {
        name: "Sesame Prawn On Toast",
        zh: "虾多士",
        desc: "",
        price: "7.00"
      },
      {
        name: "Crispy Chicken Curry Samosa 4",
        zh: "咖喱鸡角",
        desc: "",
        price: "4.80"
      },
      {
        name: "Crispy Prawn Wan Tun (8)",
        zh: "炸云吞",
        desc: "With Sweet & Sour Sauce",
        price: "5.00"
      },
      {
        name: "Crispy Seaweed",
        zh: "海草",
        desc: "",
        price: "5.80"
      },
      {
        name: "Chips",
        zh: "条",
        desc: "",
        price: "4.00"
      },
      {
        name: "Prawn Crackers",
        zh: "下片",
        desc: "",
        price: "4.00"
      },
      {
        name: "Cantonese Spring Rolls",
        zh: "春卷",
        desc: "pork, chicken and vegetables with sweet sour sauce",
        price: "5.30"
      }
    ]
  },
  {
    id: "salt-pepper",
    title: "Salt & Pepper",
    zh: "椒盐",
    items: [
      {
        name: "Salt Pepper Spare Ribs",
        zh: "椒盐骨",
        desc: "",
        price: "8.00"
      },
      {
        name: "Salt Pepper Chicken Wings",
        zh: "椒盐鸡翅",
        desc: "",
        price: "6.90"
      },
      {
        name: "Salt & Pepper King Prawn",
        zh: "椒盐大虾",
        desc: "",
        price: "8.50"
      },
      {
        name: "Salt & Pepper Squid",
        zh: "椒盐鱿鱼",
        desc: "",
        price: "7.80"
      },
      {
        name: "Salt & Pepper Chicken",
        zh: "椒盐鸡",
        desc: "",
        price: "7.80"
      },
      {
        name: "Salt & Pepper Beancurd",
        zh: "椒盐豆腐",
        desc: "",
        price: "6.80"
      },
      {
        name: "Salt & Pepper Chips",
        zh: "椒盐条",
        desc: "",
        price: "4.90"
      },
      {
        name: "Salt & Pepper Chicken Balls(@)",
        zh: "椒盐鸡球(@)",
        desc: "",
        price: "7.60"
      },
      {
        name: "Slat & Pepper King Prawn Balls",
        zh: "椒盐虾球@",
        desc: "",
        price: "8.50"
      }
    ]
  },
  {
    id: "soup",
    title: "Soup",
    zh: "汤",
    items: [
      {
        name: "Chicken Sweet Corn Soup",
        zh: "鸡米汤",
        desc: "",
        price: "5.20"
      },
      {
        name: "Hot & Sour Soup",
        zh: "酸辣汤",
        desc: "",
        price: "5.20"
      },
      {
        name: "Vegetarian Hot & Sour Soup",
        zh: "斋酸辣汤",
        desc: "",
        price: "5.20",
        v: true
      },
      {
        name: "Wan Ton Soup",
        zh: "云吞汤",
        desc: "",
        price: "5.30"
      },
      {
        name: "Chicken Mushroom Soup",
        zh: "毛菇鸡汤",
        desc: "",
        price: "5.20"
      },
      {
        name: "Chicken Noodle Soup",
        zh: "鸡面汤",
        desc: "",
        price: "5.20"
      },
      {
        name: "Crab Meat Sweet Corn Soup",
        zh: "蟹米汤",
        desc: "",
        price: "5.20"
      }
    ]
  },
  {
    id: "others",
    title: "Others",
    zh: "无中文",
    items: [
      {
        name: "Crispy Shredded Chilli Beef",
        zh: "干牛丝",
        desc: "",
        price: "7.90"
      },
      {
        name: "Crispy Shredded Chilli Chicken",
        zh: "干鸡丝",
        desc: "",
        price: "7.90"
      },
      {
        name: "Smoked Shredded Chicken",
        zh: "燻鸡丝（风鸡丝）",
        desc: "",
        price: "7.80"
      },
      {
        name: "Chicken In Lemon Sauce",
        zh: "柠檬鸡",
        desc: "",
        price: "7.80"
      },
      {
        name: "Chicken In Orange Sauce",
        zh: "橙汁鸡",
        desc: "",
        price: "7.80"
      },
      {
        name: "Chicken In Plum Sauce",
        zh: "梅子鸡",
        desc: "",
        price: "7.80"
      },
      {
        name: "Roast Duck In Orange Sauce",
        zh: "橙鸭",
        desc: "",
        price: "8.30"
      },
      {
        name: "Roast Duck In Plum Sauce",
        zh: "梅子甲",
        desc: "",
        price: "8.30"
      },
      {
        name: "Roast Duck In Lemon Sauce",
        zh: "柠檬鸭",
        desc: "",
        price: "8.30"
      },
      {
        name: "Crispy King Prawn In Butter Garlic Sauce",
        zh: "蒜牛油虾",
        desc: "",
        price: "8.30"
      },
      {
        name: "Crispy Chicken In Butter Garlic Sauce",
        zh: "蒜牛油鸡",
        desc: "",
        price: "7.80"
      }
    ]
  },
  {
    id: "curry-dishes",
    title: "Curry Dishes",
    zh: "咖喱",
    items: [
      {
        name: "Special House Curry",
        zh: "招牌咖喱",
        desc: "King Prawn, Chicken, Beef & Roast Pork",
        price: "8.30"
      },
      {
        name: "King Prawn House Curry",
        zh: "咖喱大虾",
        desc: "",
        price: "8.30"
      },
      {
        name: "Shrimp House Curry",
        zh: "咖喱虾仔",
        desc: "",
        price: "7.50"
      },
      {
        name: "Chicken House Curry",
        zh: "咖喱鸡",
        desc: "",
        price: "7.80"
      },
      {
        name: "Beef House Curry",
        zh: "咖喱牛",
        desc: "",
        price: "8.20"
      },
      {
        name: "Roast Pork House Curry",
        zh: "咖喱叉烧",
        desc: "",
        price: "7.50"
      },
      {
        name: "Roast Duck House Curry",
        zh: "咖喱甲",
        desc: "",
        price: "8.30"
      },
      {
        name: "Mushroom House Curry",
        zh: "咖喱毛菇",
        desc: "",
        price: "6.80"
      },
      {
        name: "Tofu House Curry",
        zh: "咖喱豆腐",
        desc: "",
        price: "6.80"
      },
      {
        name: "Mixed Vegetable House Curry",
        zh: "咖喱什菜",
        desc: "",
        price: "7.50",
        v: true
      }
    ]
  },
  {
    id: "sweet-sour-dishes",
    title: "Sweet & Sour Dishes",
    zh: "古老餐",
    items: [
      {
        name: "Sweet & Sour Chicken Hong Kong Style",
        zh: "古老鸡",
        desc: "",
        price: "7.80"
      },
      {
        name: "Sweet & Sour King Prawn Hong Kong Style",
        zh: "古老大虾",
        desc: "",
        price: "8.30"
      },
      {
        name: "Sweet & Sour Vegetable Hong Kong Style",
        zh: "古老什才",
        desc: "",
        price: "6.80",
        v: true
      },
      {
        name: "Sweet & Sour Tofu Hong Kong Style",
        zh: "古老豆腐",
        desc: "",
        price: "6.80"
      },
      {
        name: "Sweet & Sour Chicken Balls In Batter",
        zh: "鸡球@",
        desc: "",
        price: "7.80"
      },
      {
        name: "Sweet Sour King Prawn Balls In Batter",
        zh: "虾球@",
        desc: "",
        price: "8.30"
      }
    ]
  },
  {
    id: "main-course",
    title: "Main Course",
    zh: "主餐",
    items: [
      {
        name: "Special",
        zh: "招牌",
        desc: "King Prawn, Chicken, Beef & Roast Pork",
        price: "8.30"
      },
      {
        name: "Chicken",
        zh: "鸡",
        desc: "",
        price: "7.50"
      },
      {
        name: "King Prawn",
        zh: "大虾",
        desc: "",
        price: "8.30"
      },
      {
        name: "Beef",
        zh: "牛",
        desc: "",
        price: "8.00"
      },
      {
        name: "Roast Pork",
        zh: "叉烧",
        desc: "",
        price: "7.50"
      },
      {
        name: "Roast Duck",
        zh: "甲",
        desc: "",
        price: "8.30"
      },
      {
        name: "Tofu",
        zh: "豆腐",
        desc: "",
        price: "7.20"
      }
    ]
  },
  {
    id: "rice-dishes",
    title: "Rice Dishes",
    zh: "饭类",
    items: [
      {
        name: "House Special Rice With Gravy",
        zh: "招牌饭（汁）",
        desc: "With Prawn, Beef, Chicken, Roast Pork, Vegetable, Gravy",
        price: "8.60"
      },
      {
        name: "Young Chow Fried Rice",
        zh: "扬饭",
        desc: "",
        price: "7.50"
      },
      {
        name: "King Prawn Fried Rice",
        zh: "大虾饭",
        desc: "",
        price: "7.80"
      },
      {
        name: "Shrimps Fried Rice",
        zh: "虾仔饭",
        desc: "",
        price: "7.20"
      },
      {
        name: "Chicken Fried Rice",
        zh: "鸡饭",
        desc: "",
        price: "7.50"
      },
      {
        name: "Beef Fried Rice",
        zh: "牛饭",
        desc: "",
        price: "7.60"
      },
      {
        name: "Roast Pork Fried Rice",
        zh: "叉烧饭",
        desc: "",
        price: "7.50"
      },
      {
        name: "Roast Duck Fried Rice",
        zh: "甲饭",
        desc: "",
        price: "7.80"
      },
      {
        name: "Singapore Fried Rice",
        zh: "星饭",
        desc: "",
        price: "7.80"
      },
      {
        name: "Mushroom Fried Rice",
        zh: "毛菇饭",
        desc: "",
        price: "6.80"
      },
      {
        name: "Mixed Vegetable Fried Rice",
        zh: "什才饭",
        desc: "",
        price: "6.80",
        v: true
      },
      {
        name: "Egg Fried Rice (Normal)",
        zh: "蛋炒饭",
        desc: "",
        price: "4.90"
      },
      {
        name: "Boiled Rice (Normal)",
        zh: "白饭",
        desc: "",
        price: "4.60"
      }
    ]
  },
  {
    id: "chow-mein-dishes",
    title: "Chow Mein Dishes",
    zh: "炒面",
    items: [
      {
        name: "House Special Chow Mein In Gravy",
        zh: "招牌面（汁）",
        desc: "With Prawn, Beef, Chicken, Roast Pork, Vegetable, Gravy",
        price: "8.60"
      },
      {
        name: "Young Chow Chow Mein (Dry)",
        zh: "扬面",
        desc: "With Shrimps, Roast Pork, Chicken",
        price: "7.90"
      },
      {
        name: "King Prawn Chow Mein",
        zh: "大虾面",
        desc: "",
        price: "7.90"
      },
      {
        name: "Shrimps Chow Mein",
        zh: "虾仔面",
        desc: "",
        price: "7.60"
      },
      {
        name: "Chicken Chow Mein",
        zh: "鸡面",
        desc: "",
        price: "7.60"
      },
      {
        name: "Beef Chow Mein",
        zh: "牛面",
        desc: "",
        price: "7.80"
      },
      {
        name: "Roast Pork Chow Mein",
        zh: "叉烧面",
        desc: "",
        price: "7.60"
      },
      {
        name: "Roast Duck Chow Mein",
        zh: "甲面",
        desc: "",
        price: "8.20"
      },
      {
        name: "Mushroom Chow Mein",
        zh: "毛古面",
        desc: "",
        price: "7.20"
      },
      {
        name: "Mixed Vegetable Chow Mein",
        zh: "什才面",
        desc: "",
        price: "7.20",
        v: true
      },
      {
        name: "Plain Chow Mein With Bean Sprouts (Normal)",
        zh: "净面",
        desc: "",
        price: "6.20"
      },
      {
        name: "Singapore Chow Mein",
        zh: "星面",
        desc: "",
        price: "7.90"
      }
    ]
  },
  {
    id: "rice-noodles-dishes",
    title: "Rice Noodles Dishes",
    zh: "米粉",
    items: [
      {
        name: "Singapore Rice Noodles",
        zh: "星米",
        desc: "With Egg, Shrimps, Roast Pork, Chicken, Vegetable",
        price: "7.90"
      },
      {
        name: "Vegetable Singapore Rice Noodles",
        zh: "斋星米",
        desc: "With Egg, Beansprout, Onion",
        price: "7.90",
        v: true
      },
      {
        name: "King Prawns Rice Noodle",
        zh: "大虾米粉",
        desc: "",
        price: "8.00"
      },
      {
        name: "Chicken Rice Noodle",
        zh: "鸡米粉",
        desc: "",
        price: "7.50"
      },
      {
        name: "Beef Rice Noodle",
        zh: "牛米粉",
        desc: "",
        price: "7.80"
      },
      {
        name: "Roast Pork Rice Noodle",
        zh: "叉烧米粉",
        desc: "",
        price: "7.50"
      },
      {
        name: "Plain Rice Noodle (Normal)",
        zh: "炒米",
        desc: "",
        price: "6.50"
      }
    ]
  },
  {
    id: "udon-noodles",
    title: "Udon Noodles",
    zh: "乌冬面",
    items: [
      {
        name: "Singspore Udon Noodle",
        zh: "星乌冬面",
        desc: "",
        price: "7.80"
      },
      {
        name: "Young Udon Noodles",
        zh: "杨乌冬面",
        desc: "",
        price: "7.80"
      },
      {
        name: "Veg Udon Noodles",
        zh: "斋乌冬面",
        desc: "",
        price: "7.80",
        v: true
      },
      {
        name: "King Prawn Udon Noodles",
        zh: "大下乌冬面",
        desc: "",
        price: "7.90"
      },
      {
        name: "Chiclen Udon Noodle",
        zh: "鸡乌冬面",
        desc: "",
        price: "7.50"
      },
      {
        name: "Beef Udon Noodles",
        zh: "牛乌冬面",
        desc: "",
        price: "7.80"
      },
      {
        name: "Roast Pork Udon Noodles",
        zh: "叉烧乌冬面",
        desc: "",
        price: "7.50"
      },
      {
        name: "Plain Udon",
        zh: "炒乌冬",
        desc: "",
        price: "6.50"
      }
    ]
  },
  {
    id: "chef-s-special",
    title: "Chef's Special",
    zh: "招厨",
    items: [
      {
        name: "Chicken In Spicy Szechuan Style With Peppercorn & Dried Chilli (Dry)",
        zh: "辣子鸡",
        desc: "Deep Fried",
        price: "7.80"
      },
      {
        name: "Sliced Beef In Spicy Szechuan Style With Peppercorn & Dried Chilli (Dry)",
        zh: "辣子牛",
        desc: "",
        price: "8.00"
      },
      {
        name: "King Prawn In Spicy Szechuan Style With Peppercorn & Dried Chilli (Dry)",
        zh: "辣子虾",
        desc: "Deep Fried",
        price: "8.30"
      },
      {
        name: "Sliced Roast Pork In Spicy Szechuan Style With Peppercorn & Dried Chilli (dry)",
        zh: "辣子叉烧",
        desc: "",
        price: "7.80"
      }
    ]
  },
  {
    id: "vegetable-dishes",
    title: "Vegetable Dishes",
    zh: "什才餐",
    items: [
      {
        name: "Stir Fried Mushroom",
        zh: "炒毛菇",
        desc: "",
        price: "6.00",
        v: true
      },
      {
        name: "Stir Fried Bean Sprouts",
        zh: "炒芽菜",
        desc: "",
        price: "6.00",
        v: true
      },
      {
        name: "Stir Fried Broccoli",
        zh: "西兰花",
        desc: "",
        price: "6.00",
        v: true
      },
      {
        name: "Stir Fried Bamboo Shoots & Water Chestnuts",
        zh: "炒竹马",
        desc: "",
        price: "6.00",
        v: true
      },
      {
        name: "Stir Fried Mixed Vegetable",
        zh: "什才",
        desc: "",
        price: "6.30",
        v: true
      },
      {
        name: "Stir Fried Onions In Garlic Sauce",
        zh: "蒜蓉洋葱",
        desc: "",
        price: "5.50",
        v: true
      },
      {
        name: "Stir Fried Onions In Szechuan Sauce",
        zh: "四川洋葱",
        desc: "",
        price: "5.50",
        v: true
      },
      {
        name: "Stir Fried Onions In Black Bean Sauce",
        zh: "士召洋葱",
        desc: "",
        price: "5.50",
        v: true
      },
      {
        name: "Stir Fried Onions In Satay Sauce",
        zh: "沙爹洋葱",
        desc: "",
        price: "5.50",
        v: true
      },
      {
        name: "Stir Fried Onions In Curry Sauce",
        zh: "咖喱洋葱",
        desc: "",
        price: "5.50",
        v: true
      }
    ]
  },
  {
    id: "sauce",
    title: "Sauce",
    zh: "汁",
    items: [
      {
        name: "Curry Sauce",
        zh: "咖喱汁",
        desc: "",
        price: "2.80"
      },
      {
        name: "Bbq Sauce",
        zh: "BBQ汁",
        desc: "",
        price: "2.80"
      },
      {
        name: "Sweet & Sour Sauce",
        zh: "古老汁",
        desc: "",
        price: "2.80"
      },
      {
        name: "Satay Sauce",
        zh: "沙爹汁",
        desc: "",
        price: "3.80"
      },
      {
        name: "Cantonese Sauce",
        zh: "中式汁",
        desc: "",
        price: "3.50"
      },
      {
        name: "Garlic & Sweet Chilli Sauce",
        zh: "蒜辣汁",
        desc: "",
        price: "3.50"
      },
      {
        name: "Hoi Sin Sauce",
        zh: "海鲜酱",
        desc: "",
        price: "3.20"
      }
    ]
  },
  {
    id: "special-set-meal",
    title: "Special Set Meal",
    zh: "特别套餐",
    items: [
      {
        name: "Special Set Meal A For 1 Person",
        zh: "招牌A 1人餐",
        desc: "Chicken & Sweet Corn Soup. Crispy  Spring Roll (4). Please Choose One Meal  (Any Chicken / Beef / Roast Pork Dish From Menu). Served with Egg Fried Rice or Chips",
        price: "13.90"
      },
      {
        name: "Special Set Meal B",
        zh: "B两人餐",
        desc: "1/2 Aromatic Crispy Duck. Sweet & Sour Chicken Hong Kong Style. Beef with Green Pepper in Black Bean Sauce. Young Chow Fried Rice (Contain Shrimp & Egg)",
        price: "35.50"
      },
      {
        name: "Special Set Meal D",
        zh: "D两人餐",
        desc: "Vegetarian spring Rolls(4). sweet and sour chicken balls(8). chicken&cashew nuts. beef &green pepper in black bean sauce. Large egg fried rice.",
        price: "29.90"
      },
      {
        name: "Set Meal C",
        zh: "C两人歺",
        desc: "Satay chicken on skewer(4). Sweet& sour chicken balls(8). Beef& Green pepper in black bean sauce. Chicken house curry. Large egg fried rice.",
        price: "31.90"
      }
    ]
  },
  {
    id: "drinks",
    title: "Drinks",
    zh: "瓶装饮料",
    items: [
      {
        name: "Coca Cola 330 Ml",
        zh: "可乐 330ml",
        desc: "",
        price: "1.30"
      },
      {
        name: "7up 330ml",
        zh: "7UP 330ml",
        desc: "",
        price: "1.20"
      }
    ]
  }
];

export const HIDDEN_ZH = new Set(["无中文"]);

// Strip the kitchen "@" marker for display only
export const cleanLabel = (s = "") => s.replace(/\s*\(@\)|@/g, "").trim();

export const formatPrice = (p) => `£${Number(p).toFixed(2)}`;
