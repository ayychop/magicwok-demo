// MAGIC WOK menu, scraped 15 Oct 2026 from the shop's own ordering site
// (their previous Foodhub ordering site, public menu feed). 143 items, 16 categories.
// Names, Chinese labels (zh) and prices are kept exactly as published there, including
// the shop's own spellings and the "@" marker on battered balls (hidden on screen by cleanLabel).
// Prices are GBP, VAT included. To update: edit an entry here, the site reads everything from this file.
//
// Notes:
//  - "Others" is labelled 无中文 ("no Chinese") in their system, a placeholder rather than a real
//    label, so the site does not display it. It is kept here verbatim.
//  - `v: true` marks dishes that are vegetable dishes by name or category. The source feed has no
//    dietary flags, so confirm with the kitchen before relying on these.
//  - `photo` is an Unsplash photo id (free licence, no faces), one per dish and never shared, each
//    chosen to match that dish's name. Most are representative shots, not this kitchen's food:
//    swap in the shop's own photos here when they exist.

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
        price: "2.20",
        photo: "1759302307381-bdccf7b35e5d"
      },
      {
        name: "Duck Salad",
        zh: "甲才",
        desc: "",
        price: "2.20",
        photo: "1782242984132-454270d6dc35"
      },
      {
        name: "Munchy Box",
        zh: "优惠餐",
        desc: "Salt & Pepper Chilli Spare Ribs (4), Salt & Pepper Chilli Chicken Wings (4), Salt & Pepper Chilli Chicken, Salt & Pepper Chilli Chips, Salt & Pepper Chilli Chicken Balls (4), Vegetable Spring Rolls (4),Egg Fried Rice, sweet and sour sauce",
        price: "20.00",
        photo: "1777199298385-07e46ccc2004"
      },
      {
        name: "Aromatic Crispy Duck1/2",
        zh: "香酥鸭1/2",
        desc: "Served with Pancakes, Spring Onion, Cucumber & Hoi Sin Sauce",
        price: "16.00",
        photo: "1765441012353-10fb4701a276"
      },
      {
        name: "Roasted Peking Duck",
        zh: "北京甲",
        desc: "A Whole Duck Split-Roasted & Basted with Soya Sauce & Honey Until the Skin is Crispy. Served with Pancakes, Shredded Cucumber, Spring Onion & Hoi Sin Sauce",
        price: "11.50",
        photo: "1759418661781-2b37f26c4573"
      },
      {
        name: "Special Combination For 2 Persons",
        zh: "招牌拼盘",
        desc: "Honey Ribs, Crispy Spring Rolls, Crispy Wan Tun, Sesame Prawn Toast, Chicken Samosa, Crispy Seaweed",
        price: "11.50",
        photo: "1780375578105-e4c938ce2c38"
      },
      {
        name: "Seaweed Combination For 2 Persons",
        zh: "海草拼盘",
        desc: "Salt & Pepper Ribs, Salt & Pepper Chicken, Crispy Spring Rolls, Sesame Prawn Toast     , Crispy Wan Tun, Seaweeds",
        price: "11.50",
        photo: "1656318319598-63f8237c5759"
      },
      {
        name: "Chicken Dumpling With Sweet & Sour Sauce (6)",
        zh: "鸡饺",
        desc: "",
        price: "6.30",
        photo: "1563245372-f21724e3856d"
      },
      {
        name: "Spare Ribs Dry",
        zh: "干骨",
        desc: "",
        price: "8.00",
        photo: "1569352304334-6e422cd70ecd"
      },
      {
        name: "Spare Ribs In Honey Sauce",
        zh: "蜜骨",
        desc: "",
        price: "8.00",
        photo: "1790900618012-96f454e2d112"
      },
      {
        name: "Spare Ribs In Bbq Sauce",
        zh: "BBQ骨",
        desc: "",
        price: "8.00",
        photo: "1544025162-d76694265947"
      },
      {
        name: "Spare Ribs In Sweet Sour Sauce",
        zh: "古骨",
        desc: "",
        price: "8.00",
        photo: "1761315413349-d303df5723ca"
      },
      {
        name: "Spare Ribs In Ok Sauce",
        zh: "OK骨",
        desc: "",
        price: "8.00",
        photo: "1707322540735-2a758dcfb68c"
      },
      {
        name: "Spare Ribs In Thai Sauce",
        zh: "泰式骨",
        desc: "",
        price: "8.00",
        photo: "1593030668930-8130abedd2b0"
      },
      {
        name: "Spare Ribs In Chilli Sauce",
        zh: "辣骨",
        desc: "",
        price: "8.00",
        photo: "1568360987818-833c9383a326"
      },
      {
        name: "Spare Ribs In Capital Sauce",
        zh: "京骨",
        desc: "",
        price: "8.00",
        photo: "1705315861620-ef82f5810b48"
      },
      {
        name: "Vegetarian Spring Roll (4)",
        zh: "斋卷(4)",
        desc: "With Sweet & Sour Sauce",
        price: "4.80",
        v: true,
        photo: "1515022376298-7333f33e704b"
      },
      {
        name: "Thai Vegetable Spring Roll With Sweet And Sour Sauce (10)",
        zh: "泰卷（10）",
        desc: "",
        price: "4.80",
        photo: "1623253083987-26681ce4a992"
      },
      {
        name: "Satay Chicken On Skewers",
        zh: "串鸡",
        desc: "contain nut",
        price: "7.80",
        photo: "1772855386828-a18ff9a12584"
      },
      {
        name: "Sesame Prawn On Toast",
        zh: "虾多士",
        desc: "",
        price: "7.00",
        photo: "1782089543695-af3f3418df4e"
      },
      {
        name: "Crispy Chicken Curry Samosa 4",
        zh: "咖喱鸡角",
        desc: "",
        price: "4.80",
        photo: "1601050690597-df0568f70950"
      },
      {
        name: "Crispy Prawn Wan Tun (8)",
        zh: "炸云吞",
        desc: "With Sweet & Sour Sauce",
        price: "5.00",
        photo: "1781332147547-1f0edb2a78a4"
      },
      {
        name: "Crispy Seaweed",
        zh: "海草",
        desc: "",
        price: "5.80",
        photo: "1789999376136-f55049c3a26d"
      },
      {
        name: "Chips",
        zh: "条",
        desc: "",
        price: "4.00",
        photo: "1768215610440-fcb9631c7ee2"
      },
      {
        name: "Prawn Crackers",
        zh: "下片",
        desc: "",
        price: "4.00",
        photo: "1761321626747-a2da185beab3"
      },
      {
        name: "Cantonese Spring Rolls",
        zh: "春卷",
        desc: "pork, chicken and vegetables with sweet sour sauce",
        price: "5.30",
        photo: "1606525437679-037aca74a3e9"
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
        price: "8.00",
        photo: "1723437395525-77b08e41e53c"
      },
      {
        name: "Salt Pepper Chicken Wings",
        zh: "椒盐鸡翅",
        desc: "",
        price: "6.90",
        photo: "1569058242253-92a9c755a0ec"
      },
      {
        name: "Salt & Pepper King Prawn",
        zh: "椒盐大虾",
        desc: "",
        price: "8.50",
        photo: "1758972572427-fc3d4193bbd2"
      },
      {
        name: "Salt & Pepper Squid",
        zh: "椒盐鱿鱼",
        desc: "",
        price: "7.80",
        photo: "1763467940825-d067fb3baf22"
      },
      {
        name: "Salt & Pepper Chicken",
        zh: "椒盐鸡",
        desc: "",
        price: "7.80",
        photo: "1624153064067-566cae78993d"
      },
      {
        name: "Salt & Pepper Beancurd",
        zh: "椒盐豆腐",
        desc: "",
        price: "6.80",
        photo: "1765295218809-784d6c2fe39c"
      },
      {
        name: "Salt & Pepper Chips",
        zh: "椒盐条",
        desc: "",
        price: "4.90",
        photo: "1630384060421-cb20d0e0649d"
      },
      {
        name: "Salt & Pepper Chicken Balls(@)",
        zh: "椒盐鸡球(@)",
        desc: "",
        price: "7.60",
        photo: "1767469576675-0c02a8d66f4c"
      },
      {
        name: "Slat & Pepper King Prawn Balls",
        zh: "椒盐虾球@",
        desc: "",
        price: "8.50",
        photo: "1682264895449-f75b342cbab6"
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
        price: "5.20",
        photo: "1781332152789-2165582fddb6"
      },
      {
        name: "Hot & Sour Soup",
        zh: "酸辣汤",
        desc: "",
        price: "5.20",
        photo: "1652088079703-38f4a8d6b981"
      },
      {
        name: "Vegetarian Hot & Sour Soup",
        zh: "斋酸辣汤",
        desc: "",
        price: "5.20",
        v: true,
        photo: "1527976746453-f363eac4d889"
      },
      {
        name: "Wan Ton Soup",
        zh: "云吞汤",
        desc: "",
        price: "5.30",
        photo: "1787731997793-916978373ad1"
      },
      {
        name: "Chicken Mushroom Soup",
        zh: "毛菇鸡汤",
        desc: "",
        price: "5.20",
        photo: "1761545832874-02e1d41dc649"
      },
      {
        name: "Chicken Noodle Soup",
        zh: "鸡面汤",
        desc: "",
        price: "5.20",
        photo: "1569058242567-93de6f36f8e6"
      },
      {
        name: "Crab Meat Sweet Corn Soup",
        zh: "蟹米汤",
        desc: "",
        price: "5.20",
        photo: "1665593998976-d957f2827fe7"
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
        price: "7.90",
        photo: "1774668770914-2a37b84c3ef9"
      },
      {
        name: "Crispy Shredded Chilli Chicken",
        zh: "干鸡丝",
        desc: "",
        price: "7.90",
        photo: "1781332145904-997eeba2962c"
      },
      {
        name: "Smoked Shredded Chicken",
        zh: "燻鸡丝（风鸡丝）",
        desc: "",
        price: "7.80",
        photo: "1767974877206-a594e0b1008e"
      },
      {
        name: "Chicken In Lemon Sauce",
        zh: "柠檬鸡",
        desc: "",
        price: "7.80",
        photo: "1777776221078-c8a75b9dae7b"
      },
      {
        name: "Chicken In Orange Sauce",
        zh: "橙汁鸡",
        desc: "",
        price: "7.80",
        photo: "1687966699414-095ca9c35593"
      },
      {
        name: "Chicken In Plum Sauce",
        zh: "梅子鸡",
        desc: "",
        price: "7.80",
        photo: "1791386797753-52e421960216"
      },
      {
        name: "Roast Duck In Orange Sauce",
        zh: "橙鸭",
        desc: "",
        price: "8.30",
        photo: "1605490500023-b96e71486495"
      },
      {
        name: "Roast Duck In Plum Sauce",
        zh: "梅子甲",
        desc: "",
        price: "8.30",
        photo: "1582391123232-6130296f1fcd"
      },
      {
        name: "Roast Duck In Lemon Sauce",
        zh: "柠檬鸭",
        desc: "",
        price: "8.30",
        photo: "1765461743456-e3e2960e4635"
      },
      {
        name: "Crispy King Prawn In Butter Garlic Sauce",
        zh: "蒜牛油虾",
        desc: "",
        price: "8.30",
        photo: "1669385185479-8a4c0db2f896"
      },
      {
        name: "Crispy Chicken In Butter Garlic Sauce",
        zh: "蒜牛油鸡",
        desc: "",
        price: "7.80",
        photo: "1764212942831-a0119af98d0c"
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
        price: "8.30",
        photo: "1764304733301-3a9f335f0c67"
      },
      {
        name: "King Prawn House Curry",
        zh: "咖喱大虾",
        desc: "",
        price: "8.30",
        photo: "1781332143666-5d02f0fe7865"
      },
      {
        name: "Shrimp House Curry",
        zh: "咖喱虾仔",
        desc: "",
        price: "7.50",
        photo: "1761545832792-535fafbad368"
      },
      {
        name: "Chicken House Curry",
        zh: "咖喱鸡",
        desc: "",
        price: "7.80",
        photo: "1708782344490-9026aaa5eec7"
      },
      {
        name: "Beef House Curry",
        zh: "咖喱牛",
        desc: "",
        price: "8.20",
        photo: "1764408182227-c1232be04e22"
      },
      {
        name: "Roast Pork House Curry",
        zh: "咖喱叉烧",
        desc: "",
        price: "7.50",
        photo: "1761038170236-1ed27c5ccbb4"
      },
      {
        name: "Roast Duck House Curry",
        zh: "咖喱甲",
        desc: "",
        price: "8.30",
        photo: "1781332145637-5e14298f3f26"
      },
      {
        name: "Mushroom House Curry",
        zh: "咖喱毛菇",
        desc: "",
        price: "6.80",
        photo: "1788604619692-120407b7207c"
      },
      {
        name: "Tofu House Curry",
        zh: "咖喱豆腐",
        desc: "",
        price: "6.80",
        photo: "1707448829764-9474458021ed"
      },
      {
        name: "Mixed Vegetable House Curry",
        zh: "咖喱什菜",
        desc: "",
        price: "7.50",
        v: true,
        photo: "1755556889666-580731658686"
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
        price: "7.80",
        photo: "1775039983749-aa6003c8ecf9"
      },
      {
        name: "Sweet & Sour King Prawn Hong Kong Style",
        zh: "古老大虾",
        desc: "",
        price: "8.30",
        photo: "1781684081404-5c090011b53e"
      },
      {
        name: "Sweet & Sour Vegetable Hong Kong Style",
        zh: "古老什才",
        desc: "",
        price: "6.80",
        v: true,
        photo: "1604382354123-0d6e1e3a290c"
      },
      {
        name: "Sweet & Sour Tofu Hong Kong Style",
        zh: "古老豆腐",
        desc: "",
        price: "6.80",
        photo: "1785031765104-9af3d84fd3ff"
      },
      {
        name: "Sweet & Sour Chicken Balls In Batter",
        zh: "鸡球@",
        desc: "",
        price: "7.80",
        photo: "1525755662778-989d0524087e"
      },
      {
        name: "Sweet Sour King Prawn Balls In Batter",
        zh: "虾球@",
        desc: "",
        price: "8.30",
        photo: "1704409040997-c1665f3ded4d"
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
        price: "8.30",
        photo: "1767429012942-b707f5a8b704"
      },
      {
        name: "Chicken",
        zh: "鸡",
        desc: "",
        price: "7.50",
        photo: "1788576999396-f73418a7f763"
      },
      {
        name: "King Prawn",
        zh: "大虾",
        desc: "",
        price: "8.30",
        photo: "1762631882592-25bc08678af6"
      },
      {
        name: "Beef",
        zh: "牛",
        desc: "",
        price: "8.00",
        photo: "1760504526069-ff0f8bf6e4ca"
      },
      {
        name: "Roast Pork",
        zh: "叉烧",
        desc: "",
        price: "7.50",
        photo: "1768204037765-2c744f4330ca"
      },
      {
        name: "Roast Duck",
        zh: "甲",
        desc: "",
        price: "8.30",
        photo: "1785899578127-f3883106c735"
      },
      {
        name: "Tofu",
        zh: "豆腐",
        desc: "",
        price: "7.20",
        photo: "1788603930622-636954e00065"
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
        price: "8.60",
        photo: "1679279727895-bd5c9fb9c1a0"
      },
      {
        name: "Young Chow Fried Rice",
        zh: "扬饭",
        desc: "",
        price: "7.50",
        photo: "1788603907442-253dd51b1aec"
      },
      {
        name: "King Prawn Fried Rice",
        zh: "大虾饭",
        desc: "",
        price: "7.80",
        photo: "1551326844-4df70f78d0e9"
      },
      {
        name: "Shrimps Fried Rice",
        zh: "虾仔饭",
        desc: "",
        price: "7.20",
        photo: "1788603907308-58eb4325dce1"
      },
      {
        name: "Chicken Fried Rice",
        zh: "鸡饭",
        desc: "",
        price: "7.50",
        photo: "1512058564366-18510be2db19"
      },
      {
        name: "Beef Fried Rice",
        zh: "牛饭",
        desc: "",
        price: "7.60",
        photo: "1584269600464-37b1b58a9fe7"
      },
      {
        name: "Roast Pork Fried Rice",
        zh: "叉烧饭",
        desc: "",
        price: "7.50",
        photo: "1578160112054-954a67602b88"
      },
      {
        name: "Roast Duck Fried Rice",
        zh: "甲饭",
        desc: "",
        price: "7.80",
        photo: "1637759079728-3f900db7a782"
      },
      {
        name: "Singapore Fried Rice",
        zh: "星饭",
        desc: "",
        price: "7.80",
        photo: "1664717698774-84f62382613b"
      },
      {
        name: "Mushroom Fried Rice",
        zh: "毛菇饭",
        desc: "",
        price: "6.80",
        photo: "1751618646882-4221d5e3b1c2"
      },
      {
        name: "Mixed Vegetable Fried Rice",
        zh: "什才饭",
        desc: "",
        price: "6.80",
        v: true,
        photo: "1630914441929-0d8ea69f95e6"
      },
      {
        name: "Egg Fried Rice (Normal)",
        zh: "蛋炒饭",
        desc: "",
        price: "4.90",
        photo: "1603133872878-684f208fb84b"
      },
      {
        name: "Boiled Rice (Normal)",
        zh: "白饭",
        desc: "",
        price: "4.60",
        photo: "1596560548464-f010549b84d7"
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
        price: "8.60",
        photo: "1634864572865-1cf8ff8bd23d"
      },
      {
        name: "Young Chow Chow Mein (Dry)",
        zh: "扬面",
        desc: "With Shrimps, Roast Pork, Chicken",
        price: "7.90",
        photo: "1772729219154-2f5d5ddd732b"
      },
      {
        name: "King Prawn Chow Mein",
        zh: "大虾面",
        desc: "",
        price: "7.90",
        photo: "1783196736270-d08d63485303"
      },
      {
        name: "Shrimps Chow Mein",
        zh: "虾仔面",
        desc: "",
        price: "7.60",
        photo: "1781332151409-42280f11408e"
      },
      {
        name: "Chicken Chow Mein",
        zh: "鸡面",
        desc: "",
        price: "7.60",
        photo: "1585032226651-759b368d7246"
      },
      {
        name: "Beef Chow Mein",
        zh: "牛面",
        desc: "",
        price: "7.80",
        photo: "1609690963718-0b55905aef78"
      },
      {
        name: "Roast Pork Chow Mein",
        zh: "叉烧面",
        desc: "",
        price: "7.60",
        photo: "1760537553252-d2db6f20a4a2"
      },
      {
        name: "Roast Duck Chow Mein",
        zh: "甲面",
        desc: "",
        price: "8.20",
        photo: "1733907557440-e8f8e179cd56"
      },
      {
        name: "Mushroom Chow Mein",
        zh: "毛古面",
        desc: "",
        price: "7.20",
        photo: "1772729219249-d11a0c1359fb"
      },
      {
        name: "Mixed Vegetable Chow Mein",
        zh: "什才面",
        desc: "",
        price: "7.20",
        v: true,
        photo: "1757445060049-0531425f8643"
      },
      {
        name: "Plain Chow Mein With Bean Sprouts (Normal)",
        zh: "净面",
        desc: "",
        price: "6.20",
        photo: "1788601299617-3052a7c8fa70"
      },
      {
        name: "Singapore Chow Mein",
        zh: "星面",
        desc: "",
        price: "7.90",
        photo: "1701856626197-69908fa4e39a"
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
        price: "7.90",
        photo: "1626804475297-41608ea09aeb"
      },
      {
        name: "Vegetable Singapore Rice Noodles",
        zh: "斋星米",
        desc: "With Egg, Beansprout, Onion",
        price: "7.90",
        v: true,
        photo: "1780493219430-c3e45cd17df8"
      },
      {
        name: "King Prawns Rice Noodle",
        zh: "大虾米粉",
        desc: "",
        price: "8.00",
        photo: "1776886847250-85de0a12f4bd"
      },
      {
        name: "Chicken Rice Noodle",
        zh: "鸡米粉",
        desc: "",
        price: "7.50",
        photo: "1758979690131-11e2aa0b142b"
      },
      {
        name: "Beef Rice Noodle",
        zh: "牛米粉",
        desc: "",
        price: "7.80",
        photo: "1788240146169-02acc1e6a0a0"
      },
      {
        name: "Roast Pork Rice Noodle",
        zh: "叉烧米粉",
        desc: "",
        price: "7.50",
        photo: "1713934895383-f4be7dd735a1"
      },
      {
        name: "Plain Rice Noodle (Normal)",
        zh: "炒米",
        desc: "",
        price: "6.50",
        photo: "1633352615955-f0c99e8b7e5a"
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
        price: "7.80",
        photo: "1610554675919-858d84c76d40"
      },
      {
        name: "Young Udon Noodles",
        zh: "杨乌冬面",
        desc: "",
        price: "7.80",
        photo: "1700323467210-9f9019cdbfd4"
      },
      {
        name: "Veg Udon Noodles",
        zh: "斋乌冬面",
        desc: "",
        price: "7.80",
        v: true,
        photo: "1618841557871-b4664fbf0cb3"
      },
      {
        name: "King Prawn Udon Noodles",
        zh: "大下乌冬面",
        desc: "",
        price: "7.90",
        photo: "1707201124182-099f3d98bb90"
      },
      {
        name: "Chiclen Udon Noodle",
        zh: "鸡乌冬面",
        desc: "",
        price: "7.50",
        photo: "1734529300659-e7c6cdc34efe"
      },
      {
        name: "Beef Udon Noodles",
        zh: "牛乌冬面",
        desc: "",
        price: "7.80",
        photo: "1632381151399-cf5877736890"
      },
      {
        name: "Roast Pork Udon Noodles",
        zh: "叉烧乌冬面",
        desc: "",
        price: "7.50",
        photo: "1558985212-324add95595a"
      },
      {
        name: "Plain Udon",
        zh: "炒乌冬",
        desc: "",
        price: "6.50",
        photo: "1700323861852-069271b695b3"
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
        price: "7.80",
        photo: "1775039984426-544b16dc2993"
      },
      {
        name: "Sliced Beef In Spicy Szechuan Style With Peppercorn & Dried Chilli (Dry)",
        zh: "辣子牛",
        desc: "",
        price: "8.00",
        photo: "1767324672655-8e0f5e814897"
      },
      {
        name: "King Prawn In Spicy Szechuan Style With Peppercorn & Dried Chilli (Dry)",
        zh: "辣子虾",
        desc: "Deep Fried",
        price: "8.30",
        photo: "1764337944130-45560c1f8b41"
      },
      {
        name: "Sliced Roast Pork In Spicy Szechuan Style With Peppercorn & Dried Chilli (dry)",
        zh: "辣子叉烧",
        desc: "",
        price: "7.80",
        photo: "1673994801206-58e8763ab116"
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
        v: true,
        photo: "1676140382464-83cd80afc22b"
      },
      {
        name: "Stir Fried Bean Sprouts",
        zh: "炒芽菜",
        desc: "",
        price: "6.00",
        v: true,
        photo: "1766050587700-01b29f872321"
      },
      {
        name: "Stir Fried Broccoli",
        zh: "西兰花",
        desc: "",
        price: "6.00",
        v: true,
        photo: "1766323106504-6b44debfa313"
      },
      {
        name: "Stir Fried Bamboo Shoots & Water Chestnuts",
        zh: "炒竹马",
        desc: "",
        price: "6.00",
        v: true,
        photo: "1599297915779-0dadbd376d49"
      },
      {
        name: "Stir Fried Mixed Vegetable",
        zh: "什才",
        desc: "",
        price: "6.30",
        v: true,
        photo: "1736631879709-ee5341d7d31c"
      },
      {
        name: "Stir Fried Onions In Garlic Sauce",
        zh: "蒜蓉洋葱",
        desc: "",
        price: "5.50",
        v: true,
        photo: "1784778607224-259b826b8af7"
      },
      {
        name: "Stir Fried Onions In Szechuan Sauce",
        zh: "四川洋葱",
        desc: "",
        price: "5.50",
        v: true,
        photo: "1788603913464-cc204d311c13"
      },
      {
        name: "Stir Fried Onions In Black Bean Sauce",
        zh: "士召洋葱",
        desc: "",
        price: "5.50",
        v: true,
        photo: "1614955177711-2540ad25432b"
      },
      {
        name: "Stir Fried Onions In Satay Sauce",
        zh: "沙爹洋葱",
        desc: "",
        price: "5.50",
        v: true,
        photo: "1592578630143-fac65cda7a67"
      },
      {
        name: "Stir Fried Onions In Curry Sauce",
        zh: "咖喱洋葱",
        desc: "",
        price: "5.50",
        v: true,
        photo: "1788843303683-d3990a70f9fe"
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
        price: "2.80",
        photo: "1690915475414-9aaecfd3ba74"
      },
      {
        name: "Bbq Sauce",
        zh: "BBQ汁",
        desc: "",
        price: "2.80",
        photo: "1789372666319-a0aa11b397fa"
      },
      {
        name: "Sweet & Sour Sauce",
        zh: "古老汁",
        desc: "",
        price: "2.80",
        photo: "1734989435134-7e4885259231"
      },
      {
        name: "Satay Sauce",
        zh: "沙爹汁",
        desc: "",
        price: "3.80",
        photo: "1696385793103-71f51f6fd3b7"
      },
      {
        name: "Cantonese Sauce",
        zh: "中式汁",
        desc: "",
        price: "3.50",
        photo: "1563599175592-c58dc214deff"
      },
      {
        name: "Garlic & Sweet Chilli Sauce",
        zh: "蒜辣汁",
        desc: "",
        price: "3.50",
        photo: "1779939855596-8506096e2ebe"
      },
      {
        name: "Hoi Sin Sauce",
        zh: "海鲜酱",
        desc: "",
        price: "3.20",
        photo: "1499126167718-c87f5c1387e8"
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
        price: "13.90",
        photo: "1707897748442-cc3a48d31300"
      },
      {
        name: "Special Set Meal B",
        zh: "B两人餐",
        desc: "1/2 Aromatic Crispy Duck. Sweet & Sour Chicken Hong Kong Style. Beef with Green Pepper in Black Bean Sauce. Young Chow Fried Rice (Contain Shrimp & Egg)",
        price: "35.50",
        photo: "1652862730779-c4f87896c7a7"
      },
      {
        name: "Special Set Meal D",
        zh: "D两人餐",
        desc: "Vegetarian spring Rolls(4). sweet and sour chicken balls(8). chicken&cashew nuts. beef &green pepper in black bean sauce. Large egg fried rice.",
        price: "29.90",
        photo: "1652862730508-cc54a41f724b"
      },
      {
        name: "Set Meal C",
        zh: "C两人歺",
        desc: "Satay chicken on skewer(4). Sweet& sour chicken balls(8). Beef& Green pepper in black bean sauce. Chicken house curry. Large egg fried rice.",
        price: "31.90",
        photo: "1597490101653-8db754021a89"
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
        price: "1.30",
        photo: "1622483767028-3f66f32aef97"
      },
      {
        name: "7up 330ml",
        zh: "7UP 330ml",
        desc: "",
        price: "1.20",
        photo: "1622766815178-641bef2b4630"
      }
    ]
  }
];

export const HIDDEN_ZH = new Set(["无中文"]);

// Strip the kitchen "@" marker for display only
export const cleanLabel = (s = "") => s.replace(/\s*\(@\)|@/g, "").trim();

export const formatPrice = (p) => `£${Number(p).toFixed(2)}`;
